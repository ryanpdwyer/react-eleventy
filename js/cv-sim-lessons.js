/**
 * Voltammetry Simulation – Guided lessons
 *
 * Most lessons ask one question and offer three choices. A choice sets a
 * few form fields on top of BASE and runs the simulation; earlier runs
 * stay on the current plot as faint traces for comparison. Explore shows
 * every setting and starts from whatever the lesson left in the form.
 *
 * A lesson with `stages` instead walks through one CV as predictions: the
 * first stage's answer starts the scan, which pauses at the switching
 * potential for feedback; the second finishes it.
 *
 * Settings are keyed by form-element id.
 */

import { findPeaks, cottrell } from './cv-sim-engine.js';

// One reversible couple, O only; charging current as in Explore, no noise
export const BASE = {
    mode: 'cv',
    Co0: 0.1, Cr0: 0, Do: 1, Dr: 1,
    k0: 1, alpha: 0.5, nElectrons: 1,
    Es: 0.5, Ee: -0.5, E0: 0, scanRate: 0.1, scanDir: 'neg',
    Einit: 0.5, Estep: -0.5, E0step: 0, tDwell: 0.5, tStep: 2, dtStep: 1,
    useSecond: false, Ru: 200, Cdl: 50, noise: 0, showParts: false, showCottrell: true,
    area: 0.0707, xm: 100
};

const mA = I => (I * 1e3).toFixed(2) + ' mA';

export const LESSONS = {
    redox: {
        title: 'Reduction and oxidation',
        intro: 'The solution starts with only O (hollow blue circles). A cyclic ' +
               'voltammogram sweeps the electrode potential from +0.5 V, where nothing ' +
               'happens, down to −0.5 V, then back up. Watch the molecules and the ' +
               'yellow electrons at the electrode.',
        stages: [
            {
                question: 'As the electrode potential goes negative, what happens to O at the surface?',
                choices: [
                    { label: 'Gains e\u207b', correct: true },
                    { label: 'Loses e\u207b' },
                    { label: 'Nothing' }
                ],
                explain: '<b>Reduction:</b> O + e\u207b \u2192 R. The negative electrode pushes ' +
                         'electrons into O, which turns into R (filled orange). Reduction is ' +
                         'gain. The current is positive (cathodic) on the way down.'
            },
            {
                question: 'Now the scan heads back positive. What happens to the R near the electrode?',
                choices: [
                    { label: 'Loses e\u207b', correct: true },
                    { label: 'Gains e\u207b' },
                    { label: 'Nothing' }
                ],
                explain: '<b>Oxidation:</b> R \u2192 O + e\u207b. The positive electrode pulls ' +
                         'the electrons back out, turning R into O. Oxidation is loss. The ' +
                         'current is negative (anodic).'
            }
        ],
        why: 'That was one cyclic voltammogram: sweep the potential from where O is stable, ' +
             'past E⁰ to where it is reduced, then back so the R you made is oxidized again. ' +
             'The current is zero until the potential nears E⁰ = 0 V, peaks as O near the ' +
             'electrode runs out, and the reverse peak appears because the R is still nearby. ' +
             'The two peaks straddle E⁰.'
    },

    scan: {
        title: 'Scan rate',
        question: 'Scan faster. What happens to the peak current?',
        choices: [
            { label: '0.025 V/s', set: { scanRate: 0.025 } },
            { label: '0.1 V/s',   set: { scanRate: 0.1 } },
            { label: '0.4 V/s',   set: { scanRate: 0.4 } }
        ],
        result(r) {
            return `I<sub>pc</sub> = ${mA(findPeaks(r.E, r.I, r.Nt).Ipc)}`;
        },
        why: 'A faster scan leaves less time for O to diffuse in, so the depleted layer is ' +
             'thinner and the concentration gradient at the electrode is steeper. The peak ' +
             'current grows as √ν (Randles–Sevcik): 4× faster gives 2× the peak. The peak ' +
             'potential stays put because electron transfer is fast.'
    },

    kinetics: {
        title: 'Electron transfer',
        question: 'Make electron transfer slower. What happens to the peaks?',
        choices: [
            { label: 'Fast',   set: { k0: 1 } },
            { label: 'Medium', set: { k0: 0.01 } },
            { label: 'Slow',   set: { k0: 0.0005 } }
        ],
        result(r) {
            return `ΔE<sub>p</sub> = ${(findPeaks(r.E, r.I, r.Nt).deltaEp * 1e3).toFixed(0)} mV`;
        },
        why: 'When electrons hop quickly (large k⁰), the surface keeps up with the Nernst ' +
             'equation and the peaks sit 58 mV apart. When k⁰ is small, the electrode must be ' +
             'pushed past E⁰ (an overpotential) before molecules react fast enough, so the ' +
             'reduction peak moves negative, the oxidation peak positive, and both flatten. ' +
             'Watch the molecular view: slow transfer leaves O at the surface even below E⁰.'
    },

    step: {
        title: 'Potential step',
        question: 'Step from +0.5 V to a new potential. How far past E⁰ = 0 V do you need to go?',
        choices: [
            { label: '+0.05 V', set: { Estep: 0.05 } },
            { label: '0 V',     set: { Estep: 0 } },
            { label: '−0.3 V', set: { Estep: -0.3 } }
        ],
        base: { mode: 'step' },
        result(r, p) {
            const i = r.t.findIndex(t => t - r.tStart >= 1);
            const pct = 100 * r.I[i] / cottrell(r.t[i] - r.tStart, p);
            return `At the dotted line: ${(r.I[i] * 1e3).toFixed(2)} mA, ` +
                   `${pct.toFixed(0)}% of the diffusion limit`;
        },
        why: 'Compare the runs at the dotted line, after the initial spike. ' +
             'Right after the step, the surface ratio C<sub>O</sub>/C<sub>R</sub> snaps to the ' +
             'Nernst value: 7 : 1 at +0.05 V, 1 : 1 at E⁰, and about 1 : 100 000 at −0.3 V. ' +
             'Only the converted fraction carries current, so you get 1/8, 1/2, or all of the ' +
             'Cottrell current. Either way the current falls as 1/√t, because the depleted ' +
             'layer keeps growing.'
    }
};
