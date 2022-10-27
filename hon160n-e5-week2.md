---
layout: vanillabootmath.njk
title: E5 Formation of Ferroin
js: che120-e4-22.js
styles:
    - che120.css
---

# E5 Formation of Ferroin

## Control Experiments

For an overview of some of the factors relevant for your control experiments, see the following video.

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; border: 0;" scrolling="no" src="https://expl.ai/GXDKAJZ?mode=embed" frameborder="0" allowfullscreen></iframe>
</div>


## Hand and Excel Calculations

Your calculations for the equilibrium constant rely on filling out an ICE (Initial Change Equilibrium) table for the reaction. You are encouraged to run through the sample calculation shown below, and use that to construct an Excel table that you can then plug in your experimental data once you have your results in lab Monday.

Consider an example (not an experiment you performed) for reaction mixture 5:


<img src="/img/solution-table-hon160e5.png" alt="Solution Table" class="img-fluid" style="max-width:500px;" >

For an example calculation, let's assume the measured absorbance at λ<sub>max</sub> was 0.38 and the slope of the calibration curve was 11,500 M<sup>-1</sup> for the hypothetical trial 5.

<img src="/img/hon160n-e5-table1.png" alt="ICE Table" class="img-fluid" style="max-width:500px;" >

Using Beer's law, the measured absorbance determines the equilibrium concentration of ferroin [Fe(phen)<sub>3</sub><sup>2+</sup>]<sub>eq</sub>. This determines the change \\(x\\), which allows the concentration of the other species at equilibrium to be determined. We'll assume H<sub>2</sub>SO<sub>4</sub> acts as a monoprotic strong acid (neglecting additional dissociation of HSO<sub>4</sub>), so [H<sub>3</sub>O<sup>+</sup>]<sub>initial</sub> = 0.50 M. Since \\(x\\) is much smaller than 0.50 M, we can assume [H<sub>3</sub>O<sup>+</sup>]<sub>eq</sub> = 0.50 M for all trials. 

I'd recommend working through the ICE table for this example by hand, then creating an appropriate Excel table for the calculation. I'd recommend columns for your
 - independent variables: the initial concentrations of Fe<sup>2+</sup> and phenH<sup>+</sup>,
 - dependent variable: the measured absorbance,
 - calculations: columns calculating all of the things you'll need to determine the equilibrium constant \\(K\\)
 - and of course, a column for the equilibrium constant \\(K\\)!

**For this sample calculation, you should find** \\(K = 1.0\times 10^5\\).

If your Excel table is set up correctly, all of your calculations will just involve

- Updating the value of your calibration curve slope
- Entering the data from your 4 trials and filling down


Then you can do an average and standard deviation as usual...