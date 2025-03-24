import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
import { QuestionLimF, MCQ } from './QuestionLim.js';


function show(element) {
	const el  = document.getElementById(element);
	el.removeAttribute("hidden");
}


function hide(element) {
	const el  = document.getElementById(element);
	el.setAttribute("hidden", true);
}

let windowsVisible = true;

function toggleWindowsMac(event) {
	if (windowsVisible){
		hide('windows-install');
		show('mac-install');
		document.getElementById("video-heading").innerText = "Mac"
		document.getElementById("button").innerText = "Show Windows"
		windowsVisible = false;
	} else {
		show('windows-install');
		hide('mac-install');
		document.getElementById("video-heading").innerText = "Windows"
		document.getElementById("button").innerText = "Show Mac"
		windowsVisible = true;
	}
}

window.toggleWindowsMac = toggleWindowsMac;

const buildOptions = (feedback, correct) => {
	const options = ["Classification", "Regression", "Time"];
	return options.map((x, i) => {
		return {children: x, feedback: feedback[i], correct: x.startsWith(correct[0])};
	});
};

function App (props) {
  return (<ol>
  <h4>Which type of model?</h4>
  <p>For each task below, determine whether you would use a machine learning classification, regression, or time (dynamic time warping) model.</p>
    <li>
		<MCQ name="w1" options={buildOptions(['Nodding or shaking your head are two categories or classes, but they are gestures that vary with time, and we want to identify the precise moment the person begins nodding or shaking', 'There is no continuous output here - we are trying to identify when we see a person nodding their head (1) or shaking their head (2)',
		'Yes, because we are categorizing gestures (that depend on time)'], 'T')}>
	Play a sound when a person begins to nod or shake their head.
  </MCQ>
	</li>
<li>
	<MCQ name="w2" options={buildOptions(['Yes, categories are Me and Me + Dog <3. Since the categories only depend on what is on the screen now, it is a classifier and not a time model.', '', 'Me and Me + Dog <3 are two different categories, but they are not gestures or motions - the model only cares about what the input is right now.'], "C")}>
		<p>The model shown here:</p>
		<video width="300" autoPlay loop muted playsInline id="v1">
			<source src="/img/dog-class.mp4" type="video/mp4"></source>
		</video>
	</MCQ>
	</li>
	<li>
	<MCQ name="w3" options={buildOptions(['The outputs are continuous numbers, the positions (x and y) of the two corners of the box.', 'Correct, the outputs are continuous numbers so it is regression.', 'The outputs are continuous numbers, the positions (x and y) of the two corners of the box.'], "R")}>
		<p>
			Tracking the x and y position of the two corners of the box around the person's palm:
		</p>
		<img src="/img/handbox-example.png" alt="Hand with bounding box around the palm" width="300"/>
	</MCQ>
</li>
	</ol>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);

window.show = show;
window.hide = hide;

// document.getElementById("v1").play();