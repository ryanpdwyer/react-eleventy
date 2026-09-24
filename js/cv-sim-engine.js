/**
 * Cyclic Voltammetry Simulation Engine
 *
 * Based on: "Animated Electrochemistry Simulation Modules"
 * J. Chem. Educ. 2021, 98, 11, 3603–3609
 * https://doi.org/10.1021/acs.jchemed.1c00944
 *
 * Finite-difference simulation of cyclic voltammetry using
 * Butler-Volmer kinetics and Fick's second law of diffusion.
 *
 * Note: bulk diffusion uses Do for both species (original code behavior).
 * Dr is used only in the surface flux boundary condition.
 */

// Physical constants
export const FARADAY = 96500;    // C/mol
export const GAS_CONST = 8.314;  // J/(mol·K)
export const T_DEFAULT = 298;    // K

/**
 * Compute spatial/temporal grid parameters.
 *
 * @param {Object} p
 * @param {number} p.Do       - Diffusion coeff of oxidized species (cm²/s)
 * @param {number} p.scanRate - Scan rate (V/s)
 * @param {number} p.dt       - Time step (s)
 * @param {number} p.Es       - Start / positive-limit potential (V)
 * @param {number} p.Ee       - End / negative-limit potential (V)
 * @returns {{ Nt: number, dx: number, Nx: number, beta: number }}
 */
export function computeGridParams({ Do, scanRate, dt, Es, Ee }) {
    const Nt = Math.floor(Math.abs(Ee - Es) / (scanRate * dt));
    const dx = Math.sqrt(Do * dt / 0.45);
    const Nx = Math.floor(6 * Math.sqrt(Do * Nt) / dt);
    const beta = Do * dt / (dx * dx);
    return { Nt, dx, Nx, beta };
}

/**
 * Run a full cyclic voltammetry simulation (forward + reverse sweep).
 *
 * @param {Object} params
 * @param {number} params.Do           - Diffusion coeff, oxidized (cm²/s)
 * @param {number} params.Dr           - Diffusion coeff, reduced  (cm²/s)
 * @param {number} params.Co0          - Initial concentration (mol/L)
 * @param {number} params.k0           - Standard rate constant (cm/s)
 * @param {number} params.alpha        - Transfer coefficient (0–1)
 * @param {number} params.n            - Number of electrons
 * @param {number} params.Es           - Start potential (V)
 * @param {number} params.Ee           - End potential (V)
 * @param {number} params.E0           - Standard potential (V)
 * @param {number} params.scanRate     - Scan rate (V/s)
 * @param {number} params.dt           - Time step (s)
 * @param {number} [params.area=0.0707] - Electrode area (cm²), default 3 mm dia.
 * @param {number} [params.snapshotInterval=5] - Concentration snapshot interval
 * @returns {Object} results – I values are in Amperes
 */
