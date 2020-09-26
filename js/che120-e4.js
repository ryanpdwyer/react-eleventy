import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

function mod(n, m) {
    return ((n % m) + m) % m;
  }
  
  function stringToHash(string) { 
                    
                  var hash = 0; 
                    
                  if (string.length == 0) return hash; 
                    
                  for (i = 0; i < string.length; i++) { 
                      char = string.charCodeAt(i); 
                      hash = ((hash << 5) - hash) + char; 
                      hash = hash & hash; 
                  } 
                    
                  return hash; 
              } 
  

function show(element) {
	const el  = document.getElementById(element);
	el.removeAttribute("hidden");
}


function hide(element) {
	const el  = document.getElementById(element);
	el.setAttribute("hidden", true);
}

const buildOptionsIR = (feedback, correct) => {
	const options = ["O-H", "C-H(benzene ring)", "C-H(singly bonded carbon)", "C=O", "C-Cl", "C-Br"];
	return options.map((x, i) => {
		return {children: x, feedback: feedback[i], correct: correct.includes(x)};
	});
};

const buildOptionsIRSpec = (feedback, correct) => {
	const options = ["O-H", "C-H(benzene ring)?", "C-H(singly bonded carbon)?", "C=O", "C-Cl?", "C-Br?"];
	return options.map((x, i) => {
		return {children: x, feedback: feedback[i], correct: correct.includes(x)};
	});
};


const buildOptions = (options, feedback, correct) => {
    return options.map((x, i) => {
		return {children: x, feedback: feedback[i], correct: x.startsWith(correct)};
	});
};

function IRex (props) {
    return (<ol>

    <li>
    <MCQMulti name="ir1" options={buildOptionsIR([],["C-H(benzene ring)", "O-H"])}>
		<p>
			What functional groups are present in molecule <b>1</b>?
		</p>
	</MCQMulti>
    </li>
    <li>
    <MCQMulti name="ir2" options={buildOptionsIR([],["C-H(singly bonded carbon)", "C=O"])}>
		<p>
			What functional groups are present in molecule <b>2</b>?
		</p>
	</MCQMulti>
    </li>
    <li>
    <MCQMulti name="ir3" options={buildOptionsIR([],["C-H(singly bonded carbon)", "C-Cl"])}>
		<p>
			What functional groups are present in molecule <b>3</b>?
		</p>
	</MCQMulti>
    </li>
    </ol>);
}

function NMREx (props) {
    return (<ol>
    <li>
    <QuestionLimF answer={4}>
		<p>
		    For molecule <b>1</b>, how many different types of Hydrogen are there (how many NMR peaks)?
		</p>
	</QuestionLimF>
    </li>
    <li>
        <MCQ name="nmr12" options={buildOptions(["5:1", "3:2:1", "2:2:1:1", "1:1:1:1:1"], [], "2:2:1:1")}>
            What is the ratio of areas of the peaks for molecule <b>1</b>?
        </MCQ>
    </li>
    <li>
    <QuestionLimF answer={3}>
		<p>
		    For molecule <b>2</b>, how many different types of Hydrogen are there (how many NMR peaks)?
		</p>
	</QuestionLimF>
    </li>
    <li>
        <MCQ name="nmr22" options={buildOptions(["3:2:1", "3:3:2 (or 1.5:1.5:1)", "3:1 (or 6:2)", "1"], [], "3:3:2 (or 1.5:1.5:1)")}>
        <p>
            What is the ratio of areas of the peaks for molecule <b>2</b>?
		</p>
        </MCQ>
    </li>
    <li>
    <QuestionLimF answer={2}>
		<p>
		    For molecule <b>3</b>, how many different types of Hydrogen are there (how many NMR peaks)?
		</p>
	</QuestionLimF>
    </li>
    <li>
        <MCQ name="nmr32" options={buildOptions(["3:3:1", "3:3:2 (or 1.5:1.5:1)", "6:1", "1"], [], "6:1")}>
        <p>
            What is the ratio of areas of the peaks for molecule <b>3</b>?
		</p>
        </MCQ>
    </li>
    </ol>);
}


function UnknownEx (props) {
    return (<ol>
    <li>
    <MCQMulti name="u1ir" options={buildOptionsIRSpec([], ['O-H', 'C-H(benzene ring)?', "C-Cl?"])}>
		<p>Using the IR spectrum and Table 4.1, which functional groups could be in the unknown molecule?
		</p>
	</MCQMulti>
    </li>
    <li>
    <QuestionLimF answer={4}>
        How many peaks are in the NMR spectrum?
    </QuestionLimF>
    </li>
    <li>
    <MCQ name="nmr-u1" options={buildOptions(["5:1", "3:2:1", "2:2:1:1", "1:1:1:1:1"], [], "2:2:1:1")}>
            What is the ratio of areas of the peaks in the NMR spectrum?
    </MCQ>
    </li>
    <li>
    <MCQ name="u1-identify" options={buildOptions(["Molecule 1", "Molecule 2", "Molecule 3"], [], "Molecule 1")}>
            Considering all of the possible evidence, which compound is the unknown most likely to be?
    </MCQ>
    </li>
    </ol>);
}

