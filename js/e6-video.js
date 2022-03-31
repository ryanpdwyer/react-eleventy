import { React, ReactDOM, PropTypes } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';


function App() {
    return (<>
     <p>
    For the reaction (at equilibrium initially),
    </p>
    <p>
    2MnO<sub>4</sub><sup>-</sup>(aq) + 
    5C<sub>2</sub>O<sub>4</sub><sup>2-</sup>(aq)
    + 16 H<sup>+</sup>(aq) ⇌
    2Mn<sup>2+</sup>(aq) + 
    10CO<sub>2</sub>(g) +
    8H<sub>2</sub>O(l)
    </p>
    <ol>
    <li>
    <MCQ name="prelab-b-stress" options={
        [
            {
                children: "Increase in [NaOH]",
            },
            {children: "Added a base"},
            {children: <p>Increase in [Na<sup>+</sup>]</p>},
            {children: <p>Increase in [OH<sup>-</sup>]</p>},
            {children: <p>Decrease in [H<sup>+</sup>] because it reacts with OH<sup>-</sup></p>, correct: true}
        ]
    }>
    <p>
    <strong>Stress:</strong> What is the stress on the system when NaOH is added?
    </p>
    </MCQ>
    </li>
    <li>
    <MCQ name="prelab-b-le-chat-response" options={
        [
            {children: "Shifts left (towards reactants)", correct: true},
            {children: "Shifts right (towards products)"},
            {children: "No change"}
        ]
    }>
        <p>
        <strong>Le Chatelier:</strong> According to Le Chatelier's principle, how does the system respond to the applied stress?
        </p>
    </MCQ>
    </li>
    <li>
    <MCQ name="prelab-b-explain-observation" options={
        [
            {children: <p>H<sup>+</sup> is reduced</p>},
            {children: <p>MnO<sub>4</sub><sup>+</sup> increases</p>, correct: true},
            {children: <p>CO<sub>2</sub>(g) decreases</p>}
        ]
    }>
        <strong>Explain observations:</strong> The shift explains the darker purple color observed because ____.
    </MCQ>
    </li>
    </ol>
    <p>Remember to apply this same sort of analysis in your video report for each stress applied to the system.</p>
    <h5>Questions or Problems?</h5>
    <p>If you have any questions, send me an email: <Obfuscate email="dwyerry@mountunion.edu"
                        headers={{
                            subject: 'CHE 120 E6 Video Report',
                          }}/>.
    </p>
    </>
    
    );
}

const div = document.getElementById("app");
ReactDOM.render(<App />, div);