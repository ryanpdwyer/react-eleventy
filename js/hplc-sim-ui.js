/**
 * HPLC simulator: user interface
 *
 * Four views over one Instrument: Guide (pre-lab checklist and experiments),
 * Bench (bottles, purge valve, tray, column, sample prep), Method & Run
 * Control (module status, online plot, method, sequence, logbook) and Data
 * Analysis (integration, peak table, UV spectra, CSV export).
 */
import * as chem from './hplc-sim-chem.js';
import { Instrument, defaultMethod, PEAKWIDTHS, fileSpectrum, DT } from './hplc-sim-engine.js';
import { buildStockroom, vialOf, dilute, prepare, DILUENTS } from './hplc-sim-samples.js';
import { integrate, defaultIntegration, signalCSV, peakCSV } from './hplc-sim-analysis.js';
import { Plot } from './hplc-sim-plot.js';
import { GUIDE_HTML, checklist, diagnose } from './hplc-sim-guide.js';

const CH = ['A', 'B', 'C', 'D'];
const SIGCOL = ['#1f6fb5', '#c2452d', '#2e8b57'];
const OVERCOL = ['#8e44ad', '#d0872a', '#16889a', '#b0356b', '#6b7a2a', '#5a6ea8'];
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const clone = o => JSON.parse(JSON.stringify(o));
const $ = id => document.getElementById(id);

const inst = new Instrument();
const stock = buildStockroom();
const gradient = defaultMethod();
gradient.name = 'GRADIENT.M';
Object.assign(gradient.pump, { B: 5, stopTime: 20, postTime: 6, timetable: [{ t: 15, B: 95, C: 0, D: 0, flow: 0 }, { t: 18, B: 95, C: 0, D: 0, flow: 0 }, { t: 18.5, B: 5, C: 0, D: 0, flow: 0 }] });
const ui = {
    view: 'guide', speed: 10, method: clone(inst.method),
    methods: { 'DEF_LC.M': clone(inst.method), 'GRADIENT.M': gradient },
    seq: { name: 'SEQ01', lines: [] },
    selPos: 'P1-A1', ctlTab: 'method', onlineWin: 10, showP: true,
    drafts: inst.bottles.map(b => clone(b.solvent.spec)), colDraft: inst.column.type.id,
    run: { pos: '', sample: '' },
    da: { fileId: null, sig: 0, overlay: new Set(), opt: defaultIntegration(), res: null, spec: null },
    flags: { integrated: false, exported: false }, myCount: 0,
    prep: { rows: [{ id: 'caffeine', mgL: 50 }], name: 'My standard', dil: 'mw5050', src: 'mix-stock', aliquot: 1, flask: 10, ddil: 'mw2080' },
};
window.hplc = { inst, ui };   // for the curious, and for tests

// ------------------------------------------------------------- helpers

function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    const later = {};
    for (const k in attrs || {}) {
        const v = attrs[k];
        if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
        else if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'value' || k === 'checked' || k === 'disabled') later[k] = v;
        else if (v !== false && v !== null && v !== undefined) e.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
        if (kid === null || kid === undefined || kid === false) continue;
        e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    for (const k in later) e[k] = later[k];
    return e;
}

function fill(el, ...kids) {
    el.replaceChildren(...kids.flat(Infinity).filter(k => k !== null && k !== undefined && k !== false));
}

function num(value, o, cb) {
    return h('input', {
        type: 'number', value, min: o.min, max: o.max, step: o.step || 'any', style: o.w ? `width:${o.w}px` : null,
        onchange: ev => {
            let v = parseFloat(ev.target.value);
            if (!isFinite(v)) v = o.min || 0;
            v = Math.min(o.max, Math.max(o.min, v));
            ev.target.value = v;
            cb(v);
        },
    });
}

function select(value, options, cb, attrs) {
    return h('select', { ...(attrs || {}), value, onchange: ev => cb(ev.target.value) },
        options.map(o => o.group
            ? h('optgroup', { label: o.group }, o.items.map(i => h('option', { value: i[0] }, i[1])))
            : h('option', { value: o[0] }, o[1])));
}

function download(name, text) {
    const a = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'text/csv' })), download: name });
    document.body.append(a); a.click(); a.remove();
}

function notice(title, body) {
    const d = h('dialog', {}, h('h2', { style: 'margin:0 0 8px;font-size:16px' }, title), h('div', { html: body }),
        h('div', { class: 'row', style: 'justify-content:flex-end;margin-top:12px' }, h('button', { class: 'btn primary', onclick: () => { d.close(); d.remove(); } }, 'OK')));
    document.body.append(d); d.showModal();
}

const solOptions = () => {
    const groups = [];
    for (const s of stock) {
        let g = groups.find(x => x.group === s.group);
        if (!g) groups.push(g = { group: s.group, items: [] });
        g.items.push([s.id, s.label]);
    }
    return groups;
};
const cmpdOptions = () => {
    const groups = [];
    for (const c of chem.COMPOUNDS) {
        let g = groups.find(x => x.group === c.group);
        if (!g) groups.push(g = { group: c.group, items: [] });
        g.items.push([c.id, c.name]);
    }
    return groups;
};
const dilOptions = () => Object.keys(DILUENTS).map(k => [k, DILUENTS[k].label]);
const positions = () => Object.keys(inst.sampler.vials).sort((a, b) => a.slice(3, 4).localeCompare(b.slice(3, 4)) || (+a.slice(4) - +b.slice(4)));
const methodDirty = () => JSON.stringify(ui.method) !== JSON.stringify(inst.method);

// ------------------------------------------------------------ top bar

$('tabs').addEventListener('click', e => {
    const v = e.target.dataset.view;
    if (v) showView(v);
});
$('speed').addEventListener('click', e => {
    if (e.target.dataset.s === undefined) return;
    ui.speed = +e.target.dataset.s;
    for (const b of $('speed').children) b.classList.toggle('on', b === e.target);
});

function showView(v) {
    ui.view = v;
    for (const b of $('tabs').children) b.classList.toggle('on', b.dataset.view === v);
    for (const s of document.querySelectorAll('.view')) s.classList.toggle('on', s.id === 'view-' + v);
    if (v === 'bench') renderBench();
    if (v === 'control') renderControl();
    if (v === 'data') renderData();
    if (v === 'guide') renderGuide();
}

// --------------------------------------------------------------- bench

function renderBench() {
    const root = $('view-bench');
    fill(root, 
        h('div', { class: 'grid2' },
            h('div', {},
                h('div', { class: 'card' }, h('h2', {}, 'Instrument stack'),
                    h('p', { class: 'note', style: 'margin-top:0' }, 'What you can see and touch at the instrument. The inlet tubing is transparent: look for bubbles before you pump anything through the column.'),
                    h('div', { class: 'stack', id: 'stack' })),
                h('div', { class: 'card', id: 'trayCard' })),
            h('div', {},
                h('div', { class: 'card', id: 'solCard' }),
                h('div', { class: 'card', id: 'colCard' }),
                h('div', { class: 'card', id: 'prepCard' }))));
    renderStack(); renderSolvents(); renderColumn(); renderTray(); renderPrep();
}

