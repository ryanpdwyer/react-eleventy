/**
 * Voltammetry Simulation – Guided lessons
 *
 * Each lesson asks one question and offers three choices. A choice sets a
 * few form fields on top of BASE and runs the simulation; earlier runs
 * stay on the current plot as faint traces for comparison. Explore shows
 * every setting and starts from whatever the lesson left in the form.
 *
 * Settings are keyed by form-element id.
 */

import { findPeaks, cottrell } from './cv-sim-engine.js';

// One reversible couple, O only, no charging current or noise
export const BASE = {
    mode: 'cv',
    Co0: 0.1, Cr0: 0, Do: 1, Dr: 1,
    k0: 1, alpha: 0.5, nElectrons: 1,
    Es: 0.5, Ee: -0.5, E0: 0, scanRate: 0.1, scanDir: 'neg',
    Einit: 0.5, Estep: -0.5, E0step: 0, tDwell: 0.5, tStep: 2, dtStep: 1,
    useSecond: false, Ru: 0, Cdl: 0, noise: 0, showParts: false, showCottrell: true,
    area: 0.0707, xm: 100
};

const mA = I => (I * 1e3).toFixed(2) + ' mA';

export const LESSONS = {
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
