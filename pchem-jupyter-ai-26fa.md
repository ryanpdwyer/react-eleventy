---
layout: vanillabootflex-md-pchem.njk
title: P Chem - AI Help in Jupyter
js: pchem.js
tags: pchem-26fa
---

# Using the AI Assistants on ai.munano.org

Our class JupyterHub has two AI assistants built into JupyterLab. They can read your open notebook, write and edit cells, and run them.

| Assistant | Cost | Use it for |
|---|---|---|
| **OpenCode** (default) | Free | Most things: errors, loading data, plots, fits |
| **Claude** | Paid by Dr. Dwyer; **$25 per student per month**, resets on the 19th | When OpenCode gets stuck |

<video controls width="100%" src="/img/jupyter-ai/jupyter-ai-walkthrough.mp4"></video>

The example below uses a real Raman spectrum of neat 1,2-dichloroethane from L3: [neat_DCE_raman.csv](/samples/neat_DCE_raman.csv).

---

## 1. Sign in

Go to [ai.munano.org](https://ai.munano.org) and sign in with your py.munano.org username and password.

![Sign-in page](/img/jupyter-ai/01-login.png)

## 2. Upload your data and open a notebook

Upload your file with the up-arrow button in the file browser. Start a new notebook from the Launcher (Python 3), or open one you already have.

![Upload button and uploaded file](/img/jupyter-ai/02-files.png)

## 3. Open the chat

Click the chat icon in the left sidebar, then **New chat**. OpenCode is selected at the bottom of the chat box.

![Chat panel with the assistant menu](/img/jupyter-ai/03-chat.png)

Keep the notebook you want help with **open in a tab**. The assistant works on the notebook that is open.

## 4. Ask in plain words

> Load neat_DCE_raman.csv into my notebook and plot the spectrum.

The assistant writes the cells and runs them. Here it worked out on its own that the file has 34 lines of instrument settings before the data.

![Data loaded and plotted](/img/jupyter-ai/04-load.png)

You can ask questions, not just give instructions:

> What model can I use to fit the two big peaks between 600 and 800?

![Asking which model to use](/img/jupyter-ai/05-ask-model.png)

> Fit the two peaks with two Lorentzians using lmfit, plot the fit, and print the peak positions and areas.

Other requests that work:

- "When I run this notebook it stops with an error. Fix it and tell me what was wrong."
- "Explain what this cell does, line by line."
- "Give me a hint, not the answer: why is my ΔG the wrong sign?"

## 5. Approve or reject

Before some steps, the assistant asks. **Allow once** is the safe choice. **Reject** stops that step.

![OpenCode permission prompt](/img/jupyter-ai/06-allow.png)

## 6. Check the numbers

The fit looks good and the peak positions are right, but the areas are about 36 and 51 million.

![Fit with suspicious areas](/img/jupyter-ai/07-areas.png)

> How did you calculate the areas? Can you check them by integrating under each fitted peak?

Integrating gives about 1.25 and 1.53 million, 28 times smaller. OpenCode says the difference comes from the integration range. That explanation is wrong; cutting off the tails can't account for a factor of 28.

![Numerical check disagrees](/img/jupyter-ai/08-check-areas.png)

## 7. Switch to Claude

When OpenCode is stuck or its answer doesn't add up, click the assistant menu at the bottom of the chat and pick **Claude**.

![Picking Claude](/img/jupyter-ai/09-pick-claude.png)

![Question for Claude](/img/jupyter-ai/10-claude-question.png)

> The two area numbers in my notebook are about 28 times different. OpenCode says it's because of the integration range. Is that right? Which areas should I use?

Claude finds the cause: in lmfit, the Lorentzian `amplitude` is already the area, and the code multiplied it by π·σ again. The integration range accounts for only about 7% of the difference.

![Claude's answer](/img/jupyter-ai/11-claude-answer.png)

> Yes, fix it.

Claude asks **Yes / No** before it reads, edits, or runs cells, and shows the change first.

![Claude shows the edit](/img/jupyter-ai/12-claude-edit.png)

Run the notebook again (**Run → Run All Cells**). The two area calculations now agree to within 7%.

![Corrected areas](/img/jupyter-ai/13-rerun.png)

## 8. Claude settings and budget

Leave the model menu and the **⋯** menu (next to the assistant name at the bottom of the chat) at their defaults.

Each student has $25 of Claude per month. It resets on the 19th. When it runs out, Claude stops answering until the reset; OpenCode still works.

## 9. Check your understanding

Plain requests work with either assistant:

- "Quiz me on this analysis, one question at a time."
- "Explain the model in this notebook in a markdown cell."
- "Write a handoff summary of what this notebook does and why, so I can paste it into ChatGPT or Copilot."

A quiz in the chat. Answer, and ask follow-up questions about anything you miss:

![Quiz in the chat](/img/jupyter-ai/16-chat-quiz.png)

An explanation cell:

![Markdown cell explaining the Lorentzian model](/img/jupyter-ai/14-explain.png)

It can also build a clickable quiz in the notebook ("Make me a quiz cell on this model"):

![Quiz cell with feedback](/img/jupyter-ai/15-quiz.png)

---

## Course AI policy

This course is **UMU AI Level 2: you create and use AI for support.**

- You generate your own ideas.
- AI can help with brainstorming, outlining, or explaining concepts.
- The final work is still primarily your own.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| The chat does not answer | Wait a minute and try again. The free models are shared and sometimes busy. |
| The assistant changed the wrong cell | Edit → Undo, or ask it to put the cell back. |
| Things act strange | File → Hub Control Panel → Stop My Server, then Start My Server. |
| Claude stops answering | Your monthly budget may be used up. Use OpenCode until the 19th. |
