---
layout: vanillabootflex-full-pdflib.njk
title: CHE 120 Experiment 1 Test
js: che120-e4-26fa.js
styles:
    - che120.css
---

# L1 What's in the Water?

**Instructor test page** — enter any name and one of the test emails: `studenta@mountunion.edu`, `studentb@mountunion.edu`, `studentc@mountunion.edu`, or `studentd@mountunion.edu` (Student A–D each get a different Discussion Unknown).

The goal of this lab is to identify 3 unknown compounds contained in a drinking water sample. 

<div markdown=1>

## Your unknowns

Enter your name (first and last) and Mount Union email below to be assigned a set of unknown samples:

<form class="form" id="120-water-26fa">
<div>
<div class="form-group">
<label for="nameInput">Name:</label><input id="nameInput" name="nameInput" class="form-control"></input>
</div>

<div class="form-group">
    <label for="emailInput">Mount Union Email:</label>
    <input type="email" id="emailInput" name="emailInput" class="form-control"></input>
</div>

<button type="submit" id="submitName" disabled class="btn btn-primary">Submit</button>
</form>

</div>

<div style="display:none;" id="assignedUnknowns">
<p>
You are assigned to analyze the IR and NMR spectra for water sample <span id="unknown3" class="unknown3"></span>. During lab, you will collect the IR and NMR spectra for the sample contained in Vial <span class="unknown3"></span>A.
</p>

<p>Click the button to download the spectra of <span class="unknown3"></span> B and C. The last page of the pdf is your <b>Discussion Unknown</b> structure, which you will need for discussion questions 2 and 3.
</p>
<button id="download-spectra" onclick="copyPages()" class="btn btn-primary">Download Spectra</button>
<button id="download-structure" onclick="downloadStructure()" class="btn btn-secondary">Download Structure (PNG)</button>
<p>
<b>
Remember to print out your spectra and bring them to lab.
</b>
</p>
<p>
<b>Save the pdf file so you can copy and paste (or screenshot) the spectra into your lab report. If the structure is cropped strangely in the pdf, use the Download Structure (PNG) button to get the image by itself.</b>
</p>
</div>

<div style="display:none;" id="email-not-found" markdown="1">
Sorry, your email address was not found in the class list - check whether you typed your email address correctly. If your email address is correct, <a href="mailto: dwyerry@mountunion.edu">email Dr. Dwyer</a>.
</div>
