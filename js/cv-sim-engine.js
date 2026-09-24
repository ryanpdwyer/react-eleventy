/**
 * Voltammetry Simulation Engine
 *
 * Based on: "Animated Electrochemistry Simulation Modules"
 * J. Chem. Educ. 2021, 98, 11, 3603–3609
 * https://doi.org/10.1021/acs.jchemed.1c00944
 *
 * Explicit finite-difference solution of Fick's second law for
 * O + ne⁻ ⇌ R at a planar electrode, with Butler-Volmer kinetics.
 *
 * Each species diffuses with its own coefficient (Do, Dr). The surface
 * concentrations are found each step from a flux balance using a
 * second-order (3-point) gradient, which keeps peak currents within
 * ~0.1% of Randles-Sevcik at 1 mV per time step.
 *
 * createCell() advances the cell one time step at a time, so the
 * potential can be scripted (CV, step) or set live.
 *
 * The solution may start with O, R or both, and may contain a second,
 * independent redox couple (O₂/R₂). The couples share the electrode and
 * their currents add; homogeneous electron transfer between them
 * (R₁ + O₂ → O₁ + R₂) is not modelled.
 */

// Physical constants
export const FARADAY = 96500;    // C/mol
export const GAS_CONST = 8.314;  // J/(mol·K)
export const T_DEFAULT = 298;    // K

// Explicit-scheme stability: D·dt/dx² for the faster-diffusing species
const LAMBDA = 0.45;

// Default CV potential increment per time step (V)
export const CV_DE_STEP = 0.001;

/**
 * Butler-Volmer rate constants (cm/s) at potential E.
 * kc: reduction (O → R), ka: oxidation (R → O).
 */
export function rateConstants(E, { k0, alpha, n, E0 }) {
    const x = n * FARADAY * (E - E0) / (GAS_CONST * T_DEFAULT);
    const xc = Math.max(-200, Math.min(200, x));   // avoid overflow at extreme E
    return { kc: k0 * Math.exp(-alpha * xc), ka: k0 * Math.exp((1 - alpha) * xc) };
}

/**
 * Spatial grid for a simulation lasting tMax.
 * The domain extends 6·√(D·tMax), well beyond the diffusion layer.
 */
function gridFor({ Do, Dr, dt, tMax }) {
    const Dm = Math.max(Do, Dr);
    const dx = Math.sqrt(Dm * dt / LAMBDA);
    const Nx = Math.ceil(6 * Math.sqrt(Dm * tMax) / dx) + 3;
    return { dx, Nx };
}

/**
 * Compute spatial/temporal grid parameters for a CV.
 *
 * @returns {{ Nt: number, dx: number, Nx: number, beta: number }}
 *   Nt = steps per half-cycle, beta = Do·dt/dx²
 */
export function computeGridParams({ Do, Dr = Do, scanRate, dt, Es, Ee }) {
    const Nt = Math.round(Math.abs(Ee - Es) / (scanRate * dt));
    const { dx, Nx } = gridFor({ Do, Dr, dt, tMax: 2 * Nt * dt });
    return { Nt, dx, Nx, beta: Do * dt / (dx * dx) };
}

/**
 * Create an electrochemical cell that can be advanced step by step.
 *
 * @param {Object} p
 * @param {number} p.Do, p.Dr  - Diffusion coefficients (cm²/s)
 * @param {number} p.Co0       - Bulk concentration of O (mol/L)
 * @param {number} [p.Cr0=0]   - Bulk concentration of R (mol/L)
 * @param {number} p.k0        - Standard rate constant (cm/s)
 * @param {number} p.alpha     - Transfer coefficient
 * @param {number} p.n         - Electrons transferred
 * @param {number} p.E0        - Standard potential (V)
 * @param {number} p.dt        - Time step (s)
 * @param {number} p.tMax      - Longest time the cell will be run (sets domain size)
 * @param {number} [p.area=0.0707] - Electrode area (cm²)
 */