function renderStack() {
    const st = inst.moduleStatus();
    fill($('stack'), 
        h('div', { class: 'tray-top' }, inst.bottles.map((b, i) => h('div', { class: 'bottle', title: b.solvent.name },
            h('div', { class: 'cap' }),
            h('div', { class: 'glass' },
                h('div', { class: 'liq ' + (b.solvent.organic ? 'org' : b.solvent.kind === 'water' ? '' : 'buf'), id: 'liq' + i, style: `height:${100 * b.vol / b.cap}%` }),
                h('div', { class: 'tag' }, CH[i])),
            h('div', { class: 'nm' }, b.solvent.short)))),
        h('div', { class: 'mod' }, h('span', { class: 'led ' + st.pump, id: 'ledPump' }),
            h('div', { class: 'grow' }, h('div', { class: 'nm' }, 'Quaternary pump'), h('div', { class: 'sub', id: 'benchPump' }, '')),
            h('div', { class: 'tubes', title: 'Inlet lines A to D. White = air, orange = previous solvent still in the line.' },
                CH.map((c, i) => h('div', { class: 'tube' }, h('i', { id: 'tubeAir' + i }), h('b', { id: 'tubeOld' + i }), h('span', {}, c)))),
            h('div', { style: 'text-align:center' },
                h('div', { class: 'knob' + (inst.pump.purgeOpen ? ' open' : ''), id: 'knob', title: 'Purge valve: click to turn', onclick: () => { inst.setPurge(!inst.pump.purgeOpen); tickBench(); } }),
                h('div', { class: 'sub', id: 'knobTxt' }, ''))),
        h('div', { class: 'mod' }, h('span', { class: 'led ' + st.sampler, id: 'ledSampler' }),
            h('div', { class: 'grow' }, h('div', { class: 'nm' }, 'Vialsampler'), h('div', { class: 'sub', id: 'benchSampler' }, ''))),
        h('div', { class: 'mod' }, h('span', { class: 'led ' + st.tcc, id: 'ledTcc' }),
            h('div', { class: 'grow' }, h('div', { class: 'nm' }, 'Multicolumn thermostat'), h('div', { class: 'sub', id: 'benchTcc' }, ''))),
        h('div', { class: 'mod' }, h('span', { class: 'led ' + st.dad, id: 'ledDad' }),
            h('div', { class: 'grow' }, h('div', { class: 'nm' }, 'Diode array detector'), h('div', { class: 'sub', id: 'benchDad' }, ''))),
        h('div', { class: 'mod' }, h('div', { class: 'grow' }, h('div', { class: 'nm' }, 'Waste bottle'), h('div', { class: 'sub', id: 'benchWaste' }, ''))));
    tickBench();
}

function tickBench() {
    if (!$('benchPump')) return;
    const P = inst.pump, st = inst.moduleStatus();
    $('ledPump').className = 'led ' + st.pump; $('ledSampler').className = 'led ' + st.sampler;
    $('ledTcc').className = 'led ' + st.tcc; $('ledDad').className = 'led ' + st.dad;
    $('benchPump').textContent = `${P.flow.toFixed(2)} mL/min · ${P.pShown.toFixed(0)} bar · ${P.power}`;
    $('knob').classList.toggle('open', P.purgeOpen);
    $('knobTxt').textContent = P.purgeOpen ? 'purge OPEN' : 'purge closed';
    $('benchSampler').textContent = `${positions().length} vial(s) in tray` + (inst.run && inst.run.state === 'drawing' ? ` · injecting from ${inst.run.pos}` : '');
    $('benchTcc').textContent = `${inst.column.type.name} · ${inst.tcc.temp.toFixed(1)} °C`;
    $('benchDad').textContent = 'UV lamp ' + inst.dad.lamp + (inst.dad.lamp === 'on' ? ` (on for ${(inst.dad.age / 60).toFixed(0)} min)` : '');
    $('benchWaste').textContent = `${inst.waste.toFixed(0)} mL collected`;
    inst.bottles.forEach((b, i) => {
        $('liq' + i).style.height = (100 * Math.max(0, b.vol) / b.cap) + '%';
        const ls = inst.lineState(i);
        $('tubeAir' + i).style.height = (100 * ls.air) + '%';
        $('tubeOld' + i).style.height = (100 * ls.stale) + '%';
        const pill = $('linePill' + i);
        if (pill) {
            pill.className = 'pill ' + (ls.air > 0.005 ? 'bad' : ls.stale > 0.005 ? 'warn' : 'ok');
            pill.textContent = ls.air > 0.005 ? `air in line (${(100 * ls.air).toFixed(0)}%)` : ls.stale > 0.005 ? `old solvent in line (${(100 * ls.stale).toFixed(0)}%)` : 'line primed';
            $('volPill' + i).textContent = `${Math.max(0, b.vol).toFixed(0)} mL`;
            $('volPill' + i).className = 'pill ' + (b.vol < 50 ? 'bad' : b.vol < 150 ? 'warn' : '');
        }
    });
}

function renderSolvents() {
    const rows = inst.bottles.map((b, i) => {
        const d = ui.drafts[i];
        const info = chem.SOLVENT_KINDS.find(s => s.kind === d.kind);
        const same = JSON.stringify(d) === JSON.stringify(b.solvent.spec);
        const range = chem.bufferRange(d.kind);
        return h('div', { class: 'solrow' },
            h('div', { class: 'ch' }, CH[i]),
            h('div', {},
                h('div', { class: 'row' },
                    select(d.kind, chem.SOLVENT_KINDS.map(s => [s.kind, s.name]), v => {
                        const k = chem.SOLVENT_KINDS.find(s => s.kind === v);
                        ui.drafts[i] = k.buffer ? { kind: v, mM: 20, pH: chem.bufferRange(v)[0][0] + 0.4 } : { kind: v };
                        renderSolvents();
                    }),
                    info.buffer ? [
                        select(String(d.mM), [['10', '10 mM'], ['20', '20 mM'], ['25', '25 mM'], ['50', '50 mM']], v => { d.mM = +v; renderSolvents(); }),
                        h('label', { class: 'f' }, 'pH', num(d.pH, { min: 2, max: 8, step: 0.05, w: 64 }, v => { d.pH = v; renderSolvents(); })),
                    ] : null),
                h('div', { class: 'row small', style: 'margin-top:4px' },
                    h('span', { class: 'muted' }, 'In the bottle now: ', h('b', {}, b.solvent.name), b.solvent.pH !== null ? ` (pH ${b.solvent.pH.toFixed(2)})` : ''),
                    h('span', { class: 'pill', id: 'volPill' + i }, ''), h('span', { class: 'pill', id: 'linePill' + i }, '')),
                range && !same ? h('div', { class: 'small muted' }, 'Useful buffering range: ' + range.map(r => `pH ${r[0]}–${r[1]}`).join(' and ')) : null),
            h('div', { class: 'row' },
                h('button', { class: 'btn sm' + (same ? '' : ' primary'), disabled: same, onclick: () => { inst.setBottle(i, clone(d)); renderBench(); } }, 'Change bottle'),
                h('button', { class: 'btn sm', onclick: () => { inst.refillBottle(i); tickBench(); } }, 'Refill')));
    });
    fill($('solCard'), h('h2', {}, 'Solvent bottles'),
        h('p', { class: 'note', style: 'margin:0 0 4px' }, 'Swapping a bottle leaves the old solvent (and a little air) in about 4 mL of tubing and degasser. Purge that channel before you rely on it.'),
        rows);
    tickBench();
}

