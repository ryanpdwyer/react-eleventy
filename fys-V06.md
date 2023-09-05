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

Here are some of the possible inputs you could use:

<iframe width="640" height="360" src="https://www.youtube.com/embed/jb45WGyTrf8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This video lays out what to do for Wednesday:

<iframe width="640" height="360" src="https://www.youtube.com/embed/NRYBpwDipIc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<h4>Wekinator Machine</h4>

To follow along with the first video, install Wekinator Machine by downloading here: [Windows](https://github.com/ryanpdwyer/wekinator-machine/releases/download/v1.2.6/WekinatorMachine-1.2.6.Setup.exe) or [Mac](https://github.com/ryanpdwyer/wekinator-machine/releases/download/v1.2.6/WekinatorMachine-darwin-x64-1.2.6.zip). For help completing the installation, see the video below:

<h5 id="video-heading">Windows</h5>

<button id="button" onclick="toggleWindowsMac();">Show Mac</button>


<iframe width="640" height="360" src="https://www.youtube.com/embed/zE_7wf6Z-F8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
id='windows-install'></iframe>

<iframe width="640" height="360" src="https://www.youtube.com/embed/xbYMMi0bSZY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
id='mac-install' hidden></iframe>


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

### Potential outputs

Think about what you want your model to do - it should be pretty clear whether you need classifier, continuous (regression), or gesture recognition (dynamic time warping outputs). If you're not sure, let me know and I can give you feedback via D2L, in-class or office hours.

Beyond just what outputs, think about what will make your model appealing - is there a way to tweak one of our Processing outputs to do something more interesting?

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

### Check-in Due Tuesday September 11

<!-- Check-in ([C5: Build an AI Project topic](https://d2l.mountunion.edu/d2l/le/content/43087/viewContent/551612/View?ou=43087) The questions are listed below. -->

1. What model would you like to build? What will it do?
2. What kind of inputs could you use (from the list above: Teachable Machine Image, Teachable Machine Audio, Wekinator Machine Face...)?
    What kind of outputs (classification, regression, dynamic time warping...)?
3. What different or modified project/model would you be interested in? (This could be something completely different, or just a small variation).
4. What was unclear, or what is one remaining question you have?
