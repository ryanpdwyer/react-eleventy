/**
 * CV Simulation – UI & Animation
 *
 * Reads parameters from the form, runs the simulation engine,
 * and animates the results through three Plotly plots.
 */

import { runSimulation, findPeaks } from './cv-sim-engine.js';

// ── DOM refs ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const btnRun   = $('btn-run');
const btnReset = $('btn-reset');
const speedEl  = $('speed');
const statusEl = $('status-bar');
const rxnN     = $('rxn-n');

// ── State ─────────────────────────────────────────────────────
// States: 'idle' | 'playing' | 'paused' | 'done'
let state      = 'idle';
let result     = null;   // simulation output
let animId     = null;   // requestAnimationFrame id
let snapIdx    = 0;      // current snapshot index
let E_arr, I_mA_arr, t_arr; // plain-array copies for Plotly

// ── Plotly layout templates ───────────────────────────────────
const plotCfg = { responsive: true, displayModeBar: false };
const marginSmall = { t: 28, r: 18, b: 44, l: 56 };

function layoutET(tMax, Ee, Es) {
    return {
        xaxis: { title: 'Time / s', range: [0, tMax] },
        yaxis: { title: 'E / V', range: [Ee, Es] },
        margin: marginSmall, height: 280
    };
}

function layoutIV(Ee, Es) {
    return {
        xaxis: { title: 'E / V', range: [Ee, Es] },
        yaxis: { title: 'I / mA' },
        margin: marginSmall, height: 280
    };
}

function layoutConc(xm, Co0) {
    return {
        xaxis: { title: 'Distance / \u00b5m', range: [0, xm] },
        yaxis: { title: 'C / M', range: [0, Co0 * 1.25] },
        margin: marginSmall, height: 340,
        legend: { x: 0.82, y: 0.98, bgcolor: 'rgba(255,255,255,0.7)' },
        annotations: []
    };
}

// ── Read form values ──────────────────────────────────────────
function readParams() {
    return {
        Do:       parseFloat($('Do').value) * 1e-5,
        Dr:       parseFloat($('Dr').value) * 1e-5,
        Co0:      parseFloat($('Co0').value),
        k0:       parseFloat($('k0').value),
        alpha:    parseFloat($('alpha').value),
        n:        parseFloat($('nElectrons').value),
        Es:       parseFloat($('Es').value),
        Ee:       parseFloat($('Ee').value),
        E0:       parseFloat($('E0').value),
        scanRate: parseFloat($('scanRate').value),
        dt:       parseFloat($('dt').value) / 1000,   // ms → s
        area:     parseFloat($('area').value),
        xm:       parseFloat($('xm').value)            // display only
    };
}

// ── Update reaction display when n changes ────────────────────
$('nElectrons').addEventListener('input', () => {
    rxnN.textContent = $('nElectrons').value;
});

// ── Initialise empty plots ────────────────────────────────────
function initPlots() {
    const p = readParams();
    const tMax = 2 * Math.abs(p.Ee - p.Es) / p.scanRate;

    Plotly.newPlot('plot-et', [{ x: [], y: [], mode: 'lines' }],
        layoutET(tMax, p.Ee, p.Es), plotCfg);

    Plotly.newPlot('plot-iv', [{ x: [], y: [], mode: 'lines', line: { color: '#d62728' } }],
        layoutIV(p.Ee, p.Es), plotCfg);

    Plotly.newPlot('plot-conc', [
        { x: [], y: [], fill: 'tozeroy', fillcolor: 'rgba(0,200,200,0.25)',
          line: { color: '#d62728', width: 2 }, name: 'O' },
        { x: [], y: [], fill: 'tozeroy', fillcolor: 'rgba(255,220,0,0.30)',
          line: { color: '#1f77b4', width: 2 }, name: 'R' }
    ], layoutConc(p.xm, p.Co0), plotCfg);
}

// ── Button state helpers ──────────────────────────────────────
function setBtn(label, cls) {
    btnRun.innerHTML = label;
    btnRun.className = `btn btn-sm btn-${cls}`;
}

// ── Compute simulation (if needed) and start playing ──────────
function play() {
    if (!result) {
        const p = readParams();
        try {
            result = runSimulation({ ...p, snapshotInterval: 5 });
        } catch (err) {
            statusEl.textContent = 'Error: ' + err.message;
            return;
        }
        E_arr    = Array.from(result.E);
        I_mA_arr = Array.from(result.I).map(a => a * 1e3); // A → mA
        t_arr    = Array.from(result.t);

        const tMax = t_arr[t_arr.length - 1];
        Plotly.relayout('plot-et', { 'xaxis.range': [0, tMax], 'yaxis.range': [p.Ee, p.Es] });
        Plotly.relayout('plot-iv', { 'xaxis.range': [p.Ee, p.Es] });
        Plotly.relayout('plot-conc', {
            'xaxis.range': [0, p.xm],
            'yaxis.range': [0, p.Co0 * 1.25]
        });
        snapIdx = 0;
    }

    state = 'playing';
    fractionalSnap = 0;
    setBtn('&#9646;&#9646; Pause', 'warning');
    statusEl.textContent = 'Playing\u2026';
    animId = requestAnimationFrame(animate);
}

