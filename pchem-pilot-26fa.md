---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - Pilot Project
js: pchem.js
tags: pchem-26fa
---

# CHE 341 Lab: Pilot Project

This page lays out the goals and possible topics for the pilot project. At the end of the pilot, you will choose to either continue the same project or pivot to a new one for the major project.

**Your pilot project should include some spectroscopy.** Even if you want your major project to emphasize something else, getting some spectroscopy in here will be useful.

You are welcome to work together on a project, just make sure that you would each have a part that is yours (so one person could be mainly responsible for the UV-Vis, the other for electrochemical measurements, etc - or you could both do UV-Vis on two separate instruments). You are each going to become the lab expert in one of these techniques; it's also a great chance to gain a new skill for your resume!

### Goals
- Gain an in-depth understanding of a spectroscopy or characterization technique
- Design experiments and analyze data (lots of Excel or Python practice possible!)
- Handle your data reproducibly: one notebook or script that regenerates every figure from the raw files
- Write a technical report summarizing your progress so students in future years can build on what you learned
- Use your pilot data to propose a major project


### Timeline

- **Friday Oct 2** Send me a 1-paragraph idea for the project you're most interested in. I'll use these to help match everyone with a topic, and we can talk through your idea together.
- **Wednesday Oct 7** Pilot project planning (independent work during lab). Read the literature on your topic and write your plan.
- **Friday Oct 9** Project plan and materials requests due (add anything you need to the shared Lab Notebook)
- **Wednesday Oct 14** Pilot project week 1
- *Fall break: Friday Oct 16*
- **Monday Oct 19** Week 2 update due
- **Wednesday Oct 21** Pilot project week 2
- **Wednesday Oct 28** Pilot project wrap-up: 8-10 minute presentation on your technique, findings, and what you propose for the major project
- **Friday Oct 30** Technical report and data analysis notebook due
- **Wednesday Nov 4** Major project begins


### Assignments and Rubrics (250 pts)

#### 1. Project plan and update (25 pts)

**Project plan (20 pts, due Friday Oct 9).** Bullet points are fine. Your introduction is also the starting point for your presentation and report.

