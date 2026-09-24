/**
 * CV Simulation – UI & Animation
 *
 * Reads parameters from the form, runs the simulation engine,
 * and animates the results through three Plotly plots plus a
 * molecular (particle) view that shares the concentration plot's x axis.
 * Two modes: cyclic voltammetry ('cv') and potential step ('step').
 * Guided lesson tabs hide the settings; the Explore tab shows them all.
 */

import { runSimulation, runStep, findPeaks, cottrell, equilibriumPotential } from './cv-sim-engine.js';
import { createParticleView, COLOR_O, COLOR_R } from './cv-sim-particles.js';
import { LESSONS, BASE } from './cv-sim-lessons.js';

// ── DOM refs ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const btnRun   = $('btn-run');
const btnReset = $('btn-reset');
const speedEl  = $('speed');
const statusEl = $('status-bar');
const modeEl   = $('mode');
const btnCsv   = $('btn-csv');
const molView  = createParticleView($('molecular'));

const FILL_O = 'rgba(28,126,214,0.18)';
const FILL_R = 'rgba(247,103,7,0.18)';

const isStep = () => modeEl.value === 'step';

// ── State ─────────────────────────────────────────────────────
// States: 'idle' | 'playing' | 'paused' | 'done'
let state      = 'idle';
let result     = null;   // simulation output
let runP       = null;   // parameters the current result was computed with
let animId     = null;   // requestAnimationFrame id
let snapIdx    = 0;      // current snapshot index
let E_arr, I_mA_arr, If_mA_arr, Ic_mA_arr, t_arr; // plain-array copies for Plotly

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

function layoutConc(xm, Cmax) {
    return {
        xaxis: { title: 'Distance / \u00b5m', range: [0, xm] },
        yaxis: { title: 'C / M', range: [0, Cmax * 1.25] },
        margin: { ...marginSmall, l: 84 }, height: 320,
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
        Cr0:      parseFloat($('Cr0').value),
        k0:       parseFloat($('k0').value),
        alpha:    parseFloat($('alpha').value),
        n:        parseFloat($('nElectrons').value),
        Es:       parseFloat($('Es').value),
        Ee:       parseFloat($('Ee').value),
        E0:       parseFloat($('E0').value),
        scanRate: parseFloat($('scanRate').value),
        area:     parseFloat($('area').value),
        xm:       parseFloat($('xm').value),           // display only
        // potential-step mode
        Einit:    parseFloat($('Einit').value),
        Estep:    parseFloat($('Estep').value),
        E0step:   parseFloat($('E0step').value),
        tStep:    parseFloat($('tStep').value),
        tDwell:   parseFloat($('tDwell').value),
        dtStep:   parseFloat($('dtStep').value) / 1000, // ms → s
        Ru:       parseFloat($('Ru').value),
        Cdl:      parseFloat($('Cdl').value) * 1e-6,   // µF → F
        noise:    parseFloat($('noise').value) * 1e-6, // µA → A
        oxidizeFirst: $('scanDir').value === 'pos',
        second:   $('useSecond').checked ? {
            E0:  parseFloat($('E02').value),
            k0:  parseFloat($('k02').value),
            Co0: parseFloat($('Co02').value),
            Cr0: parseFloat($('Cr02').value)
        } : null
    };
}

// Standard potential of the first couple in the current mode
const E0of = p => isStep() ? p.E0step : p.E0;

// Every couple in the solution, as { E0, k0, Co0, Cr0 }
function couplesOf(p) {
    const list = [{ E0: E0of(p), k0: p.k0, Co0: p.Co0, Cr0: p.Cr0 }];
    if (p.second) list.push(p.second);
    return list;
}

// Largest bulk concentration, for the concentration axis
const cMax = p => Math.max(...couplesOf(p).flatMap(c => [c.Co0, c.Cr0])) || 1;

// Potential axis range for the E–t plot
function eRange(p) {
    if (!isStep()) return [p.Ee, p.Es];
    const lo = Math.min(p.Einit, p.Estep), hi = Math.max(p.Einit, p.Estep);
    const pad = 0.1 * (hi - lo || 1);
    return [lo - pad, hi + pad];
}

