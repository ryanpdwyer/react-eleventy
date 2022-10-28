import { React, ReactDOM, PropTypes } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';

const fe_initial = 3e-3;
const phen_initial = 2.5e-3;
const x = 3.3e-5;

function App() {
    return (
    <>
    <ol>
    <li>
    <QuestionLimF name="concentration-ferroin" answer={x} inputLabel="M" maxGuesses={10}>
        What is the equilibrium concentration of ferroin [Fe(phen)<sub>3</sub><sup>2+</sup>]<sub>eq</sub>?
    </QuestionLimF>
    </li>
    <li>
    <QuestionLimF name="x-ferroin" answer={x} inputLabel="M" maxGuesses={10}>
        Using the previous answer, what is the value of x?
    </QuestionLimF>
    </li>
    <li>
    <QuestionLimF name="fe-equilibrium" answer={fe_initial-x} inputLabel="M" maxGuesses={10}>
        Using the initial concentration and your value of x, what is the equilibrium concentration of iron(II), [Fe<sup>2+</sup>]<sub>eq</sub>?
    </QuestionLimF>
    </li>
    <li>
    <QuestionLimF name="phenH-eq" answer={phen_initial-3*x} inputLabel="M" maxGuesses={10}>
        Similarly, what is the equilibrium concentration of the 1,10-phenanthroline acid, [phenH<sup>+</sup>]<sub>eq</sub>?
    </QuestionLimF>
    </li>
    </ol>
    </>
    );
}

const div = document.getElementById("app");
ReactDOM.render(<App />, div);