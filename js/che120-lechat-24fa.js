import { React, ReactDOM, StrictMode } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';

const data = {
    "solutions": {
      "FILESYSTEM": {
        "DIRECTORY": [
          {
            "name": "stockroom",
            "SOLUTION": [
                {"name": "Initial equilibrium solution",
                "description": "Initial equilibrium solution",
                "volume": "0.1",
                "species": [
                  {
                    "id": "0",
                  },
                  {
                    "id": "10",
                    "amount": "0.025"
                  },
                  {
                    "id": "11",
                    "amount": "0.025"
                  }
                ]
                },
                {
                    "name": "A solution",
                    "description": "Reactant A solution",
                    "volume": "0.1",
                    "species": [
                      {
                        "id": "10",
                        "amount": "0.1"
                      }
                    ]
                  },
                  {
                    "name": "B gas",
                    "description": "Reactant B gas",
                    "volume": "0.0",
                    "species": [
                      {
                        "id": "11",
                        "amount": "0.1"
                      }
                    ]
                  },
                  {
                    "name": "C solid",
                    "description": "Product C solid",
                    "volume": "0.0",
                    "species": [
                      {
                        "id": "12",
                        "amount": "0.1"
                      }
                    ]
                  },
                  {
                    "name": "D solution",
                    "description": "Product D solution",
                    "volume": "0.1",
                    "species": [
                      {
                        "id": "13",
                        "amount": "0.1"
                      }
                    ]
                },
                    {
                "name": "Distilled H<sub>2</sub>O",
                "description": "Distilled Water",
                "volume": "0.1",
                "species": [
                  {
                    "id": "0",
                  }
                ]
              },
            ]
          }
        ]
      }
    },
   "species": {
      "SPECIES_LIST": {
        "SPECIES": [
          {
            "entropy": "69.91",
            "name": "H<sub>2</sub>O",
            "state": "l",
            "enthalpy": "-285.83",
            "density": "1.000",
            "specificHeat": "1.000",
            "molecularWeight": "18.01534",
            "id": "0"
          },
          
          {
            "entropy": "0.0",
            "name": "H<sup>+</sup>",
            "enthalpy": "0.0",
            "id": "1"
          },

          
          {
            "entropy": "-10.75",
            "name": "OH<sup>-</sup>",
            "enthalpy": "-229.99",
            "id": "2"
          },
          {
            "id": "10",
            "name": "A",
            "state": "aq",
            "enthalpy": "0",
            "entropy": "0",
            "molecularWeight": "100",
            "density": "1.0",
            "specificHeat": "1.0"
          },
          {
            "id": "11",
            "name": "B",
            "state": "g",
            "enthalpy": "0",
            "entropy": "0",
            "molecularWeight": "50",
            "density": "0.1",
            "specificHeat": "1.0"
          },
          {
            "id": "12",
            "name": "C",
            "state": "s",
            "enthalpy": "-100",
            "entropy": "-336",
            "molecularWeight": "150",
            "density": "2.0",
            "specificHeat": "1.0"
          },
          {
            "id": "13",
            "name": "D",
            "state": "aq",
            "enthalpy": "0",
            "entropy": "0",
            "molecularWeight": "75",
            "density": "1.2",
            "specificHeat": "1.0",
            "hue": "12",
            "saturation": "86",
            "value": "70",
            "colorConcentration": ".08"
          }

        ]
      }
   },
    "spectra": {
      "SPECTRA_LIST": {
        "SPECIES": []
      }
    },
    "reactions": {
      "REACTIONS": {
        "REACTION": [
          {
            "SPECIES_REF": [
              {
                "id": "0",
                "coefficient": "-1"
              },
              {
                "id": "1",
                "coefficient": "1"
              },
              {
                "id": "2",
                "coefficient": "1"
              }
            ]
          },
          
          
          {
            "SPECIES_REF": [
              {
                "id": "10",
                "coefficient": "-3"
              },
              {
                "id": "11",
                "coefficient": "-2"
              },
              {
                "id": "12",
                "coefficient": "1"
              },
              {
                "id": "13",
                "coefficient": "1"
              }
            ]
          }          
        
        ]
      }
    },
   "assignment": {
      "assignmentText": "<em>LeChatlier's Principle:</em> <p></p><p><b>Objective:</b>    Use the virtual lab to gain an understanding of Le Chatlier's principle.</p>"
    },
    "configuration": {
      "title": "Le Chatelier's Principle Prelab",
      "solutionViewers": [
        {
          "id": "solutionProperties",
          "displayDefault": true,
          "args": {
            "honorSignificantFigures": false
          }
        },
        {
          "id": "aqueous",
          "displayDefault": true,
          "args": {
            "unitsToggleEnabled": true
          }
        },
        {
          "id": "solid",
          "displayDefault": true,
          "args": {
            "unitsToggleEnabled": true
          }
        },
        {
            "id": "gas",
            "displayDefault": true,
            "args": {
              "unitsToggleEnabled": true
            }
        },
        {
          "id": "spectrometer",
          "displayDefault": false
        },
        {
          "id": "particleView",
          "displayDefault": false
        },
        {
          "id": "thermometer",
          "displayDefault": true
        },
        {
          "id": "pH",
          "displayDefault": true
        },
        {
          "id": "vesselTrackingControl",
          "displayDefault": false
        }
      ],
      "transfer": [
        "precise",
        "significantFigures",
        "realistic"
      ]
    }
  };
       
  
