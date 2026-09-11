---
layout: vanillabootflex-md.njk
title: Finding and classifying chemistry literature
---

# Finding and classifying chemistry literature

## Two related *Nature Chemistry* publications

For each paper, work through this access checklist in order: start with the DOI/title, try the publisher page, search Mount Union’s library, try the relevant database, and look for a free author or repository copy. If none of those provides the full text, the final route is an OhioLINK/interlibrary-loan request. Record which step actually produced the PDF.

1. Ruangsupapichat, N.; Pollard, M. M.; Harutyunyan, S. R.; Feringa, B. L. “Reversing the direction in a light-driven rotary molecular motor.” *Nature Chemistry* **3**, 53–60 (2011). [DOI: 10.1038/nchem.872](https://doi.org/10.1038/nchem.872)
2.  Cantrill, S. “One-way traffic.” *Nature Chemistry* **3**, 907 (2011). [DOI: 10.1038/nchem.1215](https://doi.org/10.1038/nchem.1215)

The second item discusses related molecular-motor research, but it is not the research report itself. Answer the questions below after you have located both items.

<form name="che381-nature-chemistry-literature" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="literature-quiz">
  <input type="hidden" name="form-name" value="che381-nature-chemistry-literature">
  <p hidden><label>Do not fill this out: <input name="bot-field"></label></p>

  <label for="student-name">Name (or initials)</label>
  <input id="student-name" name="student" type="text" required>

  <fieldset>
    <legend>1. What change allows this molecular motor to reverse its direction?</legend>
    <label><input type="radio" name="q1" value="epimerization" data-correct="true" required> Base-catalysed epimerization at the stereogenic centre</label>
    <label><input type="radio" name="q1" value="bond-break"> Breaking and reforming the motor’s central carbon–carbon bond</label>
    <label><input type="radio" name="q1" value="heat"> Heating the sample until the molecule randomly rotates</label>
    <label><input type="radio" name="q1" value="unsure"> Unsure</label>
  </fieldset>

  <fieldset>
    <legend>2. Which sequence best represents the controlled rotary cycle described by the authors?</legend>
    <label><input type="radio" name="q2" value="photo-thermal-base" data-correct="true" required> Photochemical isomerization, thermal isomerization, then base-catalysed epimerization</label>
    <label><input type="radio" name="q2" value="base-photo"> Base reaction first, followed by two unrelated photochemical reactions</label>
    <label><input type="radio" name="q2" value="thermal-only"> Thermal rotation only; light is used only to observe the molecule</label>
    <label><input type="radio" name="q2" value="unsure"> Unsure</label>
  </fieldset>

  <fieldset>
    <legend>3. Which evidence most directly supports the claim that the full rotation cycle is controlled?</legend>
    <label><input type="radio" name="q3" value="stage-monitoring" data-correct="true" required> Measurements distinguish the molecular states at successive stages of the cycle</label>
    <label><input type="radio" name="q3" value="illustration"> The conceptual drawing shows clockwise and anticlockwise arrows</label>
    <label><input type="radio" name="q3" value="citation-count"> The paper has many citations</label>
    <label><input type="radio" name="q3" value="unsure"> Unsure</label>
  </fieldset>

  <button type="submit">Submit answers</button>
  <p id="quiz-feedback" role="status" aria-live="polite"></p>
</form>

<script>
(() => {
  const form = document.querySelector('.literature-quiz');
  const feedback = document.querySelector('#quiz-feedback');
  form.addEventListener('change', (event) => {
    const input = event.target;
    if (!input.matches('input[type="radio"][data-correct], input[type="radio"]')) return;
    const group = form.querySelectorAll('input[name="' + input.name + '"]');
    group.forEach((choice) => choice.parentElement.classList.remove('text-success', 'text-danger'));
    input.parentElement.classList.add(input.dataset.correct ? 'text-success' : 'text-danger');
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const correct = [...form.querySelectorAll('input[type="radio"][data-correct]')]
      .filter((answer) => answer.checked).length;
    feedback.textContent = 'Submitting…';
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      feedback.textContent = `Submitted. ${correct} of 3 paper-reading questions selected the best answer.`;
    } catch (error) {
      feedback.textContent = `Your browser could not send the form. Your score is ${correct} of 3; show it to me.`;
    }
  });
})();
</script>
