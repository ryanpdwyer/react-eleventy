---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - Technique Trials
js: pchem.js
tags: pchem-26fa
---

# CHE 341 Lab: Technique Trials

**Wednesday Sep 30.** Two groups of two, one group per instrument.

### NMR

NMR has a lot of physics / physical chemistry behind it that is brushed under the rug at an organic-level treatment of it.

- **Kinetics of acetic anhydride hydrolysis.** Watch a reaction happen right in the NMR tube: one peak shrinks as another grows. Because NMR peak areas count molecules, you can follow the reaction over time and extract a rate constant.
    - [Kinetic Understanding Using NMR Reaction Profiling](https://doi.org/10.1021/op200202k)
- **T<sub>1</sub> by inversion recovery.** Knock the spins out of equilibrium with a pulse and time how long they take to come back. Measure it on the finished kinetics tube to check that your spectra were quantitative, or on water with a little Cu<sup>2+</sup>, a paramagnetic ion that speeds up relaxation (the idea behind MRI contrast agents).
    - [T<sub>1</sub> Measurement by NMR Inversion Recovery](https://doi.org/10.1021/acs.jchemed.0c00663)
    - Simulator: [NMR Bloch sphere](/nmr-sim/)

### Electrochemistry

Electrochemistry allows the rates of reactions to be measured (via the charge / current flow - the total charge relates to the total moles of reaction via Q = n<sub>e</sub>F n<sub>rxn</sub>) and the thermodynamics to be easily measured and controlled with the potential, which controls ΔG according to ΔG = −n<sub>e</sub>FE.

- **Chronoamperometry of ferricyanide.** Step the potential to switch the reaction on, then watch the current (the rate) fall as the molecules near the electrode are used up. How fast it falls tells you how quickly molecules diffuse to the electrode.
    - [A Practical Beginner's Guide to Cyclic Voltammetry](https://doi.org/10.1021/acs.jchemed.7b00361)
    - [Thin-Layer Electrochemistry: Visualizing the Diffusion Layer](https://doi.org/10.1021/acs.jchemed.5c01710)
    - Simulator: [CV / potential step](/cv-sim/)
- **Adsorption isotherm of methylene blue on carbon.** Some molecules stick to the electrode surface, and integrating the current counts them. Changing the concentration shows how the surface fills up and how strongly the molecules bind, which gives you an adsorption free energy.
    - [Surface-Confined and Diffusion-Controlled Species](https://doi.org/10.1021/ed069p502)
