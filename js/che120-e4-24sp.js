
// import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [
    {
        "Email": "studentA@mountunion.edu",
        "Vial": 90,
        "VialUnknown": 6,
        "U1": 13,
        "U2": 5
    },
    {
        "Email": "studentB@mountunion.edu",
        "Vial": 91,
        "VialUnknown": 7,
        "U1": 1,
        "U2": 11
    },
    {
        "Email": "studentC@mountunion.edu",
        "Vial": 92,
        "VialUnknown": 8,
        "U1": 2,
        "U2": 13
    },
    {
        "Email": "studentD@mountunion.edu",
        "Vial": 93,
        "VialUnknown": 9,
        "U1": 4,
        "U2": 5
    }
  ];

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-24sp");
    let formData = new FormData(myForm);
    const mySection = formData.get('sectionInput')
    const myEmail = formData.get('emailInput');
    const matchedObject = data.filter(x => x.Email === myEmail);
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
  .getElementById("120-water-24sp")
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

// window.checkReady = checkReady;

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

window.hide = hide


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
    const unknownsVal = Object.fromEntries(unknowns.map((x,i) => [x, i+1]));

    const unknownsNumbered = Object.fromEntries(unknowns.map((x, i) => [i+1, x]));

    const rng = new Math.seedrandom(obj.Email+'2024'+'spring-CHE120-dwyer-morales-reid');


    const myUnknowns = [obj.U1, obj.U2, obj.Vial];
    unknownLetters[0] = unknownsNumbered[myUnknowns[0]];
    unknownLetters[1] = unknownsNumbered[myUnknowns[1]];

    document.getElementById('assignedUnknowns').style.display='block';
    
    const sampleIDs = myUnknowns.slice(0,-1).map( x => Math.floor(rng()*10000))
                                .sort()
                                .map(x=>x.toString().padStart(4, "0"));

    const unknownIDs = myUnknowns.slice(0,-1).map((x,i)=>{
        const num = parseInt(x);
        const s = sampleIDs[i];
        if (num < 10) {
            let initial_id = s.slice(0, 3) + num.toString() + s.slice(3);
            if (initial_id[1] == "1") {
                let new_char_1 = ((Math.floor(rng()*9)+2) % 10).toString();
                let index = 1;
                initial_id = initial_id.substring(0, index) + new_char_1 + initial_id.substring(index + 1);
            }
            return initial_id
        }
        else {
            return s[0] + "1" + s[2] + num.toString()[1] + s.slice(3);
        }
    });
    unknownIDs[2] = obj.Vial;
    const numbers = ['1', '2', '3'];
    numbers.forEach( (x, i) => {
        document.getElementById(`unknown`+x).innerText = unknownIDs[i];
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



    const pdfDoc1 = await PDFDocument.load(pdf1);
    const pdfDoc2 = await PDFDocument.load(pdf2);
    // const pdfDoc3 = await PDFDocument.load(pdf3);


    
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Copy the 1st page from the first donor document, and 
    // the 743rd page from the second donor document
    const [p11, p12] = await pdfDoc.copyPages(pdfDoc1, [0, 1])
    const [p21, p22] = await pdfDoc.copyPages(pdfDoc2, [0, 1])
    // const [p31, p32] = await pdfDoc.copyPages(pdfDoc3, [0, 1])

    // Add the first copied page
    pdfDoc.addPage(p11);
    pdfDoc.addPage(p12);
    pdfDoc.addPage(p21);
    pdfDoc.addPage(p22);
    // pdfDoc.addPage(p31);
    // pdfDoc.addPage(p32);
    
    const pages = pdfDoc.getPages()

    const unknowns = ['1', '2', '3'].map(x=>document.getElementById(`unknown`+x).innerText)

    const inds = [0, 1];
    const yPos = 8;
    const fontSize = 14;
    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2024 ${name} ${unknowns[i]} IR. In lab: measure vial ${unknowns[2]}`, {size: fontSize, y: yPos});
        } else {
            pages[i*2].drawText(`${name} ${unknowns[i]} IR`, {size: fontSize, y: yPos});
        }
        pages[i*2+1].drawText(`${name} ${unknowns[i]} NMR`, {size: fontSize, y: yPos});
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);

    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    
    // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}

window.copyPages = copyPages