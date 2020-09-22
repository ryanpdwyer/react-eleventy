---
layout: vanillabootflex-full.njk
title: Building a Wekinator Model - project topic and helpful hints
styles:
	- fys.css
---

# Building an AI model Project

This page has resources for Week 4, where you will work on your AI model project.

### Helpful Hints

- **Take notes**
- **Talk to your classmates and me**
	- [Model Talk Discussion](https://d2l.mountunion.edu/d2l/le/content/35016/viewContent/426682/View)

### 2. Building your model (due Tuesday 09/15)

- Build at least **2** versions of your model (make sure to save them in Google Drive or your computer).
	- For *some* teachable Machine models, that may be difficult. In that case, make sure to post a link to your model on the discussion forum so you can have more data with other people testing it out.
- Compare and contrast to figure out what works well or poorly. Really try your best to think of ways to "fool" the model---seeing where the models fail helps you learn more about the model!


When you have a reasonable version of your model, record a short video in which you 

1. State what the purpose of your model is.
2. Show the model running, talking about how well it works.
3. Show another version of the model running, comparing/contrasting with the first version of your model. **Note: It's okay not to have this if you can't come up with another version of the model. If so, talk through other versions of the model you could make.** It's also okay if the other version of your model is really bad-remember how badly some of those other classifier models did in your last video.
4. Ask any questions you have about your project, next steps, etc...


**Note: If you have had trouble with your microphone, try headphones and check this [video](https://www.youtube.com/watch?v=KoMqLEbUdMg) for tips.**


**Due: Tuesday 09/15 at 10 am (so I can check them before class)** [A5: Dropbox](https://d2l.mountunion.edu/d2l/le/content/35016/viewContent/426857/View)

### 3. Background information and applications (Thursday 09/17)

You are responsible for learning a bit about the models you use to build your model. Here are some potentially useful starting points. You should also check out the list of models from [assignment A3](/fys-A03) as well.

- Teachable Machine
	- [Designing and Learning Teachable Machine](https://design.google/library/designing-and-learning-teachable-machine/) A nice article talking about how the original teachable machine was designed.
	- [Teachable Machine 2.0](https://venturebeat.com/2019/11/07/google-teachable-machine-2-ai-machine-learning/)
- Image Model
	- [Crash Course: Computer Vision](https://www.youtube.com/watch?v=-4E2-0sxVUM)
	- [Teachable Sorter](https://coral.ai/projects/teachable-sorter/)
- Pose Model
	-[Pose Estimation with PoseNet](https://www.youtube.com/watch?v=OIo-DIOkNVg)
	- [Real-time Human Pose Estimation in the Browser with TensorFlow.js](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) See the links for lots of other interesting applications.
	- [Fritz AI: Pose Estimation](https://www.fritz.ai/pose-estimation/) Their app provides another pose estimation to compare against your PoseNet model.
	- [An Overview of Human Pose Estimation with Deep Learning](https://medium.com/beyondminds/an-overview-of-human-pose-estimation-with-deep-learning-d49eb656739b)
	- [A 2019 guide to Human Pose Estimation with Deep Learning](https://nanonets.com/blog/human-pose-estimation-2d-guide/)
	- [Research Paper introducing the PoseNet model](https://arxiv.org/abs/1803.08225) This is the model used in Teachable Machine / Wekinator Machine
- Audio model
	- [Sound Classification with Teachable Machine](https://youtu.be/TOrVsLklltM)
	- [Crash Course: Natural Language Processing](https://www.youtube.com/watch?v=fOvTtapxa9c)
	- [How to do Speech Recognition with Deep Learning](https://medium.com/@ageitgey/machine-learning-is-fun-part-6-how-to-do-speech-recognition-with-deep-learning-28293c162f7a)
	- [Speech Commands: A Dataset for Limited-Vocabulary Speech Recognition](https://arxiv.org/pdf/1804.03209.pdf)
- Face Mesh (used in Wekinator Machine face model)
	- [Face Mesh](https://sites.google.com/view/perception-cv4arvr/facemesh)
	- [MediaPipe Face Mesh Model Description](https://drive.google.com/file/d/1VFC_wIpw4O7xBOiTgUldl79d9LA-LsnA/view). Note that the initial detection of the outline of the face uses [BlazeFace](https://sites.google.com/view/perception-cv4arvr/blazeface).
	- [Google AI Blog Post](https://ai.googleblog.com/2019/03/real-time-ar-self-expression-with.html). Used in YouTube Stories, other Google-provided Augmented Reality / Machine Learning frameworks.
	- Similar models: See the many other face models used for AR, effects (Snapchat, Faceapp...)
	- [Face and hand tracking in the browser with MediaPipe and TensorFlow.js](https://blog.tensorflow.org/2020/03/face-and-hand-tracking-in-browser-with-mediapipe-and-tensorflowjs.html)
- Handpose model (both "Track Hand" and "Track Palm" in Wekinator Machine)
	- [Face and hand tracking in the browser with MediaPipe and TensorFlow.js](https://blog.tensorflow.org/2020/03/face-and-hand-tracking-in-browser-with-mediapipe-and-tensorflowjs.html)
	- [On-Device, Real-Time Hand Tracking with MediaPipe](https://ai.googleblog.com/2019/08/on-device-real-time-hand-tracking-with.html)
	- [MediaPipe Hands Model Card](https://drive.google.com/file/d/14pjkgLl3t3jiTiCFuvWGB-uAX_aVZOS5/view)
	- [](https://analyticsindiamag.com/google-open-sources-new-real-time-hand-gesture-tracking-ml-pipeline/)

All three of the Teachable Machine classifiers, and the face mesh model are built using [transfer learning](https://www.youtube.com/watch?v=kRpZ5OqUY6Y).

