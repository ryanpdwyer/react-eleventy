
// import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Julia Marie Armogida","Student ID":1060421,"Class Level":"Sophomore","Email":"armogijm2023@mountunion.edu","section":"LAB6","labId":0,"start_vial":40,"Vial":40,"VialUnknown":12,"U1":7.0,"U2":14.0},{"Student Name":"Eleanore Louise Busch","Student ID":1060465,"Class Level":"Sophomore","Email":"buschel2023@mountunion.edu","section":"LAB6","labId":1,"start_vial":40,"Vial":41,"VialUnknown":13,"U1":5.0,"U2":12.0},{"Student Name":"Jahvian A. Cundiff","Student ID":1063159,"Class Level":"First Year","Email":"cundifja2023@mountunion.edu","section":"LAB6","labId":2,"start_vial":40,"Vial":42,"VialUnknown":14,"U1":9.0,"U2":5.0},{"Student Name":"Callie Dawn Cyrus","Student ID":1064985,"Class Level":"First Year","Email":"cyruscd2024@mountunion.edu","section":"LAB6","labId":3,"start_vial":40,"Vial":43,"VialUnknown":1,"U1":2.0,"U2":6.0},{"Student Name":"Evan Christopher Liette","Student ID":1065151,"Class Level":"First Year","Email":"lietteec2024@mountunion.edu","section":"LAB6","labId":4,"start_vial":40,"Vial":44,"VialUnknown":2,"U1":3.0,"U2":4.0},{"Student Name":"Gracy Lynn Martin","Student ID":1065815,"Class Level":"First Year","Email":"martingl2024@mountunion.edu","section":"LAB6","labId":5,"start_vial":40,"Vial":45,"VialUnknown":3,"U1":7.0,"U2":1.0},{"Student Name":"Molly Therese McKee","Student ID":1060193,"Class Level":"Sophomore","Email":"mckeemt2023@mountunion.edu","section":"LAB6","labId":6,"start_vial":40,"Vial":46,"VialUnknown":4,"U1":14.0,"U2":7.0},{"Student Name":"Ally Brooke Metzger","Student ID":1065146,"Class Level":"First Year","Email":"metzgeab2024@mountunion.edu","section":"LAB6","labId":7,"start_vial":40,"Vial":47,"VialUnknown":5,"U1":4.0,"U2":7.0},{"Student Name":"Olivia Fay Ramming","Student ID":1060634,"Class Level":"Sophomore","Email":"ramminof2023@mountunion.edu","section":"LAB6","labId":8,"start_vial":40,"Vial":48,"VialUnknown":6,"U1":13.0,"U2":9.0},{"Student Name":"Sly Cotton Sundown","Student ID":1061933,"Class Level":"Sophomore","Email":"sundowsc2023@mountunion.edu","section":"LAB6","labId":9,"start_vial":40,"Vial":49,"VialUnknown":7,"U1":9.0,"U2":5.0},{"Student Name":"Jazmin L. Torres Romero","Student ID":1066127,"Class Level":"First Year","Email":"torresjl2024@mountunion.edu","section":"LAB6","labId":10,"start_vial":40,"Vial":50,"VialUnknown":8,"U1":3.0,"U2":1.0},{"Student Name":"Jaime Velasquez Ortiz","Student ID":1066481,"Class Level":"First Year","Email":"velasqja2024@mountunion.edu","section":"LAB6","labId":11,"start_vial":40,"Vial":51,"VialUnknown":9,"U1":12.0,"U2":10.0},{"Student Name":"Dom Cruz","Student ID":1065704,"Class Level":"First Year","Email":"cruzdo2024@mountunion.edu","section":"LAB3","labId":0,"start_vial":13,"Vial":13,"VialUnknown":13,"U1":9.0,"U2":11.0},{"Student Name":"Ilani Renee Jones-Wallace","Student ID":1066611,"Class Level":"First Year","Email":"jonesir2024@mountunion.edu","section":"LAB3","labId":1,"start_vial":13,"Vial":14,"VialUnknown":14,"U1":5.0,"U2":10.0},{"Student Name":"Trevor Lake","Student ID":1066433,"Class Level":"First Year","Email":"laketr2024@mountunion.edu","section":"LAB3","labId":2,"start_vial":13,"Vial":15,"VialUnknown":1,"U1":2.0,"U2":11.0},{"Student Name":"Madison Mann","Student ID":1060711,"Class Level":"Sophomore","Email":"mannma2023@mountunion.edu","section":"LAB3","labId":3,"start_vial":13,"Vial":16,"VialUnknown":2,"U1":4.0,"U2":14.0},{"Student Name":"Ethan Michael Ragon","Student ID":1061235,"Class Level":"Sophomore","Email":"ragonem2023@mountunion.edu","section":"LAB3","labId":4,"start_vial":13,"Vial":17,"VialUnknown":3,"U1":8.0,"U2":1.0},{"Student Name":"Ruby Claire Robatin","Student ID":1060610,"Class Level":"Sophomore","Email":"robatirc2023@mountunion.edu","section":"LAB3","labId":5,"start_vial":13,"Vial":18,"VialUnknown":4,"U1":2.0,"U2":5.0},{"Student Name":"Dani Rossero","Student ID":1064427,"Class Level":"First Year","Email":"rosserda2024@mountunion.edu","section":"LAB3","labId":6,"start_vial":13,"Vial":19,"VialUnknown":5,"U1":6.0,"U2":2.0},{"Student Name":"Lily Scott","Student ID":1063829,"Class Level":"First Year","Email":"scottli2024@mountunion.edu","section":"LAB3","labId":7,"start_vial":13,"Vial":20,"VialUnknown":6,"U1":14.0,"U2":10.0},{"Student Name":"Izzie Dawn Snyder","Student ID":1061146,"Class Level":"Senior","Email":"snydered2023@mountunion.edu","section":"LAB3","labId":8,"start_vial":13,"Vial":21,"VialUnknown":7,"U1":10.0,"U2":1.0},{"Student Name":"Wendy Elizabeth Veit","Student ID":1065193,"Class Level":"First Year","Email":"veitwe2024@mountunion.edu","section":"LAB3","labId":9,"start_vial":13,"Vial":22,"VialUnknown":8,"U1":3.0,"U2":14.0},{"Student Name":"Ahmed Loay Alzoubi","Student ID":1054809,"Class Level":"Junior","Email":"alzoubah2021@mountunion.edu","section":"LAB7","labId":0,"start_vial":52,"Vial":52,"VialUnknown":10,"U1":12.0,"U2":14.0},{"Student Name":"Kaitlyn Ann Bondoni","Student ID":1056005,"Class Level":"Sophomore","Email":"bondonka2023@mountunion.edu","section":"LAB7","labId":1,"start_vial":52,"Vial":53,"VialUnknown":11,"U1":13.0,"U2":5.0},{"Student Name":"Jozie L. Cobb","Student ID":1066579,"Class Level":"First Year","Email":"cobbjl2024@mountunion.edu","section":"LAB7","labId":2,"start_vial":52,"Vial":54,"VialUnknown":12,"U1":3.0,"U2":1.0},{"Student Name":"Kaylee Kunes","Student ID":1068114,"Class Level":"Sophomore","Email":"kuneska2024@mountunion.edu","section":"LAB7","labId":3,"start_vial":52,"Vial":55,"VialUnknown":13,"U1":5.0,"U2":6.0},{"Student Name":"Riley Olivia Meister","Student ID":1059576,"Class Level":"Junior","Email":"meistero2023@mountunion.edu","section":"LAB7","labId":4,"start_vial":52,"Vial":56,"VialUnknown":14,"U1":3.0,"U2":11.0},{"Student Name":"Gabriella Emy Petrocci","Student ID":1063815,"Class Level":"First Year","Email":"petrocge2024@mountunion.edu","section":"LAB7","labId":5,"start_vial":52,"Vial":57,"VialUnknown":1,"U1":2.0,"U2":11.0},{"Student Name":"Sierra G. Schlosser","Student ID":1055581,"Class Level":"Junior","Email":"schlossg2022@mountunion.edu","section":"LAB7","labId":6,"start_vial":52,"Vial":58,"VialUnknown":2,"U1":6.0,"U2":11.0},{"Student Name":"Milo Finley Simpson","Student ID":1066347,"Class Level":"First Year","Email":"simpsomf2024@mountunion.edu","section":"LAB7","labId":7,"start_vial":52,"Vial":59,"VialUnknown":3,"U1":6.0,"U2":8.0},{"Student Name":"Drew Strickland","Student ID":1059690,"Class Level":"Sophomore","Email":"strickan2023@mountunion.edu","section":"LAB7","labId":8,"start_vial":52,"Vial":60,"VialUnknown":4,"U1":7.0,"U2":10.0},{"Student Name":"Leonardo Sebastian Vila Flores","Student ID":1070350,"Class Level":"First Year","Email":"vilafls2025@mountunion.edu","section":"LAB7","labId":9,"start_vial":52,"Vial":61,"VialUnknown":5,"U1":14.0,"U2":13.0},{"Student Name":"Emily Nicole Wentz","Student ID":1064411,"Class Level":"First Year","Email":"wentzen2024@mountunion.edu","section":"LAB7","labId":10,"start_vial":52,"Vial":62,"VialUnknown":6,"U1":13.0,"U2":4.0},{"Student Name":"Jada Marie Ames","Student ID":1064352,"Class Level":"First Year","Email":"amesjm2024@mountunion.edu","section":"LAB4","labId":0,"start_vial":23,"Vial":23,"VialUnknown":9,"U1":4.0,"U2":1.0},{"Student Name":"Bry Morgan Brown","Student ID":1050920,"Class Level":"First Year","Email":"brownbm2021@mountunion.edu","section":"LAB4","labId":1,"start_vial":23,"Vial":24,"VialUnknown":10,"U1":7.0,"U2":11.0},{"Student Name":"Laney Elizabeth Duff","Student ID":1060464,"Class Level":"Sophomore","Email":"duffle2023@mountunion.edu","section":"LAB4","labId":2,"start_vial":23,"Vial":25,"VialUnknown":11,"U1":1.0,"U2":4.0},{"Student Name":"Marina Jade Sanders","Student ID":1064640,"Class Level":"First Year","Email":"sandermj2024@mountunion.edu","section":"LAB4","labId":3,"start_vial":23,"Vial":26,"VialUnknown":12,"U1":4.0,"U2":11.0},{"Student Name":"Ashley Anne Tonsky","Student ID":1064915,"Class Level":"First Year","Email":"tonskyaa2024@mountunion.edu","section":"LAB4","labId":4,"start_vial":23,"Vial":27,"VialUnknown":13,"U1":4.0,"U2":2.0},{"Student Name":"Callie Marie Anderson","Student ID":1065107,"Class Level":"Junior","Email":"anderscm2024@mountunion.edu","section":"LAB2","labId":0,"start_vial":1,"Vial":1,"VialUnknown":1,"U1":9.0,"U2":12.0},{"Student Name":"Lindsey E. Bregar","Student ID":1065590,"Class Level":"First Year","Email":"bregarle2024@mountunion.edu","section":"LAB2","labId":1,"start_vial":1,"Vial":2,"VialUnknown":2,"U1":12.0,"U2":13.0},{"Student Name":"Aidan Broyles","Student ID":1065080,"Class Level":"First Year","Email":"broylera2024@mountunion.edu","section":"LAB2","labId":2,"start_vial":1,"Vial":3,"VialUnknown":3,"U1":12.0,"U2":7.0},{"Student Name":"Ashley Elizabeth Eberhardt","Student ID":1065393,"Class Level":"Sophomore","Email":"eberhaae2024@mountunion.edu","section":"LAB2","labId":3,"start_vial":1,"Vial":4,"VialUnknown":4,"U1":6.0,"U2":5.0},{"Student Name":"Enio Hoxha","Student ID":1064610,"Class Level":"First Year","Email":"hoxhaen2024@mountunion.edu","section":"LAB2","labId":4,"start_vial":1,"Vial":5,"VialUnknown":5,"U1":11.0,"U2":13.0},{"Student Name":"Cora Rae Liskai","Student ID":1064261,"Class Level":"First Year","Email":"liskaicr2024@mountunion.edu","section":"LAB2","labId":5,"start_vial":1,"Vial":6,"VialUnknown":6,"U1":1.0,"U2":9.0},{"Student Name":"Jillian Beth Lohnes","Student ID":1064074,"Class Level":"First Year","Email":"lohnesji2023@mountunion.edu","section":"LAB2","labId":6,"start_vial":1,"Vial":7,"VialUnknown":7,"U1":8.0,"U2":10.0},{"Student Name":"Brandon Matteo","Student ID":1064811,"Class Level":"First Year","Email":"matteobr2024@mountunion.edu","section":"LAB2","labId":7,"start_vial":1,"Vial":8,"VialUnknown":8,"U1":11.0,"U2":5.0},{"Student Name":"Eva Kathryn Miller","Student ID":1063010,"Class Level":"First Year","Email":"millerek2023@mountunion.edu","section":"LAB2","labId":8,"start_vial":1,"Vial":9,"VialUnknown":9,"U1":14.0,"U2":8.0},{"Student Name":"Jakob Christoph Sacher","Student ID":1065767,"Class Level":"First Year","Email":"sacherjc2024@mountunion.edu","section":"LAB2","labId":9,"start_vial":1,"Vial":10,"VialUnknown":10,"U1":4.0,"U2":1.0},{"Student Name":"Owen Silva","Student ID":1065314,"Class Level":"First Year","Email":"silvaow2024@mountunion.edu","section":"LAB2","labId":10,"start_vial":1,"Vial":11,"VialUnknown":11,"U1":7.0,"U2":13.0},{"Student Name":"Jj Sherrod Ward","Student ID":1067616,"Class Level":"First Year","Email":"wardjs2024@mountunion.edu","section":"LAB2","labId":11,"start_vial":1,"Vial":12,"VialUnknown":12,"U1":5.0,"U2":7.0},{"Student Name":"Emily Quilla Rose Ballentine","Student ID":1070651,"Class Level":"First Year","Email":"balleneq2025@mountunion.edu","section":"LAB5","labId":0,"start_vial":28,"Vial":28,"VialUnknown":14,"U1":9.0,"U2":4.0},{"Student Name":"Sutton Bercaw","Student ID":1064034,"Class Level":"First Year","Email":"bercawsu2024@mountunion.edu","section":"LAB5","labId":1,"start_vial":28,"Vial":29,"VialUnknown":1,"U1":13.0,"U2":3.0},{"Student Name":"Colden Adam Bloom","Student ID":1065719,"Class Level":"First Year","Email":"bloomca2024@mountunion.edu","section":"LAB5","labId":2,"start_vial":28,"Vial":30,"VialUnknown":2,"U1":12.0,"U2":7.0},{"Student Name":"James Jamal Chaney","Student ID":1051762,"Class Level":"Senior","Email":"chaneyjj2021@mountunion.edu","section":"LAB5","labId":3,"start_vial":28,"Vial":31,"VialUnknown":3,"U1":5.0,"U2":2.0},{"Student Name":"Alyssa Renee Dorsey","Student ID":1064865,"Class Level":"First Year","Email":"dorseyar2024@mountunion.edu","section":"LAB5","labId":4,"start_vial":28,"Vial":32,"VialUnknown":4,"U1":14.0,"U2":9.0},{"Student Name":"Dylan Riley Easterling","Student ID":1064809,"Class Level":"First Year","Email":"easterdr2024@mountunion.edu","section":"LAB5","labId":5,"start_vial":28,"Vial":33,"VialUnknown":5,"U1":12.0,"U2":9.0},{"Student Name":"Connor Lee Eckenrode","Student ID":1059144,"Class Level":"First Year","Email":"eckenrcl2022@mountunion.edu","section":"LAB5","labId":6,"start_vial":28,"Vial":34,"VialUnknown":6,"U1":14.0,"U2":8.0},{"Student Name":"Taylor Annette Forbes","Student ID":1063912,"Class Level":"First Year","Email":"forbesta2024@mountunion.edu","section":"LAB5","labId":7,"start_vial":28,"Vial":35,"VialUnknown":7,"U1":1.0,"U2":11.0},{"Student Name":"Nick A. Nolan","Student ID":1067780,"Class Level":"First Year","Email":"nolanna2024@mountunion.edu","section":"LAB5","labId":8,"start_vial":28,"Vial":36,"VialUnknown":8,"U1":6.0,"U2":14.0},{"Student Name":"Adam Schlarb","Student ID":1064363,"Class Level":"First Year","Email":"schlarad2024@mountunion.edu","section":"LAB5","labId":9,"start_vial":28,"Vial":37,"VialUnknown":9,"U1":2.0,"U2":12.0},{"Student Name":"Lizzie Sonntag","Student ID":1065246,"Class Level":"First Year","Email":"sonntael2024@mountunion.edu","section":"LAB5","labId":10,"start_vial":28,"Vial":38,"VialUnknown":10,"U1":11.0,"U2":4.0},{"Student Name":"Sarah K. Thomas","Student ID":1066883,"Class Level":"Junior","Email":"thomassk2024@mountunion.edu","section":"LAB5","labId":11,"start_vial":28,"Vial":39,"VialUnknown":11,"U1":1.0,"U2":5.0},{"Student Name":"Student A","Student ID":"X","Class Level":"X","Email":"studenta@mountunion.edu","section":"LAB9","labId":0,"start_vial":63,"Vial":63,"VialUnknown":7,"U1":10.0,"U2":4.0},{"Student Name":"Student B","Student ID":"X","Class Level":"X","Email":"studentb@mountunion.edu","section":"LAB9","labId":1,"start_vial":63,"Vial":64,"VialUnknown":8,"U1":2.0,"U2":10.0},{"Student Name":"Student C","Student ID":"X","Class Level":"X","Email":"studentc@mountunion.edu","section":"LAB9","labId":2,"start_vial":63,"Vial":65,"VialUnknown":9,"U1":12.0,"U2":5.0},{"Student Name":"Student D","Student ID":"X","Class Level":"X","Email":"studentd@mountunion.edu","section":"LAB9","labId":3,"start_vial":63,"Vial":66,"VialUnknown":10,"U1":7.0,"U2":9.0}];

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-25sp");
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
  .getElementById("120-water-25sp")
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

    let water_source = "Surface water";

    if (vial % 4 < 2) {
        water_source = "Drinking water";
    }

    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2025 ${name} ${vial}B IR. ${water_source} sample`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}B NMR. ${water_source} sample`, {size: fontSize, y: yPos});
        } else if (i === 1){
            pages[i*2].drawText(`${name} ${vial}C IR. ${water_source} sample`, {size: fontSize, y: yPos});
            pages[i*2+1].drawText(`${name} ${vial}C NMR. ${water_source} sample`, {size: fontSize, y: yPos});
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