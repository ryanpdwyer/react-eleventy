/**
 * HPLC simulator: hands-on procedures
 *
 * Step-by-step routines for the Bench view. Each step says what to do and
 * why, points at the part of the instrument involved, and is ticked off by
 * the state of the instrument itself. Steps are taken in order; once a step
 * has been passed it stays passed.
 *
 * A step: { title, why, focus, done(inst, ctx), status(inst, ctx), actions }
 * actions: [{ label, run(inst, ctx) }] are the software commands the step
 * needs, so the whole routine can be done without leaving the Bench.
 */
import { props } from './hplc-sim-chem.js';

const CH = ['A', 'B', 'C', 'D'];
const clean = (inst, c) => { const s = inst.lineState(c); return s.air < 0.005 && s.stale < 0.005; };
const lineText = (inst, c) => {
    const s = inst.lineState(c);
    return s.air > 0.005 ? `air in ${(100 * s.air).toFixed(0)}% of the line` : s.stale > 0.005 ? `old solvent in ${(100 * s.stale).toFixed(0)}% of the line` : 'line is clear';
};
const only = c => [0, 1, 2, 3].map(i => i === c ? 100 : 0);
const methodComp = inst => { const p = inst.method.pump; return [100 - p.B - p.C - p.D, p.B, p.C, p.D]; };
const atMethod = inst => inst.pump.flowSet === inst.method.pump.flow && methodComp(inst).every((c, i) => Math.abs(c - inst.pump.comp[i]) < 0.05);
const outlet = inst => props(inst.mixAt(0.9 + inst.vm));
const delivered = inst => props(inst.snap);

function purgeSteps(c, first) {
    const steps = [{
        title: `Set 5 mL/min, 100% ${CH[c]}`,
        why: 'A purge needs a fast flow of one channel at a time, so each inlet line is swept on its own.',
        focus: 'pump',
        actions: [{ label: `Set 5 mL/min, 100% ${CH[c]}`, run: inst => inst.setPumpManual(5, only(c)) }],
        done: inst => inst.pump.flowSet >= 3 && inst.pump.comp[c] > 99.9,
    }];
    if (first) steps.push({
        title: 'Switch the pump on',
        why: 'With the valve open the pressure should stay at a few bar. If it climbs, the valve is not open.',
        focus: 'pump',
        actions: [{ label: 'Pump on', run: inst => inst.pumpPower('on') }],
        done: inst => inst.pump.power === 'on' && inst.pump.flow > 2.5,
    });
    steps.push({
        title: `Purge channel ${CH[c]}`,
        why: 'Watch the tube from the bottle to the pump. Keep going until every bubble and any old solvent has gone through: about 2 min at 5 mL/min. Use 60× on the lab clock if you are in a hurry.',
        focus: 'line' + c,
        done: (inst, ctx) => clean(inst, c) && inst.pump.purged[c] - (ctx['p' + c] || 0) >= 6 && inst.pump.head < 0.03,
        enter: (inst, ctx) => { ctx['p' + c] = inst.pump.purged[c]; },
        status: (inst, ctx) => `${Math.max(0, inst.pump.purged[c] - (ctx['p' + c] || 0)).toFixed(1)} mL through channel ${CH[c]}; ${lineText(inst, c)}.`,
    });
    return steps;
}

const closeUp = [
    {
        title: 'Drop to the method flow before you close the valve',
        why: 'Closing the valve sends everything through the column. At 5 mL/min that would take the pressure straight past the limit.',
        focus: 'pump',
        actions: [{ label: 'Set the method flow and composition', run: inst => inst.restoreMethodPump() }],
        done: inst => atMethod(inst) && inst.pump.flow <= inst.method.pump.flow + 0.05,
        status: inst => `Method: ${inst.method.pump.flow} mL/min, ` + methodComp(inst).map((c, i) => c > 0 ? `${c.toFixed(0)}% ${CH[i]}` : '').filter(Boolean).join(' / ') + '.',
    },
    {
        title: 'Close the purge valve',
        why: 'Turn the knob clockwise until it is finger tight (click it). The flow now goes through the sampler, column and detector.',
        focus: 'knob',
        done: inst => !inst.pump.purgeOpen,
    },
    {
        title: 'Watch the pressure come up and settle',
        why: 'A steady pressure with a ripple under about 1% means no air is left in the pump. A pressure that swings, or stays low, means purge again.',
        focus: 'pump',
        done: inst => inst.pump.flowEff > 0.05 && inst.pump.head < 0.03 && inst.equilibration() >= 1.5 && inst.pump.power === 'on',
        status: inst => `${inst.pump.pShown.toFixed(0)} bar at ${inst.pump.flow.toFixed(2)} mL/min.`,
    },
];