export function createCell({ Do, Dr, Co0, Cr0 = 0, k0, alpha, n, E0, dt, tMax, area = 0.0707 }) {
    const { dx, Nx } = gridFor({ Do, Dr, dt, tMax });
    const lamO = Do * dt / (dx * dx);
    const lamR = Dr * dt / (dx * dx);

    const xx = new Float64Array(Nx);           // micrometres
    for (let j = 0; j < Nx; j++) xx[j] = j * dx * 1e4;

    let Co = new Float64Array(Nx).fill(Co0), Cr = new Float64Array(Nx).fill(Cr0);
    let Co2 = new Float64Array(Nx), Cr2 = new Float64Array(Nx);

    // mol/L · cm/s → A  (1e-3 converts mol/L to mol/cm³)
    const currentFactor = n * FARADAY * area * 1e-3;
    // Surface-gradient coefficients for the 3-point derivative
    const aO = 3 * Do / (2 * dx), aR = 3 * Dr / (2 * dx);

    const cell = {
        dx, Nx, xx, dt, t: 0,
        get Co() { return Co; },
        get Cr() { return Cr; },

        /**
         * Advance one time step with the electrode held at E.
         * Returns the current (A, reduction positive) and the rate constants.
         */
        step(E) {
            // Interior diffusion; the last node stays at bulk
            for (let j = 1; j < Nx - 1; j++) {
                Co2[j] = Co[j] + lamO * (Co[j + 1] - 2 * Co[j] + Co[j - 1]);
                Cr2[j] = Cr[j] + lamR * (Cr[j + 1] - 2 * Cr[j] + Cr[j - 1]);
            }
            Co2[Nx - 1] = Co[Nx - 1];
            Cr2[Nx - 1] = Cr[Nx - 1];

            // Surface: Do·∂Co/∂x = J = kc·Co(0) − ka·Cr(0) = −Dr·∂Cr/∂x
            const { kc, ka } = rateConstants(E, { k0, alpha, n, E0 });
            const gO = Do * (4 * Co2[1] - Co2[2]) / (2 * dx);
            const gR = Dr * (4 * Cr2[1] - Cr2[2]) / (2 * dx);
            const det = aO * aR + aO * ka + aR * kc;
            Co2[0] = (gO * (aR + ka) + ka * gR) / det;
            Cr2[0] = ((aO + kc) * gR + kc * gO) / det;
            const J = kc * Co2[0] - ka * Cr2[0];

            [Co, Co2] = [Co2, Co];
            [Cr, Cr2] = [Cr2, Cr];
            cell.t += dt;
            return { I: currentFactor * J, kc, ka };
        }
    };
    return cell;
}

/**
 * Equilibrium (open-circuit) potential of a couple from the Nernst equation.
 * Returns NaN unless both O and R are present.
 */
export function equilibriumPotential({ E0, n, Co0, Cr0 }) {
    if (!(Co0 > 0 && Cr0 > 0)) return NaN;
    return E0 + GAS_CONST * T_DEFAULT / (n * FARADAY) * Math.log(Co0 / Cr0);
}

/**
 * One cell per redox couple. `second` = { E0, k0, Co0, Cr0 } adds an
 * independent couple that shares Do, Dr, alpha and n unless it overrides them.
 */
function makeCells({ Do, Dr, Co0, Cr0 = 0, k0, alpha, n, E0, area, second }, dt, tMax) {
    const shared = { Do, Dr, alpha, n, dt, tMax, area };
    const cells = [createCell({ ...shared, Co0, Cr0, k0, E0 })];
    if (second) cells.push(createCell({ ...shared, Cr0: 0, ...second }));
    return cells;
}

// Concentration profiles of every couple; Co/Cr are couple 1's
function snapshot(cells, frameIndex) {
    const couples = cells.map(c => ({ Co: Float64Array.from(c.Co), Cr: Float64Array.from(c.Cr) }));
    return { Co: couples[0].Co, Cr: couples[0].Cr, couples, frameIndex };
}

