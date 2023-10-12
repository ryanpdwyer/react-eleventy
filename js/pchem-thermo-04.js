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
    <p> Consider one mole of nitrogen gas initially at 5 bar and 300 K. In a water bath at 300 K (so that the gas temperature remains constant), the external pressure is suddenly reduced to 1 bar. What can you say about the sign of each quantity during this process?</p>
    <ol>
        <li>
    <MCQ name="isothermal-work" correctFeedback={<p>Correct! The external pressure was reduced, so the gas will expand (increasing volume) until the system's pressure is equal to the external pressure of 1 bar. When volume increases, the gas is doing work on the surroundings. The gas's energy decreases, so mechanical work is negative: w<sub>m</sub> = - ∫ P<sub>ext</sub>  d V </p>} options={[{children: "The work is zero", feedback: <p>The mechanical work is w<sub>m</sub> = -∫ P<sub>ext</sub>  d V, so the change in volume will determine the sign of the work. </p>}, {children: "The work is negative", correct: true}, {children: "The work is positive", feedback:  <p>The mechanical work is w<sub>m</sub> = -∫ P<sub>ext</sub>  d V, so the change in volume will determine the sign of the work. </p>}]}>
        What is the sign of the mechanical work {'$w_\\text{m}$'}?
        </MCQ>
        </li>
        <li>
            <MCQ name="isothermal-energy" correctFeedback="Correct! Assuming nitrogen behaves as an ideal gas, there is no change in internal energy because the temperature remains constant." options={[{children: "ΔU is zero", correct: true}, {children: "ΔU is negative", feedback: "For an ideal gas, U depends on temperature only - what happens to temperature during this process?"}, {children: "ΔU is positive", feedback: "For an ideal gas, U depends on temperature only - what happens to temperature during this process?"}]}>
                What is the sign of the change in internal energy $ΔU$?
            </MCQ>
        </li>
        <li>
   <MCQ name="isothermal-entropy" correctFeedback={<p>At constant temperature, increasing the volume, or equivalently, decreasing the pressure, causes an increase in entropy because of the equation ΔS = nRln(V<sub>f</sub>/V<sub>i</sub>). You can also reason that there are more possible microstates for the gas when the volume is larger.</p>}options={[{
    children: "ΔS is zero", feedback: "How does the a change in volume (or pressure affect the entropy of an ideal gas?"
}, {children: "ΔS is negative", feedback: <p>The gas expands to a larger volume - how does that affect the entropy? You can think about the equation or how the increased volume affects the number of possible microstates: <it>S</it> = <it>k</it><sub>B</sub>ln(<it>W</it>). </p>
}, {children: "ΔS is positive", correct: true}]}>
     What is the sign of the change in entropy $\Delta S$?
     </MCQ>
     </li>
    <li>
        <MCQ name="reversible" correctFeedback={<p>Correct! The system is not in mechanical equilibrium since P ≠ P<sub>ext</sub> throughout (5 bar ≠ 1 bar right when the process begins).</p>} options={[{children: "Yes", feedback: <p>The system stays in thermal equilibrium because T = T<sub>surr</sub> = 300 K throughout. But what about mechanical equilibrium? Is the pressure P always equal to the external applied pressure P<sub>ext</sub>?</p>}, {children: "No", correct: true}]}>Is this process reversible?</MCQ>
    </li>
    </ol> 
        </>);
}

const div = document.getElementById("question-node");

ReactDOM.render(<App />, div);