function pause() {
    state = 'paused';
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    setBtn('&#9654; Play', 'success');
    const pct = Math.round(100 * (snapIdx + 1) / result.snapshots.length);
    statusEl.textContent = `Paused at frame ${snapIdx + 1} / ${result.snapshots.length}  (${pct}%)`;
}

// ── Animation loop ────────────────────────────────────────────
// Speed slider: -1 to +1 (log scale). Multiplier = 10^value.
// Centre (0) = 1x. Left (-1) = 0.1x. Right (+1) = 10x.
// Base interval 50 ms at 1x speed.
let lastFrameTime = 0;
let fractionalSnap = 0; // accumulator for sub-1 steps

function animate(ts) {
    if (state !== 'playing') return;

    const multiplier = Math.pow(10, parseFloat(speedEl.value));
    const delay = 50 / multiplier;

    if (ts - lastFrameTime < delay) {
        animId = requestAnimationFrame(animate);
        return;
    }
    lastFrameTime = ts;

    // For fast speeds (multiplier > 1), skip multiple frames per tick
    // For slow speeds (multiplier < 1), advance fractionally
    fractionalSnap += Math.max(1, multiplier);
    const steps = Math.floor(fractionalSnap);
    fractionalSnap -= steps;

    snapIdx = Math.min(snapIdx + steps, result.snapshots.length - 1);
    updatePlots(snapIdx);

    const pct = Math.round(100 * (snapIdx + 1) / result.snapshots.length);
    statusEl.textContent = `Frame ${snapIdx + 1} / ${result.snapshots.length}  (${pct}%)`;

    if (snapIdx >= result.snapshots.length - 1) {
        state = 'done';
        setBtn('&#9654; Play', 'success');
        showPeakInfo();
        return;
    }

    animId = requestAnimationFrame(animate);
}

// ── Update all three plots for a given snapshot index ─────────
function updatePlots(si) {
    const snap = result.snapshots[si];
    const fi = snap.frameIndex;
    const p = readParams();

    Plotly.react('plot-et',
        [{ x: t_arr.slice(0, fi + 1), y: E_arr.slice(0, fi + 1), mode: 'lines' }],
        layoutET(t_arr[t_arr.length - 1], p.Ee, p.Es), plotCfg);

    Plotly.react('plot-iv',
        [{ x: E_arr.slice(0, fi + 1), y: I_mA_arr.slice(0, fi + 1), mode: 'lines',
           line: { color: '#d62728' } }],
        layoutIV(p.Ee, p.Es), plotCfg);

    const xxArr = Array.from(result.xx);
    const coArr = Array.from(snap.Co);
    const crArr = Array.from(snap.Cr);
    const eNow = E_arr[fi];

    const concLayout = layoutConc(p.xm, result.Co0);
    concLayout.annotations = [{
        x: 0.35 * p.xm, y: 1.08 * result.Co0, xref: 'x', yref: 'y',
        text: '<b>' + eNow.toFixed(3) + ' V</b>',
        showarrow: false, font: { color: '#d62728', size: 15 }
    }];

    Plotly.react('plot-conc', [
        { x: xxArr, y: coArr, fill: 'tozeroy', fillcolor: 'rgba(0,200,200,0.25)',
          line: { color: '#d62728', width: 2 }, name: 'O' },
        { x: xxArr, y: crArr, fill: 'tozeroy', fillcolor: 'rgba(255,220,0,0.30)',
          line: { color: '#1f77b4', width: 2 }, name: 'R' }
    ], concLayout, plotCfg);
}

// ── Show peak info after simulation ───────────────────────────
function showPeakInfo() {
    const peaks = findPeaks(result.E, result.I, result.Nt);
    const dEp = (peaks.deltaEp * 1000).toFixed(1);
    const Ipc_mA = (peaks.Ipc * 1e3).toFixed(3);
    const Ipa_mA = (peaks.Ipa * 1e3).toFixed(3);
    statusEl.innerHTML =
        `Done &mdash; \u0394E<sub>p</sub> = ${dEp} mV &ensp;|&ensp; ` +
        `I<sub>pc</sub> = ${Ipc_mA} mA &ensp; ` +
        `I<sub>pa</sub> = ${Ipa_mA} mA`;
}

// ── Reset ─────────────────────────────────────────────────────
function reset() {
    state = 'idle';
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    result = null;
    snapIdx = 0;
    setBtn('&#9654; Play', 'success');
    initPlots();
    statusEl.innerHTML = 'Adjust parameters and click <strong>Play</strong>.';
}

// ── Event listeners ───────────────────────────────────────────
btnRun.addEventListener('click', () => {
    if (state === 'playing') {
        pause();
    } else if (state === 'paused') {
        play();
    } else if (state === 'done') {
        snapIdx = 0;
        play();
    } else {
        play();
    }
});
btnReset.addEventListener('click', reset);

// ── Boot ──────────────────────────────────────────────────────
initPlots();
