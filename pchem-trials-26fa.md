---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - Technique Trials
js: pchem.js
tags: pchem-26fa
---

# CHE 341 Lab: Technique Trials

**Wednesday Sep 30.** Two groups of two, one group per instrument.

### NMR

Peak areas count nuclei, so NMR can follow a reaction in real time ([Harvey 19.4](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Instrumental_Analysis_%28LibreTexts%29)). T<sub>1</sub> is how fast spins return to their Boltzmann populations after a pulse, a first-order exponential decay ([Harvey 19.1](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Instrumental_Analysis_%28LibreTexts%29)).

- **Kinetics of acetic anhydride hydrolysis.** Add a drop of acetic anhydride to water in an NMR tube and take a spectrum every 30–60 s. The anhydride CH<sub>3</sub> peak shrinks as the acetic acid CH<sub>3</sub> peak grows. Fit both to first-order exponentials to get k.
    - [Kinetic Understanding Using NMR Reaction Profiling](https://doi.org/10.1021/op200202k)
- **T<sub>1</sub> by inversion recovery.** Flip the magnetization with a 180° pulse, wait a time τ, then read it out with a 90° pulse. Fit the recovery to get T<sub>1</sub>. Measure it on the finished kinetics tube to check that your spectra were quantitative, or on water with a little CuSO<sub>4</sub>, which shortens T<sub>1</sub>.
    - [T<sub>1</sub> Measurement by NMR Inversion Recovery](https://doi.org/10.1021/acs.jchemed.0c00663)
    - Simulator: [NMR Bloch sphere](/nmr-sim/)

### Electrochemistry

So far every technique has used light. In electrochemistry the signal is a potential, current, or charge at an electrode ([Harvey 22](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Instrumental_Analysis_%28LibreTexts%29)). Chronoamperometry holds the potential fixed and watches the current fall as molecules diffuse in. The isotherm counts molecules stuck to the surface.

- **Chronoamperometry of ferricyanide.** Step the electrode potential past E°′ and record the current as it decays. Fit it to the Cottrell equation, plus a short charging term, to get the diffusion coefficient.
    - [A Practical Beginner's Guide to Cyclic Voltammetry](https://doi.org/10.1021/acs.jchemed.7b00361)
    - [Thin-Layer Electrochemistry: Visualizing the Diffusion Layer](https://doi.org/10.1021/acs.jchemed.5c01710)
    - Simulator: [CV / potential step](/cv-sim/)
- **Adsorption isotherm of methylene blue on carbon.** Dip carbon electrodes in methylene blue at several concentrations, rinse, and run a CV in clean buffer. The peak area counts the adsorbed molecules. Fit coverage vs. concentration to a Langmuir isotherm to get the maximum coverage and the binding constant.
    - [Surface-Confined and Diffusion-Controlled Species](https://doi.org/10.1021/ed069p502)
