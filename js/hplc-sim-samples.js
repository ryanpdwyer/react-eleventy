/**
 * HPLC simulator: stockroom
 *
 * Prepared solutions a student can pipette into autosampler vials, and
 * helpers for making new ones (dilutions, mixtures). Concentrations are g/L.
 * Unknowns get a per-session random offset so no two sessions quantify to
 * exactly the same answer.
 */
import { BY_ID, gaussRandom } from './hplc-sim-chem.js';

const DIL = {
    water: { m: 0, a: 0, label: 'water' },
    mw5050: { m: 0.5, a: 0, label: '50:50 methanol/water' },
    mw2080: { m: 0.2, a: 0, label: '20:80 methanol/water' },
    meoh: { m: 1, a: 0, label: 'methanol' },
    acn: { m: 0, a: 1, label: 'acetonitrile' },
    aw5050: { m: 0, a: 0.5, label: '50:50 acetonitrile/water' },
};
export const DILUENTS = DIL;

const jitter = sd => 1 + sd * gaussRandom();

function S(id, group, label, dil, comps, note, hidden) {
    return { id, group, label, dil: DIL[dil], dilKey: dil, comps: comps.map(([cid, gL]) => ({ id: cid, gL })), note: note || '', hidden: !!hidden };
}

export function buildStockroom() {
    const tab = { ace: 250 * jitter(0.03), asp: 250 * jitter(0.03), caf: 65 * jitter(0.03), deg: 0.012 + 0.02 * Math.random() };
    const list = [
        S('blank-mw', 'Blanks', 'Blank: 50:50 methanol/water', 'mw5050', []),
        S('blank-w', 'Blanks', 'Blank: water', 'water', []),
        S('blank-m', 'Blanks', 'Blank: methanol', 'meoh', []),

        S('uracil', 'Test mixtures', 'Uracil, 20 mg/L (void volume marker)', 'mw5050', [['uracil', 0.020]],
            'Uracil is not retained on C18. Its retention time is t₀.'),
        S('parabens', 'Test mixtures', 'Paraben mix: uracil 10 mg/L; methyl-, ethyl-, propyl-, butylparaben 20 mg/L each', 'mw5050',
            [['uracil', 0.010], ['methylparaben', 0.020], ['ethylparaben', 0.020], ['propylparaben', 0.020], ['butylparaben', 0.020]],
            'A homologous series: each CH₂ adds a constant increment to log k.'),
        S('alkylbenzenes', 'Test mixtures', 'Alkylbenzene mix: uracil 10 mg/L; toluene, ethyl-, propyl-, butylbenzene 500 mg/L each', 'meoh',
            [['uracil', 0.010], ['toluene', 0.5], ['ethylbenzene', 0.5], ['propylbenzene', 0.5], ['butylbenzene', 0.5]],
            'Alkylbenzenes absorb weakly at 254 nm and strongly near 210 nm.'),
        S('checkout', 'Test mixtures', 'Isocratic checkout sample: dimethyl phthalate, diethyl phthalate, biphenyl, o-terphenyl in methanol', 'meoh',
            [['dmp', 1.19], ['dep', 1.19], ['biphenyl', 0.079], ['oterphenyl', 0.24]],
            'Concentrated. Inject 1 µL.'),

        S('ace-stock', 'Analgesics', 'Acetaminophen stock, 1.000 g/L', 'mw2080', [['acetaminophen', 1.000]]),
        S('caf-stock', 'Analgesics', 'Caffeine stock, 1.000 g/L', 'mw2080', [['caffeine', 1.000]]),
        S('asp-stock', 'Analgesics', 'Aspirin stock, 1.000 g/L (fresh)', 'mw2080', [['aspirin', 0.996], ['salicylic', 0.003]],
            'Aspirin hydrolyses slowly to salicylic acid in solution.'),
        S('sal-stock', 'Analgesics', 'Salicylic acid stock, 0.200 g/L', 'mw2080', [['salicylic', 0.200]]),
        S('mix-stock', 'Analgesics', 'Mixed standard stock: acetaminophen, aspirin, caffeine 0.500 g/L each', 'mw2080',
            [['acetaminophen', 0.500], ['aspirin', 0.498], ['salicylic', 0.0015], ['caffeine', 0.500]],
            'Dilute this to make a calibration series.'),
        S('tablet', 'Analgesics', 'Unknown: analgesic tablet extract (1 tablet → 250.0 mL, then 1.00 → 10.00 mL)', 'mw2080',
            [['acetaminophen', tab.ace / 250 / 10], ['aspirin', tab.asp * (1 - tab.deg) / 250 / 10],
            ['salicylic', tab.asp * tab.deg * 138.12 / 180.16 / 250 / 10], ['caffeine', tab.caf / 250 / 10]],
            'Filtered through a 0.45 µm syringe filter.', true),

        S('cola', 'Beverages', 'Unknown: cola, degassed and filtered', 'water', [['caffeine', 0.096 * jitter(0.04)]], '', true),
        S('dietcola', 'Beverages', 'Unknown: diet cola, degassed and filtered', 'water',
            [['caffeine', 0.128 * jitter(0.04)], ['benzoic', 0.180 * jitter(0.05)]], '', true),
        S('energy', 'Beverages', 'Unknown: energy drink, degassed, filtered, diluted 1 → 5', 'water',
            [['caffeine', 0.320 * jitter(0.04) / 5], ['benzoic', 0.150 * jitter(0.05) / 5], ['sorbic', 0.200 * jitter(0.05) / 5]], '', true),
        S('benz-stock', 'Beverages', 'Benzoic acid stock, 0.500 g/L', 'mw2080', [['benzoic', 0.500]]),
        S('sorb-stock', 'Beverages', 'Sorbic acid stock, 0.200 g/L', 'mw2080', [['sorbic', 0.200]]),
    ];
    const phen = ['gallic', 'protocatechuic', 'hba', 'vanillic', 'caffeic', 'syringic', 'coumaric', 'ferulic', 'cinnamic', 'benzoic', 'salicylic'];
    for (const id of phen) {
        list.push(S('pa-' + id, 'Phenolic acids', `${BY_ID[id].name}, 50 mg/L, with uracil 10 mg/L`, 'mw2080', [['uracil', 0.010], [id, 0.050]]));
    }
    list.push(S('pa-mix', 'Phenolic acids', 'Phenolic acid mix: gallic, protocatechuic, 4-hydroxybenzoic, vanillic, caffeic, syringic, p-coumaric, ferulic, 25 mg/L each',
        'mw2080', ['gallic', 'protocatechuic', 'hba', 'vanillic', 'caffeic', 'syringic', 'coumaric', 'ferulic'].map(id => [id, 0.025])));
    return list;
}