/**
 * Run a full cyclic voltammetry simulation (forward + reverse sweep).
 *
 * @param {Object} params
 * @param {number} params.Do           - Diffusion coeff, oxidized (cm²/s)
 * @param {number} params.Dr           - Diffusion coeff, reduced  (cm²/s)
 * @param {number} params.Co0          - Bulk concentration of O (mol/L)
 * @param {number} [params.Cr0=0]      - Bulk concentration of R (mol/L)
 * @param {Object} [params.second]     - Second couple { E0, k0, Co0, Cr0 }
 * @param {number} params.k0           - Standard rate constant (cm/s)
 * @param {number} params.alpha        - Transfer coefficient (0–1)
 * @param {number} params.n            - Number of electrons
 * @param {number} params.Es           - Start potential (V)
 * @param {number} params.Ee           - End potential (V)
 * @param {number} params.E0           - Standard potential (V)
 * @param {number} params.scanRate     - Scan rate (V/s)
 * @param {number} [params.dt]         - Time step (s); default gives 1 mV per step
 * @param {number} [params.area=0.0707] - Electrode area (cm²), default 3 mm dia.
 * @param {number} [params.Ru=0]       - Uncompensated resistance (Ω)
 * @param {number} [params.Cdl=0]      - Double-layer capacitance (F); 0 = no charging current
 * @param {number} [params.noise=0]    - Gaussian current noise, standard deviation (A)
 * @param {number} [params.snapshotInterval=5] - Concentration snapshot interval
 * @returns {Object} results – I (total), If (faradaic), Ic (charging), all in Amperes;
 *   Ik[c] is the faradaic current of couple c
 *
 * Charging current: the double layer is a capacitor charged through Ru.
 * For a linear ramp of slope s, u = E_dl − E_applied obeys du/dt = −u/τ − s
 * (τ = Ru·Cdl), integrated exactly each step; Ic = u/Ru → −s·Cdl.
 * Like runStep, the iR drop is not fed back into the faradaic current.
 */
export function runSimulation({
    Do, Dr, Co0, Cr0 = 0, k0, alpha, n, Es, Ee, E0, scanRate,
    dt = CV_DE_STEP / scanRate,
    area = 0.0707, Ru = 0, Cdl = 0, noise = 0, second = null,
    snapshotInterval = 5
}) {
    const { Nt } = computeGridParams({ Do, Dr, scanRate, dt, Es, Ee });
    if (!(Nt >= 1)) {
        throw new Error(`Invalid grid: Nt=${Nt}. Check parameters.`);
    }

    const cells = makeCells({ Do, Dr, Co0, Cr0, k0, alpha, n, E0, area, second }, dt, 2 * Nt * dt);

    const totalSteps = 2 * Nt;
    const Ik = cells.map(() => new Float64Array(totalSteps));
    const E_data = new Float64Array(totalSteps);
    const I_data = new Float64Array(totalSteps);
    const If_data = new Float64Array(totalSteps);
    const Ic_data = new Float64Array(totalSteps);
    const t_data = new Float64Array(totalSteps);
    const snapshots = [];

    const tau = Ru * Cdl;
    const decay = tau > 0 ? Math.exp(-dt / tau) : 0;
    let u = 0;                          // E_dl − E_applied (V); starts charged

    const dE = Math.sign(Ee - Es) * scanRate * dt;
    let idx = 0;
    for (const [Estart, sweep] of [[Es, dE], [Ee, -dE]]) {   // Es → Ee, then back
        const slope = sweep / dt;
        for (let i = 0; i < Nt; i++) {
            const E = Estart + i * sweep;
            let If = 0;
            cells.forEach((c, k) => { If += (Ik[k][idx] = c.step(E).I); });
            let Ic = 0;
            if (Cdl > 0) {
                if (tau > 0) {
                    u = u * decay - slope * tau * (1 - decay);
                    Ic = u / Ru;
                } else {
                    Ic = -slope * Cdl;
                }
            }
            E_data[idx] = E;
            t_data[idx] = idx * dt;
            If_data[idx] = If;
            Ic_data[idx] = Ic;
            I_data[idx] = If + Ic + (noise > 0 ? noise * gaussian() : 0);
            if (idx % snapshotInterval === 0) snapshots.push(snapshot(cells, idx));
            idx++;
        }
    }
    if (snapshots[snapshots.length - 1].frameIndex !== idx - 1) {
        snapshots.push(snapshot(cells, idx - 1));
    }

    return { E: E_data, I: I_data, If: If_data, Ic: Ic_data, Ik, t: t_data, xx: cells[0].xx,
             snapshots, Nt, Nx: cells[0].Nx, Co0, totalSteps, dt };
}

/**
 * Find cathodic and anodic peak currents and potentials.
 *
 * Convention: cathodic (reduction) current is positive. Both sweeps are
 * searched, so this works whichever direction the scan starts in. Only
 * true peaks (interior local extrema) count, so the decaying spike at
 * t = 0 when the scan starts away from equilibrium is not reported.
 *
 * @param {Float64Array} E  - Potential array
 * @param {Float64Array} I  - Current array
 * @param {number} Nt       - Steps per half-cycle
 * @returns {{ Ipc: number, Epc: number, Ipa: number, Epa: number, deltaEp: number }}
 */