// ── Reaction display, second-couple panel, Nernst hint ────────
function updateSidebar() {
    for (const el of document.querySelectorAll('.rxn-n')) el.textContent = $('nElectrons').value;
    const two = $('useSecond').checked;
    $('reaction').classList.toggle('two', two);
    for (const el of document.querySelectorAll('.couple2')) el.style.display = two ? '' : 'none';

    const p = readParams();
    const Eeq = equilibriumPotential({ E0: E0of(p), n: p.n, Co0: p.Co0, Cr0: p.Cr0 });
    $('eeq').innerHTML = Number.isFinite(Eeq)
        ? `E<sub>eq</sub> = ${Eeq.toFixed(3)} V (open circuit)` : '';
}
for (const id of ['nElectrons', 'Co0', 'Cr0', 'E0', 'E0step', 'useSecond']) {
    $(id).addEventListener('input', updateSidebar);
}
$('useSecond').addEventListener('change', () => { updateSidebar(); if (state === 'idle') reset(); });

// ── Initialise empty plots ────────────────────────────────────
function initPlots() {
    const p = readParams();
    const tMax = isStep() ? p.tDwell + p.tStep : 2 * Math.abs(p.Ee - p.Es) / p.scanRate;
    const [eLo, eHi] = eRange(p);

    Plotly.newPlot('plot-et', [{ x: [], y: [], mode: 'lines' }],
        layoutET(tMax, eLo, eHi), plotCfg);

    Plotly.newPlot('plot-iv', [{ x: [], y: [], mode: 'lines', line: { color: '#343a40' } }],
        isStep() ? layoutIT(tMax) : layoutIV(p.Ee, p.Es), plotCfg);

    Plotly.newPlot('plot-conc', concTraces([], []), layoutConc(p.xm, cMax(p)), plotCfg)
        .then(() => {
            if (!result) {               // a run may have started before the plot finished
                molView.reset({ ...physics(p),
                                Estart: isStep() ? p.Einit : p.oxidizeFirst ? p.Ee : p.Es });
            }
            syncMolecularView();
        });
}

// Couple 1 filled and solid; couple 2 dashed, unfilled
function concTraces(x, couples) {
    if (!couples.length) couples = [{ Co: [], Cr: [] }];
    const two = couples.length > 1;
    return couples.flatMap((c, k) => {
        const sub = two ? `<sub>${k + 1}</sub>` : '';
        const fill = k === 0 ? 'tozeroy' : 'none', dash = k === 0 ? 'solid' : 'dash';
        return [
            { x, y: c.Co, fill, fillcolor: FILL_O,
              line: { color: COLOR_O, width: 2, dash }, name: 'O' + sub },
            { x, y: c.Cr, fill, fillcolor: FILL_R,
              line: { color: COLOR_R, width: 2, dash }, name: 'R' + sub }
        ];
    });
}

// Parameters the particle view needs
function physics(p) {
    return { Do: p.Do, Dr: p.Dr, alpha: p.alpha, n: p.n, xm: p.xm, couples: couplesOf(p) };
}

