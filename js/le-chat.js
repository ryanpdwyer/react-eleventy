import { React, ReactDOM, PropTypes } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';

const reduceSum = (accumulator, currentValue) => accumulator + currentValue;
const molesGas = x => x.filter(x => x.phase === "g").reduce(reduceSum, 0);
const molesAq = x => x.filter(x => x.phase === "aq").reduce(reduceSum, 0);

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function shuffle(arrayIn) {
    const array = arrayIn.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const coeffChoices = [1, 1, 2, 2, 3, 4, 6];
const phaseChoices = ["aq", "aq", 
                      "s",
                      "g", "g",
                      "l"];

const thermicityChoices = ['endothermic', 'exothermic'];

const thermicity = randomChoice(thermicityChoices);

const products = [{coeff: randomChoice(coeffChoices), phase: randomChoice(phaseChoices), species: "C"}, {coeff: randomChoice(coeffChoices), phase: randomChoice(phaseChoices), species: "D"}];

const reactants = [{coeff: randomChoice(coeffChoices), phase: randomChoice(phaseChoices), species: "A"}, {coeff: randomChoice(coeffChoices), phase: randomChoice(phaseChoices), species: "B"}];

const species = ["A", "B", "C", "D"];

const questionStems = {mol: "How will the moles of ", direction: "Which direction will the reaction shift when ", K: "How will the equilibrium constant change when ", Q: "How will the reactant quotient Q change immediately after "};

const disturbanceChoices = {addX: "is added?", removeX: "is removed?", addAr: "the pressure is increased by adding Ar(g)?", increaseP: "the pressure is increased by reducing the volume?", decreaseP: "the pressure is decreased by increasing the volume?",dilution: "the solution is diluted by adding water?",
increaseT: "the temperature is increased?",
decreaseT: "the temperature is decreased?"
};

const questionChoices = {mol: ["Increase", "Decrease", "Unchanged"],
     direction: ["Right (towards products)", "Left (towards reactants)", "No change"], K: ["Increase", "Decrease", "Unchanged"],
     Q: ["Increase", "Decrease", "Unchanged"]};

// Shift right = 1, shift left = -1, no change = 0
// 

function notInQ(x) {
    return x === "s" || x === "l";
}

function answers(products, reactants, species, thermicity) {
    const out = {products: products,
            reactants: reactants, 
           nGP: 0,
           nGR: 0,
           nAqP: 0,
           nAqR: 0,
           a: reactants[0].coeff,
           ap: reactants[0].phase,
           b: reactants[1].coeff,
           bp: reactants[1].phase,
           c: products[0].coeff,
           cp: products[0].phase,
           d: products[1].coeff,
           dp: products[1].phase,
           thermicity: thermicity,
           delta_H_sign: thermicity === "endothermic" ? 1 : -1,
            };

    reactants.forEach( x=> {
        if (x.phase === "g") {
            out.nGR += x.coeff;
        } else if (x.phase === "aq") {
            out.nAqR += x.coeff;
        }
    });

    products.forEach( x=> {
        if (x.phase === "g") {
            out.nGP += x.coeff;
        } else if (x.phase === "aq") {
            out.nAqP += x.coeff;
        }
    });

    // Increase pressure, shift to side with fewer moles of gas to relieve pressure
    out.increaseP = -1*Math.sign(out.nGP-out.nGR)
    out.diluteSoln = -1*Math.sign(out.nAqR - out.nAqP)
    out.products = {"A": -1, "B": -1, "C": 1, "D": 1};
    const speciesSigns = {"A": -1, "B": -1, "C": 1, "D": 1};
    if (notInQ(out.ap)) {
        speciesSigns.A = 0;
    }
    if (notInQ(out.bp)) {
        speciesSigns.B = 0;
    }
    if (notInQ(out.cp)) {
        speciesSigns.C = 0;
    }
    if (notInQ(out.dp)) {
        speciesSigns.D = 0;
    }
    out.speciesSigns = speciesSigns;
    return out;
}

function answerMol(Xchanged, out, removed=false) {
    const resp = removed ? 1 : -1;
    return out.speciesSigns[Xchanged]*resp*-1;
}

const directionAnswer = {1: questionChoices.direction[0],
                        "-1": questionChoices.direction[1],
                        0: questionChoices.direction[2]};

const incDec = {1: questionChoices.Q[0],
                "-1": questionChoices.Q[1],
                0: questionChoices.Q[2]};

const molMult = {C: 1, D: 1, A: -1, B: -1};


// const stemAnswers = {
//     mol: {addX: "Unchanged", removeX: "Unchanged", addAr: "Unchanged", increaseP: "Unchanged", decreaseP: "Unchanged"},
//     direction: {addX: "Unchanged", removeX: "Unchanged", addAr: "No change", increaseP: "Unchanged", decreaseP: "Unchanged"},
//     Q: {addX: "Unchanged", removeX: "Unchanged", addAr: "Unchanged", increaseP: "Unchanged", decreaseP: "Unchanged"},
//     K: {addX: "Unchanged", removeX: "Unchanged", addAr: "Unchanged", increaseP: "Unchanged", decreaseP: "Unchanged"}
// }

const props = answers(products, reactants, species, thermicity);

function randomQuestionFormatted(questionStems, disturbanceChoices, questionChoices, species, out, name) {
    const spec = shuffle(species);
    const stems = ["mol", "mol", "direction", "direction", "K", "Q"];
    const stemChosen = randomChoice(stems);
    let stemConnector = "";
    if (stemChosen === "mol") {
        stemConnector = spec[0]+" change when ";
    }
    const disturbance = randomChoice(
    ["removeX", "removeX", "addX", "addX",  "addAr", "increaseP", "decreaseP", "dilution", "increaseT", "decreaseT"]);

    let disturbConnector = "";
    if (disturbance === "addX" || disturbance === "removeX") {
        disturbConnector = spec[1]+" ";
    }

    const spec_added = spec[1];
    const spec_meas = spec[0];
    const Q_added = out.speciesSigns[spec_added] // 1 for prod, -1 for react, 0 for no change...
    const X_product = molMult[spec_meas];
    const Q_inc_P = out.increaseP*-1;
    const Q_dilute = out.diluteSoln*-1;
    const K_inc_T = out.delta_H_sign;
    

    console.log(out.increaseP)
    console.log(out.speciesSigns)
    console.log(Q_added)

    const stemAnswers = {
        mol: {addX: incDec[Q_added*X_product*-1],
             removeX: incDec[-1*Q_added*X_product*-1],
             addAr: incDec[0],
             increaseP: incDec[-1*Q_inc_P*X_product],
             decreaseP: incDec[Q_inc_P * X_product],
             dilution: incDec[-1*Q_dilute* X_product],
             increaseT: incDec[K_inc_T* X_product],
             decreaseT: incDec[-K_inc_T* X_product]
        },
        direction: {addX: directionAnswer[Q_added*-1],
                    removeX: directionAnswer[Q_added],
                    addAr: directionAnswer[0],
                    increaseP: directionAnswer[-1*Q_inc_P],
                    decreaseP: directionAnswer[Q_inc_P],
                    dilution: directionAnswer[-1*Q_dilute],
                    increaseT: directionAnswer[K_inc_T],
                    decreaseT: directionAnswer[-1*K_inc_T],
                },
        Q: {addX: incDec[Q_added],
            removeX: incDec[Q_added*-1],
            addAr: incDec[0],
            increaseP: incDec[Q_inc_P],
            decreaseP: incDec[Q_inc_P*-1],
            dilution: incDec[Q_dilute],
            increaseT: incDec[0],
            decreaseT: incDec[0]
        },
        K: {addX: "Unchanged",
            removeX: "Unchanged",
            addAr: "Unchanged",
            increaseP: "Unchanged",
            decreaseP: "Unchanged",
            dilution: "Unchanged",
            increaseT: incDec[K_inc_T],
            decreaseT: incDec[-1*K_inc_T]
        }
    };
    
    console.log(stemAnswers);

    const opts = questionChoices[stemChosen].map(x => {
        return {children: x, correct: x === stemAnswers[stemChosen][disturbance]};
    }
    );

    return <MCQ name={name} options={opts}>{questionStems[stemChosen]+stemConnector+disturbConnector+disturbanceChoices[disturbance]}</MCQ>;
}


function Chem({coeff, phase, ...props}) {
    let displayCoeff = coeff;
    if (coeff === 1) {
        displayCoeff = "";
    }
    return (<>{displayCoeff}{props.children}({phase})</>);
}




function App ({a, ap, b, bp, c, cp, d, dp, thermicity, ...props}) {
    const questions = ["mcq-a", "mcq-b", "mcq-c", "mcq-d", "mcq-e"];
    const mcq = questions.map(x => {
        return (<li key={"li-"+x}>
            {randomQuestionFormatted(questionStems, disturbanceChoices, questionChoices, species, props, x)}
        </li>);
    }
    );

    const reaction = (<div className='rxn'>
    <p>Consider the {thermicity} reaction</p>
    <p><Chem coeff={a} phase={ap}>A</Chem> + <Chem coeff={b} phase={bp}>B</Chem> ⇌ <Chem coeff={c} phase={cp}>C</Chem> + <Chem coeff={d} phase={dp}>D</Chem>,</p>
    <p>initially at equilibrium.</p>
    </div>);

    return (<>
    {reaction}
    <ol>
    {mcq}
    </ol>
    <h5>Questions or Problems?</h5>
    <p>If you notice an error / bug, or have questions about one of the questions, send me an email: <Obfuscate email="dwyerry@mountunion.edu"
                        headers={{
                            subject: 'Le Chatelier Practice',
                            body: `\n\n---\nConsider the ${thermicity} reaction:\n${a}A(${ap}) + ${b}B(${bp}) ⇌ ${c}C(${cp}) + ${d}D(${dp})`
                          }}/>. One point quiz bonus for any bugs you find!
    </p>
    </>
    );
}

const div = document.getElementById("app");
ReactDOM.render(<App {...props}/>, div);