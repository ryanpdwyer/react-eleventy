
// import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Karlie Rebecca Stith","Email":"stithkr2024@mountunion.edu","section":"LAB0","labId":0,"Vial":1,"U1":13.0,"U2":9.0,"VialUnknownLetter":"A","U1Letter":"M","U2Letter":"I"},{"Student Name":"Carson Arfaras","Email":"arfaraca2025@mountunion.edu","section":"LAB1","labId":0,"Vial":2,"U1":7.0,"U2":5.0,"VialUnknownLetter":"B","U1Letter":"G","U2Letter":"E"},{"Student Name":"Ava Nicole Beas","Email":"beasan2025@mountunion.edu","section":"LAB1","labId":1,"Vial":3,"U1":8.0,"U2":6.0,"VialUnknownLetter":"C","U1Letter":"H","U2Letter":"F"},{"Student Name":"Colden Adam Bloom","Email":"bloomca2024@mountunion.edu","section":"LAB1","labId":2,"Vial":4,"U1":14.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"N","U2Letter":"K"},{"Student Name":"Brenton Allen Fowler","Email":"fowlerba2025@mountunion.edu","section":"LAB1","labId":3,"Vial":5,"U1":10.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"J","U2Letter":"C"},{"Student Name":"Olivia Dale Hardgrove","Email":"hardgrod2025@mountunion.edu","section":"LAB1","labId":4,"Vial":6,"U1":12.0,"U2":9.0,"VialUnknownLetter":"F","U1Letter":"L","U2Letter":"I"},{"Student Name":"Ethan Patrick Harvey","Email":"harveyep2025@mountunion.edu","section":"LAB1","labId":5,"Vial":7,"U1":5.0,"U2":13.0,"VialUnknownLetter":"G","U1Letter":"E","U2Letter":"M"},{"Student Name":"Wilson Clark Johnson","Email":"johnsowc2025@mountunion.edu","section":"LAB1","labId":6,"Vial":8,"U1":2.0,"U2":6.0,"VialUnknownLetter":"H","U1Letter":"B","U2Letter":"F"},{"Student Name":"Brayden Robert McManus","Email":"mcmanubr2025@mountunion.edu","section":"LAB1","labId":7,"Vial":9,"U1":14.0,"U2":1.0,"VialUnknownLetter":"I","U1Letter":"N","U2Letter":"A"},{"Student Name":"Jamie R. Norris","Email":"norrisja2025@mountunion.edu","section":"LAB1","labId":8,"Vial":10,"U1":4.0,"U2":5.0,"VialUnknownLetter":"J","U1Letter":"D","U2Letter":"E"},{"Student Name":"Ava Mae Norton","Email":"nortonav2024@mountunion.edu","section":"LAB1","labId":9,"Vial":11,"U1":3.0,"U2":6.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"F"},{"Student Name":"Maddy Nichole Osborne","Email":"osbornmn2025@mountunion.edu","section":"LAB1","labId":10,"Vial":12,"U1":2.0,"U2":14.0,"VialUnknownLetter":"L","U1Letter":"B","U2Letter":"N"},{"Student Name":"Jeffrey Orion Smith","Email":"smithje2023@mountunion.edu","section":"LAB1","labId":11,"Vial":13,"U1":5.0,"U2":1.0,"VialUnknownLetter":"M","U1Letter":"E","U2Letter":"A"},{"Student Name":"Sam William Stevenot","Email":"stevensw2025@mountunion.edu","section":"LAB1","labId":12,"Vial":14,"U1":4.0,"U2":7.0,"VialUnknownLetter":"N","U1Letter":"D","U2Letter":"G"},{"Student Name":"Alexa Kate Udovicic","Email":"udovicak2025@mountunion.edu","section":"LAB1","labId":13,"Vial":15,"U1":6.0,"U2":8.0,"VialUnknownLetter":"A","U1Letter":"F","U2Letter":"H"},{"Student Name":"Brianna Marie Bradbury","Email":"bradbubm2025@mountunion.edu","section":"LAB2","labId":0,"Vial":16,"U1":11.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"K","U2Letter":"N"},{"Student Name":"Anthony Salvatore Cambareri","Email":"cambaras2025@mountunion.edu","section":"LAB2","labId":1,"Vial":17,"U1":10.0,"U2":12.0,"VialUnknownLetter":"C","U1Letter":"J","U2Letter":"L"},{"Student Name":"Molly Louise Depinto","Email":"depintml2024@mountunion.edu","section":"LAB2","labId":2,"Vial":18,"U1":13.0,"U2":5.0,"VialUnknownLetter":"D","U1Letter":"M","U2Letter":"E"},{"Student Name":"Travis Lee Domers","Email":"domerstl2025@mountunion.edu","section":"LAB2","labId":3,"Vial":19,"U1":9.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"I","U2Letter":"C"},{"Student Name":"Marianna Georgia Farmakidis","Email":"farmakmg2024@mountunion.edu","section":"LAB2","labId":4,"Vial":20,"U1":7.0,"U2":11.0,"VialUnknownLetter":"F","U1Letter":"G","U2Letter":"K"},{"Student Name":"Clare Garczewski","Email":"garczecl2025@mountunion.edu","section":"LAB2","labId":5,"Vial":21,"U1":6.0,"U2":2.0,"VialUnknownLetter":"G","U1Letter":"F","U2Letter":"B"},{"Student Name":"Emily Jo Gingerich","Email":"gingerej2024@mountunion.edu","section":"LAB2","labId":6,"Vial":22,"U1":14.0,"U2":12.0,"VialUnknownLetter":"H","U1Letter":"N","U2Letter":"L"},{"Student Name":"Austin Ryan Hoffman","Email":"hoffmaar2025@mountunion.edu","section":"LAB2","labId":7,"Vial":23,"U1":1.0,"U2":13.0,"VialUnknownLetter":"I","U1Letter":"A","U2Letter":"M"},{"Student Name":"Matayis Mouncey","Email":"mouncema2025@mountunion.edu","section":"LAB2","labId":8,"Vial":24,"U1":5.0,"U2":4.0,"VialUnknownLetter":"J","U1Letter":"E","U2Letter":"D"},{"Student Name":"Levi Samuel Mullen-Zurbrugg","Email":"mullenls2025@mountunion.edu","section":"LAB2","labId":9,"Vial":25,"U1":8.0,"U2":3.0,"VialUnknownLetter":"K","U1Letter":"H","U2Letter":"C"},{"Student Name":"Mia Pasco","Email":"pascomi2024@mountunion.edu","section":"LAB2","labId":10,"Vial":26,"U1":10.0,"U2":2.0,"VialUnknownLetter":"L","U1Letter":"J","U2Letter":"B"},{"Student Name":"Ava Powers","Email":"powersav2023@mountunion.edu","section":"LAB2","labId":11,"Vial":27,"U1":9.0,"U2":6.0,"VialUnknownLetter":"M","U1Letter":"I","U2Letter":"F"},{"Student Name":"Lexi Renee Anne Terrano","Email":"terranlr2025@mountunion.edu","section":"LAB2","labId":12,"Vial":28,"U1":7.0,"U2":11.0,"VialUnknownLetter":"N","U1Letter":"G","U2Letter":"K"},{"Student Name":"Zachary Micheal Varga","Email":"vargazm2024@mountunion.edu","section":"LAB2","labId":13,"Vial":29,"U1":8.0,"U2":12.0,"VialUnknownLetter":"A","U1Letter":"H","U2Letter":"L"},{"Student Name":"Daniella Angelina Vecchio","Email":"vecchida2024@mountunion.edu","section":"LAB2","labId":14,"Vial":30,"U1":10.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"J","U2Letter":"N"},{"Student Name":"Paul M. Yorkievitz","Email":"yorkiepm2025@mountunion.edu","section":"LAB2","labId":15,"Vial":31,"U1":9.0,"U2":13.0,"VialUnknownLetter":"C","U1Letter":"I","U2Letter":"M"},{"Student Name":"Zak Balogh","Email":"baloghzj2025@mountunion.edu","section":"LAB3","labId":0,"Vial":32,"U1":7.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"G","U2Letter":"K"},{"Student Name":"Johnathan Michael Bayton","Email":"baytonjm2025@mountunion.edu","section":"LAB3","labId":1,"Vial":33,"U1":8.0,"U2":1.0,"VialUnknownLetter":"E","U1Letter":"H","U2Letter":"A"},{"Student Name":"Zeke Jacob Dunn","Email":"dunnej2025@mountunion.edu","section":"LAB3","labId":2,"Vial":34,"U1":12.0,"U2":4.0,"VialUnknownLetter":"F","U1Letter":"L","U2Letter":"D"},{"Student Name":"Jacy Marie Foss","Email":"fossjm2024@mountunion.edu","section":"LAB3","labId":3,"Vial":35,"U1":5.0,"U2":3.0,"VialUnknownLetter":"G","U1Letter":"E","U2Letter":"C"},{"Student Name":"Parker Allen Hanson","Email":"hansonpa2025@mountunion.edu","section":"LAB3","labId":4,"Vial":36,"U1":13.0,"U2":2.0,"VialUnknownLetter":"H","U1Letter":"M","U2Letter":"B"},{"Student Name":"Kyler Jean Lamb","Email":"lambkj2025@mountunion.edu","section":"LAB3","labId":5,"Vial":37,"U1":6.0,"U2":1.0,"VialUnknownLetter":"I","U1Letter":"F","U2Letter":"A"},{"Student Name":"Candice Lane","Email":"laneca2024@mountunion.edu","section":"LAB3","labId":6,"Vial":38,"U1":11.0,"U2":14.0,"VialUnknownLetter":"J","U1Letter":"K","U2Letter":"N"},{"Student Name":"Gavin Joseph Patterson","Email":"pattergj2025@mountunion.edu","section":"LAB3","labId":7,"Vial":39,"U1":10.0,"U2":4.0,"VialUnknownLetter":"K","U1Letter":"J","U2Letter":"D"},{"Student Name":"Luke Pemberton","Email":"pemberlu2025@mountunion.edu","section":"LAB3","labId":8,"Vial":40,"U1":3.0,"U2":9.0,"VialUnknownLetter":"L","U1Letter":"C","U2Letter":"I"},{"Student Name":"Cadence K. Puckett","Email":"pucketck2024@mountunion.edu","section":"LAB3","labId":9,"Vial":41,"U1":5.0,"U2":7.0,"VialUnknownLetter":"M","U1Letter":"E","U2Letter":"G"},{"Student Name":"Kellen Christopher Ball","Email":"ballkc2025@mountunion.edu","section":"LAB4","labId":0,"Vial":42,"U1":8.0,"U2":12.0,"VialUnknownLetter":"N","U1Letter":"H","U2Letter":"L"},{"Student Name":"Emily Elizabeth Boyd","Email":"boydee2025@mountunion.edu","section":"LAB4","labId":1,"Vial":43,"U1":13.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"M","U2Letter":"F"},{"Student Name":"Lilly Pearl Bucher","Email":"bucherlp2023@mountunion.edu","section":"LAB4","labId":2,"Vial":44,"U1":14.0,"U2":11.0,"VialUnknownLetter":"B","U1Letter":"N","U2Letter":"K"},{"Student Name":"Brycen Langley Colombo","Email":"colombbl2025@mountunion.edu","section":"LAB4","labId":3,"Vial":45,"U1":5.0,"U2":12.0,"VialUnknownLetter":"C","U1Letter":"E","U2Letter":"L"},{"Student Name":"Jack Ryan Deboe","Email":"deboejr2025@mountunion.edu","section":"LAB4","labId":4,"Vial":46,"U1":6.0,"U2":13.0,"VialUnknownLetter":"D","U1Letter":"F","U2Letter":"M"},{"Student Name":"Gavin C. Harbert","Email":"harbergc2025@mountunion.edu","section":"LAB4","labId":5,"Vial":47,"U1":11.0,"U2":10.0,"VialUnknownLetter":"E","U1Letter":"K","U2Letter":"J"},{"Student Name":"Ben Robert Leetch","Email":"leetchbr2025@mountunion.edu","section":"LAB4","labId":6,"Vial":48,"U1":9.0,"U2":2.0,"VialUnknownLetter":"F","U1Letter":"I","U2Letter":"B"},{"Student Name":"Elias George Lyras","Email":"lyraseg2025@mountunion.edu","section":"LAB4","labId":7,"Vial":49,"U1":14.0,"U2":12.0,"VialUnknownLetter":"G","U1Letter":"N","U2Letter":"L"},{"Student Name":"Ava Marie Malara","Email":"malaraam2025@mountunion.edu","section":"LAB4","labId":8,"Vial":50,"U1":1.0,"U2":13.0,"VialUnknownLetter":"H","U1Letter":"A","U2Letter":"M"},{"Student Name":"Madi Marie McNeil","Email":"mcneilmm2025@mountunion.edu","section":"LAB4","labId":9,"Vial":51,"U1":5.0,"U2":11.0,"VialUnknownLetter":"I","U1Letter":"E","U2Letter":"K"},{"Student Name":"Connor Liam Powers","Email":"powerscl2025@mountunion.edu","section":"LAB4","labId":10,"Vial":52,"U1":4.0,"U2":12.0,"VialUnknownLetter":"J","U1Letter":"D","U2Letter":"L"},{"Student Name":"Noelle Veronica Roth","Email":"rothnv2025@mountunion.edu","section":"LAB4","labId":11,"Vial":53,"U1":3.0,"U2":7.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"G"},{"Student Name":"Aiden William Stecker","Email":"steckeaw2025@mountunion.edu","section":"LAB4","labId":12,"Vial":54,"U1":2.0,"U2":8.0,"VialUnknownLetter":"L","U1Letter":"B","U2Letter":"H"},{"Student Name":"Michael Jacob Styn","Email":"stynmj2025@mountunion.edu","section":"LAB4","labId":13,"Vial":55,"U1":1.0,"U2":10.0,"VialUnknownLetter":"M","U1Letter":"A","U2Letter":"J"},{"Student Name":"Adyson McKelle Vetrone","Email":"vetronam2025@mountunion.edu","section":"LAB4","labId":14,"Vial":56,"U1":4.0,"U2":13.0,"VialUnknownLetter":"N","U1Letter":"D","U2Letter":"M"},{"Student Name":"Chase Allen Davis","Email":"davisca2025@mountunion.edu","section":"LAB5","labId":0,"Vial":57,"U1":11.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"K","U2Letter":"F"},{"Student Name":"Maddie Grace Eldridge","Email":"eldridmg2024@mountunion.edu","section":"LAB5","labId":1,"Vial":58,"U1":12.0,"U2":9.0,"VialUnknownLetter":"B","U1Letter":"L","U2Letter":"I"},{"Student Name":"Josh Gigliotti","Email":"gigliojo2025@mountunion.edu","section":"LAB5","labId":2,"Vial":59,"U1":14.0,"U2":13.0,"VialUnknownLetter":"C","U1Letter":"N","U2Letter":"M"},{"Student Name":"Corinne Cecilia Gill","Email":"gillcc2025@mountunion.edu","section":"LAB5","labId":3,"Vial":60,"U1":5.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"E","U2Letter":"K"},{"Student Name":"Kaio Marques Grubb","Email":"grubbkm2024@mountunion.edu","section":"LAB5","labId":4,"Vial":61,"U1":7.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"G","U2Letter":"C"},{"Student Name":"Asher C. Hart","Email":"hartac2024@mountunion.edu","section":"LAB5","labId":5,"Vial":62,"U1":8.0,"U2":2.0,"VialUnknownLetter":"F","U1Letter":"H","U2Letter":"B"},{"Student Name":"Makaden Jay Lee Hupp","Email":"huppmj2023@mountunion.edu","section":"LAB5","labId":6,"Vial":63,"U1":6.0,"U2":12.0,"VialUnknownLetter":"G","U1Letter":"F","U2Letter":"L"},{"Student Name":"Madeline Reece Jeffries","Email":"jeffrimr2025@mountunion.edu","section":"LAB5","labId":7,"Vial":64,"U1":14.0,"U2":13.0,"VialUnknownLetter":"H","U1Letter":"N","U2Letter":"M"},{"Student Name":"Evan Grant Kehres","Email":"kehreseg2026@mountunion.edu","section":"LAB5","labId":8,"Vial":65,"U1":1.0,"U2":11.0,"VialUnknownLetter":"I","U1Letter":"A","U2Letter":"K"},{"Student Name":"Aiden Brawley Kraus","Email":"krausab2024@mountunion.edu","section":"LAB5","labId":9,"Vial":66,"U1":5.0,"U2":4.0,"VialUnknownLetter":"J","U1Letter":"E","U2Letter":"D"},{"Student Name":"Hannah Rose Neely","Email":"neelyhr2024@mountunion.edu","section":"LAB5","labId":10,"Vial":67,"U1":3.0,"U2":6.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"F"},{"Student Name":"Marina Jade Sanders","Email":"sandermj2024@mountunion.edu","section":"LAB5","labId":11,"Vial":68,"U1":14.0,"U2":10.0,"VialUnknownLetter":"L","U1Letter":"N","U2Letter":"J"},{"Student Name":"Reagan Annsley Sedlacek","Email":"sedlacra2025@mountunion.edu","section":"LAB5","labId":12,"Vial":69,"U1":9.0,"U2":5.0,"VialUnknownLetter":"M","U1Letter":"I","U2Letter":"E"},{"Student Name":"Sarah Elizabeth Strenk","Email":"strenkse2025@mountunion.edu","section":"LAB5","labId":13,"Vial":70,"U1":2.0,"U2":12.0,"VialUnknownLetter":"N","U1Letter":"B","U2Letter":"L"},{"Student Name":"Lincoln Damani Wade","Email":"wadeld2024@mountunion.edu","section":"LAB5","labId":14,"Vial":71,"U1":7.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"G","U2Letter":"F"},{"Student Name":"Jacob Michael Wooldridge","Email":"wooldrjm2024@mountunion.edu","section":"LAB5","labId":15,"Vial":72,"U1":13.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"M","U2Letter":"N"},{"Student Name":"Student A","Email":"reynolan2024@mountunion.edu","section":"LAB9","labId":0,"Vial":73,"U1":8.0,"U2":5.0,"VialUnknownLetter":"C","U1Letter":"H","U2Letter":"E"},{"Student Name":"Student B","Email":"studentb@mountunion.edu","section":"LAB9","labId":1,"Vial":74,"U1":11.0,"U2":6.0,"VialUnknownLetter":"D","U1Letter":"K","U2Letter":"F"},{"Student Name":"Student C","Email":"studentc@mountunion.edu","section":"LAB9","labId":2,"Vial":75,"U1":1.0,"U2":12.0,"VialUnknownLetter":"E","U1Letter":"A","U2Letter":"L"}]

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-26sp");
    let formData = new FormData(myForm);
    const mySection = formData.get('sectionInput')
    const myEmail = formData.get('emailInput').toLowerCase();
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
  .getElementById("120-water-26sp")
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


    const myUnknowns = [obj.U1, obj.U2, obj.Vial];
    unknownLetters[0] = unknownsNumbered[myUnknowns[0]];
    unknownLetters[1] = unknownsNumbered[myUnknowns[1]];

    document.getElementById('assignedUnknowns').style.display='block';

    const sampleIDs = [obj.Vial+"B", obj.Vial+"C"];

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

    const vial = document.getElementById(`unknown3`).innerText

    const inds = [0, 1];
    const yPos = 8;
    const fontSize = 14;


    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2026 ${name} ${vial}B IR`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}B NMR`, {size: fontSize, y: yPos});
        } else if (i === 1){
            pages[i*2].drawText(`${name} ${vial}C IR`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}C NMR`, {size: fontSize, y: yPos});
        }
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()


    // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}

window.copyPages = copyPages
