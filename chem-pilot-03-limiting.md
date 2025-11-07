---
layout: vanillabootmath.njk
title: Chemistry Pilot - Part 3 Solution
styles:
    - che120.css
---

# Part 3: A + 2C → B + 2D (Limiting Reactant)

## Solution

**Experimental Strategy:** A reaction only occurs when A and C are mixed so the reactants must be A and C. When equal volumes are mixed, you should notice that A is leftover. A titration could be a way to verify the exact stoichiometry of the reaction, or you can use a single trial to determine the stoichiometry as shown below.

For example, mixing 100. mL of 1.0 M A and 100. mL of 1.0 M C, we start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol A}}{1 \\, \text{L}} = 0.10 \\, \text{mol A} \\) and 0.10 mol C. After mixing, you have

<img src="/img/vlab-pilot-6.png" alt="The solution contains 0.05 mol A, 0.0 mol C, 0.05 mol B, and 0.10 mol D after mixing" style="max-width: 500px; display: block; margin: 1rem 0;">

C is completely consumed (0.0 mol remaining) but A still has 0.05 mol left. This means **C is the limiting reactant** - it ran out first and stopped the reaction.

Since we started with equal moles (0.10 mol each) but they don't react in a 1:1 ratio, one must be limiting. Looking at the changes:
- A decreased by 0.05 mol (0.10 → 0.05)
- C decreased by 0.10 mol (0.10 → 0.0)
- The ratio of A:C consumed is 0.05:0.10 = 1:2

This tells us the reaction is A + 2C → products.

For the products:
- B increased by 0.05 mol (matching the A consumed)
- D increased by 0.10 mol (twice the A consumed)

Therefore, the balanced equation is A + 2C → B + 2D.

Checking with mole to mole conversions (using the 0.10 mol C because it was the limiting reactant):
\\[
0.10 \\, \text{mol C} \times \left ( \frac{1\\, \text{mol A}}{2 \\, \text{mol C}}  \right )= 0.05 \\, \text{mol A consumed}
\\]
\\[
0.10 \\, \text{mol C} \times \left ( \frac{1\\, \text{mol B}}{2 \\, \text{mol C}}  \right )= 0.05 \\, \text{mol B produced}
\\]
\\[
0.10 \\, \text{mol C} \times \left ( \frac{2\\, \text{mol D}}{2 \\, \text{mol C}}  \right )= 0.10 \\, \text{mol D produced}
\\]
which matches the observations above.

It can also be useful to organize this information into a table as below.

  <table class="table table-bordered" style="max-width: 700px; margin: 1rem auto;">
      <thead>
          <tr>
              <th></th>
              <th>A</th>
              <th>+</th>
              <th><strong>2</strong>C</th>
              <th>→</th>
              <th>B</th>
              <th>+</th>
              <th><strong>2</strong>D</th>
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
              <td>−0.05</td>
              <td></td>
              <td><strong>−0.10</strong></td>
              <td></td>
              <td>+0.05</td>
              <td></td>
              <td><strong>+0.10</strong></td>
          </tr>
          <tr>
              <td><strong>Final (mol)</strong> = Initial + Change </td>
              <td>0.05</td>
              <td></td>
              <td><strong>0.0</strong></td>
              <td></td>
              <td>0.05</td>
              <td></td>
              <td>0.10</td>
          </tr>
      </tbody>
  </table>


**Key observations about limiting reactants:**
- C is completely consumed (final = 0), so C is the **limiting reactant**
- A has excess remaining (0.05 mol left over)
- The change in moles of C (0.10) is twice the change in moles of A (0.05), giving the 2:1 ratio in the equation
- The change in moles of D (0.10) is twice the change in moles of B (0.05), confirming the coefficient of 2 on D.

There are many other ways to solve the problem - you could instead continue adding C to A until both A and C are used up (a titration).
