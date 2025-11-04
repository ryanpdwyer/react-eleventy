---
layout: vanillabootmath.njk
title: Stoichiometry Activity [X] - Bottom-out Hints
js: stoichiometry-activity.js
styles:
    - che120.css
---

# Stoichiometry Activity [X]: [Activity Name]

## Part 1:

### Solution

When 100. mL of 1.0 M A and 100. mL of 1.0 M B are mixed, we start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol A}}{1 \\, \text{L}} = 0.10 \\, \text{mol A} \\) and also 0.10 mol B. This can be seen directly in the left information column too. Looking at the final solution after mixing,

<img src="/img/vlab-pilot-3-moles-only.png" alt="The solution contains 0.0 mol A, 0.0 mol B, and 0.20 mol C after mixing" style="max-width: 250px; display: block; margin: 1rem 0;">

Mixing equal moles of A and B caused a complete reaction with no excess reagent leftover, so we know A and B react in a 1:1 mol ratio. Since 0.10 mol A were enough to create 0.20 mol C, we know the coefficient on C must be 2, so A + B → 2C. Checking with the mole to mole conversions, we have
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

---

## Part 2: B + D → A + 2C (Hidden Reactant)

### Solution
First, you should notice that a reaction only happens when B and D are both present in the solution mixture. For example, if you mixed 100. mL of 1.0 M B and 100. mL of 1.0 M D, you start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol B}}{1 \\, \text{L}} = 0.10 \\, \text{mol B} \\) and also 0.10 mol D. **Note:** Species B or D is hidden from your view, so you'll need to work together to see the complete picture! Looking at the combined information from both students after mixing,

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

It can also be useful to organize this information into a table as below.

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

---

## Part 3: A + 2C → B + 2D (Limiting Reactant)

### Solution
A reaction only occurs when A and C are mixed. When equal volumes are mixed, you should notice that A is leftover. For example, mixing 100. mL of 1.0 M A and 100. mL of 1.0 M C, we start with \\(0.1 \\, \text{L}\times \frac{1.0\\,\text{mol A}}{1 \\, \text{L}} = 0.10 \\, \text{mol A} \\) and 0.10 mol C. After mixing, you have

<img src="/img/vlab-pilot-6.png" alt="The solution contains 0.05 mol A, 0.0 mol C, 0.05 mol B, and 0.10 mol D after mixing" style="max-width: 500px; display: block; margin: 1rem 0;">

Notice that C is completely consumed (0.0 mol remaining) but A still has 0.05 mol left. This means **C is the limiting reactant** - it ran out first and stopped the reaction.

Since we started with equal moles (0.10 mol each) but they don't react in a 1:1 ratio, one must be limiting. Looking at the changes:
- A decreased by 0.05 mol (0.10 → 0.05)
- C decreased by 0.10 mol (0.10 → 0.0)
- The ratio of A:C consumed is 0.05:0.10 = 1:2

This tells us the reaction is A + 2C → products. 

For the products:
- B increased by 0.05 mol (matching the A consumed)
- D increased by 0.10 mol (twice the A consumed)

Therefore, the balanced equation is A + 2C → B + 2D.

Checking with mole to mole conversions (we must use C because it was the limiting reactant):
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

There are many other ways to solve the problem - you could instead add A to C until both A and C are used up (a titration).

---

## Part 4: 2B + C → A + 3D (Working with Molarity)

### Solution

In this case, the concentration always changes when any species are mixed together because of dilution-100 mL of 1.0 M A and 100 mL of 1.0 M B, when mixed, result in 0.10 mol of A in 200 mL = 0.200 L = 0.050 M. Or use the dilution equation, \\(M_1 V_1 = M_2 V_2 \\) - the total volume \\(V_2 = 200\\, \text{mL}\\). But you will only find products being produced when B and C are mixed. If mixing 100 mL of 1.0 M B and C, you find

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