function renderColumn() {
    const c = inst.column.type, vm = chem.columnVolume(c);
    fill($('colCard'), h('h2', {}, 'Column'),
        h('div', { class: 'row' },
            select(ui.colDraft, chem.COLUMNS.map(x => [x.id, x.name]), v => { ui.colDraft = v; renderColumn(); }),
            h('button', {
                class: 'btn sm', disabled: ui.colDraft === c.id, onclick: () => {
                    if (inst.pump.flow > 0.01) return notice('Stop the flow first', 'Put the pump in standby and let the pressure fall before you disconnect a column.');
                    inst.installColumn(ui.colDraft); renderBench();
                },
            }, 'Install')),
        h('div', { class: 'small muted', style: 'margin-top:6px' },
            `Installed: ${c.name}. Mobile phase volume ≈ ${vm.toFixed(2)} mL (t₀ ≈ ${vm.toFixed(2)} min at 1 mL/min). ` +
            `Limits: ${c.pmax} bar, ${c.tmax} °C, pH ${c.phMin}–${c.phMax}. Injections on this column: ${inst.column.injections}.`));
}

function renderTray() {
    const V = inst.sampler.vials, sel = ui.selPos, vial = V[sel];
    const grid = [h('div', {})];
    for (let c = 1; c <= 11; c++) grid.push(h('div', { class: 'h' }, c));
    for (const r of ROWS) {
        grid.push(h('div', { class: 'h' }, r));
        for (let c = 1; c <= 11; c++) {
            const pos = `P1-${r}${c}`, v = V[pos];
            grid.push(h('button', {
                class: 'well' + (v ? (v.vol < 100 ? ' low' : ' full') : '') + (pos === sel ? ' sel' : ''), title: pos + (v ? ': ' + v.label : ' (empty)'),
                onclick: () => { ui.selPos = pos; renderTray(); },
            }));
        }
    }
    if (!ui.traySol) ui.traySol = 'parabens';
    fill($('trayCard'), h('h2', {}, 'Autosampler tray (2 mL vials)'),
        h('div', { class: 'trayg' }, grid),
        h('div', { style: 'margin-top:10px' },
            h('b', {}, sel), ': ',
            vial ? [vial.label, h('div', { class: 'row small', style: 'margin-top:5px' },
                h('span', { class: 'pill' + (vial.vol < 100 ? ' warn' : '') }, `${vial.vol.toFixed(0)} µL left`),
                h('span', { class: 'muted' }, 'in ' + vial.dil.label),
                h('button', { class: 'btn sm', onclick: () => { inst.removeVial(sel); renderTray(); tickBench(); } }, 'Remove vial'))]
                : ['empty', h('div', { class: 'row', style: 'margin-top:5px' },
                    select(ui.traySol, solOptions(), v => { ui.traySol = v; }, { style: 'max-width:300px' }),
                    h('button', {
                        class: 'btn sm primary', onclick: () => {
                            inst.placeVial(sel, vialOf(stock.find(s => s.id === ui.traySol)));
                            // move on to the next empty position
                            const all = ROWS.flatMap(r => Array.from({ length: 11 }, (_, i) => `P1-${r}${i + 1}`));
                            const next = all.slice(all.indexOf(sel) + 1).find(p => !V[p]);
                            if (next) ui.selPos = next;
                            renderTray(); tickBench();
                        },
                    }, 'Fill a vial and place it'))]));
}

function renderPrep() {
    const p = ui.prep;
    const mine = stock.filter(s => s.group === 'My solutions');
    fill($('prepCard'), h('h2', {}, 'Sample preparation'),
        h('h3', {}, 'Dilute a solution'),
        h('div', { class: 'row' },
            'Pipette', num(p.aliquot, { min: 0.01, max: 50, step: 0.01, w: 64 }, v => { p.aliquot = v; }), 'mL of',
            select(p.src, solOptions(), v => { p.src = v; }, { style: 'max-width:240px' })),
        h('div', { class: 'row', style: 'margin-top:5px' }, 'into a',
            select(String(p.flask), [['5', '5 mL'], ['10', '10 mL'], ['25', '25 mL'], ['50', '50 mL'], ['100', '100 mL']], v => { p.flask = +v; }),
            'volumetric flask, to the mark with', select(p.ddil, dilOptions(), v => { p.ddil = v; }),
            h('button', {
                class: 'btn sm primary', onclick: () => {
                    if (p.aliquot > p.flask) return notice('Check the volumes', 'The aliquot is larger than the flask.');
                    const s = dilute(stock.find(x => x.id === p.src), p.aliquot, p.flask, p.ddil, 'my' + (++ui.myCount));
                    stock.push(s); ui.traySol = s.id; renderPrep(); renderTray();
                },
            }, 'Make')),
        h('h3', {}, 'Make a solution from pure compounds'),
        h('div', { class: 'row' }, h('input', { type: 'text', value: p.name, style: 'width:170px', onchange: e => { p.name = e.target.value; } }),
            'in', select(p.dil, dilOptions(), v => { p.dil = v; })),
        p.rows.map((r, i) => h('div', { class: 'row', style: 'margin-top:4px' },
            select(r.id, cmpdOptions(), v => { r.id = v; }, { style: 'max-width:220px' }),
            num(r.mgL, { min: 0.01, max: 20000, w: 80 }, v => { r.mgL = v; }), 'mg/L',
            p.rows.length > 1 ? h('button', { class: 'btn sm', onclick: () => { p.rows.splice(i, 1); renderPrep(); } }, '×') : null)),
        h('div', { class: 'row', style: 'margin-top:6px' },
            h('button', { class: 'btn sm', disabled: p.rows.length >= 8, onclick: () => { p.rows.push({ id: 'uracil', mgL: 10 }); renderPrep(); } }, '+ compound'),
            h('button', {
                class: 'btn sm primary', onclick: () => {
                    const s = prepare(p.name || 'My solution', p.rows, p.dil, 'my' + (++ui.myCount));
                    stock.push(s); ui.traySol = s.id; renderPrep(); renderTray();
                },
            }, 'Make')),
        mine.length ? [h('h3', {}, 'My solutions'), h('div', { class: 'small' }, mine.map(s => h('div', { style: 'padding:3px 0;border-bottom:1px solid var(--grid)' },
            h('b', {}, s.label), h('div', { class: 'muted' }, s.nominal ? 'Nominal: ' + s.nominal.map(c => `${chem.BY_ID[c.id].name} ${(c.gL * 1000).toPrecision(4)} mg/L`).join('; ') : s.note))))] : null,
        h('p', { class: 'note' }, 'New solutions appear in the tray’s solution list. Volumetric glassware has its usual tolerances, so the true concentration is close to, not exactly, the nominal value.'));
}