// Keep the molecular view's x axis aligned with the concentration plot
function syncMolecularView() {
    const size = $('plot-conc')._fullLayout?._size;
    if (size) molView.resize(size);
    molView.draw(performance.now());      // resizing clears the canvas
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
        runP = p;
        try {
            if (isStep()) {
                const Nt = Math.floor((p.tDwell + p.tStep) / p.dtStep);
                result = runStep({ ...p, E0: p.E0step, dt: p.dtStep,
                                   snapshotInterval: Math.max(1, Math.ceil(Nt / 300)) });
            } else {
                // E+ is the Es input and E− the Ee input; the engine sweeps Es → Ee → Es
                const ends = p.oxidizeFirst ? { Es: p.Ee, Ee: p.Es } : {};
                result = runSimulation({ ...p, ...ends, snapshotInterval: 5 });
            }
        } catch (err) {
            statusEl.textContent = 'Error: ' + err.message;
            return;
        }
        E_arr    = Array.from(result.E);
        I_mA_arr = Array.from(result.I).map(a => a * 1e3); // A → mA
        If_mA_arr = Array.from(result.If).map(a => a * 1e3);
        Ic_mA_arr = Array.from(result.Ic).map(a => a * 1e3);
        t_arr    = Array.from(result.t);
        btnCsv.disabled = false;
        jxm = Math.min(result.Nx - 1, Math.round(p.xm / result.xx[1]));
        // Faradaic current only (the dots don't show charging); a high
        // percentile so the spike right after a step doesn't set the scale
        Ifar = result.If || result.I;
        const sorted = Array.from(Ifar, Math.abs).sort((x, y) => x - y);
        Imax = sorted[Math.floor(0.98 * (sorted.length - 1))] || 1;

        const tMax = t_arr[t_arr.length - 1];
        Plotly.relayout('plot-et', { 'xaxis.range': [0, tMax], 'yaxis.range': eRange(p) });
        if (!isStep()) Plotly.relayout('plot-iv', { 'xaxis.range': [p.Ee, p.Es] });
        Plotly.relayout('plot-conc', {
            'xaxis.range': [0, p.xm],
            'yaxis.range': [0, cMax(p) * 1.25]
        });
        snapIdx = 0;
    }
    if (snapIdx === 0) restartParticles();

    state = 'playing';
    fractionalSnap = 0;
    setBtn('&#9646;&#9646; Pause', 'warning');
    statusEl.textContent = 'Playing\u2026';
    if (!animId) animId = requestAnimationFrame(frame);
}

function restartParticles() {
    tPart = 0;
    molView.reset({ ...physics(runP), Estart: E_arr[0], Iscale: Imax });
}

function pause() {
    state = 'paused';
    setBtn('&#9654; Play', 'success');
    const pct = Math.round(100 * (snapIdx + 1) / result.snapshots.length);
    statusEl.textContent = `Paused at frame ${snapIdx + 1} / ${result.snapshots.length}  (${pct}%)`;
}

// ── Animation loop ────────────────────────────────────────────
// Speed slider: -1 to +1 (log scale). Multiplier = 10^value.
// Centre (0) = 1x. Left (-1) = 0.1x. Right (+1) = 10x.
// Base interval 50 ms per snapshot at 1x speed.
// The plots jump snapshot to snapshot; the molecular view runs every
// display frame and its clock (tPart) chases the snapshot clock.
let lastFrameTime = 0;
let lastTs = 0;
let fractionalSnap = 0; // accumulator for sub-1 steps
let tPart = 0;          // simulated time the particles have reached (s)
let jxm = 0;            // grid index at the right edge of the view
let Ifar = null;        // faradaic current of the run (A)
let Imax = 1;           // scale for the electron-flow arrow

function frame(ts) {
    const realDt = lastTs ? Math.min(100, ts - lastTs) : 16;
    lastTs = ts;
    const multiplier = Math.pow(10, parseFloat(speedEl.value));
    const delay = 50 / multiplier;

    if (state === 'playing' && ts - lastFrameTime >= delay) {
        lastFrameTime = ts;
        // For fast speeds (multiplier > 1), skip multiple frames per tick
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
        }
    }

    const tTarget = result ? t_arr[result.snapshots[snapIdx].frameIndex] : 0;
    if (result && tPart < tTarget) {
        advanceParticles(Math.min(tTarget, tPart + (tTarget - tPart) * Math.min(1, realDt / delay)));
    }
    molView.draw(ts);

    if (state === 'playing' || (result && tPart < tTarget) || molView.busy(ts)) {
        animId = requestAnimationFrame(frame);
    } else {
        animId = null;
        lastTs = 0;
    }
}

// Move the dots from tPart to tNew in chunks short enough that E is ~constant
function advanceParticles(tNew) {
    const dt = result.dt;
    const snap = result.snapshots[snapIdx];
    const fOfar = snap.couples.map(c => c.Co[jxm] / (c.Co[jxm] + c.Cr[jxm] || 1));
    const last = E_arr.length - 1;
    while (tPart < tNew - 1e-12) {
        const h = Math.min(5 * dt, tNew - tPart);
        const i = Math.min(last, Math.floor((tPart + h / 2) / dt));
        molView.advance(h, E_arr[i], fOfar);
        molView.setCurrent(result.Ik.map(Ik => Ik[i]));
        tPart += h;
    }
}

