---
layout: vanillabootflex-full-pdflib.njk
title: CHE 120 E4
js: che120-e4-23sp.js
styles:
    - che120.css
---

# L1 What's in the Water?

The goal of this lab is to identify 3 unknown compounds contained in a drinking water sample.


<div markdown=1>

## Your unknowns

Enter your name (first and last) and Mount Union email below to be assigned a set of unknown samples:

<form class="form" id="120-water-23sp">
<div>
<div class="form-group">
<label for="nameInput">Name:</label><input id="nameInput" name="nameInput" oninput="checkReady();" class="form-control"></input>
</div>


<div class="form-group">
    <label for="emailInput">Mount Union Email:</label>
    <input type="email" id="emailInput" name="emailInput" oninput="checkReady();" class="form-control"></input>
</div>

<button type="submit" id="submitName" disabled class="btn btn-primary">Submit</button>
</form>

</div>

<div style="display:none;" id="assignedUnknowns">
<p>
You are assigned to analyze the IR and NMR spectra for water samples with sample ID numbers: <span id="unknown1"></span> and  <span id="unknown2"></span>. During lab, you will collect the IR and NMR spectra for the sample contained in Vial <span id="unknown3"></span>.
</p>

<p>Click the button to download the spectra of the first two unknowns. 
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
Sorry, your email address was not found in the class list - check whether you typed your email address correctly. If your email address is correct, <a href="mailto: dwyerry@mountunion.edu">email Dr. Dwyer</a>
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js">
</script>

