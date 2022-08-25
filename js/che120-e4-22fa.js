
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib





// const client = new netlify.NetlifyAPI('AwXJ-jyOxtWjtbDogyY47R-kLhrVaJes4G_0ruxkAYs')



// console.log(await client.listSites());

// console.log(await client.listSiteForms({site_id: "478409f0-d08b-41a2-99c0-824b316b1b24"}))

function fetchForms() {
    return fetch("https://api.netlify.com/api/v1/forms/62fbf80c9660f800088788ce/submissions", {headers: {Authorization: "Bearer AwXJ-jyOxtWjtbDogyY47R-kLhrVaJes4G_0ruxkAYs"}});
}

// Just do this client-side...
async function getSampleId(mySection, myEmail) {

    const formSubmissions = await fetchForms().then(x => x.json()).catch(err => console.log(err));

    const formsMapped = formSubmissions.filter(x => x.data.sectionInput === mySection);
    const formEmails = formsMapped.map(x => x.data.emailInput);

    const formsUnique = Object.fromEntries(formSubmissions.filter( (x, i) => formEmails.indexOf(x.data.emailInput) === i)
                                        .map( (x, i) => [x.data.emailInput, {sample: i+1, time: x.created_at}]))

    return formsUnique[myEmail]
};

function assignSampleId(jsonData, mySection, myEmail) {

    // Needs to be in submission order (not reverse chronological...)
    const formsMapped = jsonData.sort( (x,y) => x.number < y.number)
                                .filter(x => x.data.sectionInput === mySection);
    const formEmails = formsMapped.map(x => x.data.emailInput);

    const formsUnique = Object.fromEntries(formsMapped.filter( (x, i) => formEmails.indexOf(x.data.emailInput) === i)
                                        .map( (x, i) => [x.data.emailInput, {sample: i+1 + (parseInt(mySection)-1)*18, time: x.created_at}]))

    return formsUnique[myEmail]
} 



// console.log(await client.listSites());

// console.log(await client.listSiteForms({site_id: "478409f0-d08b-41a2-99c0-824b316b1b24"}))


const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-22fa");
    let formData = new FormData(myForm);
    const mySection = formData.get('sectionInput')
    const myEmail = formData.get('emailInput');
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .then( () => {
        return fetchForms();
      })
      .then( (e) => {
        return e.json();
      })
      .then( (x) => {
        return assignSampleId(x, mySection, myEmail)
      })
      .then((y) => {
        console.log(y);
      })
      .catch((error) => alert(error));
  };

document
  .getElementById("120-water-22fa")
  .addEventListener("submit", handleSubmit);



function checkReady() {
    const sectionArray = Array.from(document.getElementsByName("sectionInput")).filter(x => x.checked);
    let section = ""
    let ready = true;
    if (sectionArray.length == 0) {
        ready = false;
    } else {
        section = sectionArray[0].value;
    }
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

function chooseUnknowns(event) {
    const unknowns = "ABCDEFGHIJKLMN".split("");
    const unknownsVal = Object.fromEntries(unknowns.map((x,i) => [x, i+1]));

    const unknownsNumbered = Object.fromEntries(unknowns.map((x, i) => [i+1, x]));

    // Need to get unknown number from netlify api call:
    const labUnknown = {sample: 3, time: "2020-04-22T20:00:00.000Z"};




    const rng = new Math.seedrandom(document.getElementById("nameInput").value+'2022'+'fall-CHE120');
    
    myUnknowns = range(0, unknowns.length-1, rng).slice(0,3).map(i=>unknowns[i]);



    document.getElementById('assignedUnknowns').style.display='block';
    
    const sampleIDs = myUnknowns.map( x => Math.floor(rng()*10000))
                                .sort()
                                .map(x=>x.toString().padStart(4, "0"));
    const unknownIDs = myUnknowns.map((x,i)=>{
        const num = unknownsVal[x];
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
    
    const pages = pdfDoc.getPages()

    const unknowns = ['1', '2', '3'].map(x=>document.getElementById(`unknown`+x).innerText)

    const inds = [0, 1, 2];
    inds.forEach(i=>{
        pages[i*2].drawText(`${name} ${unknowns[i]} IR`);
        pages[i*2+1].drawText(`${name} ${unknowns[i]} NMR`);
    });
    
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    
        // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} V4 Unknowns.pdf`, "application/pdf");
}

window.copyPages = copyPages