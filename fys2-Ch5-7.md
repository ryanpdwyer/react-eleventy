---
layout: vanillabootflex-full.njk
title: A8 AI Weirdness Chapter 5
js: fys-installation.js
---

### Possible AIs you could use for your paper

Click around to a few of these before class. We'll talk about how text-generating AIs actually work in a bit more detail in class.

- [Talk to Transformer](https://app.inferkit.com/demo) This model uses Facebook's Megatron-11b model.
- [Write with Transformer](https://transformer.huggingface.co) You can choose between several common models and fine-tune settings in the output.

Many options within huggingface:
- [Bert question answering](https://huggingface.co/deepset/bert-large-uncased-whole-word-masking-squad2?text=What%27s+my+name%3F&context=My+name+is+Clara+and+I+live+in+Berkeley.)
- [Bert filling masked word](https://huggingface.co/bert-base-uncased)
- [Bart zero-shot classification](https://huggingface.co/facebook/bart-large-mnli?text=Last+week+I+upgraded+my+iOS+version+and+ever+since+then+my+phone+has+been+overheating+whenever+I+use+your+app.&labels=mobile%2C+website%2C+billing%2C+account+access&multiclass=false)
- [Distilbert Sentiment Classification](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english)
- [Long-form question answering](https://huggingface.co/qa/)

AllenAI Demos:
- [AllenAI Unified Question Answering](https://unifiedqa.apps.allenai.org)
- [RuleTaker True or False Answering](https://rule-reasoning.apps.allenai.org)
- [Crowdsense](https://crowdsense.apps.allenai.org)

Reply AI:
- [Reply.ai Question-answering](https://www.reply.ai/demo-qa/)

Image models: 
- [Visual Chatbot](http://demo.visualdialog.org) Two different models. You upload an image and ask an AI questions about it.
- [Google Cloud Vision API](https://cloud.google.com/vision/docs/drag-and-drop) Get a wealth of information about a photo.
- Word or PowerPoint automatic image captioning / alt-text generation.


### Reading

- Shane Chapter 5

### Reflection

**Prompts:** Again, feel free to use any these prompts as the basis of your reflection (or choose your own).

- Give an example of an AI that solves the wrong problem, and explain why it is solving the wrong problem. It may be helpful to reference the overall explanations from the beginning of the chapter: (1) They develop their own ways of solving a problem (rather than relying on step-by-step instructions from a programmer); and (2) They lack the contextual knowledge to understand when their solutions are not what humans would have preferred.
- Google researcher Alex Irpan imagines AI "as a demon that's deliberately misinterpreting your reward and actively searching for the laziest possible way local optima." Explain the meaning of this quote and give examples of AIs that behave in this way.
- Discuss an AI's goal (**reward function**, or **fitness**), and why it can cause so many potential problems; see the sections Reward Function Hacking and Beware the Faulty Reward Function.
- Why are curiosity-driven AIs a potentially promising alternative to a normal, explicitly programmed reward function? 
- Discuss **overfitting** and why it is such a problem in AI.
<!-- - Why are so many AI's taught using simulations rather than the real world? Why is this a potential problem when it comes to actually using the AIs for real-world tasks? -->

**Due by Tuesday October 27th at 12 pm** to the [D2L Dropbox](#)


