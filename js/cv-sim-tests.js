/**
 * CV Simulation Engine – Tests
 *
 * Simple assertion-based tests run in the browser.
 * Open cv-sim-tests.html to see results.
 */

import { computeGridParams, runSimulation, runStep, findPeaks, equilibriumPotential,
         FARADAY, GAS_CONST, T_DEFAULT } from './cv-sim-engine.js';

// Randles-Sevcik peak current (A) for a reversible reduction at 25 °C
function randlesSevcik({ n, Do, Co0, scanRate }, area = 0.0707) {
    return 0.4463 * n * FARADAY * area * Co0 * 1e-3 *
           Math.sqrt(n * FARADAY * scanRate * Do / (GAS_CONST * T_DEFAULT));
}

// ── Mini test framework ───────────────────────────────────────
const results = [];

function test(name, fn) {
    try {
        fn();
        results.push({ name, pass: true });
    } catch (e) {
        results.push({ name, pass: false, error: e.message });
    }
}

function assert(cond, msg) {
    if (!cond) throw new Error(msg || 'Assertion failed');
}

function assertClose(actual, expected, tol, msg) {
    const diff = Math.abs(actual - expected);
    if (diff > tol) {
        throw new Error(
            (msg || 'assertClose') +
            `: expected ${expected} \u00b1 ${tol}, got ${actual} (diff=${diff.toExponential(3)})`
        );
    }
}

// ── Default parameters ────────────────────────────────────────
// dt is omitted: runSimulation picks 1 mV per time step
const defaults = {
    Do: 1e-5, Dr: 1e-5, Co0: 0.1, k0: 1, alpha: 0.5, n: 1,
    Es: 0.5, Ee: -0.5, E0: 0, scanRate: 0.1
};

// ── Tests ─────────────────────────────────────────────────────

test('computeGridParams – Nt for default params', () => {
    const g = computeGridParams({ ...defaults, dt: 0.01 });
    // Nt = |Ee - Es| / (v * dt) = 1.0 / 0.001 = 1000
    assert(g.Nt === 1000, `Nt should be 1000, got ${g.Nt}`);
});

test('computeGridParams – beta ≈ 0.45', () => {
    const g = computeGridParams({ ...defaults, dt: 0.01 });
    assertClose(g.beta, 0.45, 0.01, 'beta');
});

test('computeGridParams – dx is positive', () => {
    const g = computeGridParams({ ...defaults, dt: 0.01 });
    assert(g.dx > 0, 'dx must be positive');
});

test('computeGridParams – Nx is reasonable', () => {
    const g = computeGridParams({ ...defaults, dt: 0.01 });
    assert(g.Nx > 10 && g.Nx < 500, `Nx=${g.Nx} out of reasonable range`);
});

test('runSimulation – returns correct array lengths', () => {
    const r = runSimulation({ ...defaults, snapshotInterval: 10 });
    assert(r.totalSteps === 2000, `totalSteps should be 2000, got ${r.totalSteps}`);
    assert(r.E.length === 2000, `E.length should be 2000, got ${r.E.length}`);
    assert(r.I.length === 2000, `I.length should be 2000, got ${r.I.length}`);
    assert(r.t.length === 2000, `t.length should be 2000, got ${r.t.length}`);
});

test('runSimulation – snapshots stored at correct interval', () => {
    const interval = 10;
    const r = runSimulation({ ...defaults, snapshotInterval: interval });
    // Should have ~200 snapshots (2000 / 10), possibly +1 for final
    assert(r.snapshots.length >= 200, `Expected ≥200 snapshots, got ${r.snapshots.length}`);
    // First snapshot should be at frame 0
    assert(r.snapshots[0].frameIndex === 0, 'First snapshot should be at frame 0');
});

test('runSimulation – initial concentrations correct', () => {
    const r = runSimulation({ ...defaults, snapshotInterval: 1 });
    const snap0 = r.snapshots[0];
    // At frame 0 the surface has already been updated once, but bulk should still ≈ Co0
    // Check a point well into the bulk
    const bulkIdx = Math.floor(r.Nx / 2);
    assertClose(snap0.Co[bulkIdx], defaults.Co0, 1e-6, 'Bulk Co at t=0');
    assertClose(snap0.Cr[bulkIdx], 0, 1e-6, 'Bulk Cr at t=0');
});

test('runSimulation – E sweeps correctly', () => {
    const r = runSimulation(defaults);
    // First point should be near Es
    assertClose(r.E[0], defaults.Es, 0.01, 'E[0]');
    // Midpoint (end of forward sweep) should be near Ee
    assertClose(r.E[r.Nt - 1], defaults.Ee + defaults.scanRate * r.dt, 0.02, 'E at midpoint');
    // Last point should be near Es again
    assertClose(r.E[r.totalSteps - 1], defaults.Es - defaults.scanRate * r.dt, 0.02, 'E at end');
});

