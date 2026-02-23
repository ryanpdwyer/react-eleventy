---
layout: vanillabootflex-md-pchem.njk
title: "UV-Vis Spectroscopy of the Triiodide Equilibrium"
js: pchem.js
tags: pchem-26
---

### UV-Vis Spectroscopy of the Triiodide Equilibrium

The formation of triiodide from molecular iodine and iodide is one of the most well-studied equilibria in aqueous solution:

$$\text{I}_2(\text{aq}) + \text{I}^-(\text{aq}) \rightleftharpoons \text{I}_3^-(\text{aq})$$

This system is ideal for UV-Vis spectroscopy because I<sub>2</sub> and I<sub>3</sub><sup>−</sup> have well-separated absorption bands: I<sub>2</sub> absorbs broadly around 460 nm (visible, brown), while I<sub>3</sub><sup>−</sup> has strong peaks at 288 nm and 350 nm in the UV. The equilibrium constant is moderate (\\(K \approx 700\\) at 25 °C), so both species are present in measurable amounts — and the reaction is exothermic (\\(\Delta H^\circ = -17.0\\) kJ/mol), meaning the equilibrium shifts noticeably with temperature (Palmer et al., 1984).

This project has three main components: (1) comparing the spectral resolution of the **Ocean Optics** fiber-optic spectrometer to the **Shimadzu UV-1800** benchtop instrument, (2) measuring the triiodide equilibrium constant at room temperature and observing the isosbestic point, and (3) using the **Quantum Northwest** temperature controller to measure \\(K\\) as a function of temperature and construct a van't Hoff plot.


#### Instruments

- **Ocean Optics USB2000/USB4000** with deuterium–tungsten light source and fiber-optic cuvette holder. Typical spectral resolution is ~1–2 nm FWHM depending on grating and slit configuration. The Quantum Northwest temperature controller connects to this cuvette holder for variable-temperature work.
- **Shimadzu UV-1800** double-beam spectrophotometer (1 nm spectral bandwidth, ±0.1 nm wavelength accuracy). This serves as the reference instrument. The UV-1800 also has a variable-temperature cuvette holder available.


#### Possible Experiments

- **Instrument comparison and resolution.** Record the spectrum of a dilute KI/I<sub>2</sub> solution on both the Ocean Optics and the UV-1800. Compare peak shapes, noise levels, baseline stability, and the ability to resolve fine spectral features. A holmium oxide wavelength calibration filter can also be used to check wavelength accuracy on both instruments. This gives you hands-on experience with fiber-optic vs. double-beam spectrometer architectures, and provides context for evaluating your quantitative results.

- **Room-temperature equilibrium constant.** Prepare a series of solutions with fixed total iodine concentration ([I<sub>2</sub>]<sub>0</sub>) and varying [KI]. As excess I<sup>−</sup> drives the equilibrium toward I<sub>3</sub><sup>−</sup>, the 460-nm band decreases and the 288/350-nm bands grow. An isosbestic point near 466 nm — where the molar absorptivities of I<sub>2</sub> and I<sub>3</sub><sup>−</sup> are equal — should be visible in the overlay of spectra, confirming a clean two-species equilibrium. From the absorbance at 350 nm (where I<sub>3</sub><sup>−</sup> dominates) and known extinction coefficients, determine \\(K\\) at room temperature and compare to the literature value of \\(K = 698 \pm 10\\) (Palmer et al., 1984).

- **Variable-temperature van't Hoff analysis.** Using the Quantum Northwest controller on the Ocean Optics, measure spectra of a single KI/I<sub>2</sub> solution at temperatures from roughly 15–55 °C. At each temperature, extract [I<sub>3</sub><sup>−</sup>] from the absorbance and calculate \\(K(T)\\). A van't Hoff plot of \\(\ln K\\) vs. \\(1/T\\) yields \\(\Delta H^\circ\\) and \\(\Delta S^\circ\\). Since the reaction is exothermic, you should see \\(K\\) decrease with increasing temperature. The literature values (\\(\Delta H^\circ = -17.0 \pm 0.6\\) kJ/mol, \\(\Delta S^\circ = -0.6 \pm 0.3\\) J/(K·mol)) provide a quantitative benchmark. You can also repeat a few temperatures on the UV-1800 to cross-validate.


<!--
#### Suggested Timeline

