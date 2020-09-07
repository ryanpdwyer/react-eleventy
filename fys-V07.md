---
layout: vanillabootflex-full.njk
title: Building a Wekinator Model - project topic and helpful hints
styles:
	- fys.css
---

# Building an AI model Project

### Helpful Hints

### Background information and applications

You are responsible for learning a bit about the models you use to build your model. Here are some potentially useful starting points.

- Image Model
	- [Crash Course: Computer Vision](https://www.youtube.com/watch?v=-4E2-0sxVUM)
- Pose Model (in Wekinator Machine or Teachable Machine)
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

**Due: Tuesday 09/15 at 10 am:** [C6: Discussion Post](https://d2l.mountunion.edu/d2l/le/35016/discussions/topics/8804/View) In 1-2 sentences, describe the model you intend to build and any questions you have about how to train and build it.