test('runSimulation – time increases monotonically', () => {
    const r = runSimulation(defaults);
    for (let i = 1; i < r.totalSteps; i++) {
        assert(r.t[i] > r.t[i - 1], `t[${i}] not > t[${i-1}]`);
    }
});

test('findPeaks – cathodic peak is positive, anodic is negative', () => {
    const r = runSimulation(defaults);
    const peaks = findPeaks(r.E, r.I, r.Nt);
    assert(peaks.Ipc > 0, `Ipc should be positive, got ${peaks.Ipc}`);
    assert(peaks.Ipa < 0, `Ipa should be negative, got ${peaks.Ipa}`);
});

test('findPeaks – reversible system ΔEp ≈ 57.5/n mV', () => {
    // Use high k0 for reversible behaviour
    const revParams = { ...defaults, k0: 100 };
    const r = runSimulation(revParams);
    const peaks = findPeaks(r.E, r.I, r.Nt);
    // 57–58 mV for a 500 mV switching overpotential
    const expected = 0.0575 / defaults.n;
    assertClose(peaks.deltaEp, expected, 0.002,
        `ΔEp for reversible (k0=100): expected ~${(expected*1000).toFixed(0)} mV`);
});

test('findPeaks – reversible Ipa/Ipc = 1 (Nicholson baseline correction)', () => {
    // Raw |Ipa| is measured from zero, not from the decaying cathodic
    // baseline, so it is smaller than Ipc. Nicholson (Anal. Chem. 1966, 38, 1406):
    // ipa/ipc = (ipa)0/ipc + 0.485·isp/ipc + 0.086
    const r = runSimulation({ ...defaults, k0: 100 });
    const peaks = findPeaks(r.E, r.I, r.Nt);
    const isp = r.I[r.Nt - 1];
    const ratio = (-peaks.Ipa + 0.485 * isp) / peaks.Ipc + 0.086;
    assertClose(ratio, 1.0, 0.03, 'Nicholson-corrected Ipa/Ipc');
});

test('Ipc matches Randles-Sevcik within 1% (0.01–1 V/s)', () => {
    for (const scanRate of [0.01, 0.1, 1]) {
        const p = { ...defaults, k0: 100, scanRate };
        const r = runSimulation(p);
        const Ipc = findPeaks(r.E, r.I, r.Nt).Ipc;
        assertClose(Ipc / randlesSevcik(p), 1, 0.01, `Ipc/RS at ${scanRate} V/s`);
    }
});

test('Dr < Do shifts E1/2 by (RT/2F)·ln(Dr/Do)', () => {
    const p = { ...defaults, k0: 100, Dr: 1e-6 };
    const r = runSimulation(p);
    const pk = findPeaks(r.E, r.I, r.Nt);
    const expected = 0.5 * GAS_CONST * T_DEFAULT / FARADAY * Math.log(p.Dr / p.Do);
    assertClose((pk.Epc + pk.Epa) / 2, expected, 0.002, 'E1/2 shift');
});

test('CV charging current plateaus at ν·Cdl and reverses at the switch', () => {
    const Cdl = 50e-6, Ru = 200;         // τ = 10 ms, short vs the 10 s sweep
    const r = runSimulation({ ...defaults, Ru, Cdl });
    const plateau = defaults.scanRate * Cdl;
    assertClose(r.Ic[r.Nt - 1], plateau, 1e-3 * plateau, 'Ic end of forward sweep');
    assertClose(r.Ic[2 * r.Nt - 1], -plateau, 1e-3 * plateau, 'Ic end of reverse sweep');
    assertClose(r.I[500] - r.If[500], r.Ic[500], 1e-15, 'I = If + Ic');
});

test('R in solution, oxidation first: |Ipa| matches Randles-Sevcik', () => {
    const p = { ...defaults, k0: 100, Co0: 0, Cr0: 0.1, Es: -0.5, Ee: 0.5 };
    const r = runSimulation(p);
    const Ipa = findPeaks(r.E, r.I, r.Nt).Ipa;
    assertClose(-Ipa / randlesSevcik({ ...p, Co0: 0.1 }), 1, 0.01, '|Ipa|/RS');
});

test('Mixed O + R: no current when held at the Nernst potential', () => {
    const p = { ...defaults, Co0: 0.08, Cr0: 0.02 };
    const Eeq = equilibriumPotential(p);
    assertClose(Eeq, 0.0257 * Math.log(4), 0.001, 'Eeq');
    const r = runStep({ ...p, Einit: Eeq, Estep: Eeq, tStep: 0.1, dt: 0.001 });
    const Imax = Math.max(...r.I.map(Math.abs));
    assert(Imax < 1e-9, `|I| at Eeq should be ~0, got ${Imax}`);
});

