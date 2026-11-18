/**
 * HPLC simulator: chemistry model
 *
 * Everything here is a pure function of composition, temperature and
 * compound. The instrument model (hplc-sim-engine.js) moves liquid around
 * and calls these to find out how it behaves.
 *
 * A liquid is a "mix": a Float64Array of NC linear components, so that
 * blending two liquids is a weighted sum. Volume fractions of water,
 * methanol, acetonitrile and air, plus molar totals of each buffer system
 * and the net strong ion (Na+ minus Cl-). pH is never stored; it is solved
 * from the charge balance of whatever ended up in the mix.
 *
 * Retention uses the linear solvent strength model
 *     log k = log kw - S*phi
 * with separate (log kw, S) for methanol and acetonitrile, a van 't Hoff
 * temperature term, and ionisation: each ionised site lowers log k by a
 * fixed amount, weighted by the fraction ionised at the mobile phase pH.
 *
 * Compound parameters are estimates chosen to reproduce typical
 * reversed-phase behaviour (elution order, rough k, pKa, UV maxima).
 * They are not measurements on a particular column.
 */

// ---------------------------------------------------------------- mixes

export const W = 0, M = 1, A = 2, PHOS = 3, ACET = 4, FORM = 5, CIT = 6,
    TFA = 7, NH3 = 8, STRONG = 9, AIR = 10, NC = 11;

export function mixOf(parts) {
    const v = new Float64Array(NC);
    for (const key in parts) v[key] = parts[key];
    return v;
}

export function blend(out, a, fa, b, fb) {
    for (let i = 0; i < NC; i++) out[i] = a[i] * fa + b[i] * fb;
    return out;
}

// Acid systems: pKa ladder of the fully protonated form. Charge of the
// fully protonated form is 0 (acids) or +1 (ammonium).
const SYSTEMS = [
    { i: PHOS, pKa: [2.15, 7.20, 12.35], z0: 0 },
    { i: ACET, pKa: [4.76], z0: 0 },
    { i: FORM, pKa: [3.75], z0: 0 },
    { i: CIT, pKa: [3.13, 4.76, 6.40], z0: 0 },
    { i: TFA, pKa: [0.3], z0: 0 },
    { i: NH3, pKa: [9.25], z0: 1 },
];
const CARBONIC = { pKa: [6.35, 10.33], z0: 0 };   // dissolved CO2 in "pure" water
const CO2_M = 1.2e-5;
const KW = 1e-14;

// Mean charge per mole of an acid system at hydrogen ion concentration h
function meanCharge(sys, h) {
    let term = 1, den = 1, num = 0;
    for (let j = 0; j < sys.pKa.length; j++) {
        term *= Math.pow(10, -sys.pKa[j]) / h;
        den += term;
        num += (j + 1) * term;
    }
    return sys.z0 - num / den;
}

// Net charge (mol/L) at a given pH; zero at equilibrium
function chargeBalance(v, pH) {
    const h = Math.pow(10, -pH);
    let q = v[STRONG] + h - KW / h;
    for (const s of SYSTEMS) if (v[s.i] > 0) q += v[s.i] * meanCharge(s, h);
    q += CO2_M * v[W] * meanCharge(CARBONIC, h);
    return q;
}

export function solvePH(v) {
    let lo = 0, hi = 14;
    for (let i = 0; i < 44; i++) {
        const mid = 0.5 * (lo + hi);
        if (chargeBalance(v, mid) > 0) lo = mid; else hi = mid;
    }
    return 0.5 * (lo + hi);
}

// Buffer capacity, mol/L of strong base per pH unit
export function bufferCapacity(v, pH) {
    return -(chargeBalance(v, pH + 0.02) - chargeBalance(v, pH - 0.02)) / 0.04;
}

// ------------------------------------------------------------- solvents

