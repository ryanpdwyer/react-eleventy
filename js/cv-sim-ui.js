/**
 * CV Simulation – UI & Animation
 *
 * Reads parameters from the form, runs the simulation engine,
 * and animates the results through three Plotly plots.
 * Two modes: cyclic voltammetry ('cv') and potential step ('step').
 */

import { runSimulation, runStep, findPeaks, cottrell } from './cv-sim-engine.js';

// ── DOM refs ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const btnRun   = $('btn-run');
const btnReset = $('btn-reset');
const speedEl  = $('speed');
const statusEl = $('status-bar');
const rxnN     = $('rxn-n');
const modeEl   = $('mode');
const btnCsv   = $('btn-csv');

const isStep = () => modeEl.value === 'step';

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

function layoutIT(tMax) {
    return {
        xaxis: { title: 'Time / s', range: [0, tMax] },
        yaxis: { title: 'I / mA' },
        margin: marginSmall, height: 280,
        legend: { x: 0.6, y: 0.98, bgcolor: 'rgba(255,255,255,0.7)' }
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
        xm:       parseFloat($('xm').value),           // display only
        // potential-step mode
        Einit:    parseFloat($('Einit').value),
        Estep:    parseFloat($('Estep').value),
        E0step:   parseFloat($('E0step').value),
        tStep:    parseFloat($('tStep').value),
        dtStep:   parseFloat($('dtStep').value) / 1000, // ms → s
        Ru:       parseFloat($('Ru').value),
        Cdl:      parseFloat($('Cdl').value) * 1e-6,   // µF → F
        noise:    parseFloat($('noise').value) * 1e-6  // µA → A
    };
}

// Potential axis range for the E–t plot
function eRange(p) {
    if (!isStep()) return [p.Ee, p.Es];
    const lo = Math.min(p.Einit, p.Estep), hi = Math.max(p.Einit, p.Estep);
    const pad = 0.1 * (hi - lo || 1);
    return [lo - pad, hi + pad];
}

// ── Update reaction display when n changes ────────────────────
$('nElectrons').addEventListener('input', () => {
    rxnN.textContent = $('nElectrons').value;
});

// ── Initialise empty plots ────────────────────────────────────
function initPlots() {
    const p = readParams();
    const tMax = isStep() ? p.tStep : 2 * Math.abs(p.Ee - p.Es) / p.scanRate;
    const [eLo, eHi] = eRange(p);

    Plotly.newPlot('plot-et', [{ x: [], y: [], mode: 'lines' }],
        layoutET(tMax, eLo, eHi), plotCfg);

    Plotly.newPlot('plot-iv', [{ x: [], y: [], mode: 'lines', line: { color: '#d62728' } }],
        isStep() ? layoutIT(tMax) : layoutIV(p.Ee, p.Es), plotCfg);

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
            if (isStep()) {
                const Nt = Math.floor(p.tStep / p.dtStep);
                result = runStep({ ...p, E0: p.E0step, dt: p.dtStep,
                                   snapshotInterval: Math.max(1, Math.ceil(Nt / 300)) });
            } else {
                result = runSimulation({ ...p, snapshotInterval: 5 });
            }
        } catch (err) {
            statusEl.textContent = 'Error: ' + err.message;
            return;
        }
        E_arr    = Array.from(result.E);
        I_mA_arr = Array.from(result.I).map(a => a * 1e3); // A → mA
        t_arr    = Array.from(result.t);
        btnCsv.disabled = false;

        const tMax = t_arr[t_arr.length - 1];
        Plotly.relayout('plot-et', { 'xaxis.range': [0, tMax], 'yaxis.range': eRange(p) });
        if (!isStep()) Plotly.relayout('plot-iv', { 'xaxis.range': [p.Ee, p.Es] });
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

    const tMax = t_arr[t_arr.length - 1];
    const [eLo, eHi] = eRange(p);

    if (isStep()) {
        // E(t): Einit before t = 0, Estep after
        Plotly.react('plot-et',
            [{ x: [0, 0].concat(t_arr.slice(0, fi + 1)),
               y: [p.Einit, p.Estep].concat(E_arr.slice(0, fi + 1)), mode: 'lines' }],
            layoutET(tMax, eLo, eHi), plotCfg);

        const traces = [{ x: t_arr.slice(0, fi + 1), y: I_mA_arr.slice(0, fi + 1),
                          mode: 'lines', line: { color: '#d62728' }, name: 'Simulated' }];
        if ($('showCottrell').checked) {
            traces.push({ x: t_arr, y: t_arr.map(t => cottrell(t, p) * 1e3),
                          mode: 'lines', line: { color: '#555', dash: 'dash', width: 1 },
                          name: 'Cottrell' });
        }
        const lay = layoutIT(tMax);
        // Clip the axis so the initial charging spike doesn't flatten the decay
        lay.yaxis.range = [Math.min(0, ...I_mA_arr) * 1.1,
                           3 * cottrell(0.05 * tMax, p) * 1e3];
        Plotly.react('plot-iv', traces, lay, plotCfg);
    } else {
        Plotly.react('plot-et',
            [{ x: t_arr.slice(0, fi + 1), y: E_arr.slice(0, fi + 1), mode: 'lines' }],
            layoutET(tMax, eLo, eHi), plotCfg);

        Plotly.react('plot-iv',
            [{ x: E_arr.slice(0, fi + 1), y: I_mA_arr.slice(0, fi + 1), mode: 'lines',
               line: { color: '#d62728' } }],
            layoutIV(p.Ee, p.Es), plotCfg);
    }

    const xxArr = Array.from(result.xx);
    const coArr = Array.from(snap.Co);
    const crArr = Array.from(snap.Cr);
    const eNow = E_arr[fi];

    const concLayout = layoutConc(p.xm, result.Co0);
    concLayout.annotations = [{
        x: 0.35 * p.xm, y: 1.08 * result.Co0, xref: 'x', yref: 'y',
        text: isStep() ? '<b>t = ' + t_arr[fi].toFixed(3) + ' s</b>'
                       : '<b>' + eNow.toFixed(3) + ' V</b>',
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
    if (isStep()) {
        const p = readParams();
        const i1 = t_arr.findIndex(t => t >= 0.5 * t_arr[t_arr.length - 1]);
        statusEl.innerHTML =
            `Done &mdash; at t = ${t_arr[i1].toFixed(3)} s: ` +
            `I = ${I_mA_arr[i1].toFixed(4)} mA &ensp;|&ensp; ` +
            `Cottrell = ${(cottrell(t_arr[i1], p) * 1e3).toFixed(4)} mA`;
        return;
    }
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
    btnCsv.disabled = true;
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

modeEl.addEventListener('change', () => {
    $('cv-params').style.display   = isStep() ? 'none' : '';
    $('step-params').style.display = isStep() ? '' : 'none';
    reset();
});

// ── CSV export ────────────────────────────────────────────────
btnCsv.addEventListener('click', () => {
    if (!result) return;
    const rows = ['t_s,E_V,I_A'].concat(t_arr.map((t, i) => `${t},${E_arr[i]},${result.I[i]}`));
    const blob = new Blob([rows.join('\n') + '\n'], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = isStep() ? 'chronoamperometry-sim.csv' : 'cv-sim.csv';
    a.click();
    URL.revokeObjectURL(a.href);
});

// ── Boot ──────────────────────────────────────────────────────
initPlots();
