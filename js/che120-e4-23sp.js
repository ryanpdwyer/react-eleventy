
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [
    {
        "Student Name": "Joe William Drsek",
        "Student ID": "1055525",
        "Class Level": "First Year",
        "Email": "drsekjw2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "1",
        "Vial": "1",
        "U1": "11",
        "U2": "9"
    },
    {
        "Student Name": "Clarissa Rose Feitl",
        "Student ID": "1055448",
        "Class Level": "Sophomore",
        "Email": "feitlcr2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "2",
        "Vial": "2",
        "U1": "8",
        "U2": "7"
    },
    {
        "Student Name": "Matthew Fleming",
        "Student ID": "1058234",
        "Class Level": "First Year",
        "Email": "fleminma2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "3",
        "Vial": "3",
        "U1": "6",
        "U2": "7"
    },
    {
        "Student Name": "Liam Christopher Fluharty",
        "Student ID": "1055766",
        "Class Level": "First Year",
        "Email": "fluharlc2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "4",
        "Vial": "4",
        "U1": "8",
        "U2": "14"
    },
    {
        "Student Name": "Wyatt Heath Freeman",
        "Student ID": "1055616",
        "Class Level": "First Year",
        "Email": "freemawh2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "5",
        "Vial": "5",
        "U1": "7",
        "U2": "9"
    },
    {
        "Student Name": "Zach Heckendorn",
        "Student ID": "1055562",
        "Class Level": "First Year",
        "Email": "heckenza2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "6",
        "Vial": "6",
        "U1": "14",
        "U2": "11"
    },
    {
        "Student Name": "Jordin Mekenzi Kauffman",
        "Student ID": "1056272",
        "Class Level": "First Year",
        "Email": "kauffmjm2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "7",
        "Vial": "7",
        "U1": "4",
        "U2": "10"
    },
    {
        "Student Name": "Alaina Nicole Krajewski",
        "Student ID": "1058262",
        "Class Level": "First Year",
        "Email": "krajewan2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "8",
        "Vial": "8",
        "U1": "6",
        "U2": "14"
    },
    {
        "Student Name": "Michael T. Lally",
        "Student ID": "1055443",
        "Class Level": "First Year",
        "Email": "lallymt2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "9",
        "Vial": "9",
        "U1": "11",
        "U2": "12"
    },
    {
        "Student Name": "Nico Centori Maffei",
        "Student ID": "1052946",
        "Class Level": "Sophomore",
        "Email": "maffeinc2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "10",
        "Vial": "10",
        "U1": "1",
        "U2": "5"
    },
    {
        "Student Name": "Matt William Michalko",
        "Student ID": "1051187",
        "Class Level": "First Year",
        "Email": "michalmw2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "11",
        "Vial": "11",
        "U1": "6",
        "U2": "13"
    },
    {
        "Student Name": "Nash Michael Minor",
        "Student ID": "1054358",
        "Class Level": "First Year",
        "Email": "minornm2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "12",
        "Vial": "12",
        "U1": "6",
        "U2": "5"
    },
    {
        "Student Name": "Marco Palaganas",
        "Student ID": "1053130",
        "Class Level": "Sophomore",
        "Email": "palagarm2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "13",
        "Vial": "13",
        "U1": "14",
        "U2": "8"
    },
    {
        "Student Name": "Savanna Leone Richards",
        "Student ID": "1057964",
        "Class Level": "First Year",
        "Email": "richarsl2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "14",
        "Vial": "14",
        "U1": "12",
        "U2": "4"
    },
    {
        "Student Name": "Luke M. Simons",
        "Student ID": "1056338",
        "Class Level": "First Year",
        "Email": "simonslm2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "1",
        "Vial": "15",
        "U1": "3",
        "U2": "2"
    },
    {
        "Student Name": "Ryan Dwyer",
        "Student ID": "12123123",
        "Class Level": "NA",
        "Email": "dwyerry@mountunion.edu",
        "Section": "2",
        "VialUnknown": "2",
        "Vial": "16",
        "U1": "12",
        "U2": "4"
    }
];

function assignSampleId(jsonData, myEmail) {

    // Needs to be in submission order (not reverse chronological...)
    jsonData.reverse();
    const formsMapped = jsonData.filter(x => x.data.sectionInput === mySection);
    const formEmails = formsMapped.map(x => x.data.emailInput);

    const formsUnique = Object.fromEntries(formsMapped.filter( (x, i) => formEmails.indexOf(x.data.emailInput) === i)
                                        .map( (x, i) => [x.data.emailInput, {sample: i+1 + (parseInt(mySection)-1)*18, time: x.created_at}]))

    return formsUnique[myEmail]
} 

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-23sp");
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
  .getElementById("120-water-23sp")
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

window.checkReady = checkReady;

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

let myUnknowns = ["A", "B", "C"];

function chooseUnknowns(obj) {
    const unknowns = "ABCDEFGHIJKLMN".split("");
    const unknownsVal = Object.fromEntries(unknowns.map((x,i) => [x, i+1]));

    const unknownsNumbered = Object.fromEntries(unknowns.map((x, i) => [i+1, x]));

    const rng = new Math.seedrandom(obj.Email+'2023'+'spring-CHE120');


    const myUnknowns = [obj.U1, obj.U2, obj.Vial];

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
    const fileName = (x) => baseUrl+x+'.pdf.pdf';
    const pdf1 =  await fetch(fileName(myUnknowns[0])).then(res => res.arrayBuffer());
    const pdf2 =  await fetch(fileName(myUnknowns[1])).then(res => res.arrayBuffer());
    // const pdf3 =  await fetch(fileName(myUnknowns[2])).then(res => res.arrayBuffer());



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
    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`${name} ${unknowns[i]} IR. 3rd Sample is sample vial ${unknowns[2]}.`);
        } else {
            pages[i*2].drawText(`${name} ${unknowns[i]} IR`);
        }
        pages[i*2+1].drawText(`${name} ${unknowns[i]} NMR`);
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);


    
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    
    // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}

window.copyPages = copyPages