test('findPeaks ignores the t = 0 spike when starting away from equilibrium', () => {
    const p = { ...defaults, k0: 100, Co0: 0.08, Cr0: 0.02 };   // starts at +0.5 V, E_eq = 36 mV
    const r = runSimulation(p);
    const pk = findPeaks(r.E, r.I, r.Nt);
    assert(Math.abs(r.I[0]) > Math.abs(pk.Ipa), 'the spike should be bigger than the real peak');
    assertClose(pk.deltaEp, 0.0575, 0.003, 'ΔEp');
});

test('Two independent couples: currents add', () => {
    const second = { E0: -0.25, k0: 1, Co0: 0.05 };
    const both = runSimulation({ ...defaults, second });
    const one = runSimulation(defaults);
    const two = runSimulation({ ...defaults, ...second });
    for (const i of [300, 700, 1500]) {
        assertClose(both.If[i], one.If[i] + two.If[i], 1e-12, `If at step ${i}`);
    }
    assert(both.snapshots[0].couples.length === 2, 'two couples in snapshots');
});

test('findPeaks – Ipc scales as √v (Randles-Sevcik)', () => {
    // Quadrupling scan rate should multiply peak current by 2
    const v1 = 0.1, v2 = 0.4;
    const r1 = runSimulation({ ...defaults, k0: 100, scanRate: v1 });
    const r2 = runSimulation({ ...defaults, k0: 100, scanRate: v2 });
    const Ipc1 = findPeaks(r1.E, r1.I, r1.Nt).Ipc;
    const Ipc2 = findPeaks(r2.E, r2.I, r2.Nt).Ipc;
    const expectedRatio = Math.sqrt(v2 / v1);
    const actualRatio = Ipc2 / Ipc1;
    assertClose(actualRatio, expectedRatio, 0.02,
        `Ipc ratio for v2/v1=${v2/v1}: expected √(${v2/v1})=${expectedRatio.toFixed(3)}`);
});

test('findPeaks – quasi-reversible ΔEp > reversible ΔEp', () => {
    const rev = runSimulation({ ...defaults, k0: 100 });
    const qr  = runSimulation({ ...defaults, k0: 0.01 });
    const dEp_rev = findPeaks(rev.E, rev.I, rev.Nt).deltaEp;
    const dEp_qr  = findPeaks(qr.E, qr.I, qr.Nt).deltaEp;
    assert(dEp_qr > dEp_rev + 0.005,
        `Quasi-rev ΔEp (${(dEp_qr*1000).toFixed(1)} mV) should exceed ` +
        `reversible (${(dEp_rev*1000).toFixed(1)} mV) by > 5 mV`);
});

test('findPeaks – ΔEp(n=2) / ΔEp(n=1) ≈ 0.5 ± 0.03', () => {
    const r1 = runSimulation({ ...defaults, k0: 100, n: 1 });
    const r2 = runSimulation({ ...defaults, k0: 100, n: 2 });
    const dEp1 = findPeaks(r1.E, r1.I, r1.Nt).deltaEp;
    const dEp2 = findPeaks(r2.E, r2.I, r2.Nt).deltaEp;
    const ratio = dEp2 / dEp1;
    assertClose(ratio, 0.5, 0.03,
        `ΔEp(n=2)/ΔEp(n=1)`);
});

test('runSimulation – spatial grid in micrometers', () => {
    const r = runSimulation(defaults);
    assert(r.xx[0] === 0, 'xx[0] should be 0');
    assert(r.xx[1] > 0, 'xx[1] should be positive');
    // Grid spacing should be on the order of micrometers
    assert(r.xx[1] < 100, `dx seems too large: ${r.xx[1]} µm`);
});

test('runSimulation – throws on invalid params', () => {
    let threw = false;
    try {
        runSimulation({ ...defaults, Es: 0, Ee: 0 }); // Nt would be 0
    } catch (e) {
        threw = true;
    }
    assert(threw, 'Should throw for Es === Ee');
});

// ── Render results ────────────────────────────────────────────
export function renderResults(container) {
    const passed = results.filter(r => r.pass).length;
    const total  = results.length;

    let html = `<h5 style="margin-bottom:1rem">${passed} / ${total} tests passed</h5>`;
    html += '<div style="font-family:monospace; font-size:0.9rem; line-height:1.8">';

    for (const r of results) {
        const icon  = r.pass ? '\u2705' : '\u274c';
        const color = r.pass ? '#198754' : '#dc3545';
        html += `<div style="color:${color}">${icon} ${r.name}`;
        if (!r.pass) html += `<br>&nbsp;&nbsp;&nbsp;&nbsp;<small style="color:#666">${r.error}</small>`;
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
}
