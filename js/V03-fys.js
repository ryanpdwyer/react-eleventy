import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
import { QuestionLimF, MCQ } from './QuestionLim.js';

function App (props) {
  return (<ol>
  <h4>Location prediction</h4>
  <p>Consider trying to predict the location of a person in a room (in all three dimensions, x, y, and z) using 100 carefully chosen data points from a webcam.</p>
    <li>
        <MCQ name="wek-input" options={[
  	{children:  "The person's location, 100 inputs",
  			feedback: `Remember the thing we are trying to predict is the output.`},
  	{children: "The webcam data, 100 inputs",
  			feedback: <p>Yes, the data we use to make the prediction is the input. In this case, there are 100 inputs from the webcam.</p>,
              correct: true
      },
      {children: "The person's location, 3 inputs",
      feedback: <p>Remember the thing we are trying to predict is the output.
                    </p>
        },
    {children: "The webcam data, 3 inputs",
feedback: <p>The data we use to make the prediction is the input, but there are <b>100 inputs</b> from the webcam, not 3.</p>,
correct: true
}]}
  	>
  	In Wekinator, which would be the input, and how many inputs would you listen for?
  </MCQ>
	</li>
  	
<li>
	<MCQ name="wek-output" options={[
		{children:  "The person's location, 100 continuous outputs",
				feedback: <p>Yes, the person's location is what we are trying to predict, but there are only <b>3</b> outputs, the x, y, and z coordinates.</p>},
		{children: "The webcam data, 3 continuous outputs",
				feedback: `Remember the output is the thing we are trying to predict.` ,
        },
        {children: "The person's location, 3 classifier outputs",
        feedback: <p>Yes, the person's location is what we are trying to predict,
                but the 3 outputs are <b>continuous</b> (1 foot, 1.123 feet, etc), not just one of a few categories (classifier output).</p>},
        {children: "The person's location, 3 continuous outputs", correct: true},
        ]}
		>
		Which answer best describes the Wekinator output?
	</MCQ>
</li>
  <h4>Regression or classification?</h4>
  <li>
  	<MCQ name="classifier" options={[
  		{children: `Predicting whether a stock will go up or down tomorrow.`,
  			feedback: `Since the stock price can only go up or down, it is a classifier output, not regression.`},
  		{children: `Predicting how tall a child will grow be when she grows up.`,
  			feedback: `Yes, since height could be any number, it is a continuous regression output, not a classifier.`, correct: true},
  		{children: `Predicting whether it will be sunny, cloudy, or rainy tomorrow morning.`,
  			feedback: `Since the output is one of several discrete categories (sunny, cloudy, or rainy), it is a classifier output, not regression.`,
  			correct: true}
  		]}>
  		Which of these applications could use a machine learning regression output?
  	</MCQ>
  </li>
	</ol>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);