// ------------------------------------------------------------- control

let onlinePlot = null;

function renderControl() {
    const root = $('view-control');
    const tile = (id, name, model, body) => h('div', { class: 'tile', id: 'tile' + id }, h('h4', {}, name), h('div', { class: 'model' }, model), body);
    fill(root, 
        h('div', { class: 'tiles' },
            tile('Pump', 'Quaternary pump', 'G7111B · 4-channel degasser',
                [h('div', { class: 'big', id: 'pP' }, ''), h('div', { class: 'kv', id: 'pF' }, ''), h('div', { class: 'kv', id: 'pC' }, ''),
                h('div', { class: 'row' },
                    h('button', { class: 'btn sm', id: 'bPumpOn', onclick: () => inst.pumpPower('on') }, 'On'),
                    h('button', { class: 'btn sm', id: 'bPumpSb', onclick: () => inst.pumpPower('standby') }, 'Standby'))]),
            tile('Sampler', 'Vialsampler', 'G7129A · 100 µL metering',
                [h('div', { class: 'big', id: 'sS' }, ''), h('div', { class: 'kv', id: 'sV' }, ''), h('div', { class: 'kv', id: 'sW' }, '')]),
            tile('Tcc', 'Multicolumn thermostat', 'G7116A',
                [h('div', { class: 'big', id: 'tT' }, ''), h('div', { class: 'kv', id: 'tS' }, ''),
                h('div', { class: 'row' },
                    h('button', { class: 'btn sm', id: 'bTccOn', onclick: () => inst.tccPower(true) }, 'On'),
                    h('button', { class: 'btn sm', id: 'bTccOff', onclick: () => inst.tccPower(false) }, 'Off'))]),
            tile('Dad', 'Diode array detector', 'G7115A · 10 mm, 13 µL cell',
                [h('div', { class: 'big', id: 'dA' }, ''), h('div', { class: 'kv', id: 'dL' }, ''),
                h('div', { class: 'row' },
                    h('button', { class: 'btn sm', id: 'bLampOn', onclick: () => inst.lampPower(true) }, 'Lamp on'),
                    h('button', { class: 'btn sm', id: 'bLampOff', onclick: () => inst.lampPower(false) }, 'Lamp off'),
                    h('button', { class: 'btn sm', onclick: () => inst.balance() }, 'Balance'))])),
        h('div', { class: 'gridctl' },
            h('div', { class: 'card' },
                h('div', { class: 'row', style: 'justify-content:space-between' }, h('h2', { style: 'margin:0' }, 'Online plot'),
                    h('div', { class: 'row small' },
                        h('label', { class: 'f' }, 'Window', select(String(ui.onlineWin), [['5', '5 min'], ['10', '10 min'], ['30', '30 min'], ['60', '60 min']], v => { ui.onlineWin = +v; onlinePlot.zoom = null; })),
                        h('label', { class: 'f' }, h('input', { type: 'checkbox', checked: ui.showP, onchange: e => { ui.showP = e.target.checked; } }), 'Pressure'),
                        h('span', { class: 'muted' }, 'Drag to zoom, double-click to reset'))),
                h('div', { class: 'plotbox' }, h('canvas', { id: 'onlineCv' })),
                h('div', { class: 'runbar', id: 'runbar' })),
            h('div', { class: 'card' },
                h('div', { class: 'subtabs', id: 'ctlTabs' }, [['method', 'Method'], ['sequence', 'Sequence'], ['logbook', 'Logbook']].map(([k, n]) =>
                    h('button', { class: ui.ctlTab === k ? 'on' : '', onclick: () => { ui.ctlTab = k; renderControl(); } }, n))),
                h('div', { id: 'ctlBody' }))));
    onlinePlot = new Plot($('onlineCv'), { y2Label: 'Pressure (bar)', xLabel: 'Lab time (min)' });
    renderRunbar();
    if (ui.ctlTab === 'method') renderMethod();
    else if (ui.ctlTab === 'sequence') renderSequence();
    else renderLog(true);
    tickControl();
}

function renderRunbar() {
    const pos = positions();
    if (!pos.includes(ui.run.pos)) ui.run.pos = pos[0] || '';
    const busy = !!inst.run || !!inst.seq;
    fill($('runbar'), 
        h('label', { class: 'f' }, 'Vial', select(ui.run.pos, pos.length ? pos.map(p => [p, p]) : [['', '(tray is empty)']], v => { ui.run.pos = v; })),
        h('input', { type: 'text', placeholder: 'Sample name', value: ui.run.sample, style: 'width:150px', onchange: e => { ui.run.sample = e.target.value; } }),
        h('button', { class: 'btn primary', disabled: busy || !pos.length, onclick: () => startSingle(false) }, 'Run method'),
        h('button', { class: 'btn', disabled: busy, title: 'Run the method without injecting: shows the baseline alone', onclick: () => startSingle(true) }, 'Blank run (no injection)'),
        h('button', { class: 'btn danger', disabled: !busy, onclick: () => { inst.stop(); renderRunbar(); } }, 'Stop'),
        h('div', { class: 'progress' }, h('i', { id: 'runProg' })),
        h('span', { class: 'small', id: 'runTxt', style: 'min-width:150px' }, ''));
    ui.runbarBusy = busy; ui.runbarVials = pos.join();
}

function sendMethod() {
    inst.applyMethod(ui.method);
    ui.method = clone(inst.method);
}

function startSingle(blank) {
    if (methodDirty()) sendMethod();
    inst.startRun({ pos: ui.run.pos, sample: ui.run.sample, blank });
    renderRunbar();
    if (ui.ctlTab === 'method') renderMethod();
}

