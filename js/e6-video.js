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
            {children: <p>MnO<sub>4</sub><sup>-</sup> increases</p>, correct: true},
            {children: <p>CO<sub>2</sub>(g) decreases</p>}
        ]
    }>
        <strong>Explain observations:</strong> The shift explains the darker purple color observed because ____.
    </MCQ>
    </li>
    </ol>
    <p>Remember to apply this same sort of analysis in your video report for each stress applied to the system.</p>


    <h3>Iron Thiocyanate Equilibrium</h3>

    <p>Here's an example of a temperature change, using the iron thiocyanate reaction (E).</p>


    <p>
    Fe<sup>3+</sup>(aq)
    + SCN<sup>-</sup>(aq) ⇌
    FeSCN<sup>2+</sup>(aq)
    </p>

    <p>Remember the Fe<sup>3+</sup> solution was a pale yellow and when mixed with SCN<sup>-</sup>, the solution turned a dark red.</p>

    
    <p><img src="/img/iron-thiocyanate-temp.png" alt="Iron thiocyanate solution gets lights as temperature increases" style={{width:"100%", maxWidth:"500px"}}/></p>

    <p>The following questions reason through the stress, response, and connection to observations for the increase in temperature.</p>

    <ol>
        <li>
    <MCQ options={
     [
         {children: "Shifted left (towards reactants)", correct: true},
     {children: "Shifted right (towards products)"},
     {children: "No change"}
    ]}
    correctFeedback="Correct! Since the product is red, the lighter color indicates the reaction shifted left toward the pale yellow reactants."
    >
        From the observations, which direction did the reaction shift when temperature was increased?
    </MCQ>
        </li>
        <li>
            <MCQ options={[{children: "Reactants"}, {children: "Products", correct: true}, {children: "Impossible to tell"}]}
            correctFeedback='Correct! reactants ⇌ products + heat (↑) causes a shift left to use up added "product" (heat).'
            >
                Remember that for Le Chatelier principle, we can reason an increase in temperature as a stress of added heat (↑), and a decrease in temperature as a stress of removed heat (↓). Which side of the reaction should heat go on, given the answer to the previous problem?
            </MCQ>
        </li>
        <li>
            <MCQ options={[{children: "Endothermic"}, {children: "Exothermic", correct: true}]}
            correctFeedback='Correct! Exothermic means heat is released as a "product" in the reaction (ΔH is negative).'
            >
                Based on your previous answer, is the reaction endothermic or exothermic?
            </MCQ>
        </li>
    </ol>

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