const equilibrate = n => ({
    title: `Equilibrate: ${n} column volumes`,
    why: 'The stationary phase has to come to equilibrium with the new mobile phase before retention times mean anything. This is a good time to load the tray.',
    focus: 'tcc',
    done: inst => inst.equilibration() >= n && inst.pump.flowEff > 0.05,
    status: inst => `${inst.equilibration().toFixed(1)} of ${n} column volumes (${(n * inst.vm).toFixed(0)} mL).`,
});

export const PROCEDURES = {
    startup: {
        title: 'Start-up: purge and equilibrate',
        intro: 'The routine at the start of every session. It purges the channels the current method uses.',
        build(inst) {
            const used = methodComp(inst).map((c, i) => c > 0.05 ? i : -1).filter(i => i >= 0);
            const steps = [
                {
                    title: 'Check the solvent bottles',
                    why: 'Enough solvent for the session, the right solvent on each channel, and every inlet filter sitting at the bottom of its bottle. Channels in the method: ' + used.map(i => CH[i]).join(', ') + '.',
                    focus: 'bottles',
                    done: i => used.every(c => i.bottles[c].vol > 100),
                    status: i => used.map(c => `${CH[c]}: ${i.bottles[c].solvent.short}, ${i.bottles[c].vol.toFixed(0)} mL`).join(' · '),
                },
                {
                    title: 'Open the purge valve',
                    why: 'Turn the black knob on the pump anticlockwise (click it). The pump outlet now goes to the waste bottle instead of the column, so you can pump fast without pressurising anything.',
                    focus: 'knob',
                    done: i => i.pump.purgeOpen,
                },
            ];
            used.forEach((c, n) => steps.push(...purgeSteps(c, n === 0)));
            steps.push(...closeUp, {
                title: 'Lamp on, column thermostat on',
                why: 'The deuterium lamp needs 15 to 20 min before the baseline stops drifting, so start it now.',
                focus: 'dad',
                actions: [{ label: 'Lamp on', run: i => i.lampPower(true) }, { label: 'Thermostat on', run: i => i.tccPower(true) }],
                done: i => i.dad.lamp !== 'off' && i.tcc.on,
            }, equilibrate(10));
            return steps;
        },
    },

    bottle: {
        title: 'Change a solvent bottle',
        intro: 'For a new mobile phase, a new buffer pH, or a bottle that is running low.',
        build() {
            return [
                {
                    title: 'Put the pump in standby',
                    why: 'Never lift an inlet filter out of the solvent while the pump is drawing from it.',
                    focus: 'pump',
                    actions: [{ label: 'Pump standby', run: i => i.pumpPower('standby') }],
                    done: i => i.pump.power !== 'on',
                },
                {
                    title: 'Swap the bottle',
                    why: 'In “Solvent bottles” below, choose the new solvent for the channel and press Change bottle. About 4 mL of the old solvent is still in the tubing and degasser, and a little air went in with the filter.',
                    focus: 'bottles',
                    enter: (i, ctx) => { ctx.t0 = i.t; },
                    done: (i, ctx) => { if (i.lastBottle && i.lastBottle.t >= ctx.t0) { ctx.ch = i.lastBottle.ch; return true; } return false; },
                },
                {
                    title: 'Open the purge valve',
                    why: 'Turn the knob anticlockwise (click it).',
                    focus: 'knob',
                    done: i => i.pump.purgeOpen,
                },
                {
                    title: 'Purge the changed channel at 5 mL/min',
                    why: 'Watch the old solvent (its colour) and the bubble travel down the tube and out to waste.',
                    focus: 'pump',
                    actions: [{ label: 'Set 5 mL/min on the changed channel, pump on', run: (i, ctx) => { i.setPumpManual(5, only(ctx.ch)); i.pumpPower('on'); } }],
                    enter: (i, ctx) => { ctx.p0 = i.pump.purged[ctx.ch]; },
                    done: (i, ctx) => clean(i, ctx.ch) && i.pump.purged[ctx.ch] - ctx.p0 >= 6 && i.pump.head < 0.03,
                    status: (i, ctx) => `Channel ${CH[ctx.ch]}: ${Math.max(0, i.pump.purged[ctx.ch] - ctx.p0).toFixed(1)} mL through; ${lineText(i, ctx.ch)}.`,
                },
                ...closeUp, equilibrate(10),
            ];
        },
    },

    shutdown: {
        title: 'Shut-down: flush and store',
        intro: 'Buffer salts left standing crystallise in the pump, the valves and the column. Wash them out with water first, never straight into high organic, then leave the column in mostly organic solvent.',
        build() {
            const find = (i, organic) => i.bottles.findIndex(b => organic ? b.solvent.organic : b.solvent.kind === 'water');
            const mixOf = (i, w, o) => [0, 1, 2, 3].map(c => c === find(i, false) ? w : c === find(i, true) ? o : 0);
            const flow = i => Math.min(1, i.method.pump.flow || 1);
            return [
                {
                    title: 'Finish acquiring',
                    why: 'Wait for the last run to end, or stop it.',
                    done: i => !i.run && !i.seq,
                },
                {
                    title: 'Have plain water and an organic solvent on the pump',
                    why: 'You need a salt-free aqueous channel for the wash. If every aqueous bottle is a buffer, swap one for water (and purge it: use “Change a solvent bottle”).',
                    focus: 'bottles',
                    done: i => find(i, false) >= 0 && find(i, true) >= 0 && clean(i, find(i, false)) && clean(i, find(i, true)),
                    status: i => find(i, false) < 0 ? 'No bottle of plain water yet.' : `Water on ${CH[find(i, false)]} (${lineText(i, find(i, false))}); organic on ${find(i, true) < 0 ? '?' : CH[find(i, true)] + ' (' + lineText(i, find(i, true)) + ')'}.`,
                },
                {
                    title: 'Wash with 90:10 water/organic',
                    why: 'Mostly water dissolves the salt; the 10% organic keeps the C18 chains wetted.',
                    focus: 'pump',
                    actions: [{ label: 'Set 90:10 water/organic, pump on', run: i => { i.setPumpManual(flow(i), mixOf(i, 90, 10)); i.pumpPower('on'); } }],
                    done: i => i.pump.power === 'on' && !i.pump.purgeOpen && i.pump.comp[find(i, false)] >= 85 && delivered(i).salt < 1e-6,
                },
                {
                    title: 'Flush 10 column volumes',
                    why: 'Long enough to clear the mixer, the tubing, the column and the flow cell.',
                    focus: 'waste',
                    done: i => i.equilibration() >= 10 && outlet(i).salt < 1e-6,
                    status: i => `${i.equilibration().toFixed(1)} of 10 column volumes; buffer at the column outlet: ${outlet(i).salt < 1e-6 ? 'none' : (outlet(i).salt * 1000).toFixed(2) + ' mM'}.`,
                },
                {
                    title: 'Change to the storage solvent, 20:80 water/organic',
                    why: 'High organic stops anything growing in the column and keeps the phase wetted.',
                    focus: 'pump',
                    actions: [{ label: 'Set 20:80 water/organic', run: i => i.setPumpManual(flow(i), mixOf(i, 20, 80)) }],
                    done: i => i.pump.comp[find(i, true)] >= 75,
                },
                {
                    title: 'Fill the column with it: 5 column volumes',
                    why: 'Note how the pressure changes with the viscosity of the mixture on the way.',
                    focus: 'tcc',
                    done: i => i.equilibration() >= 5 && outlet(i).org >= 0.7,
                    status: i => `${i.equilibration().toFixed(1)} of 5 column volumes; ${i.pump.pShown.toFixed(0)} bar.`,
                },
                {
                    title: 'Lamp off',
                    why: 'Lamp life is counted in hours of burning. Do not leave it on overnight.',
                    focus: 'dad',
                    actions: [{ label: 'Lamp off', run: i => i.lampPower(false) }],
                    done: i => i.dad.lamp === 'off',
                },
                {
                    title: 'Pump to standby, thermostat off',
                    why: 'Then cap the bottles, empty the waste if it is more than three-quarters full, and write the session in the instrument log.',
                    focus: 'pump',
                    actions: [{ label: 'Pump standby', run: i => i.pumpPower('standby') }, { label: 'Thermostat off', run: i => i.tccPower(false) }],
                    done: i => i.pump.power !== 'on' && !i.tcc.on,
                },
            ];
        },
    },
};
