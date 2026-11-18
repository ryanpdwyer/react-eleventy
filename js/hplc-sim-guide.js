/**
 * HPLC simulator: guide text, pre-lab checklist and the "TA" diagnosis
 */
import * as chem from './hplc-sim-chem.js';

const CH = ['A', 'B', 'C', 'D'];
const inUse = inst => inst.pump.comp.map((c, i) => c > 0.05 ? i : -1).filter(i => i >= 0);

export function checklist(inst, ui) {
    const P = inst.pump, used = inUse(inst);
    const clean = used.every(i => { const s = inst.lineState(i); return s.air < 0.005 && s.stale < 0.005; }) && P.head < 0.03;
    const flowing = P.power === 'on' && !P.purgeOpen && P.flowEff > 0.05 && P.pShown > 5 && P.flowSet <= 3;
    const files = inst.files;
    const out = props(inst, 1), inl = props(inst, 0);
    const stored = out.salt < 1e-5 && inl.salt < 1e-5 && out.org >= 0.5 && inst.dad.lamp === 'off' && P.power !== 'on' && files.length > 0;
    return [
        {
            title: '1. Purge every channel you will use', done: clean,
            desc: 'On the Bench, open the purge valve. In Method &amp; Run Control set 5 mL/min and 100% of one channel, send it to the instrument and switch the pump on. Give each channel about 2 min, until its inlet line shows no air and no old solvent. Channels now in use: <b>' + (used.map(i => CH[i]).join(', ') || 'none') + '</b>.',
        },
        {
            title: '2. Close the purge valve and pump through the column', done: clean && flowing,
            desc: 'Drop the flow to the method value (typically 1 mL/min) <i>before</i> you close the valve. Watch the pressure rise and settle; a steady pressure with a ripple under 1% is the sign of a healthy, bubble-free pump.',
        },
        {
            title: '3. Thermostat the column', done: inst.tcc.on && Math.abs(inst.tcc.temp - inst.tcc.set) < 0.5,
            desc: 'Switch the column compartment on. Retention changes by roughly 1 to 2% per °C, so a thermostatted column is what makes retention times repeatable.',
        },
        {
            title: '4. Ignite the UV lamp and let it warm up', done: inst.dad.lamp === 'on' && inst.dad.age > 900,
            desc: 'The deuterium lamp drifts for the first 15 to 20 min. Start it early; watch the baseline in the online plot flatten.',
        },
        {
            title: '5. Equilibrate: at least 10 column volumes', done: flowing && inst.equilibration() >= 10,
            desc: `Pumped since the composition last changed: <b>${inst.equilibration().toFixed(1)}</b> column volumes (one column volume here is ${inst.vm.toFixed(2)} mL).`,
        },
        {
            title: '6. Load the tray', done: Object.keys(inst.sampler.vials).length > 0,
            desc: 'On the Bench, fill vials from the stockroom (or make your own dilutions) and place them. Include a blank.',
        },
        {
            title: '7. Acquire a blank', done: files.some(f => f.pos === '-' || /blank/i.test(f.sample)),
            desc: 'Inject the sample solvent, or use “Blank run (no injection)”. Whatever shows up here is not your analyte.',
        },
        {
            title: '8. Acquire standards and samples', done: files.some(f => f.pos !== '-' && !/blank/i.test(f.sample) && !f.aborted),
            desc: 'Single runs from the run bar, or a sequence. Set the stop time long enough for the last peak to elute.',
        },
        {
            title: '9. Integrate and export', done: ui.flags.integrated && ui.flags.exported,
            desc: 'In Data Analysis, check that the baselines drawn under the peaks are sensible, then export the peak table or the raw signal as CSV.',
        },
        {
            title: '10. Shut down', done: stored,
            desc: 'Flush any buffer out with water/organic (no salt) for 10+ column volumes, finish in at least 50% organic, then lamp off and pump to standby.',
        },
    ];
}

