import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';

function App (props) {
  return (<ol>
    <li>
        <MCQ name="classifier-better" options={[
              {correct: true},
  	{feedback: `Look at the mis-classified example in the middle.`}]}>
    Which classifier model does a better job at classifying points in the box correctly?
    </MCQ>
	</li>
    <li>
    <MCQ name="classifier" options={[
        {feedback: `Look carefully at the misclassified point in the box - remember that 1-nearest neighbor always classifiers a point based on what training example is closest to it.`},
        {correct: true, feedback: `Yes, the 1-nearest neighbor classifier will classify those points in the box near the misclassified point as blue (out of the box), while 3-nearest neighbor classifies them correctly because out of the 3 closest points, 2 are red (in the box).`}
  		]}>
  		The two models are 1-nearest neighbor and 3-nearest neighbors. Which is 1-nearest neighbor?
  	</MCQ>
    </li>
</ol>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);