const BUFFERS = {
    phosphate: { i: PHOS, label: 'phosphate', range: [[2.1, 3.1], [6.2, 8.2]] },
    acetate: { i: ACET, label: 'acetate', range: [[3.8, 5.8]] },
    formate: { i: FORM, label: 'formate', range: [[2.8, 4.8]] },
    citrate: { i: CIT, label: 'citrate', range: [[2.1, 7.4]] },
};

// A buffer made to a target pH: find the strong ion that puts it there.
function bufferMix(kind, molar, pH) {
    const v = mixOf({ [W]: 1, [BUFFERS[kind].i]: molar });
    v[STRONG] = -chargeBalance(v, pH);
    return v;
}

export const SOLVENT_KINDS = [
    { kind: 'water', name: 'Water (HPLC grade)', short: 'H₂O', organic: false },
    { kind: 'meoh', name: 'Methanol (HPLC grade)', short: 'MeOH', organic: true },
    { kind: 'acn', name: 'Acetonitrile (HPLC grade)', short: 'ACN', organic: true },
    { kind: 'fa', name: '0.1% formic acid in water', short: '0.1% FA', organic: false },
    { kind: 'h3po4', name: '0.1% phosphoric acid in water', short: '0.1% H₃PO₄', organic: false },
    { kind: 'tfa', name: '0.1% trifluoroacetic acid in water', short: '0.1% TFA', organic: false },
    { kind: 'phosphate', name: 'Phosphate buffer', short: 'phosphate', organic: false, buffer: true },
    { kind: 'acetate', name: 'Acetate buffer', short: 'acetate', organic: false, buffer: true },
    { kind: 'formate', name: 'Formate buffer', short: 'formate', organic: false, buffer: true },
    { kind: 'citrate', name: 'Citrate buffer', short: 'citrate', organic: false, buffer: true },
    { kind: 'nh4oac', name: '10 mM ammonium acetate in water', short: 'NH₄OAc', organic: false },
];

/**
 * Build a solvent bottle's contents.
 * spec: { kind, mM, pH } (mM and pH only for buffer kinds)
 */
export function makeSolvent(spec) {
    const info = SOLVENT_KINDS.find(s => s.kind === spec.kind);
    let vec, name = info.name, short = info.short, note = '';
    switch (spec.kind) {
        case 'water': vec = mixOf({ [W]: 1 }); break;
        case 'meoh': vec = mixOf({ [M]: 1 }); break;
        case 'acn': vec = mixOf({ [A]: 1 }); break;
        case 'fa': vec = mixOf({ [W]: 1, [FORM]: 0.0265 }); break;
        case 'h3po4': vec = mixOf({ [W]: 1, [PHOS]: 0.0146 }); break;
        case 'tfa': vec = mixOf({ [W]: 1, [TFA]: 0.0130 }); break;
        case 'nh4oac': vec = mixOf({ [W]: 1, [ACET]: 0.010, [NH3]: 0.010 }); break;
        default: {
            const mM = spec.mM || 20, pH = spec.pH;
            vec = bufferMix(spec.kind, mM / 1000, pH);
            name = `${mM} mM ${BUFFERS[spec.kind].label} buffer, pH ${pH.toFixed(2)}`;
            short = `${BUFFERS[spec.kind].label} pH ${pH.toFixed(1)}`;
            const ok = BUFFERS[spec.kind].range.some(r => pH >= r[0] && pH <= r[1]);
            if (!ok) note = 'This pH is outside the useful buffering range of ' + BUFFERS[spec.kind].label + '.';
        }
    }
    const pH = info.organic ? null : solvePH(vec);
    return { spec: { ...spec }, kind: spec.kind, name, short, organic: info.organic, vec, pH, note };
}

export function bufferRange(kind) { return BUFFERS[kind] ? BUFFERS[kind].range : null; }

// ------------------------------------------------- derived mix properties