// ── Update all three plots for a given snapshot index ─────────
function updatePlots(si) {
    const snap = result.snapshots[si];
    const fi = snap.frameIndex;
    const p = runP;

    const tMax = t_arr[t_arr.length - 1];
    const [eLo, eHi] = eRange(p);

    if (isStep()) {
        Plotly.react('plot-et',
            [{ x: t_arr.slice(0, fi + 1), y: E_arr.slice(0, fi + 1), mode: 'lines',
               line: { shape: 'hv' } }],
            layoutET(tMax, eLo, eHi), plotCfg);

        const tNow = t_arr.slice(0, fi + 1);
        const traces = [...ghostTraces(),
                        { x: tNow, y: I_mA_arr.slice(0, fi + 1), mode: 'lines',
                          line: { color: '#343a40' }, name: runLabel('Simulated') },
                        ...componentTraces(tNow, fi)];
        if ($('showCottrell').checked) {
            const tc = t_arr.filter(t => t > result.tStart);
            traces.push({ x: tc, y: tc.map(t => cottrellRef(t - result.tStart, p) * 1e3),
                          mode: 'lines', line: { color: '#555', dash: 'dash', width: 1 },
                          name: 'Cottrell' });
        }
        const lay = layoutIT(tMax);
        // Clip the axis so the initial charging spike doesn't flatten the decay:
        // ±3× the Cottrell current at 5% of the step, for all the O (or R) present
        const cs = couplesOf(p);
        const cott = (C, D) => 3 * cottrell(0.05 * p.tStep, { ...p, Co0: C, Do: D }) * 1e3;
        const up = cott(cs.reduce((a, c) => a + c.Co0, 0), p.Do);
        const down = cott(cs.reduce((a, c) => a + c.Cr0, 0), p.Dr);
        lay.yaxis.range = [-Math.max(down, 0.05 * up), Math.max(up, 0.05 * down)];
        // Keep the legend clear of the decay: it runs along the top for an oxidizing step
        if (p.Estep > p.Einit) Object.assign(lay.legend, { y: 0.02, yanchor: 'bottom' });
        Plotly.react('plot-iv', traces, lay, plotCfg);
    } else {
        Plotly.react('plot-et',
            [{ x: t_arr.slice(0, fi + 1), y: E_arr.slice(0, fi + 1), mode: 'lines' }],
            layoutET(tMax, eLo, eHi), plotCfg);

        const lay = layoutIV(p.Ee, p.Es);
        lay.legend = { x: 0.02, y: 0.98, bgcolor: 'rgba(255,255,255,0.7)' };
        const Enow = E_arr.slice(0, fi + 1);
        Plotly.react('plot-iv', [
            ...ghostTraces(),
            { x: Enow, y: I_mA_arr.slice(0, fi + 1), mode: 'lines',
              line: { color: '#343a40' }, name: runLabel('Total'),
              showlegend: $('showParts').checked || ghostTraces().length > 0 },
            ...componentTraces(Enow, fi),
            { x: [E_arr[fi]], y: [I_mA_arr[fi]], mode: 'markers',
              marker: { color: I_mA_arr[fi] >= 0 ? COLOR_R : COLOR_O, size: 9 }, showlegend: false }
        ], lay, plotCfg);
    }

    const xxArr = Array.from(result.xx);
    const eNow = E_arr[fi];
    const Cm = cMax(p);

    const concLayout = layoutConc(p.xm, Cm);
    concLayout.annotations = [{
        x: 0.35 * p.xm, y: 1.08 * Cm, xref: 'x', yref: 'y',
        text: isStep() ? '<b>t = ' + t_arr[fi].toFixed(3) + ' s</b>'
                       : '<b>' + eNow.toFixed(3) + ' V</b>',
        showarrow: false, font: { color: '#343a40', size: 15 }
    }];

    const couples = snap.couples.map(c => ({ Co: Array.from(c.Co), Cr: Array.from(c.Cr) }));
    Plotly.react('plot-conc', concTraces(xxArr, couples), concLayout, plotCfg);
}