function tickControl() {
    if (!$('pP')) return;
    const P = inst.pump, st = inst.moduleStatus(), m = inst.method;
    for (const [id, s] of [['Pump', st.pump], ['Sampler', st.sampler], ['Tcc', st.tcc], ['Dad', st.dad]]) $('tile' + id).className = 'tile s-' + s;
    fill($('pP'), P.pShown.toFixed(1), h('small', {}, ' bar'));
    fill($('pF'), 'Flow ', h('b', {}, P.flow.toFixed(3)), ` / ${P.flowSet.toFixed(3)} mL/min`);
    fill($('pC'), ...P.comp.map((c, i) => c > 0.05 ? [h('b', {}, `${CH[i]} ${c.toFixed(1)}%`), ` ${inst.bottles[i].solvent.short}  `] : []).flat());
    $('bPumpOn').classList.toggle('on', P.power === 'on'); $('bPumpSb').classList.toggle('on', P.power !== 'on');
    const r = inst.run;
    $('sS').textContent = r && r.state === 'drawing' ? 'Injecting' : r && r.state === 'waiting' ? 'Waiting' : 'Idle';
    fill($('sV'), 'Injection volume ', h('b', {}, `${(r ? r.injVol : m.sampler.injVol)} µL`), r && !r.blank ? ` from ${r.pos}` : '');
    $('sW').textContent = `Needle wash ${m.sampler.wash ? 'on' : 'off'} · ${positions().length} vial(s)`;
    fill($('tT'), inst.tcc.temp.toFixed(1), h('small', {}, ' °C'));
    $('tS').textContent = inst.tcc.on ? `Setpoint ${inst.tcc.set.toFixed(1)} °C` : 'Temperature control off';
    $('bTccOn').classList.toggle('on', inst.tcc.on); $('bTccOff').classList.toggle('on', !inst.tcc.on);
    const s0 = m.dad.signals.findIndex(s => s.on);
    fill($('dA'), inst.dad.lamp === 'on' && s0 >= 0 ? inst.dad.value[s0].toFixed(2) : '—', h('small', {}, ' mAU'));
    $('dL').textContent = `UV lamp ${inst.dad.lamp}` + (s0 >= 0 ? ` · Signal ${CH[s0]}: ${m.dad.signals[s0].wl} nm` : '');
    $('bLampOn').classList.toggle('on', inst.dad.lamp !== 'off'); $('bLampOff').classList.toggle('on', inst.dad.lamp === 'off');

    const busy = !!inst.run || !!inst.seq;
    if (busy !== ui.runbarBusy || positions().join() !== ui.runbarVials) { renderRunbar(); if (ui.ctlTab === 'sequence') renderSequence(); if (ui.ctlTab === 'method') renderMethod(); }
    const tm = inst.runTime();
    let txt = 'No run in progress';
    if (r) {
        if (r.state === 'waiting') txt = 'Waiting for ready: ' + inst.notReady().join('; ');
        else if (r.state === 'drawing') txt = 'Injecting…';
        else if (r.state === 'running') txt = `Run ${tm.toFixed(2)} / ${m.pump.stopTime.toFixed(2)} min`;
        else if (r.state === 'post') txt = `Post-run ${(r.timer / 60).toFixed(1)} min left`;
        if (inst.seq) txt = `Seq line ${inst.seq.idx + 1}/${inst.seq.lines.length} · ` + txt;
    }
    $('runTxt').textContent = txt;
    $('runProg').style.width = (tm !== null ? 100 * tm / m.pump.stopTime : 0) + '%';
    if (ui.ctlTab === 'logbook') renderLog(false);
    if (ui.ctlTab === 'method') {
        const d = $('dirty');
        if (d) d.style.display = methodDirty() ? '' : 'none';
    }
}

function drawOnline() {
    if (!onlinePlot || !$('onlineCv')) return;
    const o = inst.online, m = inst.method, series = [];
    m.dad.signals.forEach((s, i) => { if (s.on) series.push({ x: o.t, y: o.sig[i], color: SIGCOL[i], label: `${CH[i]}: ${s.wl} nm` }); });
    if (ui.showP) series.push({ x: o.t, y: o.p, color: '#7a5c99', axis: 2, width: 1, label: 'Pressure' });
    onlinePlot.series = series;
    const now = inst.t / 60;
    onlinePlot.xFixed = [Math.max(0, now - ui.onlineWin), Math.max(ui.onlineWin, now)];
    onlinePlot.draw();
}

function renderMethod() {
    const m = ui.method, p = m.pump, busy = !!inst.run || !!inst.seq;
    const touch = () => { const d = $('dirty'); if (d) d.style.display = methodDirty() ? '' : 'none'; const a = $('pctA'); if (a) a.textContent = (100 - p.B - p.C - p.D).toFixed(1); };
    const fix = () => {
        // channel A takes up the remainder
        let over = p.B + p.C + p.D - 100;
        for (const k of ['D', 'C', 'B']) if (over > 0) { const cut = Math.min(over, p[k]); p[k] -= cut; over -= cut; }
    };
    const pct = k => num(p[k], { min: 0, max: 100, step: 0.1, w: 64 }, v => { p[k] = v; fix(); renderMethod(); });
    const sigRow = (s, i) => h('tr', {},
        h('td', {}, h('label', { class: 'f' }, h('input', { type: 'checkbox', checked: s.on, onchange: e => { s.on = e.target.checked; touch(); } }), h('b', { style: `color:${SIGCOL[i]}` }, CH[i]))),
        h('td', {}, num(s.wl, { min: 190, max: 400, step: 1, w: 58 }, v => { s.wl = v; touch(); })),
        h('td', {}, num(s.bw, { min: 1, max: 100, step: 1, w: 50 }, v => { s.bw = v; touch(); })),
        h('td', {}, h('input', { type: 'checkbox', checked: s.ref, onchange: e => { s.ref = e.target.checked; touch(); } })),
        h('td', {}, num(s.rwl, { min: 190, max: 600, step: 1, w: 58 }, v => { s.rwl = v; touch(); })),
        h('td', {}, num(s.rbw, { min: 1, max: 200, step: 1, w: 54 }, v => { s.rbw = v; touch(); })));
    fill($('ctlBody'), 
        h('div', { class: 'dirty', id: 'dirty', style: methodDirty() ? '' : 'display:none' }, 'Edited. These values are not on the instrument yet. ',
            h('button', { class: 'btn sm primary', disabled: busy, onclick: () => { sendMethod(); renderMethod(); } }, 'Send to instrument'),
            busy ? ' (wait for the run to finish)' : ''),
        h('div', { class: 'row' },
            h('input', { type: 'text', value: m.name, style: 'width:130px', onchange: e => { m.name = e.target.value.trim() || 'METHOD.M'; touch(); } }),
            h('button', { class: 'btn sm', onclick: () => { if (!/\.M$/i.test(m.name)) m.name += '.M'; ui.methods[m.name] = clone(m); renderMethod(); } }, 'Save'),
            h('label', { class: 'f small' }, 'Load', select('', [['', '…']].concat(Object.keys(ui.methods).map(k => [k, k])), v => { if (v) { ui.method = clone(ui.methods[v]); renderMethod(); } }))),

        h('h3', {}, 'Pump'),
        h('div', { class: 'fields' },
            h('span', {}, 'Flow'), h('span', {}, num(p.flow, { min: 0, max: 10, step: 0.1 }, v => { p.flow = v; touch(); }), ' mL/min'),
            h('span', {}, 'A'), h('span', {}, h('b', { id: 'pctA' }, (100 - p.B - p.C - p.D).toFixed(1)), ' % ', h('span', { class: 'muted small' }, inst.bottles[0].solvent.name)),
            ...['B', 'C', 'D'].flatMap((k, i) => [h('span', {}, k), h('span', {}, pct(k), ' % ', h('span', { class: 'muted small' }, inst.bottles[i + 1].solvent.name))]),
            h('span', {}, 'Stop time'), h('span', {}, num(p.stopTime, { min: 0.2, max: 120, step: 0.5 }, v => { p.stopTime = v; touch(); }), ' min'),
            h('span', {}, 'Post time'), h('span', {}, num(p.postTime, { min: 0, max: 60, step: 0.5 }, v => { p.postTime = v; touch(); }), ' min'),
            h('span', {}, 'Pressure limits'), h('span', {}, num(p.pmin, { min: 0, max: 590, step: 1, w: 60 }, v => { p.pmin = v; touch(); }), ' to ',
                num(p.pmax, { min: 10, max: 600, step: 1, w: 60 }, v => { p.pmax = v; touch(); }), ' bar')),
        h('div', { class: 'small muted', style: 'margin-top:8px' }, 'Timetable (gradient). Composition changes linearly between rows; empty means isocratic.'),
        p.timetable.length ? h('div', { class: 'tblwrap' }, h('table', {},
            h('tr', {}, ['Time (min)', '%B', '%C', '%D', 'Flow', ''].map(x => h('th', {}, x))),
            p.timetable.map((row, i) => h('tr', {},
                h('td', {}, num(row.t, { min: 0, max: 120, step: 0.1, w: 62 }, v => { row.t = v; p.timetable.sort((a, b) => a.t - b.t); renderMethod(); })),
                ...['B', 'C', 'D'].map(k => h('td', {}, num(row[k], { min: 0, max: 100, step: 1, w: 54 }, v => { row[k] = v; touch(); }))),
                h('td', {}, num(row.flow || 0, { min: 0, max: 10, step: 0.1, w: 54 }, v => { row.flow = v; touch(); })),
                h('td', {}, h('button', { class: 'btn sm', onclick: () => { p.timetable.splice(i, 1); renderMethod(); } }, '×')))))) : null,
        h('div', { class: 'row', style: 'margin-top:4px' },
            h('button', {
                class: 'btn sm', onclick: () => {
                    const last = p.timetable[p.timetable.length - 1];
                    p.timetable.push(last ? { ...last, t: last.t + 1 } : { t: Math.max(1, p.stopTime - 2), B: 95, C: 0, D: 0, flow: 0 });
                    renderMethod();
                },
            }, '+ timetable row'),
            p.timetable.length ? h('span', { class: 'small muted' }, 'Flow 0 = keep the method flow') : null),

        h('h3', {}, 'Sampler'),
        h('div', { class: 'fields' },
            h('span', {}, 'Injection volume'), h('span', {}, num(m.sampler.injVol, { min: 0.1, max: 100, step: 0.5 }, v => { m.sampler.injVol = v; touch(); }), ' µL'),
            h('span', {}, 'Needle wash'), h('span', {}, h('input', { type: 'checkbox', checked: m.sampler.wash, onchange: e => { m.sampler.wash = e.target.checked; touch(); } }), ' flush port, 3 s')),

        h('h3', {}, 'Column compartment'),
        h('div', { class: 'fields' },
            h('span', {}, 'Temperature'), h('span', {}, num(m.tcc.temp, { min: 15, max: 80, step: 1 }, v => { m.tcc.temp = v; touch(); }), ' °C ',
                h('label', { class: 'f' }, h('input', { type: 'checkbox', checked: m.tcc.on, onchange: e => { m.tcc.on = e.target.checked; touch(); } }), 'control on'))),

        h('h3', {}, 'Diode array detector'),
        h('div', { class: 'tblwrap' }, h('table', {},
            h('tr', {}, ['Signal', 'λ (nm)', 'Bw', 'Ref', 'Ref λ', 'Ref bw'].map(x => h('th', {}, x))),
            m.dad.signals.map(sigRow))),
        h('div', { class: 'fields', style: 'margin-top:6px' },
            h('span', {}, 'Peakwidth'), select(String(m.dad.pw), PEAKWIDTHS.map((w, i) => [String(i), w.label]), v => { m.dad.pw = +v; touch(); }),
            h('span', {}, 'Spectra'), select(m.dad.spectra, [['all', 'Store all (190–400 nm)'], ['none', 'None']], v => { m.dad.spectra = v; touch(); }),
            h('span', {}, 'Autobalance'), h('label', { class: 'f' }, h('input', { type: 'checkbox', checked: m.dad.autobalance, onchange: e => { m.dad.autobalance = e.target.checked; touch(); } }), 'before each run')));
}

