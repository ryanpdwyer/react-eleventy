/**
 * HPLC simulator: instrument model
 *
 * A time-stepped model of a 1260 Infinity II style stack: quaternary pump
 * with low-pressure mixing, vial sampler, column compartment and diode
 * array detector. Nothing is precomputed. Liquid is tracked from the
 * solvent bottles through the inlet lines, the mixer and the dwell volume
 * into the column, and each injected compound is a band that migrates at
 * u/(1+k) where k comes from whatever mobile phase is at the band's
 * position right now. So changing composition mid-run, injecting before the
 * column is equilibrated, leaving the purge valve open, or pumping air all
 * have the consequences they would have on the bench.
 *
 * Units: time s (method times in min), volume mL, flow mL/min, pressure bar,
 * absorbance mAU, amounts mol.
 */
import * as chem from './hplc-sim-chem.js';
import { W, M, A, PHOS, CIT, AIR, NC, props } from './hplc-sim-chem.js';

export const DT = 0.1;            // s per step
const LINE_VOL = 4.0;             // bottle to pump head, including degasser chamber
const DWELL = 0.90;               // pump mixing point to column inlet
const VMIX = 0.30;                // effective mixing volume
const BIN = 0.01, RING = 1024;    // composition history, 10 uL resolution
const AMBIENT = 23;
const EC_SIGMA = 0.006;           // extra-column band spreading, mL
const STRAY = 1e-3;               // stray light fraction: response rolls off above ~2 AU
const CH = ['A', 'B', 'C', 'D'];

export const PEAKWIDTHS = [
    { label: '> 0.025 min (0.5 s response, 10 Hz)', rt: 0.5, every: 1 },
    { label: '> 0.05 min (1 s response, 5 Hz)', rt: 1, every: 2 },
    { label: '> 0.1 min (2 s response, 2.5 Hz)', rt: 2, every: 4 },
    { label: '> 0.2 min (4 s response, 1.25 Hz)', rt: 4, every: 8 },
    { label: '> 0.4 min (8 s response, 0.62 Hz)', rt: 8, every: 16 },
];

export function defaultMethod() {
    return {
        name: 'DEF_LC.M',
        pump: { flow: 1.0, B: 50, C: 0, D: 0, timetable: [], stopTime: 10, postTime: 0, pmax: 400, pmin: 0 },
        sampler: { injVol: 10, wash: true },
        tcc: { on: true, temp: 30 },
        dad: {
            signals: [
                { on: true, wl: 254, bw: 4, ref: true, rwl: 360, rbw: 100 },
                { on: false, wl: 210, bw: 4, ref: true, rwl: 360, rbw: 100 },
                { on: false, wl: 280, bw: 4, ref: true, rwl: 360, rbw: 100 },
            ],
            pw: 2, spectra: 'all', autobalance: true,
        },
    };
}

const AIRVEC = chem.mixOf({ [AIR]: 1 });
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const sat = a => -Math.log10(Math.pow(10, -a) + STRAY);

export class Instrument {
    constructor() {
        this.t = 0;
        this.clock0 = 8.5 * 3600;      // 08:30:00
        this.log = [];
        this.error = null;
        this.files = [];
        this.fileCounter = 0;
        this.onFile = null;

        const water = chem.makeSolvent({ kind: 'water' });
        const meoh = chem.makeSolvent({ kind: 'meoh' });
        this.bottles = [
            { solvent: water, vol: 850, cap: 1000 },
            { solvent: meoh, vol: 700, cap: 1000 },
            { solvent: chem.makeSolvent({ kind: 'acn' }), vol: 900, cap: 1000 },
            { solvent: water, vol: 400, cap: 1000 },
        ];
        // Overnight: bubbles have grown at the front of A and B; C and D were left dry.
        this.lines = [
            [{ vec: AIRVEC, vol: 0.35 }, { vec: water.vec, vol: LINE_VOL - 0.35 }],
            [{ vec: AIRVEC, vol: 0.5 }, { vec: meoh.vec, vol: LINE_VOL - 0.5 }],
            [{ vec: AIRVEC, vol: LINE_VOL }],
            [{ vec: AIRVEC, vol: LINE_VOL }],
        ];
        this.waste = 0;

        this.method = defaultMethod();
        this.pump = {
            power: 'standby', flowSet: 1.0, comp: [50, 50, 0, 0], flow: 0, flowEff: 0,
            purgeOpen: false, pressure: 0, pShown: 0, head: 0, pmax: 400, pmin: 0, lowT: 0,
            purged: [0, 0, 0, 0],
        };
        const storage = chem.mixOf({ [W]: 0.3, [M]: 0.7 });
        this.mixer = new Float64Array(storage);
        this.snap = storage;
        this.initMix = storage;
        this.ring = new Array(RING).fill(storage);
        this.vcol = 0; this.lastBin = -1;
        this.vSinceChange = 0;

        this.column = { type: chem.COLUMNS[0], health: 1, clog: 0, slowPhi: 0.7, hot: 0, injections: 0 };
        this.vm = chem.columnVolume(this.column.type);
        this.eta = 1; this.etaTick = 0;

        this.tcc = { on: false, set: 30, temp: AMBIENT };
        this.dad = {
            lamp: 'off', lampT: 0, age: 0, sigVer: 1,
            filt: [0, 0, 0], offset: [0, 0, 0], value: [0, 0, 0], wander: [0, 0, 0],
        };
        this.sampler = { vials: {}, wash: true, injVol: 10, carry: {}, busy: false };
        this.bands = [];
        this.run = null;
        this.seq = null;
        this.online = { t: [], p: [], sig: [[], [], []], tick: 0 };
        this.applyMethod(this.method, true);
        this.say('System', 'Modules powered on. Pump in standby, lamp off.');
    }

