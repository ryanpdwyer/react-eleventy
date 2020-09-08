---
layout: vanillabootflex-full.njk
title: Project - Building an AI model
js: fys-installation.js
styles:
	- fys.css
---

# Project - Building an AI Model

We'll be working on this project for the next 4 weeks of the semester.

### Goals

- Build a model using a more complex input
- Evaluate your model by comparing and contrasting the performance of multiple versions of the model
- Clearly describe, demonstrate, and evaluate your model in a written paper and oral presentation

### Video

<iframe width="640" height="360" src="https://www.youtube.com/embed/jb45WGyTrf8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h4>Wekinator Machine</h4>

To follow along with the last part of the video, install Wekinator Machine by downloading here: [Windows](https://github.com/ryanpdwyer/wekinator-machine/releases/download/v1.2.6/WekinatorMachine-1.2.6.Setup.exe) or [Mac](https://github.com/ryanpdwyer/wekinator-machine/releases/download/v1.2.6/WekinatorMachine-darwin-x64-1.2.6.zip). For help completing the installation, see the video below:

<h5 id="video-heading">Windows</h5>

<button id="button" onclick="toggleWindowsMac();">Show Mac</button>

### Potential Inputs

See the list of potential inputs (discussed in the video) below. 

<div class="randomize-list">

- [Teachable Machine: Pose Model](https://teachablemachine.withgoogle.com)
- [Teachable Machine: Image Classifier](https://teachablemachine.withgoogle.com). See [Teachable Machine 1: Image Classification](https://youtu.be/kwcillcWOg0) for more information.
- [Teachable Machine: Audio Model](https://teachablemachine.withgoogle.com). See [Teachable Machine 3: Sound Classification](https://youtu.be/TOrVsLklltM) for more information.
- [Teachable Machine V1:](https://teachablemachine.withgoogle.com/v1/) Nice built-in control of the output
- Wekinator Machine: Pose Model	[See the web demo](https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html) or see [Teachable Machine Pose Model](https://teachablemachine.withgoogle.com).
- Wekinator Machine: Face Model. [See the web demo](https://storage.googleapis.com/tfjs-models/demos/facemesh/index.html)
- Wekinator Machine: Hand or Palm Model. [See the web demo](https://storage.googleapis.com/tfjs-models/demos/handpose/index.html)
- iOS: [MotionSender](https://apps.apple.com/us/app/motionsender/id1315005698) This works to send accelerometer, gyroscope, and attitude (tilt, orientation...) as inputs.

</div>

<h4> Random Suggested Input and Output </h4>

Can't decide? Hit the button for a random suggestion.

<button onclick="randomInput()">Suggest a model</button>
<p><b>Suggested model:</b> <span id="suggested-model"></span</p>



### Harder Topics

<div class="randomize-list">

- Android: [Sensors2OSC](https://f-droid.org/packages/org.sensors2.osc/) or [OSCHook](https://play.google.com/store/apps/details?id=com.hollyhook.oscHook&hl=en_US&showAllReviews=true)
- Build your own Processing input: Feel free to try this if you feel comfortable modifying some of the Java Processing Code
- [XBox 360, PS4 or other USB controllers](https://gist.github.com/drscotthawley/dd74db91dd2f8ec3c810a87d4d26b576). I haven't tried this - it make take a little bit of work to get everything set up.
- [LeapMotion Hand Tracking](https://www.ultraleap.com/product/leap-motion-controller/) via [Processing](http://www.doc.gold.ac.uk/~mas01rf/WekinatorDownloads/wekinator_examples/all_source_zips/LeapMotionViaProcessing.zip) I have one available if you are interested.
</div>

### Check-in Due Wednesday night 11:59 pm

Check-in ([C5: Build an AI Project topic](https://d2l.mountunion.edu/d2l/lms/quizzing/user/quiz_summary.d2l?qi=20021&ou=35016)) is due earlier so I can read through your model ideas before class.

The questions are listed below.

1. What model would you like to build?
2. What kind of inputs could you use (from the list above: Teachable Machine Image, Teachable Machine Audio, Wekinator Machine Face...)?
    What kind of outputs (classification, regression, dynamic time warping...)?
3. What different or modified project/model would you be interested in? (This could be something completely different, or just a small variation).
4. What was unclear, or what is one remaining question you have?