function renderSequence() {
    const s = ui.seq, pos = positions(), busy = !!inst.run || !!inst.seq;
    const mnames = Object.keys(ui.methods);
    const label = p => inst.sampler.vials[p] ? inst.sampler.vials[p].label : '';
    const add = p => s.lines.push({ pos: p, sample: label(p).slice(0, 40), method: mnames.includes(ui.method.name) ? ui.method.name : mnames[0], injVol: 0, injections: 1 });
    fill($('ctlBody'), 
        h('div', { class: 'row' }, h('label', { class: 'f' }, 'Sequence name', h('input', { type: 'text', value: s.name, style: 'width:110px', onchange: e => { s.name = e.target.value.replace(/[^\w-]/g, '') || 'SEQ'; } }))),
        h('div', { class: 'tblwrap', style: 'margin-top:6px' }, h('table', {},
            h('tr', {}, ['#', 'Vial', 'Sample name', 'Method', 'Inj µL', 'Inj/vial', ''].map(x => h('th', {}, x))),
            s.lines.map((ln, i) => h('tr', {},
                h('td', {}, i + 1),
                h('td', {}, select(ln.pos, (pos.includes(ln.pos) ? pos : [ln.pos].concat(pos)).map(p => [p, p]), v => { ln.pos = v; ln.sample = label(v).slice(0, 40); renderSequence(); })),
                h('td', {}, h('input', { type: 'text', value: ln.sample, style: 'width:110px', onchange: e => { ln.sample = e.target.value; } })),
                h('td', {}, select(ln.method, mnames.map(k => [k, k]), v => { ln.method = v; }, { style: 'max-width:105px' })),
                h('td', {}, num(ln.injVol, { min: 0, max: 100, step: 0.5, w: 48 }, v => { ln.injVol = v; })),
                h('td', {}, num(ln.injections, { min: 1, max: 10, step: 1, w: 42 }, v => { ln.injections = Math.round(v); })),
                h('td', {}, h('button', { class: 'btn sm', onclick: () => { s.lines.splice(i, 1); renderSequence(); } }, '×')))))),
        s.lines.length ? null : h('p', { class: 'note' }, 'No lines yet. Each line is one vial run with one saved method.'),
        h('div', { class: 'row', style: 'margin-top:6px' },
            h('button', { class: 'btn sm', disabled: !pos.length, onclick: () => { add(pos.find(p => !s.lines.some(l => l.pos === p)) || pos[0]); renderSequence(); } }, '+ line'),
            h('button', { class: 'btn sm', disabled: !pos.length, onclick: () => { for (const p of pos) if (!s.lines.some(l => l.pos === p)) add(p); renderSequence(); } }, 'Add every vial in the tray'),
            h('button', { class: 'btn sm', disabled: !s.lines.length, onclick: () => { s.lines = []; renderSequence(); } }, 'Clear')),
        h('div', { class: 'row', style: 'margin-top:10px' },
            h('button', {
                class: 'btn primary', disabled: busy || !s.lines.length, onclick: () => {
                    const lines = s.lines.map(ln => ({ pos: ln.pos, sample: ln.sample, method: clone(ui.methods[ln.method]), injVol: ln.injVol > 0 ? ln.injVol : undefined, injections: ln.injections }));
                    inst.startSequence(s.name, lines);
                    ui.method = clone(inst.method);
                    renderRunbar(); renderSequence();
                },
            }, 'Run sequence'),
            h('span', { class: 'small muted' }, 'Inj µL 0 = use the method’s volume. Methods must be saved (Method tab) to appear here. Use the method’s post time to re-equilibrate between lines.')));
}