// Background absorbance of mobile phase components (AU per cm, at 1.0 volume
// fraction or at the reference molarity). A = 10^((cutoff - lambda)/w), so
// A = 1 at the UV cutoff.
const BG = [
    { i: W, ref: 1, cut: 187, w: 8 },
    { i: M, ref: 1, cut: 205, w: 25 },
    { i: A, ref: 1, cut: 190, w: 10 },
    { i: PHOS, ref: 0.020, cut: 195, w: 8 },
    { i: ACET, ref: 0.020, cut: 210, w: 10 },
    { i: FORM, ref: 0.0265, cut: 210, w: 14 },
    { i: CIT, ref: 0.020, cut: 228, w: 12 },
    { i: TFA, ref: 0.0130, cut: 210, w: 11 },
];

export function mobilePhaseAbs(v, lambda) {
    let a = 0;
    for (const b of BG) if (v[b.i] > 0) a += (v[b.i] / b.ref) * Math.pow(10, (b.cut - lambda) / b.w);
    return a;
}

/**
 * Cached properties of a mix: liquid volume fractions (air excluded), pH,
 * buffer capacity. Stored on the array object itself.
 */
export function props(v) {
    if (v._p) return v._p;
    const liq = v[W] + v[M] + v[A];
    const p = { air: v[AIR], liq };
    if (liq < 1e-9) {
        p.w = 1; p.m = 0; p.a = 0; p.dry = true;
    } else {
        p.w = v[W] / liq; p.m = v[M] / liq; p.a = v[A] / liq; p.dry = false;
    }
    p.org = p.m + p.a;
    p.pH = solvePH(v);
    p.beta = bufferCapacity(v, p.pH);
    p.phos = v[PHOS];
    p.salt = v[PHOS] + v[CIT] + 0.5 * (v[ACET] + v[FORM]);
    v._p = p;
    return p;
}

/**
 * Viscosity in cP (mPa s) of a water/methanol/acetonitrile mixture.
 * Grunberg-Nissan form; the interaction terms give the familiar maxima
 * (about 1.6 cP near 45% methanol, about 1.0 cP near 20% acetonitrile at 25 C).
 */
export function viscosity(p, Tc) {
    const T = Tc + 273.15, r = 1 / T - 1 / 298.15;
    const lw = Math.log(0.890) + 1900 * r;
    const lm = Math.log(0.544) + 1250 * r;
    const la = Math.log(0.341) + 850 * r;
    const g = Math.pow(298.15 / T, 2.8);
    return Math.exp(p.w * lw + p.m * lm + p.a * la + p.w * p.m * 3.39 * g + p.w * p.a * 1.60 * g);
}

/** Diffusion coefficient in the mobile phase, cm2/s (Wilke-Chang) */
export function diffusion(cmpd, p, Tc, eta) {
    const psiM = p.w * 46.8 + p.m * 60.8 + p.a * 41.0;
    const Va = 1.05 * cmpd.mw;
    return 7.4e-8 * Math.sqrt(psiM) * (Tc + 273.15) / (eta * Math.pow(Va, 0.6));
}

// ------------------------------------------------------------- columns

export const COLUMNS = [
    {
        id: 'ep150', name: 'ZORBAX Eclipse Plus C18, 4.6 × 150 mm, 5 µm',
        L: 150, dc: 4.6, dp: 5, eps: 0.62, pmax: 400, tmax: 60, phMin: 2, phMax: 9,
        knox: [0.8, 2.0, 0.05], phi: 600, ret: 0,
    },
    {
        id: 'ep250', name: 'ZORBAX Eclipse Plus C18, 4.6 × 250 mm, 5 µm',
        L: 250, dc: 4.6, dp: 5, eps: 0.62, pmax: 400, tmax: 60, phMin: 2, phMax: 9,
        knox: [0.8, 2.0, 0.05], phi: 600, ret: 0,
    },
    {
        id: 'ep100', name: 'ZORBAX Eclipse Plus C18, 4.6 × 100 mm, 3.5 µm',
        L: 100, dc: 4.6, dp: 3.5, eps: 0.62, pmax: 400, tmax: 60, phMin: 2, phMax: 9,
        knox: [0.8, 2.0, 0.05], phi: 600, ret: 0,
    },
    {
        id: 'ps50', name: 'InfinityLab Poroshell 120 EC-C18, 4.6 × 50 mm, 2.7 µm',
        L: 50, dc: 4.6, dp: 2.7, eps: 0.52, pmax: 600, tmax: 60, phMin: 2, phMax: 8,
        knox: [0.55, 1.6, 0.03], phi: 700, ret: -0.10,
    },
    {
        id: 'ep21', name: 'ZORBAX Eclipse Plus C18, 2.1 × 100 mm, 3.5 µm',
        L: 100, dc: 2.1, dp: 3.5, eps: 0.62, pmax: 400, tmax: 60, phMin: 2, phMax: 9,
        knox: [0.8, 2.0, 0.05], phi: 600, ret: 0,
    },
];