export function findPeaks(E, I, Nt) {
    let Ipc = -Infinity, Epc = 0;
    let Ipa = Infinity, Epa = 0;

    // A peak must be the extreme value within ±w points (1% of a sweep)
    const w = Math.max(2, Math.round(Nt / 100));
    const isExtreme = (i, sign) => {
        for (let j = i - w; j <= i + w; j++) if (sign * (I[j] - I[i]) > 0) return false;
        return true;
    };
    for (let i = w; i < 2 * Nt - w; i++) {
        if (I[i] > Ipc && isExtreme(i, +1)) { Ipc = I[i]; Epc = E[i]; }
        if (I[i] < Ipa && isExtreme(i, -1)) { Ipa = I[i]; Epa = E[i]; }
    }

    return { Ipc, Epc, Ipa, Epa, deltaEp: Math.abs(Epc - Epa) };
}

/**
 * Run a single potential-step (chronoamperometry) simulation.
 *
 * Potential is held at Einit for tDwell, then jumps to Estep and is held
 * for tStep. Time is measured from the start of the dwell, so the step
 * occurs at t = tDwell (returned as tStart).
 * An optional double-layer charging current (ΔE/Ru)·exp(−t/RuCdl) is
 * added to the faradaic current.
 *
 * @param {Object} params
 * @param {number} params.Einit        - Initial potential (V)
 * @param {number} params.Estep        - Step potential (V)
 * @param {number} [params.tDwell=0]   - Dwell time at Einit before the step (s)
 * @param {number} params.tStep        - Step duration (s)
 * @param {number} [params.Ru=0]       - Uncompensated resistance (Ω); 0 = no charging current
 * @param {number} [params.Cdl=0]      - Double-layer capacitance (F)
 * @param {number} [params.noise=0]    - Gaussian current noise, standard deviation (A)
 * @returns {Object} results – I (total), If (faradaic), Ic (charging), all in Amperes
 */
export function runStep({
    Do, Dr, Co0, Cr0 = 0, k0, alpha, n, E0, Einit, Estep, tStep, dt, tDwell = 0,
    area = 0.0707, Ru = 0, Cdl = 0, noise = 0, second = null,
    snapshotInterval = 5
}) {
    const Nd = Math.floor(tDwell / dt);
    const Nt = Nd + Math.floor(tStep / dt);
    const tStart = Nd * dt;

    if (!(Nt - Nd >= 1)) {
        throw new Error(`Invalid grid: Nt=${Nt}. Check parameters.`);
    }

    const cells = makeCells({ Do, Dr, Co0, Cr0, k0, alpha, n, E0, area, second }, dt, Nt * dt);

    const Ik = cells.map(() => new Float64Array(Nt));
    const E_data = new Float64Array(Nt);
    const I_data = new Float64Array(Nt);
    const If_data = new Float64Array(Nt);
    const Ic_data = new Float64Array(Nt);
    const t_data = new Float64Array(Nt);
    const snapshots = [];
    const tau = Ru * Cdl;

    for (let i = 0; i < Nt; i++) {
        const stepped = i >= Nd;
        const E = stepped ? Estep : Einit;
        let If = 0;
        cells.forEach((c, k) => { If += (Ik[k][i] = c.step(E).I); });

        // Flux over step i is centred at (i + 1/2)·dt
        const t = (i + 0.5) * dt;
        const Ic = stepped && tau > 0 ? ((Einit - Estep) / Ru) * Math.exp(-(t - tStart) / tau) : 0;
        const eps = noise > 0 ? noise * gaussian() : 0;

        E_data[i] = E;
        If_data[i] = If;
        Ic_data[i] = Ic;
        I_data[i] = If + Ic + eps;
        t_data[i] = t;

        if (i % snapshotInterval === 0) snapshots.push(snapshot(cells, i));
    }
    if (snapshots[snapshots.length - 1].frameIndex !== Nt - 1) {
        snapshots.push(snapshot(cells, Nt - 1));
    }

    return { E: E_data, I: I_data, If: If_data, Ic: Ic_data, Ik, t: t_data,
             xx: cells[0].xx, snapshots, Nt, Nx: cells[0].Nx, Co0, tStart, dt };
}

/**
 * Cottrell current for a diffusion-limited step (A).
 * C in mol/L, D in cm²/s, A in cm², t in s.
 */
export function cottrell(t, { n, area, Co0, Do }) {
    return n * FARADAY * area * Co0 * 1e-3 * Math.sqrt(Do / (Math.PI * t));
}

// Standard normal deviate (Box–Muller)
function gaussian() {
    const u = 1 - Math.random();
    const v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