function renderLog(force) {
    if (!force && ui.logLen === inst.log.length) return;
    ui.logLen = inst.log.length;
    const box = h('div', { class: 'log' }, inst.log.slice().reverse().map(l => h('div', { class: l.level }, `${l.clock}  ${l.module}: ${l.msg}`)));
    fill($('ctlBody'), box);
}

// ---------------------------------------------------------------- data

let daPlot = null, specPlot = null;

function currentFile() { return inst.files.find(f => f.id === ui.da.fileId) || null; }

function renderData() {
    const root = $('view-data'), da = ui.da;
    if (!currentFile() && inst.files.length) da.fileId = inst.files[inst.files.length - 1].id;
    const f = currentFile();
    if (!f) {
        fill(root, h('div', { class: 'card' }, h('h2', {}, 'Data Analysis'), h('p', { class: 'muted' }, 'No data files yet. Acquire a run in Method & Run Control; each run is saved here when it finishes.')));
        return;
    }
    if (da.sig >= f.sig.length) da.sig = 0;
    const o = da.opt;
    const field = (label, key, step, title) => h('label', { class: 'f small', title }, label, num(o[key], { min: 0, max: 1e6, step, w: 62 }, v => { o[key] = v; reintegrate(); }));
    fill(root, h('div', { class: 'gridda' },
        h('div', { class: 'card' }, h('h2', {}, 'Data files'),
            h('div', { class: 'tblwrap' }, h('table', {},
                h('tr', {}, h('th', { title: 'Overlay' }, '⧉'), h('th', {}, 'File'), h('th', {}, 'Sample')),
                inst.files.slice().reverse().map(x => h('tr', { style: x.id === f.id ? 'background:var(--accent-soft)' : '' },
                    h('td', {}, x.id === f.id ? '' : h('input', { type: 'checkbox', checked: da.overlay.has(x.id), onchange: e => { e.target.checked ? da.overlay.add(x.id) : da.overlay.delete(x.id); drawData(); } })),
                    h('td', { style: 'cursor:pointer;font-weight:600', onclick: () => { da.fileId = x.id; da.spec = null; daPlot = null; renderData(); } }, x.name.split('\\').pop() + (x.aborted ? ' ⚠' : '')),
                    h('td', { class: 'small', style: 'cursor:pointer', onclick: () => { da.fileId = x.id; da.spec = null; renderData(); } }, x.sample.slice(0, 28)))))),
            h('p', { class: 'note' }, 'Tick ⧉ to overlay other runs on the selected one.'),
            h('button', { class: 'btn sm', onclick: exportAll }, 'Export all peak tables (CSV)')),
        h('div', {},
            h('div', { class: 'card' },
                h('div', { class: 'row', style: 'justify-content:space-between' },
                    h('h2', { style: 'margin:0' }, f.name),
                    h('div', { class: 'row' },
                        select(String(da.sig), f.sigInfo.map((s, i) => [String(i), s.label]), v => { da.sig = +v; reintegrate(); }),
                        h('button', { class: 'btn sm', onclick: () => { download(csvName(f, 'signal'), signalCSV(f, da.sig)); ui.flags.exported = true; } }, 'Signal CSV'),
                        h('button', { class: 'btn sm', onclick: () => { download(csvName(f, 'peaks'), peakCSV([{ file: f, label: f.sigInfo[da.sig].label, peaks: da.res.peaks }])); ui.flags.exported = true; } }, 'Peak table CSV'))),
                h('div', { class: 'small muted' }, runSummary(f)),
                h('div', { class: 'plotbox tall' }, h('canvas', { id: 'daCv' })),
                h('div', { class: 'row', style: 'margin-top:6px' }, h('b', { class: 'small' }, 'Integration events'),
                    field('Slope sensitivity', 'slope', 0.5, 'mAU/min. 0 = set automatically from the baseline noise'),
                    field('Peak width', 'peakWidth', 0.01, 'Expected width of the narrowest peak, min'),
                    field('Area reject', 'minArea', 1, 'mAU·s'), field('Height reject', 'minHeight', 0.1, 'mAU'),
                    field('t₀', 't0', 0.01, 'Void time in min, for k′. 0 = do not calculate'),
                    h('span', { class: 'small muted', id: 'slopeUsed' }, ''))),
            h('div', { class: 'card' }, h('h2', {}, 'Peak table'), h('div', { class: 'tblwrap', id: 'peakTbl' })),
            h('div', { class: 'card' }, h('h2', {}, 'UV spectrum'),
                h('p', { class: 'note', style: 'margin-top:0', id: 'specNote' }, ''),
                h('div', { class: 'plotbox short' }, h('canvas', { id: 'specCv' }))))));
    daPlot = new Plot($('daCv'), {
        onClick: pt => { da.spec = pt.x; drawSpectrum(); drawData(); },
    });
    specPlot = new Plot($('specCv'), { xLabel: 'Wavelength (nm)', minYSpan: 1 });
    reintegrate();
}

function csvName(f, kind) { return f.name.replace(/[\\.]/g, '_') + '_' + kind + '.csv'; }

function runSummary(f) {
    const p = f.method.pump;
    const comp = [100 - p.B - p.C - p.D, p.B, p.C, p.D].map((c, i) => c > 0 ? `${c.toFixed(0)}% ${CH[i]} (${f.solvents[i]})` : '').filter(Boolean).join(' / ');
    return `${f.sample} · vial ${f.pos} · ${f.injVol} µL · ${f.method.name} · ${f.column} · ${p.flow} mL/min · ${comp}${p.timetable.length ? ' at t = 0, gradient' : ''} · ${f.method.tcc.on ? f.method.tcc.temp + ' °C' : 'ambient'} · acquired ${f.started}${f.aborted ? ' · ABORTED' : ''}`;
}

