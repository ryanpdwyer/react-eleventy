---
layout: vanillabootflex-full-pdflib.njk
title: CHE 120 Experiment 1
js: che120-e4-25fa.js
styles:
    - che120.css
---

# L1 What's in the Water? Draft for 2025 Fall

The goal of this lab is to identify 3 unknown compounds contained in a drinking water sample. 

<div markdown=1>

## Your unknowns

**You may use the email address** studentA@mountunion.edu (or studentB, studentC, or studentD) to download the spectra and test the activity. The unknowns in each group are (for the purposes of testing)

<div class="table-responsive">
<table class="table table-bordered">
  <thead>
    <tr>
      <th>Student</th>
      <th>Unknown 1</th>
      <th>Unknown 2</th>
      <th>Vial (In Lab)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Student A</td>
      <td>methyl acetate</td>
      <td>acetone</td>
      <td>tert-butanol</td>
    </tr>
    <tr>
      <td>Student B</td>
      <td>ethyl formate</td>
      <td>ethanol</td>
      <td>acetone</td>
    </tr>
    <tr>
      <td>Student C</td>
      <td>ethyl acetate</td>
      <td>1,4-dichlorobutane</td>
      <td>benzene</td>
    </tr>
    <tr>
      <td>Student D</td>
      <td>acetone</td>
      <td>methyl acetate</td>
      <td>ethyl acetate</td>
    </tr>
  </tbody>
</table>
</div>

<br>
<br>

Enter your name (first and last) and Mount Union email below to be assigned a set of unknown samples: 

<form class="form" id="120-water-25sp">
<div>
<div class="form-group">
<label for="nameInput">Name:</label><input id="nameInput" name="nameInput" class="form-control"></input>
</div>

<div class="form-group">
    <label for="emailInput">Mount Union Email:</label>
    <input type="email" id="emailInput" name="emailInput" value="studentA@mountunion.edu" class="form-control"></input>
</div>

<button type="submit" id="submitName" disabled class="btn btn-primary">Submit</button>
</form>

</div>

<div style="display:none;" id="assignedUnknowns">
<p>
You are assigned to analyze the IR and NMR spectra for water sample <span id="unknown3" class="unknown3"></span>. During lab, you will collect the IR and NMR spectra for the sample contained in Vial <span class="unknown3"></span>A.
</p>

<p>Click the button to download the spectra of <span class="unknown3"></span> B and C.
</p>
<button onclick="copyPages()" class="btn btn-primary">Download Spectra</button>
<p>
<b>
Remember to print out your spectra and bring them to lab.
</b>
</p>
<p>
<b>Save the pdf file so you can copy and paste (or screenshot) the spectra into your lab report.</b>
</p>
</div>

<div style="display:none;" id="email-not-found" markdown="1">
Sorry, your email address was not found in the class list - check whether you typed your email address correctly. If your email address is correct, <a href="mailto: dwyerry@mountunion.edu">email Dr. Dwyer</a>.
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js">
</script>