window.data = data;

function item_to_children(item){
    if (item.children) {
        return item;
    } else {
        return {children: item};
    }
}

function children(items) {
    return items.map(item_to_children);
}



const part_a = [<MCQ options={[{children: "became darker blue", correct: true}, {children: "became lighter blue"}, {children: "didn't change color"}
]} name="part_a-0">What did you observe when adding NaOH to the equilibrium solution? The solution ____ </MCQ>,
<MCQ guesses={4} options={[{children: "An increase in OH⁻", correct: true}, {children: "Added NaOH", feedback: "It is true that this will disturb the equilibrium, but this isn't precise enough. For Le Chatelier's principle, we need a specific increase or decrease in the concentration of a reactant or product."}, {children: "A change in OH⁻", feedback: "For Le Chatelier's principle, we need to know whether OH⁻ increases or decreases, since those will have opposite effects."}, {children: "An increase in M(OH)₂²⁻", feedback: "The final result of the added NaOH is an increase in M(OH)₂²⁻, but that is not the initial stress or disturbance that shifts equilibrium. What initially changed to take the system out of equilibrium?"} ]} name="part_a-1" correctFeedback="Correct. NaOH is ionic, so it dissociates into Na⁺ and OH⁻, therefore increasing the concentration of OH⁻. This allows the Le Chatelier response (shift towards reactants/products to be determined).">
What was the specific stress or disturbance that affected the equilibrium?
</MCQ>,
<MCQ name="part_a-shift" options={children(["Towards reactants (to the left)", {children: "Toward products (to the right)" , correct: true}, "No shift"])}>In response to the stress/disturbance, what direction does the reaction shift?</MCQ>,
<MCQ name="part_a-observations" options={children(["reactants / decrease ", "reactants / increase", "products / decrease", {children: "products / increase", correct: true}])}>How does this shift explain the observation that solution became blue? The shift toward _____ causes a _____ in the dark blue M(OH)₂²⁻ ion.</MCQ>
];

const part_b = [<MCQ options={[{children: "became darker blue"}, {children: "became lighter blue", correct: true}, {children: "didn't change color"}
]} name="part_b-0">What did you observe when adding H₂SO₄ to the equilibrium solution? The solution ____ </MCQ>,
<MCQ guesses={4} options={[{children: "Added H₂SO₄", feedback: "It is true that this will disturb the equilibrium, but this species isn't a reactant or product. To apply Le Chatelier's principle, we need to determine a reactant or product that increases or decreases as a result of the added H₂SO₄."}, 
{children: "A change in OH⁻", feedback: "For Le Chatelier's principle, we need to know whether OH⁻ increases or decreases, since those will have opposite effects."}, {children: "A decrease in OH⁻", correct: true},  {children: "A decrease in M(OH)₂²⁻", feedback: "The final result of the added H₂SO₄ is a decrease in M(OH)₂²⁻, but that is not the initial stress or disturbance that shifts equilibrium. What initially changed to take the system out of equilibrium?"} ]} name="part_b-1" correctFeedback="Correct. The acid H₂SO₄ reacts with OH⁻, decreasing OH⁻.">
What was the specific stress or disturbance that affected the equilibrium?
</MCQ>,
<MCQ name="part_b-shift" options={children([{children: "Towards reactants (to the left)", correct: true}, {children: "Toward products (to the right)"}, "No shift"])}>In response to the stress/disturbance, what direction does the reaction shift?</MCQ>,
<MCQ name="part_b-observations" options={children([{children: "reactants / increase / decrease", correct: true}, "reactants / decrease / increase", "products / increase / decrease", {children: "products / decrease / increase", correct: false}])}>How does this shift explain the observation? The shift toward _____ causes an _____ in the light blue M²⁺ ion and a ______  in the dark blue M(OH)₂²⁻ ion.</MCQ>
];


