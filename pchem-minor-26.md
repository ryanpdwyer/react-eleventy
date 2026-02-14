---
layout: vanillabootflex-md-pchem.njk
title: P Chem Lab - Spectroscopy / Characterization Project
js: pchem.js
tags: pchem-26
---

# CHE 341 Lab: Spectroscopy or Characterization Project

This page lays out the goals and possible topics for the minor project.

You are welcome to work together on a project, just make sure that you would each have a part that is yours (so one person could be mainly responsible for the UV-Vis, the other for electrochemical measurements, etc - or you could both do UV-Vis on two separate instruments). You are each going to become the lab expert in one of these techniques; it's also a great chance to gain a new skill for your resume!

### Goals
- Gain an in-depth understanding of a spectroscopy or characterization technique
- Design experiments and analyze data (lots of Excel or Python practice possible!)
- Write a technical report summarizing your progress so students in future years can build on what you learned


### Timeline

- **Wednesday Feb 18** Choose a potential topic and talk to me so we have an idea of what you want to do in lab.
- **Tuesday Feb 24** Prelab materials requests due (add anything to the shared Lab Notebook)
- **Thursday Feb 26** First week of minor project
- **Thursday Mar 5** Second week of minor project
- *Spring break: Mar 9–13*
- **Thursday Mar 19** First draft of technical report due
- **Thursday Mar 26** Final presentation (10 minutes on some of the background and findings of your project)
- **Thursday Apr 2** Final technical report due


### Hydrogen Bonding and IR Spectroscopy

Hydrogen bonding is one of the most important intermolecular interactions in chemistry, responsible for the unique properties of water, the structure of proteins, and the behavior of many solvents. IR spectroscopy is a powerful tool for studying hydrogen bonds because H-bonding causes characteristic changes in vibrational spectra: the X-H stretching frequency typically red-shifts (moves to lower wavenumber) and the absorption band broadens when a hydrogen bond forms. In some cases, "blue-shifting" hydrogen bonds have been observed where the X-H stretch moves to higher frequency (Hobza and Havlas, *Chem. Rev.* 2000).

#### Possible Experiments

- **Measuring H-bond energetics via temperature-dependent FTIR.** Following Guerin et al. (*J. Chem. Educ.* 2016), measure the temperature-dependent IR spectra of methyl acetate in the C=O stretching region. The carbonyl stretch shifts when hydrogen-bonded to water, so by tracking the equilibrium between free and H-bonded C=O as a function of temperature, you can determine \\(\Delta H^\circ\\) and \\(\Delta S^\circ\\) for the hydrogen bond via a Van't Hoff analysis.

- **Quantifying water in organic solvents.** The O-H stretch region (3500-3700 cm\\(^{-1}\\)) can be used to quantify trace water content in solvents like acetonitrile, DMSO, or chloroform using Beer-Lambert analysis (Ludvik et al., *Analyst* 1988; Troshin et al., *J. Anal. Chem.* 2008; Pelletier and Fabiilli, *Appl. Spectrosc.* 2007). You could compare different solvents or investigate the effect of acid additives on the water IR spectrum.

- **Concentration-dependent H-bonding in alcohols.** Measure IR spectra of an alcohol (e.g., methanol or ethanol) at different concentrations in an inert solvent like CCl\\(_4\\). At low concentrations, you see the sharp monomer O-H stretch; at higher concentrations, broad features from H-bonded dimers and polymers appear (Pagliai et al., *J. Chem. Phys.* 2003).

- **Isotopic substitution effects.** Compare O-H vs O-D stretching frequencies in H\\(_2\\)O/D\\(_2\\)O mixtures or HOD in D\\(_2\\)O to probe the nature of hydrogen bonding in water (Auer et al., *PNAS* 2007; Brela et al., *Chem. Phys. Lett.* 2013).

- **Overtone spectroscopy and intramolecular H-bonds.** If near-IR capability is available, vibrational overtone spectra can be used to study intramolecular hydrogen bonding strength and anharmonicity (John et al., *Spectrochim. Acta A* 2007).

#### Key Concepts

- **Red-shifting vs blue-shifting H-bonds:** Most hydrogen bonds cause a red-shift and broadening of the X-H stretch. Blue-shifting H-bonds (where the X-H frequency increases upon H-bond formation) are an active area of research. Buckingham et al. (*Chem. Phys. Lett.* 2008) demonstrate that there is no fundamental difference between the two types.
- **Anharmonicity:** The harmonic approximation often fails for hydrogen-bonded systems. Anharmonic corrections (via perturbation theory or grid-based methods like VSCF/VCI) are needed to accurately predict IR frequencies (Xantheas, *Int. Rev. Phys. Chem.* 2006; Bouteiller, *Chem. Phys.* 2005).
- **Local vibrational modes:** The local mode theory provides a way to extract bond-strength information from IR spectra, including for hydrogen bonds in water clusters and ice (Kraka et al., *J. Phys. Chem. A* 2022).