// Legend name for the current run: the lesson choice, if any
const runLabel = fallback => (tab !== 'explore' && choice) ? choice.label : fallback;

// Faradaic and charging parts of the current, when requested
function componentTraces(x, fi) {
    if (!$('showParts').checked) return [];
    return [
        { x, y: If_mA_arr.slice(0, fi + 1), mode: 'lines', name: 'Faradaic',
          line: { color: '#7048e8', dash: 'dash', width: 1.5 } },
        { x, y: Ic_mA_arr.slice(0, fi + 1), mode: 'lines', name: 'Charging',
          line: { color: '#2f9e44', dash: 'dot', width: 1.5 } }
    ];
}

// Diffusion-limited current for couple 1: reduces O on a negative step,
// oxidizes R (negative current) on a positive one
function cottrellRef(t, p) {
    return p.Estep < p.Einit ? cottrell(t, p)
                             : -cottrell(t, { ...p, Co0: p.Cr0, Do: p.Dr });
}

// ── Show peak info after simulation ───────────────────────────
function showPeakInfo() {
    if (tab !== 'explore' && choice) $('lessonResult').innerHTML = lesson().result(result, runP);
    if (isStep()) {
        const p = runP;
        const t0 = result.tStart;
        const i1 = t_arr.findIndex(t => t >= t0 + 0.5 * (t_arr[t_arr.length - 1] - t0));
        statusEl.innerHTML =
            `Done &mdash; step at t = ${t0.toFixed(3)} s; at ${(t_arr[i1] - t0).toFixed(3)} s after: ` +
            `I = ${I_mA_arr[i1].toFixed(4)} mA &ensp;|&ensp; ` +
            `Cottrell${p.second ? ' (couple 1)' : ''} = ${(cottrellRef(t_arr[i1] - t0, p) * 1e3).toFixed(4)} mA`;
        return;
    }
    const peaks = findPeaks(result.E, result.I, result.Nt);
    const dEp = (peaks.deltaEp * 1000).toFixed(1);
    const Ipc_mA = (peaks.Ipc * 1e3).toFixed(3);
    const Ipa_mA = (peaks.Ipa * 1e3).toFixed(3);
    // With two couples the extremes may belong to different couples
    statusEl.innerHTML = runP.second
        ? `Done &mdash; largest peaks: I<sub>pc</sub> = ${Ipc_mA} mA at ${peaks.Epc.toFixed(3)} V ` +
          `&ensp; I<sub>pa</sub> = ${Ipa_mA} mA at ${peaks.Epa.toFixed(3)} V`
        : `Done &mdash; \u0394E<sub>p</sub> = ${dEp} mV &ensp;|&ensp; ` +
          `I<sub>pc</sub> = ${Ipc_mA} mA &ensp; ` +
          `I<sub>pa</sub> = ${Ipa_mA} mA`;
}

