---
layout: vanillabootflex-full.njk
title: Project - Building a Wekinator Model
js: fys-installation.js
styles:
	- fys.css
---

### Goals

- Build a wekinator model using a more complex input
- Clearly describe and demonstrate your model in a written paper and oral presentation to the class

### To do

- [ ] Show off some of the different inputs...
- [ ] Describe the project...

### Video



### Potential Topics

<div class="randomize-list">

- [Teachable Machine: Pose Model](https://teachablemachine.withgoogle.com)
- [Teachable Machine: Image Classifier]((https://teachablemachine.withgoogle.com)). See [Teachable Machine 1: Image Classification](https://youtu.be/kwcillcWOg0) for more information.
- [Teachable Machine: Audio Model]((https://teachablemachine.withgoogle.com)). See [Teachable Machine 3: Sound Classification](https://youtu.be/TOrVsLklltM) for more information.
- [Teachable Machine V1:](https://teachablemachine.withgoogle.com/v1/) Nice built-in control of the output
- Wekinator Machine: Pose Model
- Wekinator Machine: Face Model
- Wekinator Machine: Hand Model
- Wekinator Machine: Hand Box
- iOS: [MotionSender](https://apps.apple.com/us/app/motionsender/id1315005698) This works to send accelerometer, gyroscope, and attitude (tilt, orientation...) as inputs.

</div>

### Harder Topics

<div class="randomize-list">

- Android: [Sensors2OSC](https://f-droid.org/packages/org.sensors2.osc/) or [OSCHook](https://play.google.com/store/apps/details?id=com.hollyhook.oscHook&hl=en_US&showAllReviews=true)
- Build your own Processing input: Feel free to try this if you feel comfortable modifying some of the Java Processing Code
- [XBox 360, PS4 or other USB controllers](https://gist.github.com/drscotthawley/dd74db91dd2f8ec3c810a87d4d26b576). I haven't tried this - it make take a little bit of work to get everything set up.
- [LeapMotion Hand Tracking](https://www.ultraleap.com/product/leap-motion-controller/) via [Processing](http://www.doc.gold.ac.uk/~mas01rf/WekinatorDownloads/wekinator_examples/all_source_zips/LeapMotionViaProcessing.zip) I have one available if you are interested.
</div>

### Background information

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

### Check-in, install software

- Include a screenshot...
- What types of models are you potentially interested in building?

[C5: Build an AI project topic](https://d2l.mountunion.edu/d2l/lms/quizzing/user/quiz_summary.d2l?qi=20021&ou=35016)