const Heat = ({location, locationValue, arrowValue, arrowDisplay}) => {
  if (location != locationValue) {
    return <span></span>
  }
  const arrowText = arrowDisplay[arrowValue];
  if (location == "reactant") {
    return <span>{arrowText}heat + </span>
  } else if (location == "product") {
    return <span> + heat{arrowText}</span>
  } else {
    return <span></span>
  }
}

const HeatQuestions = (props) => {
    // This should ask 
    // This should use a select box with 3 choices for the heat... (reactant / product / none)
    const heat_choice_obj = {none: "", reactant: "reactant", product: "product"}
    const arrow_choice_obj = {none: "no arrow", increasing: "increasing (↑)", decreasing: "decreasing (↓)"}
    const arrowDisplay = {none: "", increasing: "↑", decreasing: "↓"}
    ;
    const [heat, setHeat] = React.useState("none")
    const [arrow, setArrow] = React.useState("none");
    const [submitState, setSubmitState] = React.useState("none");

    const feedback = {
      none_reactant: <><b>Incorrect.</b> You need an arrow (increasing ↑ or decreasing ↓) attached to heat to see how the equilibrium is disturbed.</>,
      none_product: <><b>Incorrect.</b> You need an arrow (increasing ↑ or decreasing ↓) attached to heat to see how the equilibrium is disturbed.</>,
      increasing_product: <><b>Incorrect.</b> The reaction is cooled, and the color of the solution becomes a darker blue. Since the reaction is cooled, it is an indication that heat is decreased in this reaction scheme, causing the shift in the equilibrium towards the products, making the solution a darker blue.</>,
      decreasing_reactant: <><b>Incorrect.</b>  The temperature is cooled, suggesting that heat is decreased. But, since the color of the solution becomes a darker blue, the result of the stress should shift the solution to the products. If this heat stressor is in the reactants, the solution would become a lighter color.</>,
      increasing_reactant: <><b>Incorrect.</b> The temperature is cooled, thus the stressor is a decrease in heat. If heat is increased and is a part of the reactants, the solution would become a darker blue and shift to the right (products). However, heat is decreased, resulting in the shift to the reactants. This selection would result in the correct color change, but the incorrect stressor.</>,
      decreasing_product: <><b>Correct!</b> The reaction is exothermic, so heat is a product. The temperature of the solution is cooled, so the stress is decreasing heat. The decreasing heat (product) causes a shift right towards products. </>
    }

    const FeedbackElement = ({submitState}) => {
      if (submitState == "none") {
        return null;
      } else {
        return <p>{feedback[submitState]}</p>
      }
    }

    return (<div>
      <p>Fill in the selections below to explain how decreasing the temperature affected the reaction.</p>
      <p>
      <label>Heat should be written in the reaction as a </label><select
      value={heat} // ...force the select's value to match the state variable...
      onChange={e => setHeat(e.target.value)} // ... and update the state variable on any change!
      >
        {Object.keys(heat_choice_obj).map((key) => <option value={key}>{heat_choice_obj[key]}</option>)}
      </select>
      </p>
      <p>
        <label>The heat should have an arrow showing heat </label> 
        <select value={arrow} onChange={e => setArrow(e.target.value)}>
        {Object.keys(arrow_choice_obj).map((key) => <option value={key}>{arrow_choice_obj[key]}</option>)}
        </select>
      </p>
      <div style={{textAlign: "center", fontSize: "1.25em"}}>
        <p> <Heat location="reactant" locationValue={heat} arrowValue={arrow} arrowDisplay={arrowDisplay} /> 3A(aq) + 2B(g) ⇌ C(s) + D(aq)
        <Heat location="product" locationValue={heat} arrowValue={arrow} arrowDisplay={arrowDisplay} /> </p>
        </div>
        <button disabled={heat=='none'} onClick={e => setSubmitState(arrow+"_"+heat)}>Submit</button>
        <FeedbackElement submitState={submitState}/>
    </div>);
}

