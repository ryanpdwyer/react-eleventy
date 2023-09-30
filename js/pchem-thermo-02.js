import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';


function App (props) {

/* This content covers the first law of thermodynamics, applying it to 
    key gas processes: constant volume, constant pressure, and reversible isothermal. Use the MCQ component to create a few multiple choice questions to check students' understanding. Here's an example of the component in use:
    <MCQ name="buffer-defn" options={[{
    children: "an acid/base conjugate pair",
},
{
    children: "a weak base",
},
{
    children: "a weak acid / weak base conjugate pair are both present in significant amounts.", correct: true
}
]}>
*/

  return (
    <>
    <h3>Questions</h3>
    <p>
        The questions below are designed to help you answer the questions on the report; please let me know if you have any questions !(<Obfuscate email="dwyerry@mountunion.edu" headers={{subject: "CHE 341 Thermo 2"}}/>)
    </p>
    <p> Consider an ideal gas expanding at constant pressure. What can you say about the sign of each quantity during this process?</p>
    <ol>
        <li>
    <MCQ name="const-pressure-work" options={[{children: "The work is zero", feedback: <p>The mechanical work is w<sub>m</sub> = ∫ P<sub>ext</sub>  d V, so the change in volume will determine the sign of the work </p>}, {children: "The work is negative", correct: true}, {children: "The work is positive", feedback: "When a gas expands against an external pressure, is it doing work on the surroundings (losing energy), or having work done on it (gaining energy)?"}]}>
        What is the sign of the work $w$?
        </MCQ>
        </li>
        <li>
            <MCQ name="const-pressure-energy" options={[{children: "ΔU is zero", feedback: "For an ideal gas, U depends on temperature only - what happens to temperature during this process?"}, {children: "ΔU is negative", feedback: "For an ideal gas, U depends on temperature only - what happens to temperature during this process?"}, {children: "ΔU is positive", correct: true}]}>
                What is the sign of the change in internal energy $ΔU$?
            </MCQ>
        </li>
        <li>
   <MCQ name="const-pressure-heat" options={[{
    children: "The heat is zero", feedback: "The heat is ΔU - w, so the signs of ΔU and w will determine the sign of the heat"
}, {children: "The heat is negative", feedback: "The heat is ΔU - w, so the signs of ΔU and w will determine the sign of the heat"
}, {children: "The heat is positive", correct: true}]}>
     What is the sign of the heat $q$?
     </MCQ>
     </li>
    </ol> 
        </>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);