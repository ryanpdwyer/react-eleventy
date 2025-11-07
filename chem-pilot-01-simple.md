---
layout: vanillabootmath.njk
title: Chemistry Pilot - Part 1 Solution
styles:
    - che120.css
---

# Part 1: A + B → 2C

## Solution

When 100. mL of 1.0 M A and 100. mL of 1.0 M B are mixed, we start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol A}}{1 \\, \text{L}} = 0.10 \\, \text{mol A} \\) and also 0.10 mol B. This can be seen directly in the left information column too. Looking at the final solution after mixing,

<img src="/img/vlab-pilot-3-moles-only.png" alt="The solution contains 0.0 mol A, 0.0 mol B, and 0.20 mol C after mixing" style="max-width: 250px; display: block; margin: 1rem 0;">

Mixing equal moles of A and B caused a complete reaction with no excess reagent leftover, so we know A and B react in a 1:1 mole ratio. Since 0.10 mol A were enough to create 0.20 mol C, we know the coefficient on C must be 2, so A + B → 2C. Checking with the mole to mole conversions, we have
\\[
0.10 \\, \text{mol A} \times \left ( \frac{2\\, \text{mol C}}{1 \\, \text{mol A}}  \right )= 0.20 \\, \text{mol C}
\\]
which matches the observation above.


It can also be useful to organize this information into a table as below.

  <table class="table table-bordered" style="max-width: 650px; margin: 1rem auto;">
      <thead>
          <tr>
              <th></th>
              <th>A</th>
              <th>+</th>
              <th>B</th>
              <th>→</th>
              <th>2C</th>
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
          </tr>
          <tr style="background-color: #fff9e6;">
              <td><strong>Change (mol)</strong></td>
              <td>−0.10</td>
              <td></td>
              <td>−0.10</td>
              <td></td>
              <td>+0.20</td>
          </tr>
          <tr>
              <td><strong>Final (mol)</strong> = Initial + Change </td>
              <td>0.0</td>
              <td></td>
              <td>0.0</td>
              <td></td>
              <td>0.20</td>
          </tr>
      </tbody>
  </table>

In this format, the initial and final rows contain direct observations from the information column. The change row is completed using \\( \text{Initial} + \text{Change} = \text{Final} \\). The change row shows the stoichiometry of the reaction: since the change in moles of C is twice the change in moles of A, we know the coefficient on C must be 2. Since the change in moles of A and B are equal, the coefficients are the same (here, both 1).
