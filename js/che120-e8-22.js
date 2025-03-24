import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';
import { Obfuscate } from './obfuscate.js';
import "https://cdn.plot.ly/plotly-2.9.0.min.js"



// const titrationDiv = document.getElementById("titration-plot");
const trace1 = {
	x: [0, 0.25, 0.5, 0.750000000000001, 1, 2, 3, 3.99999999999999, 4.99999999999999, 5.99999999999999, 6.99999999999999, 7.99999999999999, 8.99999999999999, 9.99999999999999, 11, 12, 13, 14, 15, 16, 17, 17.5, 17.9, 18.3, 18.6, 18.8, 19, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.9, 20.1, 20.4, 20.9, 21.4, 22.4, 23.4],
	y: [10.7569905557595, 10.6629416974221, 10.5718786227597, 10.4864194700917, 10.4077425023015, 10.1556296796282, 9.97201364752949, 9.8265263534318, 9.70392003648568, 9.59507997146951, 9.49533937988929, 9.40135949869255, 9.31063280306988, 9.22113752902432, 9.13099841666322, 9.03821949158057, 8.94064650547841, 8.83473655750165, 8.71594457347239, 8.57614736952695, 8.39910402922029, 8.28601447453781, 8.17451105947782, 8.03133974089185, 7.88766917700668, 7.76004748173483, 7.58306420022338, 7.28832852930771, 7.00570766058148, 6.01029058997198, 4.12941305507601, 3.80580954731282, 3.62261338270576, 3.3955733142243, 3.24764451358817, 3.09193091477551, 2.91615445259434, 2.79225291285789, 2.61894250857126, 2.49711988662075]
, mode: 'markers', type: 'scatter'};

Plotly.newPlot('titration-plot', [trace1], {xaxis: {title: 'Volume  0.100 M HCl added (mL)', zeroline: true,  nticks: 7}, yaxis: {title: 'pH', zeroline: true, }});


const reactDiv = document.getElementById("react-app");

const content = (<>
<h3>Questions</h3>
<p>
    The questions below are designed to help you answer the questions on the report; please let me know if you have any questions (<Obfuscate email="dwyerry@mountunion.edu" headers={{subject: "CHE120 Lab E8"}}/>)!
</p>

<ol>
<li key="equivalence-pt">
<QuestionLimF inputLabel="mL" answer={19.41} relErr={0} absErr={0.05} name="equivalence-pt">
    At what volume of HCl added does the equivalence point occur?
</QuestionLimF>
</li>
<li key="half-equivalence-pt">
<QuestionLimF inputLabel="mL" answer={9.705} relErr={0} absErr={0.04} name="half-equivalence-pt">
    At what volume of HCl added does the half-equivalence point (or half-way point) occur?
</QuestionLimF>
</li>
<li key="pKa">
<QuestionLimF inputLabel="mL" answer={9.25} relErr={0} absErr={0.05} name="pKa">
    Using the half-equivalence point, what is the pK<sub>a</sub> of the weak base's conjugate acid?
</QuestionLimF>
</li>
<li key="Ka">
    <QuestionLimF answer={5.6e-10} relErr={0.15} name="Ka">
        What is the K<sub>a</sub> for the weak base's conjugate acid? In your answer, use "e" to represent scientific notation, e.g. 1.2×10<sup>-10</sup> is written as 1.2e-10.
    </QuestionLimF>
</li>
<li key="moles-weak-base">
<QuestionLimF inputLabel="mol" answer={0.001941} relErr={0.012} name="moles-weak-base">
    How many moles of weak base B were initially present in the solution? 
</QuestionLimF>
</li>
<li>
<QuestionLimF inputLabel="g/mol" answer={114.9} relErr={0.012} name="molar-mass-weak-base">
    What is the molar mass of the weak base B? Remember there were 0.223 g of the base.
</QuestionLimF>
</li>
<li key="buffer-defn">
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
    The pH can be calculated using the Henderson-Hasselbalch equation, pH = pK<sub>a</sub> + log([base]/[acid]), whenever ____ is in solution.
</MCQ>
<p>
Remember the differences between strong acids and weak acids; we don't list K<sub>a</sub> for strong acids because they ionize/dissociate completely. To determine the pK<sub>a</sub> of the acid, we need to use the equation pH = pK<sub>a</sub> + log([base]/[acid]) at the half-equivalence point (where pH = pK<sub>a</sub>, assuming that equation applies).
</p>
</li>
<p>
For the pH at the equivalence point, remember that you just have the products of the titration in solution at that point, so that determines the pH of the solution.
</p>
<li key="salt-eq-pt-sa">
<MCQ name="NaCl-salt" options={[{children: "acidic so pH < 7"}, {children: "basic so pH > 7"}, {children: "neutral so pH = 7", correct: true}]}>
What type of salt is NaCl, the salt formed in the strong acid/strong base titration, and therefore what is the pH at the equivalence point? NaCl is _____
</MCQ>
</li>
<li key="salt-eq-pt-wa">
<MCQ name="NaCH3COO-salt" options={
    [
        {children: "acidic so pH < 7"},
        {children: "basic so pH > 7", correct: true},
        {children: "neutral so pH = 7"}
    ]}>
What type of salt is NaCH<sub>3</sub>COO, the salt formed in the weak acid/strong base titration, and therefore what is the pH at the equivalence point? NaCH<sub>3</sub>COO is _____
</MCQ>
</li>
</ol>
</>
);

ReactDOM.render(content, reactDiv);