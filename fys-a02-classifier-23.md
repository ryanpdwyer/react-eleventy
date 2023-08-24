---
layout: vanillabootflex-fys.njk
title: A2 Building a classifier model
js: fys-installation-g.js
tags: fys23
---

# FYS A2 Building a classifier model

### Goals

- Build a classifier AI model using Wekinator. 
- Demonstrate and explain your model in a short (about 1 minute) video.

### Prerequisites

- Installed all the software from [FYS: Setting up your computer](/fys-installation)
- Completed [What is AI? videos](/fys-v01-23/)

<h2 id="task">Task</h2>

- Build a classifier AI model using Wekinator that has at least **2** categories
- Record a ~1 minute video showing 
	1. Describe the model that you built (what does category 1, 2...)
	2. Show the model running (connected to any output). In a controlled way, guide the input through the different categories (going from 1 to 2 back to 1)
	3. Describe any challenges you had training the model. Did it work the way you expected? Did it work correctly the first time?

## Directions

1. In the `wekinator_examples/inputs` folder, there are several possible inputs you could use:
	<pre>
	├── Avatar_2Inputs (similar to the one I used in the video)
	├── Flexible_2Inputs (similar to the one I used in the video)
	├── Mountain_2Inputs (similar to the one I used in the video)
	├── Mouse_ForDTW_2Inputs (<b>don't use</b>)
	├── Pirate_2Inputs (from the <a href="/fys-v01/">What is AI?</a> videos)
	├── SimpleWebcam_100Inputs (<b>don't use</b>)
	├── Simple_MouseXY_2Inputs (<b>Hard to train with</b>)
	└── Simple_Mouse_DraggedObject_2Inputs 
	</pre>

	Try running a few of them and seeing which you'd like to use to build your input. **Make sure to install the controlP5 and oscP5 libraries first,** as shown in the video below:

	<iframe width="640" height="360" src="https://www.youtube.com/embed/LhLXazuTfKU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

2. Next, open Wekinator and set it up to use the correct number of inputs, and the correct number and type of outputs:

![Wekinator inputs screen](/img/wekinator-inputs-view.png)

3. Save your project (`File > Save project as...`) somewhere in your `fys` folder.

4. Record examples, train, and run the model. Make sure to save along the way `File > Save` or `Ctrl/Cmd+S`. Here's a short example going through steps 2-4:

<iframe width="640" height="360" src="https://www.youtube.com/embed/oUrMZeCINgQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

5. Record your roughly 1 minute video, including all three parts described [above](#task), using [Screencast-o-matic](https://screencast-o-matic.com/). Make sure your voice is audible on the recording.
6. Upload your video to [Youtube](https://youtube.com/upload) or Screencast-o-matic and submit the link to the [D2L Dropbox](https://d2l.mountunion.edu/d2l/le/content/43087/viewContent/551590/View).

<iframe width="640" height="360" src="https://www.youtube.com/embed/fP0VIrNPWW8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you had trouble setting up Screencast-o-matic on a Mac, <button class="btn btn-link" onclick="show('mac-screencast');">see this video:</button>

<div hidden id="mac-screencast">
<iframe width="640" height="360" src="https://www.youtube.com/embed/48gGAHOSk7Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
 
