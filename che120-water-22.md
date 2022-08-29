---
layout: vanillabootflex-full-pdflib.njk
title: CHE 120 E4
js: che120-e4-22fa.js
styles:
    - che120.css
---

# L1 What's in the Water?

The goal of this lab is to identify 3 unknown compounds contained in a drinking water sample.

**Note: If you completed the form before Thursday at 10 am, your unknowns were not assigned correctly - please fill out the form again.**


## Your unknowns

Enter your name (first and last), Mount Union email, and section below to be assigned a set of unknown samples:

<form class="form" netlify id="120-water-22fa">
<div>
<div class="form-group">
<label for="nameInput">Name:</label><input id="nameInput" name="nameInput" oninput="checkReady();" class="form-control"></input>
</div>


<div class="form-group">
    <label for="emailInput">Email:</label>
    <input type="email" id="emailInput" name="emailInput" oninput="checkReady();" class="form-control"></input>
</div>

<p for="sectionInput">Choose your section:</p>

<div class="form-check">
<label class="form-check-label" for="1"><input type="radio" class="form-check-input" value="1" name="sectionInput" oninput="checkReady();"></input> Tuesday 7:30 am (Dwyer)</label>
</div>

<div class="form-check">
<label class="form-check-label" for="2"><input type="radio" class="form-check-input" value="2" name="sectionInput" oninput="checkReady();"></input> Tuesday 12:30 pm (Miller)</label>
</div>

<div class="form-check">
<label class="form-check-label" for="3"> <input type="radio" class="form-check-input" value="3" name="sectionInput" oninput="checkReady();"></input> Wednesday 12:30 pm (Miller)</label>
</div>

<div class="form-check">
<label class="form-check-label" for="4"> <input type="radio" class="form-check-input" value="4" name="sectionInput" oninput="checkReady();"></input> Thursday 7:30 am (Reid)</label>
</div>

<div class="form-check">
<label class="form-check-label" for="5"> <input type="radio" class="form-check-input" value="5" name="sectionInput" oninput="checkReady();"></input> Thursday 12:30 pm (McLachlan)</label>
</div>


<button type="submit" id="submitName" disabled class="btn btn-primary">Submit</button>
</form>

<div style="display:none;" id="assignedUnknowns">
<p>
You were given three water samples with sample ID numbers: <span id="unknown1"></span>, <span id="unknown2"></span>, and <span id="unknown3"></span>. For the last sample, you will collect the IR and NMR spectra yourself during lab.
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


<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js">
</script>