function props(inst, where) {
    return chem.props(inst.mixAt(0.9 + where * inst.vm));
}

/** Things a TA would notice. Reads the hidden state the student cannot see directly. */
export function diagnose(inst) {
    const P = inst.pump, col = inst.column, out = [], used = inUse(inst), m = inst.method;
    if (inst.error) out.push(`The instrument is in an error state: <b>${inst.error.msg}</b>`);
    if (P.purgeOpen && P.power === 'on' && (inst.run || P.flowSet <= 3)) out.push('The <b>purge valve is open</b>. All the flow is going to waste and none through the column, which is why the pressure is only a few bar.');
    if (!P.purgeOpen && P.power === 'on' && P.flowSet > 3) out.push(`The flow is set to ${P.flowSet} mL/min with the purge valve closed. That is a purge flow, not a column flow.`);
    if (P.head > 0.03) out.push('There is <b>air in the pump head</b>: the pressure ripple is large, the delivered flow is low and bubbles are reaching the flow cell. Open the purge valve and purge at 5 mL/min until it clears.');
    for (const i of used) {
        const s = inst.lineState(i), b = inst.bottles[i];
        if (s.air > 0.005) out.push(`Channel ${CH[i]}: there is <b>air in the inlet line</b>. Purge it before pumping through the column.`);
        if (s.stale > 0.005) out.push(`Channel ${CH[i]}: the line still holds the <b>previous solvent</b>, so the column is not getting what the method says. Purge the channel.`);
        if (b.vol < 60) out.push(`Bottle ${CH[i]} is ${b.vol <= 0 ? 'empty' : 'nearly empty'}.`);
    }
    if (inst.dad.lamp === 'on' && inst.dad.age < 900) out.push(`The UV lamp has been on for only ${(inst.dad.age / 60).toFixed(0)} min. Expect baseline drift until it has warmed up.`);
    if (P.power === 'on' && !P.purgeOpen && inst.equilibration() < 10) out.push(`Only ${inst.equilibration().toFixed(1)} column volumes have passed since the composition changed. Retention times will drift until the column is equilibrated.`);
    if (inst.tcc.on && Math.abs(inst.tcc.temp - inst.tcc.set) > 0.5) out.push('The column compartment has not reached its setpoint yet.');
    if (col.clog > 0.08) out.push('The pressure is higher than this column and mobile phase should give. <b>Buffer salt has precipitated</b> where it met a high fraction of organic solvent. Flush with plain water (no organic), and do not mix concentrated buffer with that much organic again.');
    if (col.health < 0.99) out.push('The column was run <b>above its pressure rating</b> and the packed bed has shifted. Expect broad, tailing peaks from now on. Set the pump’s upper pressure limit to the column’s limit.');
    if (m.pump.pmax > col.type.pmax) out.push(`The upper pressure limit (${m.pump.pmax} bar) is above this column’s rating (${col.type.pmax} bar).`);
    const pin = props(inst, 0);
    if (!pin.dry && pin.w > 0.02 && (pin.pH < col.type.phMin - 0.15 || pin.pH > col.type.phMax + 0.15)) out.push(`The mobile phase pH (${pin.pH.toFixed(1)}) is outside this column’s range (${col.type.phMin} to ${col.type.phMax}).`);
    if (pin.salt > 1e-4 && P.power !== 'on') out.push('The pump is stopped with <b>buffer in the system</b>. Salt left standing crystallises in the pump seals, valve and column. Flush with water/organic before leaving it.');
    const pout = inst.mixAt(0.9 + inst.vm);
    m.dad.signals.forEach((s, i) => {
        if (!s.on) return;
        const a = chem.mobilePhaseAbs(pout, s.wl);
        if (a > 0.8) out.push(`Signal ${CH[i]} at ${s.wl} nm is below the UV cutoff of this mobile phase (background ≈ ${a.toFixed(1)} AU). Very little light reaches the diodes, so the baseline is noisy.`);
    });
    const alive = inst.bands.filter(b => b.cmpd && !b.done && b.x < 1).length;
    if (!inst.run && alive) out.push(`${alive} compound(s) from an earlier injection are <b>still on the column</b>. They will elute into a later chromatogram unless you lengthen the stop time or flush with stronger solvent.`);
    const f = inst.files[inst.files.length - 1];
    if (f) {
        let top = 0;
        for (const y of f.sig[0]) if (y > top) top = y;
        if (top > 2000) out.push(`The last run peaked at ${top.toFixed(0)} mAU. Above about 2000 mAU the detector response is no longer linear; inject less or dilute.`);
        const v = inst.sampler.vials[f.pos];
        if (v && v.vol < f.injVol + 25) out.push(`Vial ${f.pos} is nearly empty; the needle will draw air.`);
    }
    return out;
}