export function runSimulation({
    Do, Dr, Co0, k0, alpha, n, Es, Ee, E0, scanRate, dt,
    area = 0.0707,
    snapshotInterval = 5
}) {
    const { Nt, dx, Nx, beta } = computeGridParams({ Do, scanRate, dt, Es, Ee });

    if (Nt < 1 || Nx < 3) {
        throw new Error(`Invalid grid: Nt=${Nt}, Nx=${Nx}. Check parameters.`);
    }

    // Spatial grid (micrometers)
    const xx = new Float64Array(Nx);
    for (let j = 0; j < Nx; j++) xx[j] = j * dx * 1e4;

    const totalSteps = 2 * Nt;
    const E_data = new Float64Array(totalSteps);
    const I_data = new Float64Array(totalSteps);
    const t_data = new Float64Array(totalSteps);
    const snapshots = [];

    // Concentration arrays
    const Co = new Float64Array(Nx).fill(Co0);
    const Cr = new Float64Array(Nx).fill(0);

    let E = Es;
    let t = 0;
    let idx = 0;

    // Current conversion factor: flux (mol·cm/(L·s)) → Amperes
    // Factor of 1e-3 converts Co0 from mol/L to mol/cm³
    const currentFactor = n * FARADAY * area * 1e-3;

    function halfCycle(direction) {
        for (let i = 0; i < Nt; i++) {
            // Butler-Volmer rate constants
            const eta = E - E0;
            const expArg = n * FARADAY * eta / (GAS_CONST * T_DEFAULT);
            const kc = k0 * Math.exp(-alpha * expArg);
            const ka = k0 * Math.exp((1 - alpha) * expArg);

            // Surface flux (mixed boundary condition)
            const fc = -(kc * Co[1] - ka * Cr[1]) /
                        (1 + kc * dx / (2 * Do) + ka * dx / (2 * Dr));
            const fa = -fc;

            // Actual current in Amperes
            const I = currentFactor * (-fc);

            // --- update concentrations ---
            // Save old values (NumPy-equivalent vectorised update)
            const Co_old = Float64Array.from(Co);
            const Cr_old = Float64Array.from(Cr);

            // Surface boundary
            Co[0] += beta * (Co_old[1] - Co_old[0] + dx * fc / Do);
            Cr[0] += beta * (Cr_old[1] - Cr_old[0] + dx * fa / Do);

            // Bulk diffusion
            // j=1 uses the NEW Co[0]/Cr[0]; j>=2 uses old values (matches NumPy)
            for (let j = 1; j < Nx - 2; j++) {
                const leftCo = j === 1 ? Co[0] : Co_old[j - 1];
                const leftCr = j === 1 ? Cr[0] : Cr_old[j - 1];
                Co[j] = Co_old[j] + beta * (Co_old[j + 1] - 2 * Co_old[j] + leftCo);
                Cr[j] = Cr_old[j] + beta * (Cr_old[j + 1] - 2 * Cr_old[j] + leftCr);
            }

            // Record
            E_data[idx] = E;
            I_data[idx] = I;
            t_data[idx] = t;

            if (idx % snapshotInterval === 0) {
                snapshots.push({
                    Co: Float64Array.from(Co),
                    Cr: Float64Array.from(Cr),
                    frameIndex: idx
                });
            }

            idx++;
            E += direction * dt * scanRate;
            t += dt;
        }
    }

    halfCycle(-1); // forward:  Es → Ee
    halfCycle(+1); // reverse:  Ee → Es

    // Ensure we have a final snapshot
    if (snapshots.length === 0 || snapshots[snapshots.length - 1].frameIndex !== idx - 1) {
        snapshots.push({
            Co: Float64Array.from(Co),
            Cr: Float64Array.from(Cr),
            frameIndex: idx - 1
        });
    }

    return { E: E_data, I: I_data, t: t_data, xx, snapshots, Nt, Nx, Co0, totalSteps };
}

/**
 * Find cathodic and anodic peak currents and potentials.
 *
 * Convention: cathodic (reduction) current is positive.
 *
 * @param {Float64Array} E  - Potential array
 * @param {Float64Array} I  - Current array
 * @param {number} Nt       - Steps per half-cycle
 * @returns {{ Ipc: number, Epc: number, Ipa: number, Epa: number, deltaEp: number }}
 */
export function findPeaks(E, I, Nt) {
    let Ipc = -Infinity, Epc = 0;
    let Ipa = Infinity, Epa = 0;

    for (let i = 0; i < Nt; i++) {
        if (I[i] > Ipc) { Ipc = I[i]; Epc = E[i]; }
    }
    for (let i = Nt; i < 2 * Nt; i++) {
        if (I[i] < Ipa) { Ipa = I[i]; Epa = E[i]; }
    }

    return { Ipc, Epc, Ipa, Epa, deltaEp: Math.abs(Epc - Epa) };
}

