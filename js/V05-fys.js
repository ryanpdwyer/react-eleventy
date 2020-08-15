import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';

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
		<MCQ name="w1" options={buildOptions(['Nodding or shaking your head are two categories or classes, but they are gestures that vary with time.', 'There is no continuous output here - we are trying to identify when we see a person nodding their head (1) or shaking their head (2)',
		'Yes, because we are categorizing gestures (that depend on time)'], 'T')}>
	Play a sound when a person nods or shakes their head.
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

// document.getElementById("v1").play();