| Pts | Section |
|---|---|
| 5 | **Introduction.** State your question, explain what your technique measures and how, and give the model you plan to fit to your data. Cite at least 3 sources, including at least one primary article. |
| 8 | **Week 1 experiments.** List the specific experiments in order, with solution concentrations and the calculations behind them, and the instrument settings. Say what data you will get and how you will analyze it: which plot and which model. Week 1 can be heavier on experiments or heavier on analysis. Either way, plan how you will use the full 3 hours. |
| 4 | **Materials.** List every chemical with its CAS number, the amount you need, and its location (room and shelf) from [ChemInventory](https://app.cheminventory.net). Also list glassware and equipment beyond what is normally in the lab. Check the inventory before you ask for anything. |
| 3 | **Purchasing.** For anything we don't have, give the vendor, catalog number, quantity, price, and link. Anything ordered after Oct 9 may not arrive in time. |

**Week 2 update (5 pts, due Monday Oct 19).** One figure from your week 1 data, with 2–3 sentences on what it shows, and your plan for week 2 (what you will do next and why, plus any new materials).

#### 2. Presentation (50-point rubric × 1.5 = 75 pts, Wednesday Oct 28)

Prepare an 8–10 minute talk that is mostly about your pilot project: your technique, our instrument, and what you found. For comparison, include one primary literature article that uses your technique in an interesting way (a slide or two is enough). I highly recommend practicing your talk with me in office hours before you present. **You are the class expert on our instrument, so you need to know exactly how it works.**

| Pts | Criterion |
|---|---|
| 6 | Any theory or model behind the technique (from background research online, books, etc.) |
| 12 | How our specific instrument works, from source to detector to signal: what each component does, and what limits the measurement |
| 8 | What sample information the technique gives you |
| 4 | What the literature article used the technique for, and how that compares with your project |
| 8 | What conclusions you drew using the technique in your pilot project |
| 6 | Your final analysis and evaluation. How useful is this technique? What questions do you still have about it? Will you continue with it or pivot for the major project? |
| 6 | Slides and presentation skills |

#### 3. Technical report (100 pts, Friday Oct 30)

The audience is future CHE 341 students and your classmates, who may use your technique in the major project.

| Pts | Criterion |
|---|---|
| 8 | **Abstract.** 2–4 sentences on what aspects of the technique you investigated, with your key results (numbers where appropriate). |
| 12 | **Technique.** A succinct description of the technique and how our instrument works. |
| 12 | **Experiments.** A materials and methods section with extra details, appendices, diagrams, and pictures as appropriate. |
| 20 | **What you learned.** All claims correct and supported by your data (8). Uncertainty and/or reproducibility analyzed (4). Results compared with the literature (8). |
| 16 | **Figures.** Well-labeled, appropriate, useful figures that tell the story. |
| 4 | **Future work.** What should future students do? It can be related to your experiments or completely different. |
| 4 | **References.** Papers, websites, and books you used, in ACS format (about 5). |
| 8 | **Data and notebook.** Submit all raw data needed to reproduce your analysis, sensibly named and organized, and scans of your lab notebook pages. |
| 8 | **Writing quality.** Well written and free of typos and grammatical errors. |
| 8 | **Organization.** Logically organized and easy to follow, with sections, transitions, and paragraphs. |

#### 4. Data analysis (50 pts, Friday Oct 30)

Your analysis must include Python. You can do quick looks and simple fits in Excel, but a Python notebook should load your raw files and make every figure in your report. You may use AI tools (Claude, ChatGPT, Copilot) to help write code, as long as you can explain what every cell does.

| Pts | Criterion |
|---|---|
| 15 | **Reproducible.** Restart & Run All regenerates every report figure from the raw data files, with no hand-edited numbers. |
| 15 | **Fitting.** Each model is fit with uncertainties (for example, with lmfit), and the residuals are plotted and checked. |
| 10 | **Automation.** Repeated steps (many spectra, many runs) are handled by one function or loop, not by copying cells. |
| 10 | **Explanation.** Markdown cells explain each step in your own words. If you used AI, note what you asked for and how you checked that the code was right. |

### Possible Instrumental Techniques

I've tried to highlight the key instruments that you would be focusing on in bold. Feel free to email me with any questions as you are choosing a topic.

- **UV-Vis absorbance spectroscopy.** We have four possible instruments you could use (**OceanOptics**, **Thorlabs**,  **UV-1800**, **Biotek 96 well plate**). There are many possible experiments you could investigate:
    - Measure the equilibrium constant of a chemical reaction (+ the effect of some other variable, like ionic strength)
    - Utilize the variable temperature add-on to measure the variation of the equilibrium constant with temperature, enabling you to determine the enthalpy change \\(\Delta H^\circ\\) and entropy change \\(\Delta S^\circ \\) for the reaction.
    - Measure the kinetics of a chemical reaction (determine orders, rate constant)
    - Measure the activation energy of a chemical reaction
    - Time-resolved measurements: [Flash Photolysis Experiment of o-Methyl Red as a Function of pH: A Low-Cost Experiment for the Undergraduate Physical Chemistry Lab](https://doi.10.1021/acs.jchemed.6b00403)
    - Determine the mechanism of a chemical reaction
    - Characterize the stability of gold nanoparticles created over the last 4 years
- **Raman Spectroscopy.** Wasatch Photonics 785 Integrated Raman Spectrometer
    - Could continue investigating different gold / silver nanomaterials for Surface Enhanced Raman Spectroscopy
    - [Using Raman Spectroscopy and Surface-Enhanced Raman Scattering To Identify Colorants in Art](https://pubs.acs.org/10.1021/ed5002637)
- **Infrared Spectroscopy.** New [**Agilent Spectrum Two FT-IR**](https://www.perkinelmer.com/product/spectrum-two-ft-ir-sp10-software-l160000a) with ATR (Attenuated Total Reflectance) diamond crystal for solid / liquid sampling without using KBr or NaCl plates.
- **Process analytical chemistry project ideas.** Track the progress of a chemical reaction over time with UV-Vis, Raman, or IR, then fit a kinetic model.
    - Raman: [Real-Time Monitoring of Aspirin Synthesis Using Raman Spectroscopy](https://doi.org/10.1021/acs.jchemed.5c00754). Track salicylic acid, acetic anhydride, aspirin, and acetic acid at once, compare temperatures and catalyst, and get activation energies from an Arrhenius plot. Start by checking the pure components on our 785 nm Raman for fluorescence.
    - UV-Vis: [Process Analytical Technology for Online Monitoring of Organic Reactions](https://doi.org/10.1021/acs.jchemed.8b00725). Monitor a reaction in a flow cell.
    - Near-IR: [Monitoring the Temperature of Dilute Aqueous Solutions Using Near-Infrared Water Absorption](https://doi.org/10.1366/000370203322005355). Water's overtone band near 960 nm shifts with temperature. Calibrate it and you have an optical thermometer for heating, cooling, or mixing.
- **High Performance Liquid Chromatography** We have an **Agilent HPLC 1260 Infinity II.**
    - [Determination of the Acid Dissociation Constant of a Phenolic Acid by High Performance Liquid Chromatography](https://pubs.acs.org/doi/10.1021/acs.jchemed.7b00647) This would be an interesting potential idea - a nice mix of HPLC and Excel or Python data analysis
- **Nuclear Magnetic Resonance Spectroscopy** We have an **Anasazi ETF-360.**
    - Doing a kinetics experiment via NMR would be an interesting option.
- **Electrochemistry** We have two main potentiostats (electrochemical instrumentation): the **Solartron 1287A** and a **Pine WaveNow.**
    - The EPA action level for lead in drinking water is 15 parts per billion (ppb). Using anodic stripping voltammetry, determine the limit of detection and quantification for this technique in our lab (method of standard additions). See [Screen-printed electrodes for environmental monitoring of heavy metal ions: a review](https://link.springer.com/article/10.1007/s00604-015-1651-0).
        - We have mercury-coated paper electrodes (like the carbon-coated electrodes used in lab).
        - You could also try coating a platinum or carbon electrode with a gallium-indium eutectic instead. This would be environmentally friendlier.
    - Poly(3,4-ethylenedioxythiophene), or PEDOT, is a conductive polymer with electrochromic properties; depending on the applied voltage, the material can be transparent or a dark blue. Electrochemically grow a PEDOT film and investigate its properties (such as enhanced sensitivity to detect ascorbic acid).

        ![PEDOT oxidized and reduced forms](/img/pedot-ox-red.png)

        - PEDOT films could also be deposited by spin-coating from an aqueous or organic dispersion.
        - There are also good applications of contact angle measurements to better understand what the surfaces look like.
    - Perform an electrochemical titration.
    - Electroplate metals onto a carbon electrode, measure how much metal is deposited, see [Metal Electrodeposition on an Integrated, Screen-Printed Electrode Assembly](https://doi.org/10.1021/ed085p565)


### Fabrication and surface modification techniques

- Contact angle measurement
    - Modify the surface of glass, ITO, and gold materials with self-assembled monolayers or electrochemically grown layers, quantify using the contact angle.
        - Gold: [Patterning Self-Assembled Monolayers on Gold. Green Materials Chemistry in the Teaching Laboratory](https://doi.org/10.1021/ed081p545)
    - Determine the reproducibility of our contact angle setup
    - Quantify the roughness of electrochemically grown electrodes (roughness affects the contact angle)
- Stamping (contact lithography)
- Spin-coating
- Projects using multiple techniques
    - Spin-coat a \[Ru(bipy)<sub>3</sub>\]<sup>3+</sup> film and measure its electochemical and electroluminescent properties. See [Using Organic Light-Emitting Electrochemical Thin-Film Devices To Teach Materials Science](https://pubs.acs.org/doi/pdf/10.1021/ed081p1620).
    - [Conductive PEDOT Covalently Bound to Transparent FTO Electrodes](https://doi.org/10.1021/jp412758g)
- Polarimetry
    - Set up a polarimeter to measure optical rotation (how much light is rotated by chiral molecules)
    - See [Low-Cost 3D-Printed Polarimeter](https://doi.org/10.1021/acs.jchemed.9b01083), possibly even simpler
- Set up our (other) Raman spectrometer! Based on [Inexpensive Raman Spectrometer for Undergraduate and Graduate Experiments and Research](https://doi.org/10.1021/ed800081t)
    ![Raman spectrometer](/img/Raman-Spectrometer-Green.png)
    - Measure fluorescence of fluorescin to align the instrument
    - Use the [Tollens reaction](https://edu.rsc.org/exhibition-chemistry/the-silver-mirror-test/2020077.article) to make a nice silver-coated microscope slide
- Electrical measurements
    - Another way to measure the properties of conductive films, like PEDOT.
    - Constructing a nice 4-point probe: [Studying Electrical Conductivity Using a 3D Printed Four-Point Probe Station](https://doi.org/10.1021/acs.jchemed.7b00119)
- 3D Printing
    - [Using Open-Source, 3D Printable Optical Hardware To Enhance Student Learning in the Instrumental Analysis Laboratory](https://doi.org/10.1021/acs.jchemed.7b00480)
- Differential Scanning calorimetry
    - Not working well, but you could try to measure the melting point / purity of gallium, gallium-indium eutectic, and other low-melting point materials (chocolate?). There would certainly be some good applications, even if you data wouldn't be great.

<script>
const imgs = document.querySelectorAll("img")
imgs.forEach(function (img) {
    img.style = "max-width: 80%;"
}
)
</script>