/** Mobile phase volume inside the column, mL */
export function columnVolume(col) {
    return Math.PI / 4 * (col.dc / 10) ** 2 * (col.L / 10) * col.eps;
}

/** Pressure drop across the column in bar, flow in mL/min, eta in cP */
export function columnPressure(col, flow, eta) {
    const u = (col.L / 1000) * (flow / 60) / columnVolume(col);   // m/s, = L/t0
    const dp = col.dp * 1e-6;
    return col.phi * (eta * 1e-3) * (col.L / 1000) * u / (dp * dp) / 1e5;
}

/** Plate number from the Knox equation at this flow */
export function plateNumber(col, flow, Dm) {
    if (flow <= 0) return 1000;
    const u = (col.L / 10) * (flow / 60) / columnVolume(col);     // cm/s
    const nu = u * (col.dp * 1e-4) / Dm;
    const [a, b, c] = col.knox;
    const h = b / nu + a * Math.cbrt(nu) + c * nu;
    return (col.L * 1000) / (h * col.dp);
}

// ------------------------------------------------------------ compounds

// uv: [lambda max (nm), molar absorptivity (L/mol/cm), band sigma (nm)]
// sites: ionisable groups. Acid: HA -> A-. Base: pKa of the conjugate acid BH+.
// logkw, S are for methanol/water on C18 at 25 C.
function C(id, name, mw, logkw, S, sites, uv, extra) {
    return { id, name, mw, logkw, S, sites: sites || [], uv, dA: 0, ...(extra || {}) };
}
const acid = (pKa, d) => ({ type: 'acid', pKa, d: d || 1.35 });
const base = (pKa, d) => ({ type: 'base', pKa, d: d || 1.25 });