function reintegrate() {
    const f = currentFile(), da = ui.da;
    if (!f) return;
    da.res = integrate(f.t, f.sig[da.sig], da.opt);
    ui.flags.integrated = ui.flags.integrated || da.res.peaks.length > 0;
    $('slopeUsed').textContent = `slope used: ${da.res.slopeUsed.toFixed(2)} mAU/min`;
    const fx = (x, d) => x === null || x === undefined ? '—' : x.toFixed(d);
    fill($('peakTbl'), da.res.peaks.length ? h('table', {},
        h('tr', {}, ['#', 'RT (min)', 'Type', 'Width (min)', 'Area (mAU·s)', 'Height (mAU)', 'Area %', 'Symm.', 'Tailing', 'Plates', 'Rs', 'k′'].map((x, i) => h('th', { class: i ? 'num' : '' }, x))),
        da.res.peaks.map(p => h('tr', { style: 'cursor:pointer', title: 'Show the UV spectrum at this apex', onclick: () => { da.spec = p.rt; drawSpectrum(); drawData(); } },
            h('td', {}, p.num), h('td', { class: 'num' }, p.rt.toFixed(3)), h('td', { class: 'num' }, p.type), h('td', { class: 'num' }, fx(p.width, 4)),
            h('td', { class: 'num' }, p.area.toFixed(2)), h('td', { class: 'num' }, p.height.toFixed(2)), h('td', { class: 'num' }, p.areaPct.toFixed(2)),
            h('td', { class: 'num' }, fx(p.symmetry, 2)), h('td', { class: 'num' }, fx(p.tailing, 2)), h('td', { class: 'num' }, fx(p.plates, 0)),
            h('td', { class: 'num' }, fx(p.resolution, 2)), h('td', { class: 'num' }, fx(p.k, 2)))))
        : h('p', { class: 'muted' }, 'No peaks found with these integration events.'));
    drawData(); drawSpectrum();
}

function drawData() {
    const f = currentFile(), da = ui.da;
    if (!f || !daPlot) return;
    const series = [{ x: f.t, y: f.sig[da.sig], color: SIGCOL[f.sigInfo[da.sig].i], label: f.name.split('\\').pop() }];
    let n = 0;
    for (const id of da.overlay) {
        const g = inst.files.find(x => x.id === id);
        if (!g || g.id === f.id) continue;
        const j = g.sigInfo.findIndex(s => s.wl === f.sigInfo[da.sig].wl);
        series.push({ x: g.t, y: g.sig[j >= 0 ? j : 0], color: OVERCOL[n++ % OVERCOL.length], width: 1.1, label: g.name.split('\\').pop() });
    }
    daPlot.series = series; daPlot.peaks = da.res ? da.res.peaks : []; daPlot.marker = da.spec;
    daPlot.draw();
}

function drawSpectrum() {
    const f = currentFile(), da = ui.da;
    if (!f || !specPlot) return;
    if (!f.spectra) { $('specNote').textContent = 'This run was acquired with spectrum storage off, so only the signal traces exist.'; specPlot.series = []; specPlot.draw(); return; }
    if (da.spec === null) { $('specNote').textContent = 'Click a peak in the chromatogram or a row in the peak table to see the spectrum recorded at that time.'; specPlot.series = []; specPlot.draw(); return; }
    let i = 0;
    while (i < f.t.length - 1 && f.t[i] < da.spec) i++;
    const s = fileSpectrum(f, i);
    let top = 0, at = 0;
    s.a.forEach((v, k) => { if (s.wl[k] >= 210 && v > top) { top = v; at = s.wl[k]; } });
    $('specNote').textContent = `Spectrum at ${f.t[i].toFixed(3)} min` + (top > 0.5 ? `; maximum above 210 nm at ${at} nm (${top.toFixed(1)} mAU).` : '; nothing absorbing here.');
    specPlot.series = [{ x: s.wl, y: s.a, color: '#8e44ad' }];
    specPlot.draw();
}

function exportAll() {
    const entries = [];
    for (const f of inst.files) f.sigInfo.forEach((s, j) => entries.push({ file: f, label: s.label, peaks: integrate(f.t, f.sig[j], ui.da.opt).peaks }));
    download('all_peak_tables.csv', peakCSV(entries));
    ui.flags.exported = true;
}

// --------------------------------------------------------------- guide

function renderGuide() {
    const root = $('view-guide');
    if (!root.firstChild) {
        root.append(h('div', { class: 'guide' },
            h('div', { class: 'grid2' },
                h('div', { class: 'card' }, h('h2', {}, 'Pre-lab checklist'),
                    h('p', { class: 'note', style: 'margin-top:0' }, 'The simulator ticks these off by watching the instrument, not your clicks. The order is the order you would work in at the bench.'),
                    h('ul', { class: 'check', id: 'checkList' }),
                    h('div', { class: 'row', style: 'margin-top:10px' },
                        h('button', { class: 'btn warn', onclick: () => { ui.taOpen = true; tickGuide(); } }, 'Ask the TA what looks wrong'),
                        h('span', { class: 'small muted' }, 'An honest look at the hidden state: bubbles, equilibration, limits.')),
                    h('div', { id: 'taBox' })),
                h('div', { class: 'card', html: GUIDE_HTML.intro })),
            h('div', { class: 'card', html: GUIDE_HTML.experiments }),
            h('div', { class: 'card', html: GUIDE_HTML.model })));
    }
    tickGuide();
}

function tickGuide() {
    if (!$('checkList')) return;
    const items = checklist(inst, ui);
    fill($('checkList'), ...items.map(it => h('li', { class: it.done ? 'done' : '' }, h('div', { class: 'box' }, it.done ? '✓' : ''), h('div', {}, h('b', {}, it.title), h('span', { html: it.desc })))));
    if (ui.taOpen) {
        const d = diagnose(inst, ui);
        fill($('taBox'), h('div', { class: 'ta' }, h('b', {}, d.length ? 'The TA looks over your shoulder:' : 'The TA looks over your shoulder and finds nothing wrong.'),
            d.length ? h('ul', {}, d.map(x => h('li', { html: x }))) : null));
    }
}

// ---------------------------------------------------------------- loop

inst.onFile = () => { if (ui.view === 'data') renderData(); };

function tickTop() {
    $('clock').textContent = inst.clock();
    const pill = $('statusPill'), r = inst.run;
    let cls = 'ready', txt = 'Ready';
    const nr = inst.notReady();
    if (inst.error) { cls = 'error'; txt = 'Error'; }
    else if (r && (r.state === 'running' || r.state === 'drawing')) { cls = 'run'; txt = r.state === 'running' ? 'Run' : 'Injecting'; }
    else if (r && r.state === 'post') { cls = 'run'; txt = 'Post-run'; }
    else if (nr.length) { cls = 'notready'; txt = r ? 'Waiting' : 'Not ready'; }
    pill.className = 'st-' + cls; pill.textContent = txt;
    pill.title = inst.error ? inst.error.msg : nr.join('\n');
    if (inst.error && ui.shownError !== inst.error) {
        ui.shownError = inst.error;
        notice(inst.error.module + ' error', inst.error.msg + '<p class="note">The error is in the logbook. Fix the cause, then switch the pump on again to clear it.</p>');
    }
}

let last = performance.now(), acc = 0, uiT = 0;
function frame(now) {
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    acc += dt * ui.speed;
    let n = Math.floor(acc / DT);
    acc -= n * DT;
    n = Math.min(n, 2500);
    for (let i = 0; i < n; i++) inst.step();
    if (ui.view === 'control') drawOnline();
    if (now - uiT > 250) {
        uiT = now;
        tickTop();
        if (ui.view === 'control') tickControl();
        else if (ui.view === 'bench') tickBench();
        else if (ui.view === 'guide') tickGuide();
    }
    requestAnimationFrame(frame);
}
window.addEventListener('resize', () => { if (ui.view === 'data') { drawData(); drawSpectrum(); } });
renderGuide();
tickTop();
requestAnimationFrame(frame);