- **Week 1 (3-hour session):** Set up and align the Ocean Optics with the cuvette holder and light source. Prepare stock solutions of I<sub>2</sub> (in KI to dissolve) and KI at known concentrations. Record the full UV-Vis spectrum of each stock individually, then prepare the concentration series and record the family of spectra. Run the same key solutions on the UV-1800 for comparison. Identify the isosbestic point and make a first estimate of \\(K\\) at room temperature.

- **Week 2 (3-hour session):** Connect the Quantum Northwest controller. Equilibrate and record spectra at 5–8 temperatures spanning 15–55 °C (allowing time for thermal equilibration at each step). Construct the van't Hoff plot. If time permits, repeat 2–3 temperatures on the UV-1800 as a cross-check.
-->


#### Key Concepts

- **Beer–Lambert law and multi-component analysis:** The total absorbance at any wavelength is the sum of contributions from each absorbing species. With known extinction coefficients for I<sub>2</sub> and I<sub>3</sub><sup>−</sup>, the concentration of each species can be extracted from absorbance measurements.
- **Isosbestic point:** A wavelength where two interconverting species have equal molar absorptivity. All spectra in the series should cross at this point if only two absorbing species are present — a powerful qualitative diagnostic.
- **Van't Hoff equation:** \\(\ln K = -\frac{\Delta H^\circ}{RT} + \frac{\Delta S^\circ}{R}\\). A plot of \\(\ln K\\) vs. \\(1/T\\) gives a straight line with slope \\(-\Delta H^\circ / R\\) and intercept \\(\Delta S^\circ / R\\), assuming \\(\Delta H^\circ\\) is approximately constant over the temperature range.
- **Spectrometer resolution:** The minimum wavelength difference that can be distinguished. Fiber-optic spectrometers (like the Ocean Optics) use a fixed grating and CCD array, while scanning double-beam instruments (like the UV-1800) use a monochromator. Each architecture has trade-offs in resolution, speed, noise, and flexibility.


#### References

1. Awtrey, A. D.; Connick, R. E. The Absorption Spectra of I<sub>2</sub>, I<sub>3</sub><sup>−</sup>, I<sup>−</sup>, IO<sub>3</sub><sup>−</sup>, S<sub>4</sub>O<sub>6</sub><sup>2−</sup> and S<sub>2</sub>O<sub>3</sub><sup>2−</sup>. Heat of the Reaction I<sub>3</sub><sup>−</sup> = I<sub>2</sub> + I<sup>−</sup>. *J. Am. Chem. Soc.* **1951**, *73*, 1842–1843. [DOI: 10.1021/ja01148a504](https://doi.org/10.1021/ja01148a504)
2. Palmer, D. A.; Ramette, R. W.; Mesmer, R. E. Triiodide Ion Formation Equilibrium and Activity Coefficients in Aqueous Solution. *J. Solution Chem.* **1984**, *13*, 673–683. [DOI: 10.1007/BF00650374](https://doi.org/10.1007/BF00650374)
3. Ramette, R. W.; Sandford, R. W., Jr. Thermodynamics of Iodine Solubility and Triiodide Ion Formation in Water and in Deuterium Oxide. *J. Am. Chem. Soc.* **1965**, *87*, 5001–5005. [DOI: 10.1021/ja00950a001](https://doi.org/10.1021/ja00950a001)
4. Calabrese, V. T.; Khan, A. Polyiodide and Polyiodine Species in an Aqueous Solution of Iodine + KI: Theoretical and Experimental Studies. *J. Phys. Chem. A* **2000**, *104*, 1287–1292. [DOI: 10.1021/jp992847r](https://doi.org/10.1021/jp992847r)
5. Beckwith, R. C.; Wang, T. X.; Margerum, D. W. Equilibrium and Kinetics of Bromine Hydrolysis. *Inorg. Chem.* **1996**, *35*, 995–1000. (Provides analogous methodology for halide equilibria.)
6. Guerin, A. C.; Riley, K.; Rupnik, K.; Kuroda, D. G. Determining the Energetics of the Hydrogen Bond through FTIR: A Hands-On Physical Chemistry Lab Experiment. *J. Chem. Educ.* **2016**, *93*, 1124–1129. [DOI: 10.1021/acs.jchemed.5b01014](https://doi.org/10.1021/acs.jchemed.5b01014) (Analogous van't Hoff methodology using spectroscopy.)
