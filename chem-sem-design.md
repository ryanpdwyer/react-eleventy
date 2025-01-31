---
layout: vanillabootflex-md.njk
title: Plotting and Data Analysis with AI
styles:
    - fys.css
---

# Plotting and Data Analysis using artificial intelligence

**Objectives:**

1. Use Python (via AI) or Excel to quickly analyze data.
2. Use graphic design principles (contrast & repeatability / consistency, alignment, and proximity) to improve plots for both conveying data neutrally and emphasizing key message / takeaway
3. Use AI and/or Excel to draw a conclusion about this example dataset and make a figure summarizing your findings.


## AI tools for plotting and data analysis

1. [ChatGPT](https://chatgpt.com) Free version gives access to making ~3 plots (using Python) per 24 hours (much more for paid version). Data files can be uploaded directly using the "attach" icon.
2. [Julius AI](https://julius.ai/chat) Specially built for plotting and data analysis (15 messages / month free)
3. [Google Colab](https://colab.research.google.com/) Google's AI Gemini is built-in; you can use "generate" with AI or the Gemini button at the top right corner.
    - This allows much more Python since a Python notebook is built-in. You can also ask for Python code from any other AI and copy / paste into Colab to run it.

### Other AI tools

1. [Claude](https://claude.ai) This can do interactive visuals in html and javascript, but doesn't run Python code. Relatively good at writing Python code however.
2. [DeepSeek](https://chat.deepseek.com/) Free access to a thinking model that can plan and execute more complex tasks in 1 shot (can ask for Python code and feed the results to Colab, for example)
3. [Google Gemini](https://gemini.google.com/) Paid version integrates well with Google Sheets.
4. [Copilot](https://copilot.microsoft.com/) Microsoft's version of ChatGPT.


## Data analysis and design process

<figure class="figure">
  <img src="/img/chatgpt-design.png" class="figure-img img-fluid rounded" alt="ChatGPT Design">
  <figcaption class="figure-caption text-center">From <a href="https://pubs.acs.org/doi/10.1021/acs.jchemed.4c00228?fig=fig1&ref=pdf">Lear, 2024</a></figcaption>
</figure>


## Exercise 1: Enzyme kinetics dataset

The overall goal is to extract the key enzyme kinetics parameters from the dataset. 

Sub-goals:

1. Visualize the raw data to determine the linear region for each trial.
2. Make a standard curve showing Absorbance versus substrate concentration (using the t=0 data). 
3. Determine the enzyme kinetics parameters.

**Data visualization question:** What can be done to improve the visualization of the raw data?

<figure class="figure">
  <img src="/img/design-Absorbance-vs-time-01.png" class="figure-img img-fluid rounded" alt="Absorbance versus time">
  <figcaption class="figure-caption text-center">Absorbance versus time for varying substrate concentrations between 0 and 500 µM.</figcaption>
</figure>

**Standard curve:** Useful to save common plot formats as a custom plot (save, apply).

**3: Enzyme kinetics parameters** Most important thing is that your data and analysis are correct. 

- Reproducibility: Simple fill down / right in Excel is relatively good.
- Python or other programming language usually better (but need to be able to read the code and follow it).
- ChatGPT, etc can do this successfully.

## Exercise 2: 

- Split into groups of 3-4
- Use the provided data (Excel and csv format, as well as "scene-setting" emails, etc) to ____. Make a figure to clearly communicate your findings.

### Background information

(Method of Standard Addition)[https://zimmer.fresnostate.edu/~davidz/Chem106/StdAddn/StdAddn.html]