function TableData (props) {
    return (<ol>
        <h5>Table 4.2 IR Prediction</h5>
    <li>
        <QuestionF answer={4}>How many molecules have an O-H functional group?</QuestionF>
    </li>
    <li>
    <QuestionF answer={4}>How many molecules have a C=O functional group?</QuestionF>
    </li>
    <li>
    <QuestionF answer={3}>How many molecules have a C-Cl functional group?</QuestionF>
    </li>
    <li>
    <QuestionF answer={1}>How many molecules have a C-Br functional group?</QuestionF>
    </li>
    <li>
    <QuestionF answer={3}>How many molecules have a C-H(benzene ring) functional group?</QuestionF>
    </li>
    <h5>Table 4.3 NMR Prediction</h5>
    <li>
    <QuestionF answer={3}>How many molecules have 1 peak?</QuestionF>
    </li>
    <li>
    <QuestionF answer={8}>How many molecules have 2 peaks?</QuestionF>
    </li>
    <li>
    <QuestionF answer={4}>How many molecules have 3 peaks?</QuestionF>
    </li>
    <li>
    <QuestionF answer={0}>How many molecules have 4 peak?</QuestionF>
    </li>
    </ol>);
}

const irDiv = document.getElementById("ir-ex1");
const nmrDiv = document.getElementById("nmr-ex1");
const uDiv = document.getElementById("u1");
const checkTableDiv = document.getElementById('checkTable');

ReactDOM.render(<IRex/>, irDiv);
ReactDOM.render(<NMREx/>, nmrDiv);
ReactDOM.render(<UnknownEx/>, uDiv);
ReactDOM.render(<TableData/>, checkTableDiv);


/**
* range Get an array of numbers within a range
* @param min {number} Lowest number in array
* @param max {number} Highest number in array
* @param rand {bool} Shuffle array
* @return {array}
*/
function range( min, max, rng ) {
    var arr = ( new Array( ++max - min ) )
      .join('.').split('.')
      .map(function( v,i ){ return min + i });
    return arr.map(function( v ) { return [ rng(), v ] })
         .sort().map(function( v ) { return v[ 1 ] });
}

let myUnknowns = ["A", "B", "C"];

function chooseUnknowns(event) {
    const unknowns = "ABCDEFGHIJKLMN".split("");
    const unknownsVal = Object.fromEntries(unknowns.map((x,i) => [x, i+1]));
    const rng = new Math.seedrandom(document.getElementById("nameInput").value);
    myUnknowns = range(0, unknowns.length-1,rng).slice(0,3).map(i=>unknowns[i]);
    console.log(myUnknowns);
    document.getElementById('assignedUnknowns').style.display='block';
    const sampleIDs = myUnknowns.map( x => Math.floor(rng()*10000))
                                .sort()
                                .map(x=>x.toString().padStart(4, "0"));
    const unknownIDs = myUnknowns.map((x,i)=>{
        const num = unknownsVal[x];
        const s = sampleIDs[i];
        if (num < 10) {
            return s.slice(0, 3) + num.toString() + s.slice(3);
        }
        else {
            return s[0] + "1" + s[2] + num.toString()[1] + s.slice(3);
        }
    })
    console.log(sampleIDs);
    console.log(unknownIDs);
    ['1', '2', '3'].forEach( (x, i) => {
        document.getElementById(`unknown`+x).innerText = unknownIDs[i];
    });
}

window.chooseUnknowns = chooseUnknowns;


async function copyPages() {
        // Fetch first existing PDF document
    const baseUrl = '/pdf/'
    const fileName = (x) => baseUrl+x+'.pdf.pdf';
    const pdf1 =  await fetch(fileName(myUnknowns[0])).then(res => res.arrayBuffer());
    const pdf2 =  await fetch(fileName(myUnknowns[1])).then(res => res.arrayBuffer());
    const pdf3 =  await fetch(fileName(myUnknowns[2])).then(res => res.arrayBuffer());



    const pdfDoc1 = await PDFDocument.load(pdf1);
    const pdfDoc2 = await PDFDocument.load(pdf2);
    const pdfDoc3 = await PDFDocument.load(pdf3);


    
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Copy the 1st page from the first donor document, and 
    // the 743rd page from the second donor document
    const [p11, p12] = await pdfDoc.copyPages(pdfDoc1, [0, 1])
    const [p21, p22] = await pdfDoc.copyPages(pdfDoc2, [0, 1])
    const [p31, p32] = await pdfDoc.copyPages(pdfDoc3, [0, 1])

    // Add the first copied page
    pdfDoc.addPage(p11);
    pdfDoc.addPage(p12);
    pdfDoc.addPage(p21);
    pdfDoc.addPage(p22);
    pdfDoc.addPage(p31);
    pdfDoc.addPage(p32);
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    const name = document.getElementById("nameInput").value;
        // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} V4 Unknowns.pdf`, "application/pdf");
}

window.copyPages = copyPages