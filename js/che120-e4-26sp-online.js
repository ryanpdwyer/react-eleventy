import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
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

window.show = show

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
        <h5>Table 1.2 IR Prediction</h5>
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
    <h5>Table 1.3 NMR Prediction</h5>
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
    <QuestionF answer={0}>How many molecules have 4 peaks?</QuestionF>
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

// LAB1 students only from Spring 2026
const data = [{"Student Name":"Carson Arfaras","Email":"arfaraca2025@mountunion.edu","section":"LAB1","labId":0,"Vial":2,"U1":7.0,"U2":5.0,"VialUnknown":2},{"Student Name":"Ava Nicole Beas","Email":"beasan2025@mountunion.edu","section":"LAB1","labId":1,"Vial":3,"U1":8.0,"U2":6.0,"VialUnknown":3},{"Student Name":"Colden Adam Bloom","Email":"bloomca2024@mountunion.edu","section":"LAB1","labId":2,"Vial":4,"U1":14.0,"U2":11.0,"VialUnknown":4},{"Student Name":"Brenton Allen Fowler","Email":"fowlerba2025@mountunion.edu","section":"LAB1","labId":3,"Vial":5,"U1":10.0,"U2":3.0,"VialUnknown":5},{"Student Name":"Olivia Dale Hardgrove","Email":"hardgrod2025@mountunion.edu","section":"LAB1","labId":4,"Vial":6,"U1":12.0,"U2":9.0,"VialUnknown":6},{"Student Name":"Ethan Patrick Harvey","Email":"harveyep2025@mountunion.edu","section":"LAB1","labId":5,"Vial":7,"U1":5.0,"U2":13.0,"VialUnknown":7},{"Student Name":"Wilson Clark Johnson","Email":"johnsowc2025@mountunion.edu","section":"LAB1","labId":6,"Vial":8,"U1":2.0,"U2":6.0,"VialUnknown":8},{"Student Name":"Brayden Robert McManus","Email":"mcmanubr2025@mountunion.edu","section":"LAB1","labId":7,"Vial":9,"U1":14.0,"U2":1.0,"VialUnknown":9},{"Student Name":"Jamie R. Norris","Email":"norrisja2025@mountunion.edu","section":"LAB1","labId":8,"Vial":10,"U1":4.0,"U2":5.0,"VialUnknown":10},{"Student Name":"Ava Mae Norton","Email":"nortonav2024@mountunion.edu","section":"LAB1","labId":9,"Vial":11,"U1":3.0,"U2":6.0,"VialUnknown":11},{"Student Name":"Maddy Nichole Osborne","Email":"osbornmn2025@mountunion.edu","section":"LAB1","labId":10,"Vial":12,"U1":2.0,"U2":14.0,"VialUnknown":12},{"Student Name":"Jeffrey Orion Smith","Email":"smithje2023@mountunion.edu","section":"LAB1","labId":11,"Vial":13,"U1":5.0,"U2":1.0,"VialUnknown":13},{"Student Name":"Sam William Stevenot","Email":"stevensw2025@mountunion.edu","section":"LAB1","labId":12,"Vial":14,"U1":4.0,"U2":7.0,"VialUnknown":14},{"Student Name":"Alexa Kate Udovicic","Email":"udovicak2025@mountunion.edu","section":"LAB1","labId":13,"Vial":15,"U1":6.0,"U2":8.0,"VialUnknown":1},{"Student Name":"Student A","Email":"reynolan2024@mountunion.edu","section":"LAB9","labId":0,"Vial":73,"U1":8.0,"U2":5.0,"VialUnknown":3},{"Student Name":"Student B","Email":"studentb@mountunion.edu","section":"LAB9","labId":1,"Vial":74,"U1":11.0,"U2":6.0,"VialUnknown":4},{"Student Name":"Student C","Email":"studentc@mountunion.edu","section":"LAB9","labId":2,"Vial":75,"U1":1.0,"U2":12.0,"VialUnknown":5}];

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      // Handle success
    } catch (error) {
      // Handle error
    }


    const mySection = formData.get('sectionInput')
    const myEmail = formData.get('emailInput');
    const matchedObject = data.filter(x => x.Email.toLowerCase() === myEmail.toLowerCase());
    let obj;
    if (matchedObject.length === 0) {
        document.getElementById("email-not-found").style.display = "block";
        return;
    } else {
        document.getElementById("email-not-found").style.display = "none";
        obj = matchedObject[0];
    }
    chooseUnknowns(obj);
}

document
  .getElementById("120-water-26sp-online")
  .addEventListener("submit", handleSubmit);


function checkReady() {
    let ready = true;
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (name == "" || email == "") {
        ready = false;
    }
    if (ready) {
        document.getElementById("submitName").removeAttribute("disabled");
    }
}

document
  .getElementById("nameInput")
  .addEventListener("input", checkReady);

document
  .getElementById("emailInput")
  .addEventListener("input", checkReady);

window.checkReady = checkReady;



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

let unknownLetters = ["A", "B", "C"];

function chooseUnknowns(obj) {
    const unknowns = "ABCDEFGHIJKLMN".split("");
    const unknownsNumbered = Object.fromEntries(unknowns.map((x, i) => [i+1, x]));

    const myUnknowns = [obj.U1, obj.U2, obj.VialUnknown];
    unknownLetters[0] = unknownsNumbered[myUnknowns[0]];
    unknownLetters[1] = unknownsNumbered[myUnknowns[1]];
    unknownLetters[2] = unknownsNumbered[myUnknowns[2]];

    document.getElementById('assignedUnknowns').style.display='block';

    Array.from(document.getElementsByClassName(`unknown3`)).forEach(x=> {
            x.innerText = obj.Vial;
    });
}

window.chooseUnknowns = chooseUnknowns;


async function copyPages() {
        // Fetch first existing PDF document

    const name = document.getElementById("nameInput").value;

    const baseUrl = '/pdf/'
    const fileName = (x) => baseUrl+x+'.pdf';
    const pdf1 =  await fetch(fileName(unknownLetters[0])).then(res => res.arrayBuffer());
    const pdf2 =  await fetch(fileName(unknownLetters[1])).then(res => res.arrayBuffer());
    const pdf3 =  await fetch(fileName(unknownLetters[2])).then(res => res.arrayBuffer());



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

    const pages = pdfDoc.getPages()

    const vial = document.getElementById(`unknown3`).innerText;
    const sampleLabels = [vial+"A", vial+"B", vial+"C"];

    const inds = [0, 1, 2];
    const yPos = 8;
    const fontSize = 14;
    inds.forEach(i=>{
        if (i === 0) {
            pages[i*2].drawText(`2026 ${name} ${sampleLabels[i]} IR`, {size: fontSize, y: yPos});
        } else {
            pages[i*2].drawText(`${name} ${sampleLabels[i]} IR`, {size: fontSize, y: yPos});
        }
        pages[i*2+1].drawText(`${name} ${sampleLabels[i]} NMR`, {size: fontSize, y: yPos});
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()


    // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}


document.getElementById('download-spectra').addEventListener('click', function() {
    copyPages();
});
