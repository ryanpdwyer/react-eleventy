import { React, ReactDOM, StrictMode } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ } from './QuestionLim.js';
import {Obfuscate} from './obfuscate.js';

const data = {
    "solutions": {
      "FILESYSTEM": {
        "DIRECTORY": [
          {
            "name": "stockroom",
            "SOLUTION": [
            {
                  "name": "Equilibrium solution",
                  "description": "M<sup>2+</sup> + 4OH<sup>-</sup> ⇌ M(OH)<sub>4</sub><sup>2-</sup>",
                  "volume": "0.1",
                  "species": [
                    {
                      "id": "0"
                    },
                    {
                      "id": "300",
                      "amount": ".01"
                    },
                    {
                      "id": "30",
                      "amount": ".01"
                    },
                    {
                      "id": "2",
                      "amount": ".006"
                    },
                    {
                      "id": "0.006"
                    }
                  ]
                },
              {
                      "name": "3 M NaOH",
                      "description": "3 M Sodium Hydroxide",
                      "volume": "0.1",
                      "species": [
                        {
                          "id": "0"
                        },
                        {
                          "id": "8",
                          "amount": "0.3"
                        },
                        {
                          "id": "2",
                          "amount": "0.3"
                        }
                      ]
                    },
                    {
                      "name": "3M H<sub>2</sub>SO<sub>4</sub>",
                      "description": "3 Molar Sulfuric Acid",
                      "volume": "0.1",
                      "species": [
                        {
                          "id": "0"
                        },
                        {
                          "id": "29",
                          "amount": "0.3"
                        },
                        {
                          "id": "1",
                          "amount": "0.3"
                        }
                      ]
                    },
              {
                  "name": "M<sup>2+</sup> solution",
                  "description": "Observe the initial color of the metal ion.",
                  "volume": "0.1",
                  "species": [
                    {
                      "id": "0"
                    },
                    {
                      "id": "300",
                      "amount": ".01"
                    },
                    {
                      "id": "30",
                      "amount": ".01"
                    }
                  ]
                },
                {
                  "name": "Conc. M<sup>2+</sup> solution",
                  "description": "Metal Solution",
                  "volume": "0.1",
                  "species": [
                    {
                      "id": "0"
                    },
                    {
                      "id": "300",
                      "amount": ".1"
                    },
                    {
                      "id": "30",
                      "amount": ".1"
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
              "id": 6,
              "name": "NH<sub>4</sub><sup>+</sup>",
              "simpleName": "NH4^+",
              "state": "aq",
              "enthalpy": -133.26,
              "entropy": 111.17
            },
          {
            "id": "8",
            "name": "Na<sup>+</sup>",
            "enthalpy": "-240.1",
            "molecularWeight": "22.99",
            "entropy": "59.0",
            "density": "0.971"
          },
          {
              "id": "9",
              "name": "Cl<sup>-</sup>",
              "enthalpy": "-167.16",
              "entropy": "56.5",
              "molecularWeight": "35.453"
            },
          {
              "id": "29",
              "name": "HSO<sub>4</sub><sup>-</sup>",
              "enthalpy": "-885.75",
              "entropy": "126.86",
              "molecularWeight": "97.078"
            },
            {
              "id": "30",
              "name": "SO<sub>4</sub><sup>2-</sup>",
              "enthalpy": "-907.51",
              "entropy": "17.15",
              "molecularWeight": "96.07"
            },
          {
              "id": "33",
              "name": "NH<sub>3</sub>",
              "enthalpy": "-80.29",
              "entropy": "111.42",
              "molecularWeight": "17.034"
            },
          {
              "id": "300",
              "name": "M<sup>2+</sup>",
              "enthalpy": "0",
              "entropy": "0",
              "hue": "160",
              "saturation": "88",
              "value": "100",
              "colorConcentration": ".08"
            },
  
            {
              "id": "302",
              "name": "CuCl<sub>2</sub>",
              "enthalpy": "-264.9",
              "entropy": "100",
              "state": "s",
              "molecularWeight": "99",
              "hue": "130",
              "saturation": "88",
              "value": "100",
              "colorConcentration": ".3"
            },
  
          {
              "id": "304",
              "name": "M(OH)<sub>4</sub><sup>2-</sup>",
              "enthalpy": "-969.96",
              "entropy": "-123.857",
              "molecularWeight": "131.6670",
              "hue": "242",
              "saturation": "86",
              "value": "70",
              "colorConcentration": ".017" 
            },
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
                  "id": "9",
                  "coefficient": "-2"
                },
                {
                  "id": "300",
                  "coefficient": "-1"
                },
                {
                  "id": "302",
                  "coefficient": "1"
                }
              ]
            },
  
          
          {
              "SPECIES_REF": [
                {
                  "id": "6",
                  "coefficient": "-1"
                },
                {
                  "id": "1",
                  "coefficient": "1"
                },
                {
                  "id": "33",
                  "coefficient": "1"
                }
              ]
            },
          {
  "SPECIES_REF": [
                {
                  "id": "300",
                  "coefficient": "-1"
                },
                {
                  "id": "2",
                  "coefficient": "-4"
                },
                {
                  "id": "304",
                  "coefficient": "1"
                },
  
              ]
            },
  
          {
              "SPECIES_REF": [
                {
                  "id": "30",
                  "coefficient": "1"
                },
                {
                  "id": "1",
                  "coefficient": "1"
                },
                {
                  "id": "29",
                  "coefficient": "-1"
                }
              ]
            },
          
          
        
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
      decreasing_reactant: <><b>Incorrect.</b> The temperature is cooled, suggesting that heat is decreased. But, since the color of the solution becomes a darker blue, the result of the stress should shift the solution to the products. If this heat stressor is in the reactants, the solution would become a lighter color.</>,
      increasing_reactant: <><b>Incorrect.</b> The temperature is cooled, thus the stressor is a decrease in heat. If heat is increased and is a part of the reactants, the solution would become a darker blue and shift to the right (products). However, heat is decreased, resulting in the shift to the products. This selection would result in the correct color change, but the incorrect stressor.</>,
      decreasing_product: <><b>Correct!</b> The temperature of the solution is cooled which causes the solution to become a darker blue, indicating that the result of the temperature stressor shifted the equilibrium to the products (right). Since the temperature (heat) is decreased, causing the equilibrium to shift to the products, the temperature stressor would be on the products side, making this solution / reaction an exothermic reaction.</>
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
        <p> <Heat location="reactant" locationValue={heat} arrowValue={arrow} arrowDisplay={arrowDisplay} /> M<sup>2+</sup>(aq) + 4OH<sup>-</sup>(aq) ⇌ M(OH)<sub>4</sub><sup>2-</sup>(aq)
        <Heat location="product" locationValue={heat} arrowValue={arrow} arrowDisplay={arrowDisplay} /> </p>
        </div>
        <button disabled={heat=='none'} onClick={e => setSubmitState(arrow+"_"+heat)}>Submit</button>
        <FeedbackElement submitState={submitState}/>
    </div>);
}

const part_c = [<MCQ options={[{children: "became darker blue", correct: true}, {children: "became lighter blue"}, {children: "didn't change color"}]}name="part_c-observations_color">What did you observe when decreasing the temperature of the solution?</MCQ>,
<MCQ name="part_c-shift" options={children([{children: "Towards reactants (to the left)"}, {children: "Toward products (to the right)", correct: true}, "No shift"])}>Based on your observations, what direction did the reaction shift?</MCQ>,
<HeatQuestions/>,
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
        <p>The questions below are designed to help guide you through the pre-lab. Make sure to record your answers / explanations on the paper pre-lab as well.</p>
        <p>
        Apply the following stresses to an equilibrium system and explain your observations using Le Chatelier’s principle. Each explanation should 
        </p>
        <ol>
            <li>state the specific stress/disturbance to equilibrium,</li>
            <li>state the Le Chatelier response to the stress (shift left / right), and</li>
            <li>use the Le Chatelier response to explain the experimental observations.</li>
        </ol>
        <p> Part a). 5 mL of 3 M NaOH is added. </p>
        <ol>
            {part_a.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
        <ShowHideContents title="Help for Part (a)">
        <div style={{textAlign: "center"}}>
        <p>M<sup>2+</sup>(aq) + 4OH<sup>-</sup>(aq) ⇌ M(OH)<sub>4</sub><sup>2-</sup>(aq)</p>
        </div>
        <ForwardBackList items={part_a_explanation}/>
        </ShowHideContents>
        <p> Part b) 3 mL of 3 M sulfuric acid (H₂SO₄) is added</p>
        <ol>
            {part_b.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
        <p> Part c)	Starting from the initial equilibrium mixture, decrease the temperature to 0 °C (Right- or two-finger-click and select "Thermal Properties", then choose "Insulated from surroundings" and type in the temperature). Keep a version of the solution at 25 °C for comparison.</p>
        <ol>
            {part_c.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
    </>
    );
}

const div = document.getElementById("questions");
ReactDOM.render(<StrictMode> <App /> </StrictMode>, div);