#### References

1. Guerin, A. C.; Riley, K.; Rupnik, K.; Kuroda, D. G. Determining the Energetics of the Hydrogen Bond through FTIR: A Hands-On Physical Chemistry Lab Experiment. *J. Chem. Educ.* **2016**, *93*, 1124-1129. [DOI: 10.1021/acs.jchemed.5b01014](https://doi.org/10.1021/acs.jchemed.5b01014)
2. Hobza, P.; Havlas, Z. Blue-Shifting Hydrogen Bonds. *Chem. Rev.* **2000**, *100*, 4253-4264. [DOI: 10.1021/cr990050q](https://doi.org/10.1021/cr990050q)
3. Buckingham, A. D.; Del Bene, J. E.; McDowell, S. A. C. The Hydrogen Bond. *Chem. Phys. Lett.* **2008**, *463*, 1-10. [DOI: 10.1016/j.cplett.2008.06.060](https://doi.org/10.1016/j.cplett.2008.06.060)
4. Xantheas, S. S. Anharmonic Vibrational Spectra of Hydrogen Bonded Clusters. *Int. Rev. Phys. Chem.* **2006**, *25*, 719-733. [DOI: 10.1080/01442350600922564](https://doi.org/10.1080/01442350600922564)
5. Bouteiller, Y. Infrared Spectra Calculated by Quantum Chemistry with Anharmonic Corrections. *Chem. Phys.* **2005**, *314*, 159-171. [DOI: 10.1016/j.chemphys.2005.01.031](https://doi.org/10.1016/j.chemphys.2005.01.031)
6. Kraka, E.; Quintano, M.; La Force, H. W.; Antonio, J. J.; Freindorf, M. The Local Vibrational Mode Theory and Its Place in the Vibrational Spectroscopy Arena. *J. Phys. Chem. A* **2022**, *126*, 8781-8798. [DOI: 10.1021/acs.jpca.2c05962](https://doi.org/10.1021/acs.jpca.2c05962)
7. Brela, M. Z.; Wojcik, M. J.; Boczar, M.; Hashim, R. Car-Parrinello Simulation of the Vibrational Spectra of Strong Hydrogen Bonds with Isotopic Substitution Effects. *Chem. Phys. Lett.* **2013**, *558*, 88-92. [DOI: 10.1016/j.cplett.2012.12.035](https://doi.org/10.1016/j.cplett.2012.12.035)
8. Auer, B.; Kumar, R.; Schmidt, J. R.; Skinner, J. L. Hydrogen Bonding and Raman, IR, and 2D-IR Spectroscopy of Dilute HOD in Liquid D\\(_2\\)O. *PNAS* **2007**, *104*, 14215-14220. [DOI: 10.1073/pnas.0701482104](https://doi.org/10.1073/pnas.0701482104)
9. Ludvik, J.; Hilgard, S.; Volke, J. Determination of Water in Acetonitrile, Propionitrile, Dimethylformamide and Tetrahydrofuran by Infrared and Near-Infrared Spectrometry. *Analyst* **1988**, *113*, 1729-1731. [DOI: 10.1039/AN9881301729](https://doi.org/10.1039/AN9881301729)
10. Troshin, V. V.; Sheludyakova, L. A.; Mironov, I. V. The Effect of Additives of Strong Inorganic Acids on IR-Spectroscopic Determination of Water in Organic Solutions. *J. Anal. Chem.* **2008**, *63*, 544-547. [DOI: 10.1134/S1061934808060051](https://doi.org/10.1134/S1061934808060051)
11. Pelletier, M. J.; Fabiilli, M. L. Rapid, Nondestructive Near-Infrared Assay for Water in Sealed Dimethyl Sulfoxide Compound Repository Containers. *Appl. Spectrosc.* **2007**, *61*, 935-939. [DOI: 10.1366/000370207781746017](https://doi.org/10.1366/000370207781746017)
12. Pagliai, M.; Cardini, G.; Righini, R.; Schettino, V. Hydrogen Bond Dynamics in Liquid Methanol. *J. Chem. Phys.* **2003**, *119*, 6655-6662. [DOI: 10.1063/1.1605093](https://doi.org/10.1063/1.1605093)
13. John, U.; Kuriakose, S.; Nair, K. P. R. Vibrational Overtone Spectra of o-Fluorophenol and the "Anomalous" Order of Intramolecular Hydrogen Bonding Strengths. *Spectrochim. Acta A* **2007**, *68*, 331-336. [DOI: 10.1016/j.saa.2006.11.040](https://doi.org/10.1016/j.saa.2006.11.040)


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