// ── Reset ─────────────────────────────────────────────────────
function reset() {
    state = 'idle';
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    lastTs = 0;
    result = null;
    runP = null;
    snapIdx = 0;
    btnCsv.disabled = true;
    setBtn('&#9654; Play', 'success');
    initPlots();
    statusEl.innerHTML = tab === 'explore' ? 'Adjust parameters and click <strong>Play</strong>.'
                                           : 'Pick an answer to run it.';
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
for (const id of ['showParts', 'showCottrell']) {
    $(id).addEventListener('change', () => { if (result) updatePlots(snapIdx); });
}

function showModeSections() {
    $('cv-params').style.display   = isStep() ? 'none' : '';
    $('step-params').style.display = isStep() ? '' : 'none';
}
modeEl.addEventListener('change', () => { showModeSections(); reset(); });

// ── Lessons ───────────────────────────────────────────────────
// Guided tabs ask one question with three choices; Explore shows every
// setting and keeps whatever the lesson left in the form.
let tab = 'explore';
let choice = null;       // lesson choice the current result was run with
let ghosts = [];         // earlier lesson runs: { label, x, y (mA) }
const lesson = () => LESSONS[tab];

// Write settings (keyed by element id) into the form
function applySettings(settings) {
    for (const [id, v] of Object.entries(settings)) {
        const el = $(id);
        if (el.type === 'checkbox') el.checked = v; else el.value = v;
    }
    showModeSections();
    updateSidebar();
}

function selectTab(key) {
    tab = LESSONS[key] ? key : 'explore';
    for (const b of document.querySelectorAll('#tabs button')) {
        b.setAttribute('aria-pressed', b.dataset.tab === tab);
    }
    document.body.classList.toggle('guided', tab !== 'explore');
    document.body.classList.toggle('explore', tab === 'explore');
    const url = new URL(location.href);
    url.searchParams.set('tab', tab);
    history.replaceState(null, '', url.href);

    ghosts = [];
    if (tab === 'explore') {                  // keep the lesson's run on screen
        if (result) updatePlots(snapIdx);
        return;
    }
    const L = lesson();
    choice = null;
    $('lessonTitle').textContent = L.title;
    $('lessonQuestion').textContent = L.question;
    $('explanation').innerHTML = L.why;
    $('explanation').hidden = true;
    $('lessonResult').innerHTML = '';
    $('lessonActions').innerHTML = '';
    for (const c of L.choices) {
        const b = document.createElement('button');
        b.textContent = c.label;
        b.addEventListener('click', () => runChoice(c, b));
        $('lessonActions').appendChild(b);
    }
    applySettings({ ...BASE, ...L.base });
    speedEl.value = Math.log10(2);            // lessons play at 2×
    reset();
}

function runChoice(c, button) {
    for (const b of $('lessonActions').children) b.setAttribute('aria-pressed', b === button);
    // The previous run stays as a faint trace (one per choice, at most three)
    if (result && choice && choice !== c) {
        ghosts = ghosts.filter(g => g.label !== choice.label && g.label !== c.label);
        ghosts.push({ label: choice.label,
                      x: isStep() ? t_arr : E_arr, y: I_mA_arr });
        ghosts = ghosts.slice(-3);
    }
    choice = c;
    applySettings({ ...BASE, ...lesson().base, ...c.set });
    $('lessonResult').innerHTML = '&hellip;';
    $('explanation').hidden = true;
    reset();
    play();
}

// Earlier lesson runs, drawn faintly under the current one
function ghostTraces() {
    if (tab === 'explore') return [];
    const greys = ['#ced4da', '#adb5bd', '#868e96'];
    return ghosts.map((g, k) => ({
        x: g.x, y: g.y, mode: 'lines', name: g.label, hoverinfo: 'skip',
        line: { color: greys[k + 3 - ghosts.length], width: 2 }
    }));
}

for (const b of document.querySelectorAll('#tabs button')) {
    b.addEventListener('click', () => selectTab(b.dataset.tab));
}
$('btn-why').addEventListener('click', () => { $('explanation').hidden = !$('explanation').hidden; });
$('btn-explore').addEventListener('click', () => selectTab('explore'));

// ── CSV export ────────────────────────────────────────────────
btnCsv.addEventListener('click', () => {
    if (!result) return;
    const rows = ['t_s,E_V,I_A,I_faradaic_A,I_charging_A'].concat(t_arr.map((t, i) =>
        `${t},${E_arr[i]},${result.I[i]},${result.If[i]},${result.Ic[i]}`));
    const blob = new Blob([rows.join('\n') + '\n'], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = isStep() ? 'chronoamperometry-sim.csv' : 'cv-sim.csv';
    a.click();
    URL.revokeObjectURL(a.href);
});

window.addEventListener('resize', () => {
    // Plotly resizes on the same event; realign after it has laid out
    setTimeout(syncMolecularView, 50);
});

// ── Boot ──────────────────────────────────────────────────────
updateSidebar();
initPlots();
selectTab(new URL(location.href).searchParams.get('tab') || 'scan');
