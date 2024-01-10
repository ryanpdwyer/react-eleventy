
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Emily Grace Borchert","Student ID":1060318,"Class Level":"First Year","Email":"borcheeg2023@mountunion.edu","section":"LAB5","labId":0,"start_vial":44,"Vial":44,"VialUnknown":2,"U1":9.0,"U2":4.0},{"Student Name":"Justin Curl","Student ID":790839,"Class Level":"Junior","Email":"curlj2023@mountunion.edu","section":"LAB5","labId":1,"start_vial":44,"Vial":45,"VialUnknown":3,"U1":12.0,"U2":5.0},{"Student Name":"Kellen Francis DeJulia","Student ID":1059753,"Class Level":"First Year","Email":"dejulikf2023@mountunion.edu","section":"LAB5","labId":2,"start_vial":44,"Vial":46,"VialUnknown":4,"U1":6.0,"U2":9.0},{"Student Name":"Nolan Cooper Frye","Student ID":1057349,"Class Level":"First Year","Email":"fryenc2022@mountunion.edu","section":"LAB5","labId":3,"start_vial":44,"Vial":47,"VialUnknown":5,"U1":3.0,"U2":1.0},{"Student Name":"Rylie Louise Hodge","Student ID":1061962,"Class Level":"First Year","Email":"hodgerl2023@mountunion.edu","section":"LAB5","labId":4,"start_vial":44,"Vial":48,"VialUnknown":6,"U1":11.0,"U2":1.0},{"Student Name":"Riley Anderson Kneeland","Student ID":1058439,"Class Level":"Sophomore","Email":"kneelara2022@mountunion.edu","section":"LAB5","labId":5,"start_vial":44,"Vial":49,"VialUnknown":7,"U1":10.0,"U2":12.0},{"Student Name":"Oliviana Grace Lika","Student ID":1060189,"Class Level":"First Year","Email":"likaog2023@mountunion.edu","section":"LAB5","labId":6,"start_vial":44,"Vial":50,"VialUnknown":8,"U1":6.0,"U2":14.0},{"Student Name":"Gabriella Marie Melillo","Student ID":1059583,"Class Level":"First Year","Email":"melillgm2023@mountunion.edu","section":"LAB5","labId":7,"start_vial":44,"Vial":51,"VialUnknown":9,"U1":6.0,"U2":10.0},{"Student Name":"Sydney Michele Paxton","Student ID":1059773,"Class Level":"First Year","Email":"paxtonsm2023@mountunion.edu","section":"LAB5","labId":8,"start_vial":44,"Vial":52,"VialUnknown":10,"U1":4.0,"U2":12.0},{"Student Name":"Emma Jo Reese","Student ID":1056002,"Class Level":"First Year","Email":"reeseej2022@mountunion.edu","section":"LAB5","labId":9,"start_vial":44,"Vial":53,"VialUnknown":11,"U1":8.0,"U2":3.0},{"Student Name":"Lanie Caroline Schultz","Student ID":1060127,"Class Level":"First Year","Email":"schultlc2023@mountunion.edu","section":"LAB5","labId":10,"start_vial":44,"Vial":54,"VialUnknown":12,"U1":9.0,"U2":2.0},{"Student Name":"Jared Christian Smith","Student ID":1061438,"Class Level":"First Year","Email":"smithjc2023@mountunion.edu","section":"LAB5","labId":11,"start_vial":44,"Vial":55,"VialUnknown":13,"U1":10.0,"U2":9.0},{"Student Name":"Emily Elizabeth Suffecool","Student ID":799106,"Class Level":"First Year","Email":"suffecee2025@mountunion.edu","section":"LAB5","labId":12,"start_vial":44,"Vial":56,"VialUnknown":14,"U1":4.0,"U2":2.0},{"Student Name":"Taylee Marie Worley","Student ID":1059641,"Class Level":"First Year","Email":"worleytm2023@mountunion.edu","section":"LAB5","labId":13,"start_vial":44,"Vial":57,"VialUnknown":1,"U1":10.0,"U2":8.0},{"Student Name":"Nick Anna","Student ID":1056135,"Class Level":"Sophomore","Email":"annani2022@mountunion.edu","section":"LAB1","labId":0,"start_vial":0,"Vial":0,"VialUnknown":14,"U1":1.0,"U2":11.0},{"Student Name":"Kaitlyn Ann Bondoni","Student ID":1056005,"Class Level":"First Year","Email":"bondonka2023@mountunion.edu","section":"LAB1","labId":1,"start_vial":0,"Vial":1,"VialUnknown":1,"U1":5.0,"U2":14.0},{"Student Name":"Adriana Rose Domiano","Student ID":1060572,"Class Level":"First Year","Email":"domianar2023@mountunion.edu","section":"LAB1","labId":2,"start_vial":0,"Vial":2,"VialUnknown":2,"U1":3.0,"U2":1.0},{"Student Name":"Roseann Horvath","Student ID":1060280,"Class Level":"First Year","Email":"horvatro2023@mountunion.edu","section":"LAB1","labId":3,"start_vial":0,"Vial":3,"VialUnknown":3,"U1":5.0,"U2":14.0},{"Student Name":"Em J. Marstellar","Student ID":1056910,"Class Level":"Sophomore","Email":"marsteej2022@mountunion.edu","section":"LAB1","labId":4,"start_vial":0,"Vial":4,"VialUnknown":4,"U1":2.0,"U2":6.0},{"Student Name":"Nicholas Storm Mikes","Student ID":1056927,"Class Level":"Sophomore","Email":"mikesns2022@mountunion.edu","section":"LAB1","labId":5,"start_vial":0,"Vial":5,"VialUnknown":5,"U1":9.0,"U2":13.0},{"Student Name":"Brandon Chase Scheiben","Student ID":1059640,"Class Level":"First Year","Email":"scheibbc2023@mountunion.edu","section":"LAB1","labId":6,"start_vial":0,"Vial":6,"VialUnknown":6,"U1":12.0,"U2":14.0},{"Student Name":"Valerie Lynn Stroup","Student ID":1061977,"Class Level":"First Year","Email":"stroupvl2023@mountunion.edu","section":"LAB1","labId":7,"start_vial":0,"Vial":7,"VialUnknown":7,"U1":12.0,"U2":6.0},{"Student Name":"Rilen Christopher Yoder","Student ID":1062094,"Class Level":"First Year","Email":"yoderrc2023@mountunion.edu","section":"LAB1","labId":8,"start_vial":0,"Vial":8,"VialUnknown":8,"U1":12.0,"U2":9.0},{"Student Name":"Connor John Adelman","Student ID":1056064,"Class Level":"Sophomore","Email":"adelmacj2022@mountunion.edu","section":"LAB3","labId":0,"start_vial":27,"Vial":27,"VialUnknown":13,"U1":4.0,"U2":12.0},{"Student Name":"Abby Lee Collier","Student ID":1060461,"Class Level":"First Year","Email":"collieal2023@mountunion.edu","section":"LAB3","labId":1,"start_vial":27,"Vial":28,"VialUnknown":14,"U1":7.0,"U2":11.0},{"Student Name":"Claire Elaine Goff","Student ID":1060343,"Class Level":"First Year","Email":"goffce2023@mountunion.edu","section":"LAB3","labId":2,"start_vial":27,"Vial":29,"VialUnknown":1,"U1":9.0,"U2":14.0},{"Student Name":"Ciara Lynn Horney","Student ID":1054937,"Class Level":"Sophomore","Email":"horneycl2022@mountunion.edu","section":"LAB3","labId":3,"start_vial":27,"Vial":30,"VialUnknown":2,"U1":3.0,"U2":4.0},{"Student Name":"Blake Joseph Howard","Student ID":1061770,"Class Level":"Sophomore","Email":"howardbj2023@mountunion.edu","section":"LAB3","labId":4,"start_vial":27,"Vial":31,"VialUnknown":3,"U1":5.0,"U2":7.0},{"Student Name":"Nicholas Anthony Lastoria","Student ID":1055022,"Class Level":"Junior","Email":"lastorna2022@mountunion.edu","section":"LAB3","labId":5,"start_vial":27,"Vial":32,"VialUnknown":4,"U1":2.0,"U2":9.0},{"Student Name":"Meyaunni C. McKay","Student ID":1062167,"Class Level":"First Year","Email":"mckaymc2023@mountunion.edu","section":"LAB3","labId":6,"start_vial":27,"Vial":33,"VialUnknown":5,"U1":4.0,"U2":7.0},{"Student Name":"Erik Thomas Stephen Murray","Student ID":799158,"Class Level":"Sophomore","Email":"murrayet2021@mountunion.edu","section":"LAB3","labId":7,"start_vial":27,"Vial":34,"VialUnknown":6,"U1":10.0,"U2":9.0},{"Student Name":"Emma Grace Packard","Student ID":1059696,"Class Level":"First Year","Email":"packareg2023@mountunion.edu","section":"LAB3","labId":8,"start_vial":27,"Vial":35,"VialUnknown":7,"U1":9.0,"U2":6.0},{"Student Name":"Sophia Gabrielle Pruce","Student ID":1060580,"Class Level":"First Year","Email":"prucesg2023@mountunion.edu","section":"LAB3","labId":9,"start_vial":27,"Vial":36,"VialUnknown":8,"U1":2.0,"U2":13.0},{"Student Name":"Rachel Riccillo","Student ID":1055996,"Class Level":"Sophomore","Email":"riccilra2022@mountunion.edu","section":"LAB3","labId":10,"start_vial":27,"Vial":37,"VialUnknown":9,"U1":11.0,"U2":8.0},{"Student Name":"Ryan Joseph Romito","Student ID":1058823,"Class Level":"Sophomore","Email":"romitorj2022@mountunion.edu","section":"LAB3","labId":11,"start_vial":27,"Vial":38,"VialUnknown":10,"U1":2.0,"U2":14.0},{"Student Name":"Ella Patricia Schmidt","Student ID":1062978,"Class Level":"First Year","Email":"schmidep2023@mountunion.edu","section":"LAB3","labId":12,"start_vial":27,"Vial":39,"VialUnknown":11,"U1":12.0,"U2":2.0},{"Student Name":"Kennedy Morrigan Syllaba","Student ID":1055235,"Class Level":"Sophomore","Email":"syllabkm2022@mountunion.edu","section":"LAB3","labId":13,"start_vial":27,"Vial":40,"VialUnknown":12,"U1":3.0,"U2":14.0},{"Student Name":"Sofia Rozalija-Ivanica Thornhill","Student ID":1060895,"Class Level":"First Year","Email":"thornhsr2023@mountunion.edu","section":"LAB3","labId":14,"start_vial":27,"Vial":41,"VialUnknown":13,"U1":14.0,"U2":7.0},{"Student Name":"Emily Renee Weeks","Student ID":1061152,"Class Level":"First Year","Email":"weekser2023@mountunion.edu","section":"LAB3","labId":15,"start_vial":27,"Vial":42,"VialUnknown":14,"U1":12.0,"U2":7.0},{"Student Name":"Student A","Student ID":"X","Class Level":"X","Email":"studenta@mountunion.edu","section":"LAB9","labId":0,"start_vial":75,"Vial":75,"VialUnknown":5,"U1":12.0,"U2":3.0},{"Student Name":"Student B","Student ID":"X","Class Level":"X","Email":"studentb@mountunion.edu","section":"LAB9","labId":1,"start_vial":75,"Vial":76,"VialUnknown":6,"U1":3.0,"U2":8.0},{"Student Name":"Student C","Student ID":"X","Class Level":"X","Email":"studentc@mountunion.edu","section":"LAB9","labId":2,"start_vial":75,"Vial":77,"VialUnknown":7,"U1":13.0,"U2":3.0},{"Student Name":"Student D","Student ID":"X","Class Level":"X","Email":"studentd@mountunion.edu","section":"LAB9","labId":3,"start_vial":75,"Vial":78,"VialUnknown":8,"U1":6.0,"U2":7.0},{"Student Name":"Abby M. Calaway","Student ID":1058428,"Class Level":"Sophomore","Email":"calawaam2022@mountunion.edu","section":"LAB6","labId":0,"start_vial":59,"Vial":59,"VialUnknown":3,"U1":10.0,"U2":2.0},{"Student Name":"Monica Marie Clark","Student ID":1060677,"Class Level":"First Year","Email":"clarkmm2023@mountunion.edu","section":"LAB6","labId":1,"start_vial":59,"Vial":60,"VialUnknown":4,"U1":5.0,"U2":12.0},{"Student Name":"Celia Rose Damiani","Student ID":1057713,"Class Level":"Sophomore","Email":"damiancr2022@mountunion.edu","section":"LAB6","labId":2,"start_vial":59,"Vial":61,"VialUnknown":5,"U1":2.0,"U2":14.0},{"Student Name":"Dante Anthony Degenova","Student ID":1060375,"Class Level":"First Year","Email":"degenoda2023@mountunion.edu","section":"LAB6","labId":3,"start_vial":59,"Vial":62,"VialUnknown":6,"U1":4.0,"U2":14.0},{"Student Name":"Austin Austin Gantz","Student ID":1064832,"Class Level":"First Year","Email":"gantzja2024@mountunion.edu","section":"LAB6","labId":4,"start_vial":59,"Vial":63,"VialUnknown":7,"U1":14.0,"U2":3.0},{"Student Name":"Christopher Allen Greiner","Student ID":790832,"Class Level":"Senior","Email":"greineca2023@mountunion.edu","section":"LAB6","labId":5,"start_vial":59,"Vial":64,"VialUnknown":8,"U1":7.0,"U2":12.0},{"Student Name":"Carlie Marie Harmon","Student ID":1062125,"Class Level":"First Year","Email":"harmoncm2023@mountunion.edu","section":"LAB6","labId":6,"start_vial":59,"Vial":65,"VialUnknown":9,"U1":3.0,"U2":13.0},{"Student Name":"Nolan William Lindeman","Student ID":1059830,"Class Level":"First Year","Email":"lindemnw2023@mountunion.edu","section":"LAB6","labId":7,"start_vial":59,"Vial":66,"VialUnknown":10,"U1":14.0,"U2":2.0},{"Student Name":"Anna Marie Lyman","Student ID":1061939,"Class Level":"First Year","Email":"lymanam2023@mountunion.edu","section":"LAB6","labId":8,"start_vial":59,"Vial":67,"VialUnknown":11,"U1":1.0,"U2":4.0},{"Student Name":"Eddy William Malone","Student ID":1061449,"Class Level":"First Year","Email":"maloneew2023@mountunion.edu","section":"LAB6","labId":9,"start_vial":59,"Vial":68,"VialUnknown":12,"U1":10.0,"U2":7.0},{"Student Name":"Eve Lillian Null","Student ID":1060802,"Class Level":"First Year","Email":"nullel2023@mountunion.edu","section":"LAB6","labId":10,"start_vial":59,"Vial":69,"VialUnknown":13,"U1":7.0,"U2":9.0},{"Student Name":"Eleanor Marie Pace","Student ID":1060924,"Class Level":"First Year","Email":"paceem2023@mountunion.edu","section":"LAB6","labId":11,"start_vial":59,"Vial":70,"VialUnknown":14,"U1":12.0,"U2":9.0},{"Student Name":"Ryann Elizabeth Snider","Student ID":1059682,"Class Level":"First Year","Email":"sniderre2023@mountunion.edu","section":"LAB6","labId":12,"start_vial":59,"Vial":71,"VialUnknown":1,"U1":7.0,"U2":4.0},{"Student Name":"Chloe Stack","Student ID":1057867,"Class Level":"Sophomore","Email":"stackch2022@mountunion.edu","section":"LAB6","labId":13,"start_vial":59,"Vial":72,"VialUnknown":2,"U1":4.0,"U2":12.0},{"Student Name":"Nina J. Veldt","Student ID":1055258,"Class Level":"Sophomore","Email":"veldtnj2022@mountunion.edu","section":"LAB6","labId":14,"start_vial":59,"Vial":73,"VialUnknown":3,"U1":7.0,"U2":11.0},{"Student Name":"Morgan Elise Cooney","Student ID":1060198,"Class Level":"First Year","Email":"cooneyme2023@mountunion.edu","section":"LAB2","labId":0,"start_vial":10,"Vial":10,"VialUnknown":10,"U1":4.0,"U2":9.0},{"Student Name":"Kaitlyn Alyse Culver","Student ID":1057819,"Class Level":"Sophomore","Email":"culverka2022@mountunion.edu","section":"LAB2","labId":1,"start_vial":10,"Vial":11,"VialUnknown":11,"U1":9.0,"U2":4.0},{"Student Name":"Grace Marie Fabry","Student ID":1059596,"Class Level":"First Year","Email":"fabrygm2023@mountunion.edu","section":"LAB2","labId":2,"start_vial":10,"Vial":12,"VialUnknown":12,"U1":6.0,"U2":10.0},{"Student Name":"Brycen Stephen Fox","Student ID":1060855,"Class Level":"First Year","Email":"foxbs2023@mountunion.edu","section":"LAB2","labId":3,"start_vial":10,"Vial":13,"VialUnknown":13,"U1":1.0,"U2":2.0},{"Student Name":"Kenna Conlan Johnston","Student ID":1050365,"Class Level":"Junior","Email":"johnstkc2021@mountunion.edu","section":"LAB2","labId":4,"start_vial":10,"Vial":14,"VialUnknown":14,"U1":1.0,"U2":4.0},{"Student Name":"Ayden Kaj Siab Lee","Student ID":1061840,"Class Level":"First Year","Email":"leeak2023@mountunion.edu","section":"LAB2","labId":5,"start_vial":10,"Vial":15,"VialUnknown":1,"U1":6.0,"U2":10.0},{"Student Name":"Jarrod Mays","Student ID":1059994,"Class Level":"First Year","Email":"maysja2023@mountunion.edu","section":"LAB2","labId":6,"start_vial":10,"Vial":16,"VialUnknown":2,"U1":8.0,"U2":10.0},{"Student Name":"Kenneth Robert Moinette","Student ID":1061086,"Class Level":"First Year","Email":"moinetkr2023@mountunion.edu","section":"LAB2","labId":7,"start_vial":10,"Vial":17,"VialUnknown":3,"U1":5.0,"U2":12.0},{"Student Name":"Brian T. Myers","Student ID":1060070,"Class Level":"First Year","Email":"myersbt2023@mountunion.edu","section":"LAB2","labId":8,"start_vial":10,"Vial":18,"VialUnknown":4,"U1":1.0,"U2":6.0},{"Student Name":"Rhiannon Phillips","Student ID":790875,"Class Level":"First Year","Email":"phillir2023@mountunion.edu","section":"LAB2","labId":9,"start_vial":10,"Vial":19,"VialUnknown":5,"U1":4.0,"U2":10.0},{"Student Name":"Hannah Royer","Student ID":1060239,"Class Level":"First Year","Email":"royerha2023@mountunion.edu","section":"LAB2","labId":10,"start_vial":10,"Vial":20,"VialUnknown":6,"U1":8.0,"U2":4.0},{"Student Name":"Bailey Helena Serevicz","Student ID":1059765,"Class Level":"First Year","Email":"serevibh2023@mountunion.edu","section":"LAB2","labId":11,"start_vial":10,"Vial":21,"VialUnknown":7,"U1":11.0,"U2":1.0},{"Student Name":"Grace Ann Tosenberger","Student ID":1061645,"Class Level":"First Year","Email":"tosenbga2023@mountunion.edu","section":"LAB2","labId":12,"start_vial":10,"Vial":22,"VialUnknown":8,"U1":7.0,"U2":13.0},{"Student Name":"Lizzie Catherine Troup","Student ID":1059615,"Class Level":"First Year","Email":"troupec2023@mountunion.edu","section":"LAB2","labId":13,"start_vial":10,"Vial":23,"VialUnknown":9,"U1":7.0,"U2":4.0},{"Student Name":"Emily Renee Valuska","Student ID":1060996,"Class Level":"First Year","Email":"valusker2023@mountunion.edu","section":"LAB2","labId":14,"start_vial":10,"Vial":24,"VialUnknown":10,"U1":6.0,"U2":2.0},{"Student Name":"Frank Elton Washburn","Student ID":1059689,"Class Level":"First Year","Email":"washbufe2023@mountunion.edu","section":"LAB2","labId":15,"start_vial":10,"Vial":25,"VialUnknown":11,"U1":3.0,"U2":6.0}];

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-24sp");
    let formData = new FormData(myForm);
    const mySection = formData.get('sectionInput')
    // Email should be all lowercase
    const myEmail = formData.get('emailInput').toLowerCase();
    document.getElementById("emailInput").value = myEmail;
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