    // ----------------------------------------------------------- logbook

    clock(t = this.t) {
        const s = Math.floor(this.clock0 + t);
        const p = n => String(n).padStart(2, '0');
        return `${p(Math.floor(s / 3600) % 24)}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
    }

    say(module, msg, level = 'info') {
        this.log.push({ t: this.t, clock: this.clock(), module, msg, level });
        if (this.log.length > 400) this.log.shift();
    }

    fail(module, msg, stopPump) {
        this.error = { module, msg };
        this.say(module, 'ERROR: ' + msg, 'error');
        if (stopPump) { this.pump.power = 'standby'; }
        if (this.run) this.finishRun(true);
        if (this.seq) { this.say('Sequence', 'Sequence aborted.', 'error'); this.seq = null; }
    }

    clearError() {
        if (!this.error) return;
        this.say(this.error.module, 'Error cleared.');
        this.error = null;
    }

    // ------------------------------------------------------------- bench

    setBottle(ch, spec, vol = 1000) {
        const solvent = chem.makeSolvent(spec);
        this.bottles[ch] = { solvent, vol, cap: 1000 };
        // lifting the inlet filter out of one bottle and into another lets a little air in
        this.lines[ch].push({ vec: AIRVEC, vol: 0.12 });
        this.trimLine(ch);
        this.pump.purged[ch] = 0;
        this.say('Bench', `Channel ${CH[ch]}: new bottle, ${solvent.name}.`);
    }

    refillBottle(ch) {
        this.bottles[ch].vol = this.bottles[ch].cap;
        this.say('Bench', `Channel ${CH[ch]}: bottle refilled.`);
    }

    trimLine(ch) {
        const line = this.lines[ch];
        let total = 0;
        for (const s of line) total += s.vol;
        let extra = total - LINE_VOL;
        while (extra > 1e-9 && line.length) {
            if (line[0].vol <= extra) { extra -= line[0].vol; line.shift(); }
            else { line[0].vol -= extra; extra = 0; }
        }
    }

    /** What a channel's inlet line holds: fraction that is air, fraction that is not the bottle's solvent */
    lineState(ch) {
        let air = 0, stale = 0;
        const want = this.bottles[ch].solvent.vec;
        for (const s of this.lines[ch]) {
            if (s.vec === AIRVEC) air += s.vol;
            else if (s.vec !== want) stale += s.vol;
        }
        return { air: air / LINE_VOL, stale: stale / LINE_VOL };
    }

    setPurge(open) {
        if (this.pump.purgeOpen === open) return;
        this.pump.purgeOpen = open;
        this.say('Bench', open ? 'Purge valve opened (flow goes to waste).' : 'Purge valve closed (flow goes to the column).');
    }

    installColumn(id) {
        const type = chem.COLUMNS.find(c => c.id === id);
        this.column = { type, health: 1, clog: 0, slowPhi: 0.7, hot: 0, injections: 0 };
        this.vm = chem.columnVolume(type);
        this.bands = [];
        // a new column arrives filled with its storage solvent
        this.ring.fill(this.initMix);
        this.vSinceChange = 0;
        this.say('Bench', `Column installed: ${type.name}.`);
    }

    placeVial(pos, vial) { this.sampler.vials[pos] = vial; }
    removeVial(pos) { delete this.sampler.vials[pos]; }

    // ------------------------------------------------------ module control

    pumpPower(state) {
        if (this.error && state === 'on') this.clearError();
        if (this.pump.power === state) return;
        this.pump.power = state;
        this.say('Pump', state === 'on' ? `Pump on, ${this.pump.flowSet.toFixed(3)} mL/min.` : 'Pump ' + state + '.');
    }

    lampPower(on) {
        const d = this.dad;
        if (on && d.lamp === 'off') { d.lamp = 'igniting'; d.lampT = 15; this.say('DAD', 'UV lamp ignition.'); }
        if (!on && d.lamp !== 'off') { d.lamp = 'off'; this.say('DAD', 'UV lamp off.'); }
    }

    tccPower(on) {
        if (this.tcc.on === on) return;
        this.tcc.on = on;
        this.say('Column comp.', on ? `Temperature control on, ${this.tcc.set.toFixed(1)} °C.` : 'Temperature control off.');
    }

    /** Send method setpoints to the modules */
    applyMethod(m, quiet) {
        this.method = JSON.parse(JSON.stringify(m));
        const p = this.method.pump;
        const comp = [100 - p.B - p.C - p.D, p.B, p.C, p.D];
        if (comp.some((c, i) => Math.abs(c - this.pump.comp[i]) > 0.05)) this.vSinceChange = 0;
        this.pump.comp = comp;
        this.pump.flowSet = p.flow;
        this.pump.pmax = p.pmax; this.pump.pmin = p.pmin;
        this.tcc.set = this.method.tcc.temp;
        if (!quiet) this.tcc.on = this.method.tcc.on;
        this.sampler.wash = this.method.sampler.wash;
        this.sampler.injVol = this.method.sampler.injVol;
        this.dad.sigVer++;
        for (const b of this.bands) this.bandEps(b);
        if (!quiet) this.say('Method', `${this.method.name} sent to instrument.`);
    }

    balance() {
        for (let i = 0; i < 3; i++) this.dad.offset[i] = this.dad.filt[i];
        this.say('DAD', 'Balance.');
    }

    notReady() {
        const r = [];
        if (this.error) r.push(`${this.error.module}: error`);
        if (this.pump.power !== 'on') r.push('Pump: ' + this.pump.power);
        else if (Math.abs(this.pump.flow - this.pump.flowSet) > 0.005) r.push('Pump: flow ramp');
        if (this.tcc.on && Math.abs(this.tcc.temp - this.tcc.set) > 0.5) r.push('Column comp.: temperature');
        if (this.dad.lamp !== 'on') r.push('DAD: UV lamp ' + (this.dad.lamp === 'off' ? 'off' : 'igniting'));
        return r;
    }

    moduleStatus() {
        const run = this.run && (this.run.state === 'running' || this.run.state === 'drawing');
        const err = this.error ? this.error.module : null;
        const st = (bad, name) => err === name ? 'error' : bad ? 'notready' : run ? 'run' : 'ready';
        const P = this.pump;
        return {
            pump: P.power === 'off' ? 'off' : st(P.power !== 'on' || Math.abs(P.flow - P.flowSet) > 0.005, 'Pump'),
            sampler: st(false, 'Sampler'),
            tcc: st(this.tcc.on && Math.abs(this.tcc.temp - this.tcc.set) > 0.5, 'Column comp.'),
            dad: st(this.dad.lamp !== 'on', 'DAD'),
        };
    }

    // ------------------------------------------------------------- runs

    /** opts: { pos, sample, method?, injVol? } */
    startRun(opts) {
        if (this.run) return false;
        if (opts.method) this.applyMethod(opts.method);
        this.run = {
            state: 'waiting', pos: opts.pos, sample: opts.sample || '', timer: 0, t0: 0,
            injVol: opts.injVol || this.method.sampler.injVol, file: null, tick: 0, blank: !!opts.blank,
        };
        this.say('Run', `Run requested: ${opts.blank ? 'no injection (blank run)' : 'vial ' + opts.pos}${opts.sample ? ', ' + opts.sample : ''}.`);
        return true;
    }

    /** lines: [{ pos, sample, method, injVol, injections }] */
    startSequence(name, lines) {
        if (this.run || this.seq || !lines.length) return false;
        this.seq = { name, lines, idx: 0, inj: 1 };
        this.say('Sequence', `Sequence ${name} started, ${lines.length} line(s).`);
        this.nextSeqLine();
        return true;
    }

    nextSeqLine() {
        const s = this.seq;
        if (!s) return;
        if (s.idx >= s.lines.length) {
            this.say('Sequence', `Sequence ${s.name} finished.`);
            this.seq = null;
            return;
        }
        const ln = s.lines[s.idx];
        this.startRun({ pos: ln.pos, sample: ln.sample, method: ln.method, injVol: ln.injVol });
    }

    stop() {
        if (this.seq) { this.say('Sequence', 'Sequence stopped by user.', 'warn'); this.seq = null; }
        if (this.run) {
            if (this.run.state === 'running') this.finishRun(true);
            else { this.run = null; this.say('Run', 'Run cancelled.', 'warn'); }
        }
    }

    bandEps(b) {
        if (!b.cmpd) return;
        const sig = this.method.dad.signals;
        b.eps = sig.map(s => chem.epsilonBand(b.cmpd, s.wl, s.bw));
        b.epsR = sig.map(s => s.ref ? chem.epsilonBand(b.cmpd, s.rwl, Math.min(s.rbw, 40)) : 0);
    }

    doInject() {
        const r = this.run, S = this.sampler;
        const vial = S.vials[r.pos];
        const inlet = props(this.mixAt(DWELL));
        const T = this.tcc.temp, col = this.column.type;
        const newBands = [];
        if (!r.blank) {
            const set = r.injVol;
            const rsd = set >= 5 ? 0.0025 : set >= 2 ? 0.005 : set >= 1 ? 0.01 : 0.025;
            let vol = set * (1 + rsd * chem.gaussRandom());
            const avail = Math.max(0, vial.vol - 25);          // needle cannot reach the last ~25 uL
            if (avail < vol) vol = avail;
            vial.vol = Math.max(0, vial.vol - set);
            const dil = props(chem.mixOf({ [W]: 1 - vial.dil.m - vial.dil.a, [M]: vial.dil.m, [A]: vial.dil.a }));
            const amounts = {};
            for (const c of vial.comps) amounts[c.id] = (amounts[c.id] || 0) + c.gL / chem.BY_ID[c.id].mw * vol * 1e-6;
            for (const id in S.carry) {
                if (S.carry[id] > 1e-16) amounts[id] = (amounts[id] || 0) + S.carry[id];
            }
            const carry = {};
            const frac = S.wash ? 3e-5 : 6e-4;
            for (const id in amounts) {
                const cmpd = chem.BY_ID[id], n = amounts[id];
                carry[id] = n * frac;
                const kmp = chem.retention(cmpd, inlet, T, col).k;
                const kdil = chem.retention(cmpd, dil, T, col).k;
                const focus = clamp((1 + kmp) / (1 + kdil), 0.05, 30);
                const b = {
                    cmpd, n, x: 0, k: kmp, frozen: false, done: false, c: 0, v: -1,
                    injSig: (set / 1000) / Math.sqrt(12) * focus,
                    load: n * cmpd.mw * 1e6, sig: 0.03, tau: 0.003, wtick: 0, trace: [],
                };
                this.bandEps(b);
                newBands.push(b);
            }
            S.carry = carry;
            // solvent mismatch disturbance at the void volume
            const dphi = dil.org - inlet.org;
            const amp = clamp(0.5 * set * dphi, -40, 40);
            if (Math.abs(amp) > 0.02) {
                newBands.push({
                    cmpd: null, n: 0, x: 0, k: 0, frozen: true, done: false, c: 0, v: -1, amp,
                    sig: Math.hypot(this.vm / 70, (set / 1000) / 3, EC_SIGMA), tau: 0, trace: [],
                });
            }
            this.column.injections++;
            this.pump.pressure *= 0.975;                      // valve switch
        }
        for (const b of newBands) this.bands.push(b);
        const m = this.method;
        const sigs = m.dad.signals.map((s, i) => ({ ...s, i })).filter(s => s.on);
        this.fileCounter++;
        const seq = this.seq;
        r.file = {
            id: this.fileCounter,
            name: (seq ? `${seq.name}\\` : '') + String(this.fileCounter).padStart(3, '0') + '-' + (r.blank ? 'NOINJ' : r.pos) + '.D',
            sample: r.sample || (vial ? vial.label : 'no injection'), pos: r.blank ? '-' : r.pos, injVol: r.blank ? 0 : r.injVol,
            method: JSON.parse(JSON.stringify(m)), seq: seq ? seq.name : null,
            started: this.clock(), column: this.column.type.name,
            solvents: this.bottles.map(b => b.solvent.name),
            t: [], p: [], sig: sigs.map(() => []),
            sigInfo: sigs.map(s => ({
                i: s.i, wl: s.wl,
                label: `DAD1 ${CH[s.i]}, Sig=${s.wl},${s.bw} Ref=${s.ref ? s.rwl + ',' + s.rbw : 'off'}`,
            })),
            bands: this.bands.filter(b => b.cmpd && !b.done),
            spectra: m.dad.spectra === 'all', aborted: false,
        };
        for (const b of r.file.bands) b.trace = [];
        r.sigIdx = sigs.map(s => s.i);
        r.every = PEAKWIDTHS[m.dad.pw].every;
        r.state = 'running'; r.t0 = this.t; r.tick = 0;
        if (m.dad.autobalance) for (let i = 0; i < 3; i++) this.dad.offset[i] = this.dad.filt[i];
        this.say('Run', `Injection${r.blank ? ' skipped' : ''}; run started, data file ${r.file.name}.`);
    }

    finishRun(aborted) {
        const r = this.run;
        if (r && r.file) {
            const f = r.file;
            f.aborted = !!aborted;
            f.bands = f.bands.map(b => ({ id: b.cmpd.id, name: b.cmpd.name, n: b.n, trace: Float32Array.from(b.trace) }));
            f.t = Float32Array.from(f.t); f.p = Float32Array.from(f.p);
            f.sig = f.sig.map(s => Float32Array.from(s));
            this.files.push(f);
            this.say('Run', aborted ? `Run aborted at ${((this.t - r.t0) / 60).toFixed(2)} min; partial data saved.` : `Run finished, ${f.name} saved.`, aborted ? 'warn' : 'info');
            if (this.onFile) this.onFile(f);
        }
        // back to initial conditions
        const p = this.method.pump;
        this.pump.comp = [100 - p.B - p.C - p.D, p.B, p.C, p.D];
        this.pump.flowSet = p.flow;
        if (aborted || !r) { this.run = null; return; }
        if (p.postTime > 0) {
            r.state = 'post'; r.timer = p.postTime * 60; r.file = null;
            this.say('Run', `Post-run, ${p.postTime} min.`);
        } else this.endRun();
    }

    endRun() {
        this.run = null;
        if (this.seq) {
            const s = this.seq, ln = s.lines[s.idx];
            if (s.inj < (ln.injections || 1)) s.inj++;
            else { s.idx++; s.inj = 1; }
            this.nextSeqLine();
        }
    }

    stepRun() {
        const r = this.run;
        if (!r) return;
        if (r.state === 'waiting') {
            if (this.notReady().length) return;
            if (!r.blank && !this.sampler.vials[r.pos]) {
                this.fail('Sampler', `Missing vial at ${r.pos}.`, false);
                return;
            }
            r.state = 'drawing';
            r.timer = r.blank ? 1 : 18 + (this.sampler.wash ? 9 : 0);
            if (!r.blank) this.say('Sampler', `Vial ${r.pos}: ${this.sampler.wash ? 'needle wash, ' : ''}draw ${r.injVol} µL.`);
        } else if (r.state === 'drawing') {
            r.timer -= DT;
            if (r.timer <= 0) this.doInject();
        } else if (r.state === 'running') {
            const tm = (this.t - r.t0) / 60, p = this.method.pump;
            const tt = p.timetable;
            if (tt.length) {
                let b = p.B, c = p.C, d = p.D, f = p.flow, t0 = 0;
                for (const row of tt) {
                    const rf = row.flow > 0 ? row.flow : f;
                    if (tm >= row.t) { b = row.B; c = row.C; d = row.D; f = rf; t0 = row.t; continue; }
                    const u = (tm - t0) / Math.max(1e-9, row.t - t0);
                    b += (row.B - b) * u; c += (row.C - c) * u; d += (row.D - d) * u; f += (rf - f) * u;
                    break;
                }
                this.pump.comp = [100 - b - c - d, b, c, d];
                this.pump.flowSet = f;
            }
            if (r.tick % r.every === 0) {
                const f = r.file;
                f.t.push(tm); f.p.push(this.pump.pShown);
                for (let j = 0; j < r.sigIdx.length; j++) f.sig[j].push(this.dad.value[r.sigIdx[j]]);
                if (f.spectra) for (const b of f.bands) b.trace.push(b.done ? 0 : b.c);
            }
            r.tick++;
            if (tm >= p.stopTime) this.finishRun(false);
        } else if (r.state === 'post') {
            r.timer -= DT;
            if (r.timer <= 0) this.endRun();
        }
    }

    // ----------------------------------------------------------- hydraulics

    mixAt(vback) {
        const idx = Math.floor((this.vcol - vback) / BIN);
        if (idx < 0 || idx <= this.lastBin - RING) return this.initMix;
        return this.ring[idx % RING];
    }

    stepPump() {
        const P = this.pump;
        const target = (P.power === 'on' && !this.error) ? P.flowSet : 0;
        P.flow += clamp(target - P.flow, -0.17, 0.17);
        const dv = P.flow * DT / 60;
        let air = 0;
        if (dv > 0) {
            // draw from the four inlet lines in proportion
            const inp = this.inp || (this.inp = new Float64Array(NC));
            inp.fill(0);
            for (let ch = 0; ch < 4; ch++) {
                const want = dv * P.comp[ch] / 100;
                if (want <= 0) continue;
                const line = this.lines[ch], bottle = this.bottles[ch];
                let need = want;
                while (need > 1e-12 && line.length) {
                    const s = line[0], take = Math.min(need, s.vol);
                    const f = take / dv;
                    for (let i = 0; i < NC; i++) inp[i] += s.vec[i] * f;
                    s.vol -= take; need -= take;
                    if (s.vol <= 1e-12) line.shift();
                }
                // refill the far end of the line from the bottle (or with air once it is empty)
                const got = Math.min(want, bottle.vol);
                const push = (vec, vol) => {
                    if (vol <= 0) return;
                    const last = line[line.length - 1];
                    if (last && last.vec === vec) last.vol += vol; else line.push({ vec, vol });
                };
                push(bottle.solvent.vec, got);
                push(AIRVEC, want - got);
                if (bottle.vol > 0 && bottle.vol - got <= 0) this.say('Bench', `Solvent bottle ${CH[ch]} is empty.`, 'warn');
                bottle.vol -= got;
                if (P.purgeOpen) P.purged[ch] += want;
            }
            air = inp[AIR];
            // air that reaches the pump head stays there until it is purged out
            if (P.purgeOpen) P.head = clamp(P.head + air * dv / 0.3 - dv * (1 - air) / 1.2, 0, 1);
            else P.head = clamp(P.head + air * dv / 0.35 - DT / 1500, 0, 1);
            const a = 1 - Math.exp(-dv / VMIX), mx = this.mixer;
            let liq = inp[W] + inp[M] + inp[A];
            if (liq > 1e-6) for (let i = 0; i < NC; i++) mx[i] += (inp[i] - mx[i]) * a;
            // buffer salts coming out of solution where they meet organic
            const org = mx[M] + mx[A];
            if (org > 0.5 && (mx[PHOS] + mx[CIT]) > 0 && !P.purgeOpen) {
                const sol = 0.060 * Math.pow(10, -(3.2 * mx[A] + 2.2 * mx[M]) * (org - 0.5) / org);
                const salt = mx[PHOS] + mx[CIT];
                if (salt > sol) this.column.clog += Math.min(1, (salt - sol) / sol) * dv * 0.6;
            }
        } else if (!P.purgeOpen) P.head = Math.max(0, P.head - DT / 1500);

        const eff = P.flow * (1 - air) * (1 - 0.85 * P.head);
        P.flowEff = P.purgeOpen ? 0 : eff;
        const dvc = P.flowEff * DT / 60;
        if (P.purgeOpen) this.waste += dv;
        else {
            this.waste += dvc;
            this.vcol += dvc; this.vSinceChange += dvc;
            const bin = Math.floor(this.vcol / BIN);
            if (bin > this.lastBin) {
                let changed = false;
                const mx = this.mixer, sn = this.snap;
                for (let i = 0; i < NC; i++) if (Math.abs(mx[i] - sn[i]) > 2e-6) { changed = true; break; }
                if (changed) this.snap = new Float64Array(mx);
                while (this.lastBin < bin) { this.lastBin++; this.ring[this.lastBin % RING] = this.snap; }
            }
        }

        // viscosity and slow stationary-phase state, sampled along the column
        if (this.etaTick-- <= 0) {
            this.etaTick = 4;
            let e = 0, o = 0;
            for (let j = 0; j < 5; j++) {
                const p = props(this.mixAt(DWELL + (0.1 + 0.2 * j) * this.vm));
                e += chem.viscosity(p, this.tcc.temp); o += p.org;
            }
            this.eta = e / 5; this.orgAvg = o / 5;
            this.etaTube = chem.viscosity(props(this.mixAt(0)), AMBIENT);
            // dissolved salts wash back out with plain water
            const pin = props(this.mixAt(DWELL));
            if (this.column.clog > 0 && pin.org < 0.1 && pin.salt < 1e-4) this.column.clog *= Math.exp(-dvc * 5 / 15);
        }
        this.column.slowPhi += (this.orgAvg - this.column.slowPhi) * (1 - Math.exp(-dvc / (3 * this.vm)));

        let pt;
        const col = this.column;
        if (P.purgeOpen) pt = 0.7 * eff * this.etaTube;
        else {
            const pc = chem.columnPressure(col.type, eff, this.eta) * (1 + col.clog) * (1 + 0.3 * (1 - col.health));
            pt = pc + 5.5 * eff * this.etaTube;
            if (pc > col.type.pmax * 1.03) {
                col.hot += DT;
                if (col.hot > 6 && col.health > 0.5) {
                    col.health *= 0.72; col.hot = -60;      // bed disturbed: lower efficiency, tailing
                }
            } else if (col.hot > 0) col.hot = Math.max(0, col.hot - DT);
        }
        P.pressure += (pt - P.pressure) * (1 - Math.exp(-DT / 4));
        const ripple = (0.0012 + 0.35 * P.head) * (Math.sin(this.t * 2.1 * Math.max(0.2, P.flow)) + 0.3 * chem.gaussRandom());
        P.pShown = Math.max(0, P.pressure * (1 + ripple));

        if (P.power === 'on' && !this.error) {
            if (P.pShown > P.pmax) this.fail('Pump', `Pressure above upper limit (${P.pmax} bar). Pump stopped.`, true);
            else if (P.pmin > 0 && Math.abs(P.flow - P.flowSet) < 0.005 && P.pShown < P.pmin) {
                P.lowT += DT;
                if (P.lowT > 30) { P.lowT = 0; this.fail('Pump', `Pressure below lower limit (${P.pmin} bar). Pump stopped.`, true); }
            } else P.lowT = 0;
        }
        return dvc;
    }

    // ------------------------------------------------- column and detector

    stepBands(dvc) {
        const vm = this.vm, col = this.column, T = this.tcc.temp;
        const flow = this.pump.flowEff;
        let any = false;
        for (const b of this.bands) {
            if (b.done) { any = true; continue; }
            if (b.x < 1 && b.cmpd) {
                const p = props(this.mixAt(DWELL + b.x * vm));
                const r = chem.retention(b.cmpd, p, T, col.type, col.slowPhi);
                b.k = r.k;
                if (flow > 0.01 && b.wtick-- <= 0) {
                    b.wtick = 5;
                    const eta = chem.viscosity(p, T);
                    const N = chem.plateNumber(col.type, flow, chem.diffusion(b.cmpd, p, T, eta)) * col.health;
                    const vr = vm * (1 + r.k), sc = vr / Math.sqrt(N);
                    const ws = 2.0 * (vm / 1.5) / (1 + 19 * Math.max(r.partial > 0.02 ? 1 : 0, r.baseIon));  // mg capacity
                    const over = 0.25 * vm * r.k * (b.load / 1000) / ws;
                    const silanol = (b.cmpd.sil || 0) * r.baseIon * (0.15 + 0.85 / (1 + Math.pow(10, 4.5 - p.pH)));
                    const weak = r.partial * Math.max(0, 1 - p.beta / 1e-3);
                    b.sig = Math.sqrt(sc * sc + EC_SIGMA * EC_SIGMA + b.injSig * b.injSig + over * over);
                    b.tau = sc * (0.10 + 0.9 * silanol + 1.5 * weak + 1.6 * (1 / col.health - 1)) + over + 0.003;
                }
            }
            b.x += dvc / (vm * (1 + b.k));
            const v = (b.x - 1) * vm * (1 + b.k);
            b.v = v;
            if (v < -6 * b.sig) { b.c = 0; continue; }
            if (v > 6 * b.sig + 14 * b.tau) { b.done = true; b.c = 0; any = true; continue; }
            if (b.cmpd) b.c = b.n * chem.emg(v, b.sig, b.tau) * 1000;          // mol/L in the cell
            else { const z = v / b.sig; b.c = -z * Math.exp(0.5 - 0.5 * z * z); }
        }
        if (any && !this.run) this.bands = this.bands.filter(b => !b.done);
        else if (any && this.bands.length > 60) this.bands = this.bands.filter(b => !b.done || (this.run.file && this.run.file.bands.includes(b)));
    }

    stepDetector() {
        const d = this.dad, sig = this.method.dad.signals;
        if (d.lamp === 'igniting') {
            d.lampT -= DT;
            if (d.lampT <= 0) { d.lamp = 'on'; d.age = 0; this.say('DAD', 'UV lamp on.'); }
        }
        if (d.lamp !== 'on') {
            for (let i = 0; i < 3; i++) d.value[i] = 0;
            return;
        }
        d.age += DT;
        const drift = 3.2 * Math.exp(-d.age / 420);
        const mix = this.mixAt(DWELL + this.vm);
        let bg = mix._bg;
        if (!bg || bg.ver !== d.sigVer) {
            bg = mix._bg = { ver: d.sigVer, s: [0, 0, 0], r: [0, 0, 0] };
            for (let i = 0; i < 3; i++) {
                bg.s[i] = chem.mobilePhaseAbs(mix, sig[i].wl);
                bg.r[i] = sig[i].ref ? chem.mobilePhaseAbs(mix, sig[i].rwl) : 0;
            }
        }
        const rt = PEAKWIDTHS[this.method.dad.pw].rt;
        const a = 1 - Math.exp(-DT / (rt / 2.2));
        const head = this.pump.head;
        const spike = (head > 0.05 && this.pump.flowEff > 0 && Math.random() < head * 0.02) ? (Math.random() - 0.3) * 60 * head : 0;
        for (let i = 0; i < 3; i++) {
            if (!sig[i].on) { d.value[i] = 0; continue; }
            let as = bg.s[i], ar = bg.r[i], blip = 0;
            for (const b of this.bands) {
                if (b.c === 0) continue;
                if (b.cmpd) { as += b.c * b.eps[i]; ar += b.c * b.epsR[i]; }
                else blip += b.c * b.amp;
            }
            const ref = sig[i].ref;
            let y = 1000 * (sat(as) - (ref ? sat(ar) : 0)) + drift * (ref ? 0.08 : 1) + blip + spike;
            d.wander[i] += -d.wander[i] * DT / 40 + 0.0025 * (ref ? 1 : 2.5) * chem.gaussRandom();
            // shot noise: less light through an absorbing mobile phase or a strongly absorbing peak
            const light = Math.min(300, Math.pow(10, Math.min(as, 2.5)));
            const sd = 0.004 * Math.sqrt(2 / rt) * Math.sqrt(4 / sig[i].bw) * Math.sqrt(light) * (ref ? 1.1 : 1);
            y += d.wander[i] + sd * Math.sqrt((2 - a) / a) * chem.gaussRandom();
            d.filt[i] += (y - d.filt[i]) * a;
            d.value[i] = d.filt[i] - d.offset[i];
        }
    }

    /** UV spectrum (mAU) of what is in the flow cell right now, 190-400 nm */
    liveSpectrum(step = 2) {
        const out = [];
        for (let wl = 190; wl <= 400; wl += step) {
            let a = 0;
            for (const b of this.bands) if (b.cmpd && b.c > 0) a += b.c * chem.epsilon(b.cmpd, wl);
            out.push(1000 * a);
        }
        return out;
    }

    // -------------------------------------------------------------- step

    step() {
        this.t += DT;
        const dvc = this.stepPump();
        const T = this.tcc;
        if (T.on) T.temp += (T.set - T.temp) * (1 - Math.exp(-DT / 75));
        else T.temp += (AMBIENT - T.temp) * (1 - Math.exp(-DT / 400));
        this.stepBands(dvc);
        this.stepDetector();
        this.stepRun();
        const o = this.online;
        if (o.tick++ % 5 === 0) {
            o.t.push(this.t / 60); o.p.push(this.pump.pShown);
            for (let i = 0; i < 3; i++) o.sig[i].push(this.dad.value[i]);
            if (o.t.length > 9000) {
                o.t.splice(0, 1800); o.p.splice(0, 1800);
                for (let i = 0; i < 3; i++) o.sig[i].splice(0, 1800);
            }
        }
    }

    advance(seconds) {
        const n = Math.round(seconds / DT);
        for (let i = 0; i < n; i++) this.step();
    }

    /** Volume pumped through the column since the composition setpoint last changed, in column volumes */
    equilibration() { return this.vSinceChange / this.vm; }
    runTime() { return this.run && this.run.state === 'running' ? (this.t - this.run.t0) / 60 : null; }
}

/** UV spectrum (mAU) stored in a data file at sample index i */
export function fileSpectrum(file, i, step = 2) {
    const wl = [], a = [];
    for (let l = 190; l <= 400; l += step) {
        let s = 0;
        for (const b of file.bands) {
            const c = b.trace[i] || 0;
            if (c > 0) s += c * chem.epsilon(chem.BY_ID[b.id], l);
        }
        wl.push(l); a.push(1000 * s + 0.02 * chem.gaussRandom());
    }
    return { wl, a };
}
