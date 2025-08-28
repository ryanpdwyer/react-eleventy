
// import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Olivia Laine Bardeschewski","Email":"bardesol2025@mountunion.edu","section":"LAB1","labId":0,"Vial":1,"U1":13.0,"U2":9.0,"VialUnknownLetter":"A","U1Letter":"M","U2Letter":"I"},{"Student Name":"Logan Allen Butcher","Email":"butchela2024@mountunion.edu","section":"LAB1","labId":1,"Vial":2,"U1":7.0,"U2":5.0,"VialUnknownLetter":"B","U1Letter":"G","U2Letter":"E"},{"Student Name":"Samantha Rae Cantrell","Email":"cantresr2024@mountunion.edu","section":"LAB1","labId":2,"Vial":3,"U1":8.0,"U2":6.0,"VialUnknownLetter":"C","U1Letter":"H","U2Letter":"F"},{"Student Name":"Caleb Carney","Email":"carneyca2024@mountunion.edu","section":"LAB1","labId":3,"Vial":4,"U1":14.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"N","U2Letter":"K"},{"Student Name":"Renee Elisabeth Cicco","Email":"ciccore2025@mountunion.edu","section":"LAB1","labId":4,"Vial":5,"U1":10.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"J","U2Letter":"C"},{"Student Name":"Hannah Mae Conley","Email":"conleyhm2024@mountunion.edu","section":"LAB1","labId":5,"Vial":6,"U1":12.0,"U2":9.0,"VialUnknownLetter":"F","U1Letter":"L","U2Letter":"I"},{"Student Name":"Annabelle Kaye Goodwin","Email":"goodwiak2024@mountunion.edu","section":"LAB1","labId":6,"Vial":7,"U1":5.0,"U2":13.0,"VialUnknownLetter":"G","U1Letter":"E","U2Letter":"M"},{"Student Name":"Sophie Elizabeth Graves","Email":"gravesse2024@mountunion.edu","section":"LAB1","labId":7,"Vial":8,"U1":2.0,"U2":6.0,"VialUnknownLetter":"H","U1Letter":"B","U2Letter":"F"},{"Student Name":"Lilly Kekic","Email":"kekicli2024@mountunion.edu","section":"LAB1","labId":8,"Vial":9,"U1":14.0,"U2":1.0,"VialUnknownLetter":"I","U1Letter":"N","U2Letter":"A"},{"Student Name":"Austin S. Mariani","Email":"marianas2025@mountunion.edu","section":"LAB1","labId":9,"Vial":10,"U1":4.0,"U2":5.0,"VialUnknownLetter":"J","U1Letter":"D","U2Letter":"E"},{"Student Name":"Ella Rose McElwee","Email":"mcelweer2024@mountunion.edu","section":"LAB1","labId":10,"Vial":11,"U1":3.0,"U2":6.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"F"},{"Student Name":"Daniel Matthew Noronha","Email":"noronhdm2024@mountunion.edu","section":"LAB1","labId":11,"Vial":12,"U1":2.0,"U2":14.0,"VialUnknownLetter":"L","U1Letter":"B","U2Letter":"N"},{"Student Name":"Brooklyn Michelle Patrick","Email":"patricbm2025@mountunion.edu","section":"LAB1","labId":12,"Vial":13,"U1":5.0,"U2":1.0,"VialUnknownLetter":"M","U1Letter":"E","U2Letter":"A"},{"Student Name":"Lily Grace Polk","Email":"polklg2024@mountunion.edu","section":"LAB1","labId":13,"Vial":14,"U1":4.0,"U2":7.0,"VialUnknownLetter":"N","U1Letter":"D","U2Letter":"G"},{"Student Name":"Isaac Anthony Sager","Email":"sageria2025@mountunion.edu","section":"LAB1","labId":14,"Vial":15,"U1":6.0,"U2":8.0,"VialUnknownLetter":"A","U1Letter":"F","U2Letter":"H"},{"Student Name":"Daniel John Tome III","Email":"tomeidj2024@mountunion.edu","section":"LAB1","labId":15,"Vial":16,"U1":11.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"K","U2Letter":"N"},{"Student Name":"Jake Whiteley","Email":"whitelja2024@mountunion.edu","section":"LAB1","labId":16,"Vial":17,"U1":10.0,"U2":12.0,"VialUnknownLetter":"C","U1Letter":"J","U2Letter":"L"},{"Student Name":"Natalie Will","Email":"willna2024@mountunion.edu","section":"LAB1","labId":17,"Vial":18,"U1":13.0,"U2":5.0,"VialUnknownLetter":"D","U1Letter":"M","U2Letter":"E"},{"Student Name":"Raymond Jeffery Cleveland","Email":"clevelrj2024@mountunion.edu","section":"LAB2","labId":0,"Vial":19,"U1":9.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"I","U2Letter":"C"},{"Student Name":"Zachary James Davis","Email":"daviszj2025@mountunion.edu","section":"LAB2","labId":1,"Vial":20,"U1":7.0,"U2":11.0,"VialUnknownLetter":"F","U1Letter":"G","U2Letter":"K"},{"Student Name":"Grant Spencer Dawson","Email":"dawsongs2025@mountunion.edu","section":"LAB2","labId":2,"Vial":21,"U1":6.0,"U2":2.0,"VialUnknownLetter":"G","U1Letter":"F","U2Letter":"B"},{"Student Name":"Ben Clark Dria","Email":"driabc2025@mountunion.edu","section":"LAB2","labId":3,"Vial":22,"U1":14.0,"U2":12.0,"VialUnknownLetter":"H","U1Letter":"N","U2Letter":"L"},{"Student Name":"Reese Hannah Fuenfstueck","Email":"fuenfsrh2024@mountunion.edu","section":"LAB2","labId":4,"Vial":23,"U1":1.0,"U2":13.0,"VialUnknownLetter":"I","U1Letter":"A","U2Letter":"M"},{"Student Name":"Shawn Micheal German","Email":"germansm2025@mountunion.edu","section":"LAB2","labId":5,"Vial":24,"U1":5.0,"U2":4.0,"VialUnknownLetter":"J","U1Letter":"E","U2Letter":"D"},{"Student Name":"Parker Adam Jenks","Email":"jenkspa2025@mountunion.edu","section":"LAB2","labId":6,"Vial":25,"U1":8.0,"U2":3.0,"VialUnknownLetter":"K","U1Letter":"H","U2Letter":"C"},{"Student Name":"Jaxon David Lane","Email":"lanejd2025@mountunion.edu","section":"LAB2","labId":7,"Vial":26,"U1":10.0,"U2":2.0,"VialUnknownLetter":"L","U1Letter":"J","U2Letter":"B"},{"Student Name":"Sara Ann McCoy","Email":"mccoysa2024@mountunion.edu","section":"LAB2","labId":8,"Vial":27,"U1":9.0,"U2":6.0,"VialUnknownLetter":"M","U1Letter":"I","U2Letter":"F"},{"Student Name":"Hunter Thomas Powers","Email":"powersht2025@mountunion.edu","section":"LAB2","labId":9,"Vial":28,"U1":7.0,"U2":11.0,"VialUnknownLetter":"N","U1Letter":"G","U2Letter":"K"},{"Student Name":"Connell Evan Rafferty","Email":"rafferce2025@mountunion.edu","section":"LAB2","labId":10,"Vial":29,"U1":8.0,"U2":12.0,"VialUnknownLetter":"A","U1Letter":"H","U2Letter":"L"},{"Student Name":"Ryen Aspen Romigh","Email":"romighra2025@mountunion.edu","section":"LAB2","labId":11,"Vial":30,"U1":10.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"J","U2Letter":"N"},{"Student Name":"Ian Sherer","Email":"shereria2023@mountunion.edu","section":"LAB2","labId":12,"Vial":31,"U1":9.0,"U2":13.0,"VialUnknownLetter":"C","U1Letter":"I","U2Letter":"M"},{"Student Name":"Mya James Skarlinsky","Email":"skarlimj2024@mountunion.edu","section":"LAB2","labId":13,"Vial":32,"U1":7.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"G","U2Letter":"K"},{"Student Name":"Simon Nasrin Studer","Email":"studersn2025@mountunion.edu","section":"LAB2","labId":14,"Vial":33,"U1":8.0,"U2":1.0,"VialUnknownLetter":"E","U1Letter":"H","U2Letter":"A"},{"Student Name":"Davit Zardiashvili","Email":"zardiada2024@mountunion.edu","section":"LAB2","labId":15,"Vial":34,"U1":12.0,"U2":4.0,"VialUnknownLetter":"F","U1Letter":"L","U2Letter":"D"},{"Student Name":"Edwin J. Baldwin IV","Email":"baldwiej2025@mountunion.edu","section":"LAB3","labId":0,"Vial":35,"U1":5.0,"U2":3.0,"VialUnknownLetter":"G","U1Letter":"E","U2Letter":"C"},{"Student Name":"Logan Eric Bass","Email":"bassle2025@mountunion.edu","section":"LAB3","labId":1,"Vial":36,"U1":13.0,"U2":2.0,"VialUnknownLetter":"H","U1Letter":"M","U2Letter":"B"},{"Student Name":"Anthony James Bruce","Email":"bruceaj2024@mountunion.edu","section":"LAB3","labId":2,"Vial":37,"U1":6.0,"U2":1.0,"VialUnknownLetter":"I","U1Letter":"F","U2Letter":"A"},{"Student Name":"Vincent Lee Crane","Email":"cranevl2025@mountunion.edu","section":"LAB3","labId":3,"Vial":38,"U1":11.0,"U2":14.0,"VialUnknownLetter":"J","U1Letter":"K","U2Letter":"N"},{"Student Name":"Ashlyn Rose Fryman","Email":"frymanar2025@mountunion.edu","section":"LAB3","labId":4,"Vial":39,"U1":10.0,"U2":4.0,"VialUnknownLetter":"K","U1Letter":"J","U2Letter":"D"},{"Student Name":"Christian Tyree Glenn","Email":"glennct2025@mountunion.edu","section":"LAB3","labId":5,"Vial":40,"U1":3.0,"U2":9.0,"VialUnknownLetter":"L","U1Letter":"C","U2Letter":"I"},{"Student Name":"Noah Hodge","Email":"hodgeno2025@mountunion.edu","section":"LAB3","labId":6,"Vial":41,"U1":5.0,"U2":7.0,"VialUnknownLetter":"M","U1Letter":"E","U2Letter":"G"},{"Student Name":"Levent David Kaynarca","Email":"kaynarld2025@mountunion.edu","section":"LAB3","labId":7,"Vial":42,"U1":8.0,"U2":12.0,"VialUnknownLetter":"N","U1Letter":"H","U2Letter":"L"},{"Student Name":"Antonio Lamotta","Email":"lamottan2025@mountunion.edu","section":"LAB3","labId":8,"Vial":43,"U1":13.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"M","U2Letter":"F"},{"Student Name":"Trent Joseph Milliner","Email":"millintj2025@mountunion.edu","section":"LAB3","labId":9,"Vial":44,"U1":14.0,"U2":11.0,"VialUnknownLetter":"B","U1Letter":"N","U2Letter":"K"},{"Student Name":"Annette Elizabeth Oberhauser","Email":"oberhaae2025@mountunion.edu","section":"LAB3","labId":10,"Vial":45,"U1":5.0,"U2":12.0,"VialUnknownLetter":"C","U1Letter":"E","U2Letter":"L"},{"Student Name":"Luke Anthony Starkey","Email":"starkela2025@mountunion.edu","section":"LAB3","labId":11,"Vial":46,"U1":6.0,"U2":13.0,"VialUnknownLetter":"D","U1Letter":"F","U2Letter":"M"},{"Student Name":"Mason Tulenson","Email":"tulensnc2025@mountunion.edu","section":"LAB3","labId":12,"Vial":47,"U1":11.0,"U2":10.0,"VialUnknownLetter":"E","U1Letter":"K","U2Letter":"J"},{"Student Name":"Ayodele Ekileka Adigun","Email":"adigunae2025@mountunion.edu","section":"LAB4","labId":0,"Vial":48,"U1":9.0,"U2":2.0,"VialUnknownLetter":"F","U1Letter":"I","U2Letter":"B"},{"Student Name":"Alec William Brodbeck","Email":"brodbeaw2025@mountunion.edu","section":"LAB4","labId":1,"Vial":49,"U1":14.0,"U2":12.0,"VialUnknownLetter":"G","U1Letter":"N","U2Letter":"L"},{"Student Name":"Elijah Daley","Email":"daleyel2024@mountunion.edu","section":"LAB4","labId":2,"Vial":50,"U1":1.0,"U2":13.0,"VialUnknownLetter":"H","U1Letter":"A","U2Letter":"M"},{"Student Name":"Blaise Benjamin Donatelli","Email":"donatebb2025@mountunion.edu","section":"LAB4","labId":3,"Vial":51,"U1":5.0,"U2":11.0,"VialUnknownLetter":"I","U1Letter":"E","U2Letter":"K"},{"Student Name":"Dustin Ozborne Edwards","Email":"edwarddo2025@mountunion.edu","section":"LAB4","labId":4,"Vial":52,"U1":4.0,"U2":12.0,"VialUnknownLetter":"J","U1Letter":"D","U2Letter":"L"},{"Student Name":"Andrew Michael Gray","Email":"grayam2025@mountunion.edu","section":"LAB4","labId":5,"Vial":53,"U1":3.0,"U2":7.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"G"},{"Student Name":"Emily Grace Hawrylak","Email":"hawryleg2025@mountunion.edu","section":"LAB4","labId":6,"Vial":54,"U1":2.0,"U2":8.0,"VialUnknownLetter":"L","U1Letter":"B","U2Letter":"H"},{"Student Name":"Josh David Jenkins","Email":"jenkinjd2024@mountunion.edu","section":"LAB4","labId":7,"Vial":55,"U1":1.0,"U2":10.0,"VialUnknownLetter":"M","U1Letter":"A","U2Letter":"J"},{"Student Name":"Ilani Renee Jones-Wallace","Email":"jonesir2024@mountunion.edu","section":"LAB4","labId":8,"Vial":56,"U1":4.0,"U2":13.0,"VialUnknownLetter":"N","U1Letter":"D","U2Letter":"M"},{"Student Name":"Tanner Jonathan Lebo","Email":"lebotj2025@mountunion.edu","section":"LAB4","labId":9,"Vial":57,"U1":11.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"K","U2Letter":"F"},{"Student Name":"Carson Scott Long","Email":"longcs2025@mountunion.edu","section":"LAB4","labId":10,"Vial":58,"U1":12.0,"U2":9.0,"VialUnknownLetter":"B","U1Letter":"L","U2Letter":"I"},{"Student Name":"Naomi Marie Jean McCreery","Email":"mccreenm2024@mountunion.edu","section":"LAB4","labId":11,"Vial":59,"U1":14.0,"U2":13.0,"VialUnknownLetter":"C","U1Letter":"N","U2Letter":"M"},{"Student Name":"Hunter Allen McKenzie","Email":"mckenzha2024@mountunion.edu","section":"LAB4","labId":12,"Vial":60,"U1":5.0,"U2":11.0,"VialUnknownLetter":"D","U1Letter":"E","U2Letter":"K"},{"Student Name":"Cayden Michael Monk","Email":"monkcm2024@mountunion.edu","section":"LAB4","labId":13,"Vial":61,"U1":7.0,"U2":3.0,"VialUnknownLetter":"E","U1Letter":"G","U2Letter":"C"},{"Student Name":"Markalla Ariel Tumbry","Email":"tumbryma2024@mountunion.edu","section":"LAB4","labId":14,"Vial":62,"U1":8.0,"U2":2.0,"VialUnknownLetter":"F","U1Letter":"H","U2Letter":"B"},{"Student Name":"Dylan Wang","Email":"wangdy2024@mountunion.edu","section":"LAB4","labId":15,"Vial":63,"U1":6.0,"U2":12.0,"VialUnknownLetter":"G","U1Letter":"F","U2Letter":"L"},{"Student Name":"Rachel Christine Washburn","Email":"washburc2025@mountunion.edu","section":"LAB4","labId":16,"Vial":64,"U1":14.0,"U2":13.0,"VialUnknownLetter":"H","U1Letter":"N","U2Letter":"M"},{"Student Name":"Quincy Tinotenda Zvomuya","Email":"zvomuyqt2025@mountunion.edu","section":"LAB4","labId":17,"Vial":65,"U1":1.0,"U2":11.0,"VialUnknownLetter":"I","U1Letter":"A","U2Letter":"K"},{"Student Name":"Nawaf Mansour M Alzuhufi","Email":"alzuhunm2025@mountunion.edu","section":"LAB5","labId":0,"Vial":66,"U1":5.0,"U2":4.0,"VialUnknownLetter":"J","U1Letter":"E","U2Letter":"D"},{"Student Name":"Nate Scott Campbell","Email":"campbens2025@mountunion.edu","section":"LAB5","labId":1,"Vial":67,"U1":3.0,"U2":6.0,"VialUnknownLetter":"K","U1Letter":"C","U2Letter":"F"},{"Student Name":"Daniel Claxton","Email":"claxtoda2023@mountunion.edu","section":"LAB5","labId":2,"Vial":68,"U1":14.0,"U2":10.0,"VialUnknownLetter":"L","U1Letter":"N","U2Letter":"J"},{"Student Name":"Zoey Alexys Devore","Email":"devoreza2025@mountunion.edu","section":"LAB5","labId":3,"Vial":69,"U1":9.0,"U2":5.0,"VialUnknownLetter":"M","U1Letter":"I","U2Letter":"E"},{"Student Name":"Leah Sidney Dinofrio","Email":"dinofrls2023@mountunion.edu","section":"LAB5","labId":4,"Vial":70,"U1":2.0,"U2":12.0,"VialUnknownLetter":"N","U1Letter":"B","U2Letter":"L"},{"Student Name":"Carter Evans","Email":"evansca2024@mountunion.edu","section":"LAB5","labId":5,"Vial":71,"U1":7.0,"U2":6.0,"VialUnknownLetter":"A","U1Letter":"G","U2Letter":"F"},{"Student Name":"Abbie Anne Gayner","Email":"gayneraa2024@mountunion.edu","section":"LAB5","labId":6,"Vial":72,"U1":13.0,"U2":14.0,"VialUnknownLetter":"B","U1Letter":"M","U2Letter":"N"},{"Student Name":"Jake Brooks Harper","Email":"harperjb2025@mountunion.edu","section":"LAB5","labId":7,"Vial":73,"U1":8.0,"U2":5.0,"VialUnknownLetter":"C","U1Letter":"H","U2Letter":"E"},{"Student Name":"Andrew Jesus Holmes","Email":"holmesaj2025@mountunion.edu","section":"LAB5","labId":8,"Vial":74,"U1":11.0,"U2":6.0,"VialUnknownLetter":"D","U1Letter":"K","U2Letter":"F"},{"Student Name":"Bryan Michael Konen","Email":"konenbm2024@mountunion.edu","section":"LAB5","labId":9,"Vial":75,"U1":1.0,"U2":12.0,"VialUnknownLetter":"E","U1Letter":"A","U2Letter":"L"},{"Student Name":"Sarah McKenzie Magyar","Email":"magyarsm2024@mountunion.edu","section":"LAB5","labId":10,"Vial":76,"U1":13.0,"U2":10.0,"VialUnknownLetter":"F","U1Letter":"M","U2Letter":"J"},{"Student Name":"Riley Hoyt Mjolnir","Email":"mjolnirh2025@mountunion.edu","section":"LAB5","labId":11,"Vial":77,"U1":14.0,"U2":4.0,"VialUnknownLetter":"G","U1Letter":"N","U2Letter":"D"},{"Student Name":"Allison Jae Ott","Email":"ottaj2025@mountunion.edu","section":"LAB5","labId":12,"Vial":78,"U1":3.0,"U2":5.0,"VialUnknownLetter":"H","U1Letter":"C","U2Letter":"E"},{"Student Name":"Gabby Profusz","Email":"profusga2025@mountunion.edu","section":"LAB5","labId":13,"Vial":79,"U1":6.0,"U2":2.0,"VialUnknownLetter":"I","U1Letter":"F","U2Letter":"B"},{"Student Name":"Hudson Paul Rice","Email":"ricehp2024@mountunion.edu","section":"LAB5","labId":14,"Vial":80,"U1":11.0,"U2":1.0,"VialUnknownLetter":"J","U1Letter":"K","U2Letter":"A"},{"Student Name":"Willow June Roberts","Email":"robertwj2025@mountunion.edu","section":"LAB5","labId":15,"Vial":81,"U1":9.0,"U2":4.0,"VialUnknownLetter":"K","U1Letter":"I","U2Letter":"D"},{"Student Name":"Stacey Winters Solomon","Email":"solomosw2024@mountunion.edu","section":"LAB5","labId":16,"Vial":82,"U1":7.0,"U2":3.0,"VialUnknownLetter":"L","U1Letter":"G","U2Letter":"C"},{"Student Name":"Lexi Renee Anne Terrano","Email":"terranlr2025@mountunion.edu","section":"LAB5","labId":17,"Vial":83,"U1":2.0,"U2":8.0,"VialUnknownLetter":"M","U1Letter":"B","U2Letter":"H"}]

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-25fa");
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
  .getElementById("120-water-25fa")
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
            pages[i*2].drawText(`2025 ${name} ${vial}B IR`, {size: fontSize, y: yPos});
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