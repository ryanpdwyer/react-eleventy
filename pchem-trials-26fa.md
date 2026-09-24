---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - Technique Trials
js: pchem.js
tags: pchem-26fa
---

# CHE 341 Lab: Technique Trials

**Wednesday Sep 30.** One more week to try an instrument you haven't used yet, then finish with a Python fit, like calorimetry. One group per instrument: one NMR group and two electrochemistry groups (we have two potentiostats).

**Deliverable (same for every option):** state the model, one fit with ± uncertainties, one paragraph on where the model broke.

Each option is about 30–45 min at the instrument.

### 1. NMR: Kinetics of acetic anhydride hydrolysis (+ T<sub>1</sub>)

**Instrument idea.** The spectrometer can take a spectrum every 30–60 s on its own (an arrayed acquisition). Integrals only count molecules if the spins fully relax between pulses, which takes about 5 T<sub>1</sub>.

**Do.** Shim on water, add ~10 µL acetic anhydride, shake, insert, and start the array (~20–30 min). The anhydride CH<sub>3</sub> (~2.2 ppm) shrinks and the acetic acid CH<sub>3</sub> (~2.05 ppm) grows. When the reaction is done:

- Run an inversion recovery on the finished tube to measure T<sub>1</sub> of the acid CH<sub>3</sub>. Was your delay between spectra longer than 5 T<sub>1</sub>?
- Take one spectrum with a long delay and one with a short delay (≈ T<sub>1</sub>). Compare the integrals.

**Model.**

- Anhydride: A<sub>0</sub>e<sup>−kt</sup> + c
- Acid: P<sub>∞</sub>(1 − e<sup>−kt</sup>) + c
- Inversion recovery: M(τ) = A − B·e<sup>−τ/T<sub>1</sub></sup>

Do the two values of k agree? Is P<sub>∞</sub>/A<sub>0</sub> ≈ 2?

**Where it might break.** The anhydride is still dissolving in the first minute, you lose time before the first spectrum, and the probe temperature drifts.

**Simulator.** [munano.org/nmr-sim](/nmr-sim/): choose *Inv. recovery* to see what the 180° and 90° pulses do.

**References.** [Kinetic Understanding Using NMR Reaction Profiling](https://doi.org/10.1021/op200202k) · [T<sub>1</sub> Measurement by NMR Inversion Recovery](https://doi.org/10.1021/acs.jchemed.0c00663)

### 2. Electrochemistry: Chronoamperometry

**Instrument idea.** A potentiostat holds the working electrode at a set potential (against the reference) and measures the current (through the counter electrode). Step the potential past E°′ and all the ferricyanide at the surface is reduced. The current then falls as diffusion brings in more.

**Do.** Run a quick CV of ferricyanide in KCl on a screen-printed carbon electrode to choose the step potential. Then run potential steps at 2–3 concentrations.

**Model.** i(t) = a/√t + b·e<sup>−t/τ</sup> + c. The Cottrell term a gives the diffusion coefficient D. τ = R<sub>u</sub>C<sub>dl</sub> is the double-layer charging time.

**Where it might break.** Drop the exponential and the fit fails at short times. At long times, convection pulls the data away from the model.

**Simulator.** [munano.org/cv-sim](/cv-sim/): choose *Potential step*. *Download CSV* gives you data to test your fit on before lab.

**References.** [A Practical Beginner's Guide to Cyclic Voltammetry](https://doi.org/10.1021/acs.jchemed.7b00361) · [Thin-Layer Electrochemistry: Visualizing the Diffusion Layer](https://doi.org/10.1021/acs.jchemed.5c01710)

### 3. Electrochemistry: Adsorption isotherm on carbon

**Instrument idea.** A molecule stuck to the electrode gives a different CV than one diffusing in. The peaks are symmetric, the current is proportional to scan rate, and the peak area counts the molecules on the surface.

**Do.** Dip a fresh carbon electrode in methylene blue (or FMN) at one concentration for a fixed time, rinse, and run a CV in blank buffer. Repeat for ~6 concentrations.

**Model.** Integrate the peak (straight-line baseline) to get the charge, then the surface coverage Γ. Fit the Langmuir isotherm: Γ = Γ<sub>max</sub>·Kc/(1 + Kc).

- Γ<sub>max</sub> gives the area per molecule. Is the molecule lying flat or standing on its edge?
- K gives ΔG<sub>ads</sub> = −RT ln K.

**Where it might break.** Your choice of baseline, not reaching equilibrium during the dip, and multilayers at high concentration.

**References.** [Voltammetric Behavior of a Ferrocene Derivative: Surface-Confined and Diffusion-Controlled Species](https://doi.org/10.1021/ed069p502) · [Laviron 1979, diffusionless voltammetry](https://doi.org/10.1016/S0022-0728%2879%2980075-3)
