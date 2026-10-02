---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - E6 Report Rubric
js: pchem.js
tags: pchem-26fa
---

# E6 Report: NMR Kinetics *or* Electrochemistry (100 pts)

Your group did **one** of two experiments. Sections 1, 2, and 4 are the same for both groups. In Section 3, answer only the questions for your own experiment.

---

## 1. Introduction to the technique (15 pts)

Write about 1 page, double-spaced. Explain **what specific information your technique gives you** and how the measurement produces that information.

| Pts | Criterion |
|---|---|
| 5 | Explains the physical basis of the measurement: what the instrument does to the sample, and what it detects. |
| 5 | Explains what the measured quantities tell you about the sample, and what the signal depends on. |
| 3 | Connects the technique to the question your group asked in this experiment. |
| 2 | Writing is clear, and sources are cited in the text. |

**Background resources**

- NMR: Harvey, *Instrumental Analysis*, [Ch. 19: Nuclear Magnetic Resonance Spectroscopy](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Instrumental_Analysis_(LibreTexts)/19:_Nuclear_Magnetic_Resonance_Spectroscopy). Simulation: [munano.org/nmr-sim](https://munano.org/nmr-sim/)
- Kinetics: Harvey, *Analytical Chemistry 2.1*, [13.2: Chemical Kinetics](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_by_David_Harvey/Analytical_Chemistry_2.1_(Harvey)/13%3A_Kinetic_Methods/13.02%3A_Chemical_Kinetics)
- Electrochemistry: Harvey, *Analytical Chemistry 2.1*, [11.4: Voltammetric and Amperometric Methods](https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_by_David_Harvey/Analytical_Chemistry_2.1_(Harvey)/11%3A_Electrochemical_Methods/11.04%3A_Voltammetric_and_Amperometric_Methods); Elgrishi et al., *J. Chem. Educ.* **2018**, 95, 197 ([10.1021/acs.jchemed.7b00361](https://doi.org/10.1021/acs.jchemed.7b00361)). Simulation: [munano.org/cv-sim](https://munano.org/cv-sim/)

---

## 2. Materials and Methods (20 pts)

Someone else should be able to repeat your experiment using only this section. Write in paragraphs, in the past tense.

| Pts | Criterion |
|---|---|
| 6 | **Chemicals and samples.** Give the reagents and solvents with their sources, the amounts or concentrations you actually used, and how you prepared and mixed the samples. Include any timing that matters. |
| 8 | **Instrument and acquisition.** Give the instrument and every setting needed to reproduce each experiment you report. For electrochemistry, include all three electrodes. |
| 4 | **Data processing.** Name the software and say what was done to the raw data before you fit it. |
| 2 | Safety hazards and waste disposal. |

---

## 3. Results and Discussion: lab notebook style (60 pts)

This section is **not** written like a journal article. Talk through your analysis in order: what you plotted, what you saw, what it means, and what you decided because of it. Use full sentences, and include every plot you need to make your point. Show one worked example of each calculation, with units.

| Pts | Criterion |
|---|---|
| 5 | **Reproducibility.** Attach your Python notebook. It runs from top to bottom on the raw data files, and every question in the notebook is answered. |
| 40 | **Experiment-specific questions** (below). Graded on correct reasoning and reasonable numbers. |
| 10 | **One journal-quality figure** showing your main result. It needs axes with units, data shown as points and any model as a line, and a self-contained caption of 2–4 sentences. |
| 5 | **Bottom line.** One paragraph: what you measured, the result with its uncertainty, and how it compares with the literature. |

**Example figure and caption.** These are Prussian blue CVs from the end of lab.

![Prussian blue CVs](/img/E6-prussian-blue-cvs.png)

> **Figure 1.** Electrodeposition and redox switching of a Prussian blue film on FTO glass. (a) Two consecutive CV cycles (100 mV/s, starting at +0.85 V) in 5 mM FeCl₃ + 5 mM K₃Fe(CN)₆ in 0.10 M KCl + 0.020 M HCl. The reduction current changes from cycle 1 to cycle 2 as the deposited film begins to take part in the reaction. (b) CV of the rinsed film at 20 mV/s in 0.10 M KCl + 0.020 M HCl, showing two sets of film redox peaks. All potentials are vs. Ag/AgCl (3 M NaCl).

The caption says what was measured and under what conditions, so a reader can understand the figure without the text. It also points out the one thing to notice.

### 3A. NMR: hydrolysis of acetic anhydride

The inversion recovery experiment ($180^\circ$ – $\tau$ – $90^\circ$ – acquire) measures the spin–lattice relaxation time $T_1$ by fitting

$$M(\tau) = M_\infty\left(1 - 2e^{-\tau/T_1}\right)$$

The notebook replaces the 2 with a fitted parameter so that it can handle an imperfect $180^\circ$ pulse (Harvey, *Instrumental Analysis*, Ch. 19).

1. **$T_1$ and the kinetics run.** Report $T_1$. Explain why $T_1$ sets how quickly you can take one spectrum after another and still have peak areas proportional to concentration. Was the spacing in your kinetics run long enough?
2. **Spinning and line width.** Compare one spectrum taken while the sample was not spinning with one taken while it was spinning. Estimate the line width of each. Explain how line width affects peak integration, and why those early spectra were left out.
3. **Drift and lock.** Our spectrometer has a permanent magnet and no lock. How far did the peaks drift during the kinetics run, and how did the notebook correct for it? High-field spectrometers use superconducting electromagnets with a deuterium lock. Explain what a lock does, and why it would make this correction unnecessary.
4. **Rate law.**
   - What rate law do you expect, and why?
   - Show from your data that the order is correct.
   - Report $k$ (with uncertainty) and the half-life $t_{1/2}$.
   - Do the anhydride and acetic acid peaks give the same $k$?
5. **Pseudo-first order.** Use the amounts you mixed to estimate the starting concentrations. Use those concentrations to justify the pseudo-first-order treatment, and estimate the underlying second-order rate constant $k_2$.

### 3B. Electrochemistry: Fe(CN)₆³⁻/⁴⁻

#### Electrochemistry background

General chemistry no longer covers much electrochemistry, so here is what you need.

**Oxidation and reduction.** Oxidation is the loss of electrons, and reduction is the gain of electrons. Ferricyanide (Fe³⁺) and ferrocyanide (Fe²⁺) are a *redox couple*, connected by the half-reaction

$$\mathrm{Fe(CN)_6^{3-}} + e^- \rightleftharpoons \mathrm{Fe(CN)_6^{4-}} \qquad (n_e = 1)$$

Here Fe(CN)₆³⁻ is the oxidized form (Ox), and Fe(CN)₆⁴⁻ is the reduced form (Red).

**The cell.** A potentiostat uses three electrodes:

- The **working electrode** (your Pt disk) is where the reaction you study happens.
- The **reference electrode** (Ag/AgCl) sets the zero of the potential scale. Almost no current passes through it.
- The **counter electrode** (Pt wire) carries the current, so that the working electrode doesn't have to pass current through the reference.

The potentiostat holds the working electrode at a chosen potential $E$ relative to the reference. It then measures the current $i$ that flows.

**Potential is free energy per charge.** For the half-reaction,

$$\Delta G = -n_e F E$$

where $F = 96\thinspace 485\ \mathrm{C\thinspace mol^{-1}}$ is Faraday's constant, the charge of one mole of electrons. When you make the working electrode more negative, its electrons have higher energy, and reduction becomes more favorable. When you make it more positive, oxidation becomes more favorable.

Potentials always depend on the reference. To convert between scales, add the reference electrode's potential:

$$E_\text{vs SHE} = E_\text{vs Ag/AgCl} + E_\text{Ag/AgCl}$$

You can look up $E_\text{Ag/AgCl}$ for 3 M NaCl.

**Nernst equation.** At equilibrium, the electrode potential and the concentrations of Ox and Red at the electrode are connected by

$$E = E^{\circ\prime} - \frac{RT}{n_e F}\ln\frac{[\mathrm{Red}]}{[\mathrm{Ox}]}$$

Here $E^{\circ\prime}$ is the formal potential, the standard potential under your solution conditions. At $25\ ^\circ\mathrm{C}$, $RT/F = 25.7$ mV, so a tenfold change in the ratio $[\mathrm{Red}]/[\mathrm{Ox}]$ shifts $E$ by 59 mV when $n_e = 1$. At $E = E^{\circ\prime}$, the concentrations of Ox and Red are equal. This applies in both directions:

- When nothing is controlling the electrode, the solution sets the potential. This is the **open-circuit potential**.
- When the potentiostat sets $E$, it forces the ratio $[\mathrm{Red}]/[\mathrm{Ox}]$ right at the electrode surface.

**Current counts reactions.** Current is charge per unit time: $1\ \mathrm{A} = 1\ \mathrm{C\thinspace s^{-1}}$. Every molecule that reacts transfers $n_e$ electrons, so

$$i = \frac{dQ}{dt}, \qquad Q = \int i\thinspace dt = n_e F N$$

where $N$ is the number of moles that reacted. Example: a current of 10 µA flowing for 10 s passes $Q = 1.0\times10^{-4}$ C, which is $1.0\times10^{-9}$ mol of electrons. Electrochemistry can count very small amounts of reaction. Our software reports reduction current as negative.

**Why diffusion matters.** If you step $E$ far negative of $E^{\circ\prime}$, the Nernst equation says almost no Fe(CN)₆³⁻ can remain at the electrode surface. After that, the current is limited by how fast fresh Fe(CN)₆³⁻ diffuses in from the solution. For a planar electrode, solving the diffusion equation gives the **Cottrell equation** (Bard and Faulkner, *Electrochemical Methods*, 2nd ed., Ch. 5; Harvey 11.4):

$$i(t) = \frac{n_e F A C\sqrt{D}}{\sqrt{\pi t}}$$

Here $A$ is the electrode area (cm²), $C$ is the bulk concentration (mol cm⁻³), and $D$ is the diffusion coefficient (cm² s⁻¹).

#### Questions

1. **Open-circuit potential.** Use the Nernst equation to explain why the OCP of the ferricyanide solution sits where it does compared with $E^{\circ\prime}$. Roughly estimate the ratio $[\mathrm{Fe(CN)_6^{4-}}]/[\mathrm{Fe(CN)_6^{3-}}]$ in your solution.
2. **The CV.**
   - Plot one CV. You can use [js.munano.org/combine-echem](https://js.munano.org/combine-echem). Load the file `Voltammogram/Current vs Potential.csv` from inside the CV Experiment folder:

     <img src="/img/E6-cv-file.png" alt="CV file to plot" width="350">

   - Label the oxidation and reduction peaks, write the half-reaction for each, and mark the direction of the scan.
   - Report $E_{1/2}$.
   - Your reference electrode was Ag/AgCl in 3 M NaCl. Compare $E_{1/2}$ with a literature value, correcting for that reference.
   - Compare your peak separation $\Delta E_p$ with the value expected for a fast (reversible) one-electron process. What might cause a difference?
3. **Diffusion coefficient.** From your Cottrell fits (in the notebook), report $D$ for Fe(CN)₆³⁻ with a realistic uncertainty. Compare it with a literature value. What is the largest source of error?
4. **Charge.**
   - Find the total charge $Q = \int i\thinspace dt$ passed during one chronoamperometry transient. You can do this either of two ways:
     - integrate the Cottrell equation by hand and evaluate it with your fitted parameters, or
     - integrate the data numerically, using the trapezoid rule in Python or Excel.
   - Convert $Q$ to moles of Fe(CN)₆³⁻ reduced. What fraction of the Fe(CN)₆³⁻ in the cell is that?

---

## 4. References (5 pts)

| Pts | Criterion |
|---|---|
| 3 | At least 3 sources: a textbook, a literature source for each value you compare against, and the software you used. |
| 2 | One consistent style (ACS preferred), with in-text citations that match the reference list. |
