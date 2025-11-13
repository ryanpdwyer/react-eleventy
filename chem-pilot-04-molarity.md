---
layout: vanillabootmath.njk
title: Chemistry Pilot - Part 4 Solution
styles:
    - che120.css
---

# Part 4: 2B + C → A + 3D (Working with Molarity)

## Solution

**Experimental Strategy:** In this case, the concentration always changes when any species are mixed together because of dilution. 100 mL of 1.0 M A and 100 mL of 1.0 M B, when mixed, result in 0.10 mol of A in 200 mL = 0.200 L, so the concentration (Molarity = mol/L) is \\(\frac{0.10 \\, \text{mol}}{0.20\\, \text{L}} = 0.50 \\, \text{M}\\). Or use the dilution equation, \\(M_1 V_1 = M_2 V_2 \\) - the total volume \\(V_2 = 200\\, \text{mL}\\). Once you get past these changes in concentration, you will recognize that products are only formed when B and C are mixed, so those must be the reactants. 


If mixing 100 mL of 1.0 M B and C, you find

<img src="/img/vlab-pilot-7.jpg" alt="The solution contains 0 M B, 0.25 M C, 0.25 M A, and 0.75 M D after mixing" style="max-width: 250px; display: block; margin: 1rem 0;">

**Convert final molarities to moles** using the total volume (0.200 L):
- \\(n_A = (0.25 \text{ M})(0.200 \text{ L}) = 0.050 \text{ mol A}\\)
- \\(n_B = (0.0 \text{ M})(0.200 \text{ L}) = 0.0 \text{ mol B}\\)
- \\(n_C = (0.25 \text{ M})(0.200 \text{ L}) = 0.050 \text{ mol C}\\)
- \\(n_D = (0.75 \text{ M})(0.200 \text{ L}) = 0.15 \text{ mol D}\\)

Now we can analyze the changes in moles:
- B: 0.10 → 0.0 (change: −0.10 mol)
- C: 0.10 → 0.050 (change: −0.050 mol)
- A: 0 → 0.050 (change: +0.050 mol)
- D: 0 → 0.15 (change: +0.15 mol)

Notice that B is completely consumed but C has 0.050 mol remaining, so **B is the limiting reactant**.

Comparing the mole ratios:
- B:C consumed = 0.10:0.050 = 2:1
- B:A produced = 0.10:0.050 = 2:1
- B:D produced = 0.10:0.15 = 2:3

Therefore, the balanced equation is **2B + C → A + 3D**.

Checking with mole to mole conversions (using B as the limiting reactant):
\\[
0.10 \\, \text{mol B} \times \left ( \frac{1\\, \text{mol A}}{2 \\, \text{mol B}}  \right )= 0.050 \\, \text{mol A}
\\]
\\[
0.10 \\, \text{mol B} \times \left ( \frac{3\\, \text{mol D}}{2 \\, \text{mol B}}  \right )= 0.15 \\, \text{mol D}
\\]
\\[
0.10 \\, \text{mol B} \times \left ( \frac{1\\, \text{mol C}}{2 \\, \text{mol B}}  \right )= 0.050 \\, \text{mol C consumed}
\\]

which matches the observations above.

## Optional: Initial Change Final Table

Organizing into a table:

  <table class="table table-bordered" style="max-width: 700px; margin: 1rem auto;">
      <thead>
          <tr>
              <th></th>
              <th><strong>2</strong>B</th>
              <th>+</th>
              <th>C</th>
              <th>→</th>
              <th>A</th>
              <th>+</th>
              <th><strong>3</strong>D</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td><strong>Initial (mol)</strong></td>
              <td>0.10</td>
              <td></td>
              <td>0.10</td>
              <td></td>
              <td>0</td>
              <td></td>
              <td>0</td>
          </tr>
          <tr style="background-color: #fff9e6;">
              <td><strong>Change (mol)</strong></td>
              <td><strong>−0.10</strong></td>
              <td></td>
              <td>−0.050</td>
              <td></td>
              <td>+0.050</td>
              <td></td>
              <td><strong>+0.15</strong></td>
          </tr>
          <tr>
              <td><strong>Final (mol)</strong> = Initial + Change </td>
              <td><strong>0.0</strong></td>
              <td></td>
              <td>0.050</td>
              <td></td>
              <td>0.050</td>
              <td></td>
              <td>0.15</td>
          </tr>
      </tbody>
  </table>

- The change in moles of B (0.10) is twice the change in moles of A (0.050), giving the coefficient of 2 on B
- The change in moles of D (0.15) is three times the change in moles of A (0.050), giving the coefficient of 3 on D
- The change in moles of C (0.050) equals the change in moles of A (0.050), giving coefficients of 1 on both