const part_c = [
<HeatQuestions/>,
<MCQ name="part_c-shift" options={children([{children: "Towards reactants (to the left)"}, {children: "Toward products (to the right)", correct: true}, "No shift"])}> What direction did the reaction shift?</MCQ>,
<MCQ name="part_c-c-grams" options={children([{children: "Increase", correct: true}, {children: "Decrease" }, "No shift"])}> How did the grams of solid C change?</MCQ>,
];

{/* <MCQ name="isothermal-entropy" correctFeedback={<p>At constant temperature, increasing the volume, or equivalently, decreasing the pressure, causes an increase in entropy because of the equation ΔS = nRln(V<sub>f</sub>/V<sub>i</sub>). You can also reason that there are more possible microstates for the gas when the volume is larger.</p>}options={[{
    children: "ΔS is zero", feedback: "How does the a change in volume (or pressure affect the entropy of an ideal gas?"
}, {children: "ΔS is negative", feedback: <p>The gas expands to a larger volume - how does that affect the entropy? You can think about the equation or how the increased volume affects the number of possible microstates: <it>S</it> = <it>k</it><sub>B</sub>ln(<it>W</it>). </p>
}, {children: "ΔS is positive", correct: true}]}>
     What is the sign of the change in entropy $\Delta S$?
     </MCQ> */}

// Arrow from Q towards K

// function Arrow(props) {
//     <>
//     <g stroke-width="10" stroke="hsl(227, 71%, 57%)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M250 250Q450 350 550 550 " marker-end="url(#SvgjsMarker1000)"></path></g><defs><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="SvgjsMarker1000"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="hsl(227, 71%, 57%)"></polygon></marker></defs>

// }

function Arrow({x1, y1, x2, y2, ...props}){
    const stroke = props.stroke || "black";
    const strokeWidth = props.strokeWidth || 2;
    return  (<line class="cool" x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} markerEnd="url(#arrow)"></line>);
}

function NumberLine(props) {
    const K = props.K;
    const Q = props.Q;
    const min = props.min;
    const max = props.max;
    const logK = Math.log10(K);
    const logQ = Math.log10(Q);
    const logMin = Math.log10(min);
    const logMax = Math.log10(max);
    const K_pos = (logK - logMin) / (logMax - logMin)*100;
    const Q_pos = (logQ - logMin) / (logMax - logMin)*100;

    const arrow = props.Q_arrow ? <Arrow x1={Q_pos + "%"} y1="34" x2={(Q_pos + 2) + "%"} y2="34" /> : null;

    return (
        <div className="svgContainer" style={{width: "100%"}}>
            <svg width="100%" height="80">
            <defs>
    <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
      <path class="cool" d="M0,-5L10,0L0,5" class="arrowHead"></path>
    </marker>
  </defs>
                <line x1="0" y1="40" x2="100%" y2="40" stroke="black" stroke-width="1" />
                <line x1={K_pos + "%"} y1="34" x2={K_pos + "%"} y2="46" stroke="blue" stroke-width="2" />
                <text x={K_pos + "%"} y="60" fill="blue" text-anchor="middle" font-size="medium">K</text>
                <text x="0%" y="60" fill="black" text-anchor="start" font-size="medium">Reactants</text>
                <text x="100%" y="60" fill="black" text-anchor="end" font-size="medium">Products</text>
                <circle cx={Q_pos + "%"} cy="40" r="4" fill="purple" />
                <text x={Q_pos + "%"} y="30" fill="purple" text-anchor="middle" font-size="medium">Q</text>
                {arrow}
            </svg>
        </div>
    );
}