export const COMPOUNDS = [
    C('uracil', 'Uracil', 112.09, -1.6, 1.0, [acid(9.45)], [[259, 8200, 13], [203, 9000, 9]], { group: 'Markers' }),

    C('acetaminophen', 'Acetaminophen', 151.16, 1.05, 2.9, [acid(9.38)], [[244, 10100, 16], [200, 14000, 10]], { group: 'Analgesics and beverages', dA: -0.05 }),
    C('caffeine', 'Caffeine', 194.19, 1.55, 3.1, [], [[273, 9700, 13], [205, 25000, 11]], { group: 'Analgesics and beverages', dA: -0.12 }),
    C('aspirin', 'Aspirin (acetylsalicylic acid)', 180.16, 2.00, 3.4, [acid(3.50)], [[276, 1250, 11], [226, 8600, 13], [200, 22000, 9]], { group: 'Analgesics and beverages' }),
    C('salicylic', 'Salicylic acid', 138.12, 2.45, 3.6, [acid(2.97), acid(13.6)], [[303, 3600, 15], [236, 7600, 11], [204, 30000, 9]], { group: 'Analgesics and beverages' }),
    C('ibuprofen', 'Ibuprofen', 206.28, 4.40, 5.0, [acid(4.45)], [[264, 420, 8], [221, 9200, 10]], { group: 'Analgesics and beverages' }),
    C('naproxen', 'Naproxen', 230.26, 3.60, 4.5, [acid(4.15)], [[331, 1700, 10], [271, 5200, 10], [231, 70000, 9]], { group: 'Analgesics and beverages' }),
    C('benzoic', 'Benzoic acid', 122.12, 2.20, 3.5, [acid(4.20)], [[272, 900, 9], [228, 11500, 11], [196, 40000, 8]], { group: 'Analgesics and beverages' }),
    C('sorbic', 'Sorbic acid', 112.13, 2.42, 3.6, [acid(4.76)], [[258, 25500, 16]], { group: 'Analgesics and beverages' }),

    C('gallic', 'Gallic acid', 170.12, 0.85, 2.8, [acid(4.40), acid(8.7)], [[271, 9000, 17], [216, 26000, 12]], { group: 'Phenolic acids', dA: -0.08 }),
    C('protocatechuic', 'Protocatechuic acid', 154.12, 1.40, 3.0, [acid(4.48), acid(8.8)], [[294, 5600, 12], [259, 10800, 12], [218, 22000, 11]], { group: 'Phenolic acids', dA: -0.08 }),
    C('hba', '4-Hydroxybenzoic acid', 138.12, 1.75, 3.2, [acid(4.54), acid(9.3)], [[255, 14500, 14], [207, 16000, 10]], { group: 'Phenolic acids', dA: -0.06 }),
    C('vanillic', 'Vanillic acid', 168.15, 1.95, 3.3, [acid(4.51), acid(9.4)], [[291, 5900, 12], [260, 11800, 12], [218, 23000, 11]], { group: 'Phenolic acids', dA: -0.05 }),
    C('caffeic', 'Caffeic acid', 180.16, 1.90, 3.4, [acid(4.62), acid(8.6)], [[323, 17500, 22], [297, 6000, 12], [241, 9500, 12], [217, 15000, 10]], { group: 'Phenolic acids', dA: -0.10 }),
    C('syringic', 'Syringic acid', 198.17, 2.05, 3.4, [acid(4.34), acid(9.5)], [[274, 10200, 16], [217, 26000, 11]], { group: 'Phenolic acids', dA: -0.04 }),
    C('coumaric', 'p-Coumaric acid', 164.16, 2.40, 3.6, [acid(4.64), acid(9.9)], [[309, 20500, 20], [226, 11500, 12]], { group: 'Phenolic acids', dA: -0.08 }),
    C('ferulic', 'Ferulic acid', 194.18, 2.55, 3.7, [acid(4.58), acid(9.4)], [[322, 18200, 22], [296, 7000, 12], [235, 10800, 12], [217, 15500, 10]], { group: 'Phenolic acids', dA: -0.08 }),
    C('cinnamic', 'trans-Cinnamic acid', 148.16, 3.00, 4.0, [acid(4.44)], [[273, 20500, 16], [216, 16000, 9], [204, 17000, 8]], { group: 'Phenolic acids' }),

    C('methylparaben', 'Methylparaben', 152.15, 2.20, 3.5, [acid(8.3)], [[255, 16000, 14], [205, 15000, 10]], { group: 'Parabens', dA: -0.05 }),
    C('ethylparaben', 'Ethylparaben', 166.17, 2.70, 3.9, [acid(8.3)], [[255, 16200, 14], [205, 15000, 10]], { group: 'Parabens', dA: -0.05 }),
    C('propylparaben', 'Propylparaben', 180.20, 3.20, 4.3, [acid(8.3)], [[255, 16400, 14], [205, 15000, 10]], { group: 'Parabens', dA: -0.05 }),
    C('butylparaben', 'Butylparaben', 194.23, 3.70, 4.7, [acid(8.3)], [[255, 16500, 14], [205, 15000, 10]], { group: 'Parabens', dA: -0.05 }),

    C('benzene', 'Benzene', 78.11, 2.45, 3.25, [], [[254, 210, 9], [203, 7400, 7]], { group: 'Aromatic hydrocarbons' }),
    C('toluene', 'Toluene', 92.14, 3.00, 3.6, [], [[261, 240, 9], [207, 7900, 7]], { group: 'Aromatic hydrocarbons' }),
    C('ethylbenzene', 'Ethylbenzene', 106.17, 3.50, 4.1, [], [[261, 210, 9], [207, 8200, 7]], { group: 'Aromatic hydrocarbons' }),
    C('propylbenzene', 'Propylbenzene', 120.19, 4.00, 4.6, [], [[261, 210, 9], [207, 8300, 7]], { group: 'Aromatic hydrocarbons' }),
    C('butylbenzene', 'Butylbenzene', 134.22, 4.50, 5.1, [], [[261, 215, 9], [207, 8400, 7]], { group: 'Aromatic hydrocarbons' }),
    C('naphthalene', 'Naphthalene', 128.17, 3.75, 4.3, [], [[275, 5700, 9], [220, 105000, 6]], { group: 'Aromatic hydrocarbons', dA: 0.05 }),
    C('biphenyl', 'Biphenyl', 154.21, 4.25, 4.8, [], [[248, 17500, 15], [203, 44000, 8]], { group: 'Aromatic hydrocarbons', dA: 0.05 }),
    C('oterphenyl', 'o-Terphenyl', 230.30, 5.10, 5.5, [], [[233, 28000, 16], [203, 60000, 8]], { group: 'Aromatic hydrocarbons', dA: 0.05 }),
    C('anthracene', 'Anthracene', 178.23, 4.85, 5.3, [], [[357, 7800, 9], [340, 5500, 7], [252, 200000, 5]], { group: 'Aromatic hydrocarbons', dA: 0.08 }),

    C('dmp', 'Dimethyl phthalate', 194.18, 2.25, 3.6, [], [[275, 1300, 10], [228, 8200, 11], [201, 40000, 8]], { group: 'Neutral probes' }),
    C('dep', 'Diethyl phthalate', 222.24, 3.15, 4.3, [], [[275, 1300, 10], [228, 8300, 11], [201, 40000, 8]], { group: 'Neutral probes' }),
    C('acetophenone', 'Acetophenone', 120.15, 2.10, 3.3, [], [[279, 1100, 10], [244, 13000, 11], [200, 22000, 8]], { group: 'Neutral probes' }),
    C('phenol', 'Phenol', 94.11, 1.75, 3.1, [acid(9.99)], [[270, 1500, 9], [211, 6200, 9]], { group: 'Neutral probes', dA: -0.08 }),
    C('nitrobenzene', 'Nitrobenzene', 123.11, 2.25, 3.3, [], [[266, 7800, 20], [203, 12000, 9]], { group: 'Neutral probes' }),

    C('aniline', 'Aniline', 93.13, 1.20, 2.8, [base(4.60)], [[280, 1450, 12], [230, 8600, 11]], { group: 'Bases', sil: 0.4 }),
    C('propranolol', 'Propranolol', 259.34, 3.60, 4.5, [base(9.42)], [[290, 5500, 12], [229, 30000, 8], [214, 38000, 7]], { group: 'Bases', sil: 1.0 }),
    C('amitriptyline', 'Amitriptyline', 277.40, 5.40, 5.6, [base(9.40)], [[239, 14000, 14], [205, 35000, 9]], { group: 'Bases', sil: 1.4 }),
    C('diphenhydramine', 'Diphenhydramine', 255.36, 4.10, 4.8, [base(8.98)], [[258, 480, 8], [220, 9000, 10], [203, 20000, 8]], { group: 'Bases', sil: 1.1 }),
];

