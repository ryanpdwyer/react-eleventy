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

- **Kinetics of acetic anhydride hydrolysis.** Watch a reaction happen right in the NMR tube: one peak shrinks as another grows. Because NMR peak areas count molecules, you can follow the reaction over time and extract a rate constant.
    - [Kinetic Understanding Using NMR Reaction Profiling](https://doi.org/10.1021/op200202k)
- **T<sub>1</sub> by inversion recovery.** Use the NMR less as a camera and more as a physics experiment: knock the nuclear spins out of equilibrium and time how long they take to come back. This connects directly to Boltzmann populations from lecture, and it's also what decides how quantitative an NMR spectrum is.
    - [T<sub>1</sub> Measurement by NMR Inversion Recovery](https://doi.org/10.1021/acs.jchemed.0c00663)
    - Simulator: [NMR Bloch sphere](/nmr-sim/)

### Electrochemistry

So far every technique has used light. In electrochemistry the signal is a potential, current, or charge at an electrode ([Harvey 22](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Instrumental_Analysis_%28LibreTexts%29)). Chronoamperometry holds the potential fixed and watches the current fall as molecules diffuse in. The isotherm counts molecules stuck to the surface.

- **Chronoamperometry of ferricyanide.** Suddenly switch on a reaction at an electrode and watch the current fall as the molecules nearby are used up. How fast it falls tells you how quickly molecules diffuse through solution.
    - [A Practical Beginner's Guide to Cyclic Voltammetry](https://doi.org/10.1021/acs.jchemed.7b00361)
    - [Thin-Layer Electrochemistry: Visualizing the Diffusion Layer](https://doi.org/10.1021/acs.jchemed.5c01710)
    - Simulator: [CV / potential step](/cv-sim/)
- **Adsorption isotherm of methylene blue on carbon.** Some molecules stick to electrode surfaces. Electrochemistry lets you count them, and by changing the concentration you can see how the surface fills up and how strongly the molecules bind.
    - [Surface-Confined and Diffusion-Controlled Species](https://doi.org/10.1021/ed069p502)
