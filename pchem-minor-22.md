---
layout: vanillabootflex-katex.njk
title: P Chem Lab 4 - Spectroscopy / Characterization Project 
js: pchem.js
---

# CHE 341 Lab: Spectroscopy or Characterization Project

This page lays out the goals and possible topics for the minor project.

You are welcome to work together on a project, just make sure that you would each have a part that is yours (so one person could be mainly responsible for the UV-Vis, the other for electrochemical measurements, etc - or you could both do UV-Vis on two separate instruments). You are each going to become the lab expert in one of these techniques; it's also a great chance to gain a new skill for your resume!

### Goals
- Gain an in-depth understanding of a spectroscopy or characterization technique
- Design experiments and analyze data (lots of Excel or Python practice possible!)
- Write a technical report summarizing your progress so students in future years can build on what you learned


### Timeline

- **Monday Sep 12** Choose a potential topic (we'll discuss your ideas briefly in class) and talk to me so we have an idea of what you want to do in lab on Thursday. I can also direct you to other papers or resources for your topic.
- **Wednesday September 14** Prelab Material requests (add anything to the shared Lab Notebook)
- **Thursday September 15** Prelab (10 pts): Plan out the experiments you want to do in lab week 1 based on our conversations on Monday / Wednesday. 
- **Wednesday September 21** Prelab Material requests (add anything to the shared Lab Notebook)
- **Thursday Sep 22** (20 pts) Analyze data from previous week, plan experiments for this week.
- **Thursday Sep 29** (20 pts) Analyze data from previous week, plan experiments for this week.
    - **First draft of technical report due**
- **Thursday October 6** Wrap-up the project with
    - A 10 minute presentation on some of the background of your technique (50 pts)
        - What is your technique?
        - What is the basic theory underlying it?
- **Wednesday October 12** Final  technical report summarizing your findings due (150 pts)


### Possible Instrumental Techniques 

I've tried to highlight the key instruments that you would be focusing on in bold. Feel free to email me with any questions as you are choosing a topic.

- **UV-Vis absorbance spectroscopy.** We have three possible instruments you could use (**OceanOptics**, **Thorlabs**, or **UV-1800**). There are many possible experiments you could investigate:
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
- **High Performance Liquid Chromatography** We have an **Agilent HPLC 1260 Infinity II.** [Assisted by Dr. McLatchlan]
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
    <!-- - Coat an electrode with gold nanoparticles and investigate its utility as a sensor. -->
    - Electroplate metals onto a carbon electrode, measure how much metal is deposited (team electrochemistry did most of this on Thursday), see [Metal Electrodeposition on an Integrated, Screen-Printed Electrode Assembly](https://doi.org/10.1021/ed085p565)


### Fabrication and surface modification techniques

- Contact angle measurement
    - Modify the surface of glass, ITO, and gold materials with self-assembled monolayers or electrochemically grown layers, quantify using the contact angle.
        - Gold: [Patterning Self-Assembled Monolayers on Gold. Green Materials Chemistry in the Teaching Laboratory](https://doi.org/10.1021/ed081p545)
    - Determine the reproducibility of our contact angle setup (± how many degrees for a single measurement)
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
- Calorimetry
    - Measure \\(\Delta H^\circ\\) and \\( K \\) or activation energy using a simple calorimeter. See [Efficient Method for the Determination of the Activation Energy of the Iodide-Catalyzed Decomposition of Hydrogen Peroxide](https://doi.org/10.1021/ed500116g).
- Differential Scanning calorimetry
    - Not working well, but you could try to measure the melting point / purity of gallium, gallium-indium eutectic, and other low-melting point materials (chocolate?). There would certainly be some good applications, even if you data wouldn't be great.

<script>
const imgs = document.querySelectorAll("img")
imgs.forEach(function (img) {
    img.style = "max-width: 80%;"
}
)
</script>