export const BY_ID = {};
for (const c of COMPOUNDS) BY_ID[c.id] = c;

/** Molar absorptivity (L/mol/cm) at a wavelength */
export function epsilon(cmpd, lambda) {
    let e = 0;
    for (const [l0, e0, w] of cmpd.uv) {
        const z = (lambda - l0) / w;
        e += e0 * Math.exp(-0.5 * z * z);
    }
    return e;
}

/** Average molar absorptivity over a diode bunching bandwidth */
export function epsilonBand(cmpd, lambda, bw) {
    const n = Math.max(1, Math.round(bw / 2));
    if (n === 1) return epsilon(cmpd, lambda);
    let s = 0;
    for (let i = 0; i < n; i++) s += epsilon(cmpd, lambda - bw / 2 + bw * (i + 0.5) / n);
    return s / n;
}

/**
 * Retention factor of a compound in a mix.
 * Returns k, the partial-ionisation index (0 = one form only, 1 = 50:50),
 * and the ionised fraction of basic sites (for silanol tailing).
 *
 * pH here is the aqueous pH of the buffer. Adding organic solvent raises the
 * pKa of acids (and of anionic buffers by nearly as much), and lowers the
 * pKa of protonated bases; dpH below is the net effect on (pH - pKa).
 */
export function retention(cmpd, p, Tc, col, slowPhi) {
    const org = p.org;
    const logkwA = 0.78 * cmpd.logkw + cmpd.dA, SA = 0.78 * cmpd.S + 0.15;
    let logk, Seff;
    if (org > 1e-6) {
        const fm = p.m / org, fa = p.a / org;
        logk = fm * (cmpd.logkw - cmpd.S * org) + fa * (logkwA - SA * org);
        Seff = fm * cmpd.S + fa * SA;
    } else {
        logk = cmpd.logkw; Seff = cmpd.S;
    }
    // stationary phase still wetted by an earlier mobile phase
    if (slowPhi !== undefined) logk -= Seff * 0.12 * (slowPhi - org);
    // temperature
    const dH = -(8000 + 3000 * Math.max(0, cmpd.logkw));
    logk += (-dH / 8.314) * (1 / (Tc + 273.15) - 1 / 298.15) / Math.LN10;
    logk += (col ? col.ret : 0);

    let factor = 1, partial = 0, baseIon = 0;
    for (const s of cmpd.sites) {
        let alpha;
        if (s.type === 'acid') {
            alpha = 1 / (1 + Math.pow(10, (s.pKa + 1.5 * org) - (p.pH + 1.3 * org)));
        } else {
            alpha = 1 / (1 + Math.pow(10, (p.pH + 1.3 * org) - (s.pKa - 0.6 * org)));
            baseIon = Math.max(baseIon, alpha);
        }
        factor *= (1 - alpha) + alpha * Math.pow(10, -s.d);
        partial = Math.max(partial, 4 * alpha * (1 - alpha));
    }
    return { k: Math.pow(10, logk) * factor, partial, baseIon };
}

// ------------------------------------------------------------- peak shape

// Scaled complementary error function for z >= 0 (Abramowitz-Stegun 7.1.26)
function erfcx(z) {
    const t = 1 / (1 + 0.3275911 * z);
    return t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
}

/**
 * Exponentially modified Gaussian with unit area. v is the distance past the
 * centre of the Gaussian part; the exponential tail extends to positive v.
 */
export function emg(v, sigma, tau) {
    if (tau < 0.03 * sigma) {
        const z = v / sigma;
        return Math.exp(-0.5 * z * z) / (sigma * 2.5066282746);
    }
    const z = (sigma / tau - v / sigma) / Math.SQRT2;
    if (z >= 0) {
        const g = v / sigma;
        return Math.exp(-0.5 * g * g) * erfcx(z) / (2 * tau);
    }
    const ex = sigma * sigma / (2 * tau * tau) - v / tau;
    return Math.exp(ex) * (2 - Math.exp(-z * z) * erfcx(-z)) / (2 * tau);
}

export function gaussRandom() {
    const u = 1 - Math.random(), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
