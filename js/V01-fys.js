import { React, ReactDOM } from 'https://unpkg.com/es-react@16.13.1';
import { QuestionLimF, MCQ } from './QuestionLim.js';

function App (props) {

  return (<ol>
  <h4>Standing or Sitting?</h4>
  <p>Consider trying to predict whether a person is sitting or standing using
	information from the person's smartphone sensors. </p>
    <li><MCQ name="wek-input" options={[
  	{children:  "Smartphone sensor data",
  			feedback: `Yes, the information we use to make our prediction is the input.`,
  			correct: true},
  	{children: "Standing or sitting",
  			feedback: <p>Remember the thing we are trying to predict is the <b>output</b>.</p>
  	}]}
  	>
  	In Wekinator, which would be the input?
  </MCQ>
	</li>
  	
<li>
	<MCQ name="wek-output" options={[
		{children:  "Smartphone sensor data",
				feedback: <p>Remember the output is the thing we are trying to predict.</p>},
		{children: "Standing or sitting",
				feedback: `Yes, the thing we are trying to predict is the output.` ,
			  			correct: true
		}]}
		>
		In Wekinator, which would be the output?
	</MCQ>
</li>
  <li>
  	<MCQ name="wek-classifier" options={[
  		{children: "Yes",
  			feedback: `When the output is discrete categories
  			(standing or sitting), it is a classifier model.`,
  			correct: true},
  		{children: "No",
  		feedback: `When the output is discrete categories (standing or sitting),
  		it is a classifier model.
  		`}]}>
  		Is this a classifier model?
  	</MCQ>
  </li>
  <h4>What is a classifier?</h4>
  <li>
  	<MCQ name="classifier" options={[
  		{children: `Predicting the price of a stock tomorrow.`,
  			feedback: `Since the stock price could be any number, it is a continuous output, not a classifier output.`},
  		{children: `Predicting how tall a child will grow be when she grows up.`,
  			feedback: `Since height could be any number, it is a continuous output, not a classifier output.`},
  		{children: `Predicting whether it will be sunny, cloudy, or rainy tomorrow morning.`,
  			feedback: `Yes, since the output is one of several discrete categories (sunny, cloudy, or rainy), it is a classifier output.`,
  			correct: true}
  		]}>
  		Which of these applications could use a Machine Learning classifier output?
  	</MCQ>
  </li>
	</ol>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);