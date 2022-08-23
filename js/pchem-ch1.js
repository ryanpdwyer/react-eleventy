import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';


function App (props) {
    const nMolecule = 2+0.5+1;
    const nAtoms = nMolecule*2;
    const pD = (0.5*1 + 1*2) / (nAtoms)
    const pH = 1-pD;

  return (<ol>
      <li><QuestionLimF answer={pD}>What is the probability <em>P</em><sub>D</sub> of choosing a single D isotope at random?</QuestionLimF></li>
      <li><QuestionLimF answer={pD*pD}>What is the probability of choosing a D<sub>2</sub> molecule at random?</QuestionLimF></li>
      <li><QuestionLimF answer={2*pD*pH}>What is the probability of choosing an HD molecule at random?</QuestionLimF></li>
      <li><QuestionLimF answer={nMolecule} inputLabel={"mol"}>How many total moles of molecules are there?</QuestionLimF></li>
      <li><QuestionLimF answer={nMolecule*pD*pD} inputLabel={"mol"}>How many moles of D<sub>2</sub> are present in the most probable distribution?</QuestionLimF></li>
	</ol>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);