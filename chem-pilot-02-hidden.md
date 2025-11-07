---
layout: vanillabootmath.njk
title: Chemistry Pilot - Part 2 Solution
styles:
    - che120.css
---

# Part 2: B + D → A + 2C (Hidden Reactant)

## Solution

**Experimental Strategy:** Many strategies can be used to solve the problem. Whichever you use, a reaction only happens when B and D are both present in the solution. Any other combination gives no reaction, important evidence that B and D are the **reactants**.

For example, if you mixed 100. mL of 1.0 M B and 100. mL of 1.0 M D, you start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol B}}{1 \\, \text{L}} = 0.10 \\, \text{mol B} \\) and also 0.10 mol D. **Note:** Species B or D is hidden from your view, so you'll need to work together to see the complete picture! Looking at the combined information from both students after mixing,

<img src="/img/vlab-pilot-5.png" alt="The solution contains 0.0 mol B, 0.0 mol D, 0.10 mol A, and 0.20 mol C after mixing" style="max-width: 500px; display: block; margin: 1rem 0;">

Mixing equal moles of B and D caused a complete reaction with no excess reagent leftover, so we know B and D react in a 1:1 mol ratio. Since 0.10 mol B were enough to create 0.10 mol A and 0.20 mol C, we can determine:
- B:A ratio is 1:1 (0.10 mol B → 0.10 mol A)
- B:C ratio is 1:2 (0.10 mol B → 0.20 mol C)

Therefore, the balanced equation is B + D → A + 2C.

Checking with mole to mole conversions:
\\[
0.10 \\, \text{mol B} \times \left ( \frac{1\\, \text{mol A}}{1 \\, \text{mol B}}  \right )= 0.10 \\, \text{mol A}
\\]
\\[
0.10 \\, \text{mol B} \times \left ( \frac{2\\, \text{mol C}}{1 \\, \text{mol B}}  \right )= 0.20 \\, \text{mol C}
\\]
which matches the observations above.

It can also be useful to organize this information into a table:

  <table class="table table-bordered" style="max-width: 650px; margin: 1rem auto;">
      <thead>
          <tr>
              <th></th>
              <th>B</th>
              <th>+</th>
              <th>D</th>
              <th>→</th>
              <th>A</th>
              <th>+</th>
              <th><strong>2</strong>C</th>
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
              <td>−0.10</td>
              <td></td>
              <td>−0.10</td>
              <td></td>
              <td>+0.10</td>
              <td></td>
              <td><strong>+0.20</strong></td>
          </tr>
          <tr>
              <td><strong>Final (mol)</strong> = Initial + Change </td>
              <td>0.0</td>
              <td></td>
              <td>0.0</td>
              <td></td>
              <td>0.10</td>
              <td></td>
              <td>0.20</td>
          </tr>
      </tbody>
  </table>

In this format, the initial and final rows contain direct observations from combining both students' information columns. The change row is completed using \\( \text{Initial} + \text{Change} = \text{Final} \\). The change row shows the stoichiometry of the reaction: since the change in moles of C is twice the change in moles of B, we know the coefficient on C must be 2. Since the change in moles of B and D are equal, they have the same coefficient (both 1). Similarly, the change in moles of A equals the change in moles of B, so A also has coefficient 1.