/**
 * Run a single potential-step (chronoamperometry) simulation.
 *
 * Potential is held at Einit for tDwell, then jumps to Estep and is held
 * for tStep. Time is measured from the start of the dwell, so the step
 * occurs at t = tDwell (returned as tStart).
 * Same finite-difference scheme as runSimulation. An optional double-layer
 * charging current (ΔE/Ru)·exp(−t/RuCdl) is added to the faradaic current.
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
    Do, Dr, Co0, k0, alpha, n, E0, Einit, Estep, tStep, dt, tDwell = 0,
    area = 0.0707, Ru = 0, Cdl = 0, noise = 0,
    snapshotInterval = 5
}) {
    const Nd = Math.floor(tDwell / dt);
    const Nt = Nd + Math.floor(tStep / dt);
    const tStart = Nd * dt;
    const dx = Math.sqrt(Do * dt / 0.45);
    const Nx = Math.ceil(6 * Math.sqrt(Do * Nt * dt) / dx) + 3;
    const beta = Do * dt / (dx * dx);

    if (Nt - Nd < 1 || Nx < 3) {
        throw new Error(`Invalid grid: Nt=${Nt}, Nx=${Nx}. Check parameters.`);
    }

    const xx = new Float64Array(Nx);
    for (let j = 0; j < Nx; j++) xx[j] = j * dx * 1e4;

    const E_data = new Float64Array(Nt);
    const I_data = new Float64Array(Nt);
    const If_data = new Float64Array(Nt);
    const Ic_data = new Float64Array(Nt);
    const t_data = new Float64Array(Nt);
    const snapshots = [];

    const Co = new Float64Array(Nx).fill(Co0);
    const Cr = new Float64Array(Nx).fill(0);

    const currentFactor = n * FARADAY * area * 1e-3;
    const tau = Ru * Cdl;

    // Butler-Volmer rate constants at a fixed potential
    function rates(E) {
        const expArg = n * FARADAY * (E - E0) / (GAS_CONST * T_DEFAULT);
        return [k0 * Math.exp(-alpha * expArg), k0 * Math.exp((1 - alpha) * expArg)];
    }
    const ratesInit = rates(Einit);
    const ratesStep = rates(Estep);

    for (let i = 0; i < Nt; i++) {
        const stepped = i >= Nd;
        const [kc, ka] = stepped ? ratesStep : ratesInit;
        const fc = -(kc * Co[1] - ka * Cr[1]) /
                    (1 + kc * dx / (2 * Do) + ka * dx / (2 * Dr));
        const fa = -fc;

        const Co_old = Float64Array.from(Co);
        const Cr_old = Float64Array.from(Cr);

        Co[0] += beta * (Co_old[1] - Co_old[0] + dx * fc / Do);
        Cr[0] += beta * (Cr_old[1] - Cr_old[0] + dx * fa / Do);

        for (let j = 1; j < Nx - 2; j++) {
            const leftCo = j === 1 ? Co[0] : Co_old[j - 1];
            const leftCr = j === 1 ? Cr[0] : Cr_old[j - 1];
            Co[j] = Co_old[j] + beta * (Co_old[j + 1] - 2 * Co_old[j] + leftCo);
            Cr[j] = Cr_old[j] + beta * (Cr_old[j + 1] - 2 * Cr_old[j] + leftCr);
        }

        // Flux over step i is centred at (i + 1/2)·dt
        const t = (i + 0.5) * dt;
        const If = currentFactor * (-fc);
        const Ic = stepped && tau > 0 ? ((Einit - Estep) / Ru) * Math.exp(-(t - tStart) / tau) : 0;
        const eps = noise > 0 ? noise * gaussian() : 0;

        E_data[i] = stepped ? Estep : Einit;
        If_data[i] = If;
        Ic_data[i] = Ic;
        I_data[i] = If + Ic + eps;
        t_data[i] = t;

        if (i % snapshotInterval === 0) {
            snapshots.push({
                Co: Float64Array.from(Co),
                Cr: Float64Array.from(Cr),
                frameIndex: i
            });
        }
    }

    if (snapshots[snapshots.length - 1].frameIndex !== Nt - 1) {
        snapshots.push({
            Co: Float64Array.from(Co),
            Cr: Float64Array.from(Cr),
            frameIndex: Nt - 1
        });
    }

    return { E: E_data, I: I_data, If: If_data, Ic: Ic_data, t: t_data,
             xx, snapshots, Nt, Nx, Co0, tStart };
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