/** Put a solution in a 2 mL vial (1.5 mL fill) */
export function vialOf(sol) {
    return { label: sol.label, short: sol.short || sol.label, dil: sol.dil, comps: sol.comps.map(c => ({ ...c })), vol: 1500, hidden: sol.hidden, solId: sol.id };
}

/**
 * Dilute: pipette `aliquot` mL of a solution into a `flask` mL volumetric flask
 * and fill to the mark with diluent. Class A glassware tolerances are applied,
 * so the true concentration differs slightly from the nominal one.
 */
export function dilute(sol, aliquot, flask, dilKey, id) {
    const f = (aliquot * jitter(0.003)) / (flask * jitter(0.0008));
    const nominal = aliquot / flask;
    const d = DIL[dilKey];
    const src = Math.min(1, nominal);
    return {
        id, group: 'My solutions', hidden: sol.hidden,
        label: `${fmt(aliquot)} mL of [${shorten(sol.label)}] → ${fmt(flask)} mL in ${d.label}`,
        dil: { m: sol.dil.m * src + d.m * (1 - src), a: sol.dil.a * src + d.a * (1 - src), label: d.label }, dilKey,
        comps: sol.comps.map(c => ({ id: c.id, gL: c.gL * f })),
        nominal: sol.hidden ? null : sol.comps.map(c => ({ id: c.id, gL: (c.nom !== undefined ? c.nom : c.gL) * nominal })),
        note: `Dilution factor ${fmt(flask / aliquot)}.`,
    };
}

/** Weigh compounds into a flask: comps [{ id, mgL }] */
export function prepare(name, comps, dilKey, id) {
    return {
        id, group: 'My solutions', hidden: false, label: name,
        dil: DIL[dilKey], dilKey,
        comps: comps.map(c => ({ id: c.id, gL: c.mgL / 1000 * jitter(0.002), nom: c.mgL / 1000 })),
        note: comps.map(c => `${BY_ID[c.id].name} ${fmt(c.mgL)} mg/L`).join('; ') + ` in ${DIL[dilKey].label}.`,
    };
}

function fmt(x) { return String(+x.toPrecision(4)); }
function shorten(s) { return s.length > 34 ? s.slice(0, 32) + '…' : s; }