export const GUIDE_HTML = {
    intro: `
<h2>What this is</h2>
<p>A working model of a reversed-phase HPLC of the kind in our lab: quaternary pump with degasser, vial sampler, thermostatted column compartment and diode array UV detector. It is for practising the whole routine before you stand in front of the real instrument, where mistakes cost solvent, time and occasionally a column.</p>
<p>Nothing is scripted. The pump moves liquid from the bottles through the lines, the mixer and the tubing to the column; each injected compound travels down the column at a speed set by the mobile phase that surrounds it at that moment. So the things that go wrong on the bench go wrong here, for the same reasons.</p>
<h3>The four tabs</h3>
<ul style="margin:4px 0;padding-left:18px">
<li><b>Bench</b>: the physical instrument. Solvent bottles, the purge valve, the vial tray, the column, and a bench for making solutions.</li>
<li><b>Method &amp; Run Control</b>: the computer. Module status, live signal and pressure, the method, the sequence table and the logbook.</li>
<li><b>Data Analysis</b>: integration, peak table, UV spectra, CSV export for Excel or Python.</li>
<li><b>Guide</b>: this page.</li>
</ul>
<h3>Status colours</h3>
<p><span class="pill" style="background:#98a4b1;color:#fff">grey</span> off &nbsp; <span class="pill warn">yellow</span> not ready &nbsp; <span class="pill ok">green</span> ready &nbsp; <span class="pill">blue</span> run &nbsp; <span class="pill bad">red</span> error. A run you start while something is yellow waits until everything is green.</p>
<h3>Lab clock</h3>
<p>Equilibration and lamp warm-up take real minutes. Use the speed control at the top right: 10× for watching a peak come off, 300× to get through a warm-up or a long sequence. Pause stops the clock.</p>
<p class="note">The screens use the vocabulary of the instrument software (method, sequence, online plot, logbook) but are not a copy of it. Expect the real dialogs to look different and to ask for the same things.</p>`,

    experiments: `
<h2>Experiments</h2>
<details class="exp" open><summary>1. System check and retention basics: paraben test mix</summary>
<table>
<tr><th>Column</th><td>ZORBAX Eclipse Plus C18, 4.6 × 150 mm, 5 µm</td></tr>
<tr><th>Mobile phase</th><td>A water, B methanol; 60% B isocratic, 1.0 mL/min, 30 °C</td></tr>
<tr><th>Detection</th><td>254 nm, bandwidth 4, reference 360/100</td></tr>
<tr><th>Injection</th><td>5 µL of the paraben mix; stop time 15 min</td></tr>
</table>
<p>Expect uracil near 1.6 min (that is t₀), then methyl-, ethyl-, propyl- and butylparaben out to about 12 min, at roughly 85 bar.</p>
<ul>
<li>Calculate k for each paraben. Plot log k against the number of CH₂ groups.</li>
<li>Repeat at 50, 55, 65 and 70% B. Plot log k against the fraction of methanol: the slope is S and the intercept log k<sub>w</sub>.</li>
<li>Keep 60% B and change the flow from 0.3 to 2.5 mL/min. Plot plate height H = L/N against flow (a van Deemter curve). What happens to peak area, and why?</li>
<li>Set the stop time to 10 min and inject twice. Explain the broad peak near 1.4 min in the second chromatogram.</li>
<li>Run the alkylbenzene mix at 80% B, once at 254 nm and once at 210 nm.</li>
</ul></details>

<details class="exp"><summary>2. Quantitation: caffeine and analgesics</summary>
<table>
<tr><th>Mobile phase</th><td>A 0.1% phosphoric acid in water, B methanol; 40% B, 1.0 mL/min, 30 °C</td></tr>
<tr><th>Detection</th><td>254 nm (try 275 nm as a second signal)</td></tr>
<tr><th>Injection</th><td>10 µL; stop time 18 min</td></tr>
</table>
<p>Change bottle A to 0.1% phosphoric acid and purge it. Acetaminophen elutes near 2.7 min, caffeine 4.5, aspirin 7.4 and salicylic acid 13.8.</p>
<ul>
<li>From the mixed standard stock (0.500 g/L each) make five calibration standards by dilution, for example 0.5, 1, 2, 3 and 5 mL into 10 mL. Run them as a sequence with a blank first.</li>
<li>Plot area against concentration for each compound. Run the tablet extract and work back to mg per tablet (one tablet was dissolved in 250.0 mL and then diluted 1.00 to 10.00 mL).</li>
<li>Inject the undiluted stock. Is the acetaminophen point still on the line? Look at the peak height.</li>
<li>Run a standard with plain water in A instead of the acid. Where did aspirin go, and why?</li>
<li>The beverages need only caffeine standards. Benzoic and sorbic acid (preservatives) elute at 10 to 13 min.</li>
<li>Run a blank straight after the most concentrated standard, once with needle wash on and once with it off.</li>
</ul></details>

<details class="exp"><summary>3. pK<sub>a</sub> of a phenolic acid from retention</summary>
<p>The neutral acid HA is retained much more strongly than its anion A⁻, so the retention factor follows the fraction ionised:</p>
<p style="text-align:center"><i>k</i> = (<i>k</i><sub>HA</sub> + <i>k</i><sub>A</sub>·10<sup>pH − pKa</sup>) / (1 + 10<sup>pH − pKa</sup>)</p>
<table>
<tr><th>Mobile phase</th><td>A 20 mM buffer at the pH under study, B methanol; 30% B, 1.0 mL/min, 30 °C</td></tr>
<tr><th>Buffers</th><td>phosphate for pH 2.1 to 3.1 and 6.2 to 8.2; formate 2.8 to 4.8; acetate 3.8 to 5.8</td></tr>
<tr><th>Detection</th><td>260 nm for vanillic acid; check the spectrum of the acid you choose</td></tr>
<tr><th>Injection</th><td>5 µL of a single phenolic acid with uracil; stop time 20 min</td></tr>
</table>
<p>For vanillic acid expect about 14 min at pH 2.5 falling to about 2 min at pH 7.</p>
<ul>
<li>Use seven or eight pH values between 2.5 and 7, closest together around pH 4 to 5.5. For each: change bottle A, purge it, close the valve, equilibrate 10+ column volumes, inject.</li>
<li>Get t₀ from uracil in every run and calculate k. Fit the equation above (Excel Solver or <code>scipy.optimize.curve_fit</code>) for k<sub>HA</sub>, k<sub>A</sub> and pK<sub>a</sub>.</li>
<li>A quaternary pump can blend two buffers: put pH 2.5 phosphate in A and pH 7.0 phosphate in C and vary the ratio. What pH do you get, and why is the peak shape poor around pH 4 to 5?</li>
<li>Compare your pK<sub>a</sub> with the literature value in water. The mobile phase is 30% methanol: which way should that move it?</li>
</ul></details>

<details class="exp"><summary>4. Gradient elution: phenolic acid mixture</summary>
<table>
<tr><th>Mobile phase</th><td>A 0.1% formic acid in water, B methanol</td></tr>
<tr><th>Gradient</th><td>5% B at 0 min to 60% B at 15 min, 95% B at 17 to 19 min, back to 5% B at 19.5 min; stop time 22 min, post time 8 min</td></tr>
<tr><th>Detection</th><td>280 nm and 320 nm</td></tr>
</table>
<ul>
<li>Try to separate the eight-component mix isocratically first. What is the problem?</li>
<li>Run a “Blank run (no injection)” with a signal at 210 nm. Why does the baseline move by hundreds of mAU during the gradient? Repeat with plain water in A, and with acetonitrile in B.</li>
<li>Click each peak for its UV spectrum. Which acids are hydroxycinnamic (maximum near 310 to 325 nm) and which hydroxybenzoic?</li>
<li>Set the post time to 0 and run the mix three times in a sequence. Compare retention times.</li>
</ul></details>

<details class="exp"><summary>5. Build your own</summary>
<p>The sample-prep bench can make a solution of any of the ${chem.COMPOUNDS.length} compounds in the library. Some ideas:</p>
<ul>
<li>Bases (amitriptyline, propranolol) with toluene as a neutral marker, 70% methanol, with 20 mM phosphate at pH 7.0 and again at pH 2.5. Compare retention and tailing.</li>
<li>The same separation in methanol and in acetonitrile: which percentage of acetonitrile gives the same run time as 60% methanol? What happens to the pressure?</li>
<li>The same test mix on the 150 mm, 5 µm column and the 50 mm, 2.7 µm column. Then on the 2.1 mm column at 0.21 mL/min: why are the early peaks so broad?</li>
<li>Dissolve a sample in pure methanol and inject 50 µL into a 30% methanol mobile phase.</li>
</ul></details>`,

    model: `
<h2>What the model does, and what it does not</h2>
<ul>
<li><b>Retention</b>: log k = log k<sub>w</sub> − Sφ for each compound, with separate parameters in methanol and acetonitrile, a van ’t Hoff temperature term, and ionisation of acids and bases from the mobile phase pH. Bands move through whatever composition is at their position, so gradients, dwell volume (0.9 mL) and incomplete equilibration come out naturally.</li>
<li><b>pH</b> is solved from the charge balance of everything in the mixed mobile phase, so blended buffers, diluted buffers and unbuffered water behave sensibly. It is the aqueous pH; the model then applies an approximate shift of acid and base pK<sub>a</sub> with organic content.</li>
<li><b>Efficiency</b>: Knox plate height from flow, particle size and a Wilke–Chang diffusion coefficient, plus extra-column volume, injection volume and sample-solvent strength, mass overload, silanol tailing for protonated bases and weak buffering.</li>
<li><b>Pressure</b>: Darcy’s law with the viscosity of the actual water/methanol/acetonitrile mixture at the column temperature.</li>
<li><b>Detector</b>: Beer’s law with a spectrum for each compound, bandwidth and reference wavelength, mobile-phase background absorbance and UV cutoff, stray-light non-linearity above about 2 AU, noise that depends on response time, and lamp warm-up drift.</li>
<li><b>Hardware</b>: 4 mL inlet lines that hold old solvent or air until purged, air trapped in the pump head, solvent consumption, pressure limits, injection precision, vial volume, carry-over, salt precipitation, over-pressure damage.</li>
</ul>
<p class="note">Compound parameters (log k<sub>w</sub>, S, pK<sub>a</sub>, UV bands) are estimates chosen to give realistic elution order and typical retention on a C18 column; pK<sub>a</sub> values and UV maxima follow the literature, absorptivities approximately. Retention times on the real column will differ. Not modelled: pump seal wear, leaks, column ageing with use, peak fronting, temperature gradients in the column, and the details of the vendor’s software. This simulator is an independent teaching tool and is not affiliated with or endorsed by Agilent Technologies.</p>`,
};