// Div that can be hidden or shown by clicking a button
function ShowHideContents(props) {
    const [show, setShow] = React.useState(false);
    const title = props.title;
    const hideText = props.title ? "Hide " + title : "Hide";
    const showText = props.title ? "Show " + title : "Show";
    const buttonText = show ? hideText : showText;
    return (<div>
        <button onClick={() => setShow(!show)}>{buttonText}</button>
        <div style={{display: show ? "block" : "none"}}>
            {props.children}
        </div>
    </div>);
}

function ForwardBackList(props) {
    const [index, setIndex] = React.useState(0);
    const length = props.items.length;
    const forward = () => setIndex((index + 1) % length);
    const back = () => setIndex((index - 1 + length) % length);
    const item = props.items[index];
    return (<div>
        <button onClick={back}>Back</button>
        <button onClick={forward}>Forward</button>
        <p>{index + 1} / {length}</p>
        {item}
    </div>);
}

const part_a_explanation = [<div>
    <NumberLine K={3.55e5} Q={3.55e5} min={1e-7} max={1e7}/>
    <p>Initially, K=Q and the system is as equilibrium. K is relatively large, so the equilibrium favors products.</p>
</div>,
<div>
    <NumberLine K={3.55e5} Q={62} min={1e-7} max={1e7}/>
    <p>After adding the NaOH, which dissociates into Na⁺ and OH⁻, the concentration of [OH⁻] increases dramatically. Because Q = [products]/[reactants], the increased concentration of reactants dramatically reduces Q.</p>
</div>,
<div>
<NumberLine K={3.55e5} Q={62} min={1e-7} max={1e7} Q_arrow={true}/>
<p>Since Q is less than K, the reaction needs to shift right towards products to re-establish equilibrium. Using Le Chatelier principle, we need to shift toward products to use up some of the added reactants.</p>
</div>,
<div>
<NumberLine K={3.55e5} Q={3.55e5} min={1e-7} max={1e7}/>
<p>The shift right towards products increases the concentration of M(OH)₄²⁻ (the dark blue ion), and decreases the concentration of M²⁺ (the light blue ion). This explains why the solution turned dark blue. You can see these changes in the information menu on the left side of the virtual lab.</p>
</div>];

//In the loop, add the number of allowed attempts to the MCQs
function App(props) {
    return (<>
        <h3>Questions</h3>
        <p>
        Predict the effect of each change using Le Chatelier's principle. The balanced chemical equation is 3A(aq) + 2B(g) ⇌ C(s) + D(aq) and the reaction is exothermic.
        </p>
        <p> More C is added to the solution.</p>
        <img src="/img/vlab-equilibrium-solution.png" alt="Initial equilibrium solution" width="140px" />
        <ol>
            {part_a.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
        <ShowHideContents title="Help for Part (a)">
        <div style={{textAlign: "center"}}>
        <p>M<sup>2+</sup>(aq) + 4OH<sup>-</sup>(aq) ⇌ M(OH)<sub>4</sub><sup>2-</sup>(aq)</p>
        </div>
        <ForwardBackList items={part_a_explanation}/>
        </ShowHideContents>
        <p> Part b) Which direction will the reaction shift when the solution is diluted by adding water?  </p>
        <ol>
            {part_b.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
        <p> Part c) How will the grams of C change when A is added?</p>
        <p> Part d) How will K change when B is removed? </p>
        <p> Part e)	How will the grams of C change when the temperature is decreased?  <strong>Starting from the initial equilibrium mixture</strong>, decrease the temperature to 0 °C (Right- or two-finger-click and select "Thermal Properties", then choose "Insulated from surroundings" and type in the temperature). Keep a version of the solution at 25 °C so you can compare the colors and the moles of C, etc. If you need help, see the animation below.</p>
        <ShowHideContents title="Animation">
        <img src="/img/vlab-change-temp-slower.gif" alt="Change Temperature Animation" width="400px" />
        </ShowHideContents>
        <ol>
            {part_c.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
    </>
    );
}

const div = document.getElementById("questions");
ReactDOM.render(<StrictMode> <App /> </StrictMode>, div);