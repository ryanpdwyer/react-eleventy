
// import { React, ReactDOM } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Olivia Laine Bardeschewski","Student ID":1068776,"Class Level":"First Year","Email":"bardesol2025@mountunion.edu","section":"LAB1","labId":0,"start_vial":1,"Vial":1,"VialUnknown":1,"U1":13.0,"U2":10.0},{"Student Name":"Logan Allen Butcher","Student ID":1065733,"Class Level":"First Year","Email":"butchela2024@mountunion.edu","section":"LAB1","labId":1,"start_vial":1,"Vial":2,"VialUnknown":2,"U1":12.0,"U2":14.0},{"Student Name":"Samantha Rae Cantrell","Student ID":1064106,"Class Level":"First Year","Email":"cantresr2024@mountunion.edu","section":"LAB1","labId":2,"start_vial":1,"Vial":3,"VialUnknown":3,"U1":13.0,"U2":9.0},{"Student Name":"Caleb Carney","Student ID":1063884,"Class Level":"Sophomore","Email":"carneyca2024@mountunion.edu","section":"LAB1","labId":3,"start_vial":1,"Vial":4,"VialUnknown":4,"U1":10.0,"U2":6.0},{"Student Name":"Renee Elisabeth Cicco","Student ID":1070654,"Class Level":"First Year","Email":"ciccore2025@mountunion.edu","section":"LAB1","labId":4,"start_vial":1,"Vial":5,"VialUnknown":5,"U1":7.0,"U2":2.0},{"Student Name":"Hannah Mae Conley","Student ID":1064194,"Class Level":"First Year","Email":"conleyhm2024@mountunion.edu","section":"LAB1","labId":5,"start_vial":1,"Vial":6,"VialUnknown":6,"U1":10.0,"U2":13.0},{"Student Name":"Annabelle Kaye Goodwin","Student ID":1067574,"Class Level":"First Year","Email":"goodwiak2024@mountunion.edu","section":"LAB1","labId":6,"start_vial":1,"Vial":7,"VialUnknown":7,"U1":14.0,"U2":2.0},{"Student Name":"Sophie Elizabeth Graves","Student ID":1065490,"Class Level":"Sophomore","Email":"gravesse2024@mountunion.edu","section":"LAB1","labId":7,"start_vial":1,"Vial":8,"VialUnknown":8,"U1":4.0,"U2":14.0},{"Student Name":"Lilly Kekic","Student ID":1064504,"Class Level":"Sophomore","Email":"kekicli2024@mountunion.edu","section":"LAB1","labId":8,"start_vial":1,"Vial":9,"VialUnknown":9,"U1":14.0,"U2":2.0},{"Student Name":"Austin S. Mariani","Student ID":1069986,"Class Level":"First Year","Email":"marianas2025@mountunion.edu","section":"LAB1","labId":9,"start_vial":1,"Vial":10,"VialUnknown":10,"U1":2.0,"U2":5.0},{"Student Name":"Ella Rose McElwee","Student ID":1064308,"Class Level":"Sophomore","Email":"mcelweer2024@mountunion.edu","section":"LAB1","labId":10,"start_vial":1,"Vial":11,"VialUnknown":11,"U1":6.0,"U2":7.0},{"Student Name":"Daniel Matthew Noronha","Student ID":1066992,"Class Level":"First Year","Email":"noronhdm2024@mountunion.edu","section":"LAB1","labId":11,"start_vial":1,"Vial":12,"VialUnknown":12,"U1":5.0,"U2":1.0},{"Student Name":"Brooklyn Michelle Patrick","Student ID":1068910,"Class Level":"First Year","Email":"patricbm2025@mountunion.edu","section":"LAB1","labId":12,"start_vial":1,"Vial":13,"VialUnknown":13,"U1":5.0,"U2":1.0},{"Student Name":"Lily Grace Polk","Student ID":1064796,"Class Level":"Sophomore","Email":"polklg2024@mountunion.edu","section":"LAB1","labId":13,"start_vial":1,"Vial":14,"VialUnknown":14,"U1":4.0,"U2":13.0},{"Student Name":"Isaac Anthony Sager","Student ID":1068574,"Class Level":"First Year","Email":"sageria2025@mountunion.edu","section":"LAB1","labId":14,"start_vial":1,"Vial":15,"VialUnknown":1,"U1":6.0,"U2":9.0},{"Student Name":"Daniel John Tome III","Student ID":1064237,"Class Level":"First Year","Email":"tomeidj2024@mountunion.edu","section":"LAB1","labId":15,"start_vial":1,"Vial":16,"VialUnknown":2,"U1":11.0,"U2":5.0},{"Student Name":"Jake Whiteley","Student ID":1067292,"Class Level":"First Year","Email":"whitelja2024@mountunion.edu","section":"LAB1","labId":16,"start_vial":1,"Vial":17,"VialUnknown":3,"U1":7.0,"U2":13.0},{"Student Name":"Natalie Will","Student ID":1064966,"Class Level":"First Year","Email":"willna2024@mountunion.edu","section":"LAB1","labId":17,"start_vial":1,"Vial":18,"VialUnknown":4,"U1":7.0,"U2":5.0},{"Student Name":"Raymond Jeffery Cleveland","Student ID":1066881,"Class Level":"Sophomore","Email":"clevelrj2024@mountunion.edu","section":"LAB2","labId":0,"start_vial":19,"Vial":19,"VialUnknown":5,"U1":7.0,"U2":4.0},{"Student Name":"Zachary James Davis","Student ID":1070959,"Class Level":"First Year","Email":"daviszj2025@mountunion.edu","section":"LAB2","labId":1,"start_vial":19,"Vial":20,"VialUnknown":6,"U1":13.0,"U2":3.0},{"Student Name":"Grant Spencer Dawson","Student ID":1069794,"Class Level":"First Year","Email":"dawsongs2025@mountunion.edu","section":"LAB2","labId":2,"start_vial":19,"Vial":21,"VialUnknown":7,"U1":13.0,"U2":3.0},{"Student Name":"Ben Clark Dria","Student ID":1068884,"Class Level":"First Year","Email":"driabc2025@mountunion.edu","section":"LAB2","labId":3,"start_vial":19,"Vial":22,"VialUnknown":8,"U1":12.0,"U2":5.0},{"Student Name":"Reese Hannah Fuenfstueck","Student ID":1064082,"Class Level":"First Year","Email":"fuenfsrh2024@mountunion.edu","section":"LAB2","labId":4,"start_vial":19,"Vial":23,"VialUnknown":9,"U1":1.0,"U2":11.0},{"Student Name":"Shawn Micheal German","Student ID":1072090,"Class Level":"First Year","Email":"germansm2025@mountunion.edu","section":"LAB2","labId":5,"start_vial":19,"Vial":24,"VialUnknown":10,"U1":6.0,"U2":13.0},{"Student Name":"Parker Adam Jenks","Student ID":1071113,"Class Level":"First Year","Email":"jenkspa2025@mountunion.edu","section":"LAB2","labId":6,"start_vial":19,"Vial":25,"VialUnknown":11,"U1":4.0,"U2":8.0},{"Student Name":"Jaxon David Lane","Student ID":1070707,"Class Level":"First Year","Email":"lanejd2025@mountunion.edu","section":"LAB2","labId":7,"start_vial":19,"Vial":26,"VialUnknown":12,"U1":2.0,"U2":8.0},{"Student Name":"Sara Ann McCoy","Student ID":1064029,"Class Level":"Sophomore","Email":"mccoysa2024@mountunion.edu","section":"LAB2","labId":8,"start_vial":19,"Vial":27,"VialUnknown":13,"U1":10.0,"U2":14.0},{"Student Name":"Hunter Thomas Powers","Student ID":1071288,"Class Level":"First Year","Email":"powersht2025@mountunion.edu","section":"LAB2","labId":9,"start_vial":19,"Vial":28,"VialUnknown":14,"U1":7.0,"U2":12.0},{"Student Name":"Connell Evan Rafferty","Student ID":1072405,"Class Level":"First Year","Email":"rafferce2025@mountunion.edu","section":"LAB2","labId":10,"start_vial":19,"Vial":29,"VialUnknown":1,"U1":11.0,"U2":6.0},{"Student Name":"Ryen Aspen Romigh","Student ID":1068656,"Class Level":"First Year","Email":"romighra2025@mountunion.edu","section":"LAB2","labId":11,"start_vial":19,"Vial":30,"VialUnknown":2,"U1":6.0,"U2":12.0},{"Student Name":"Ian Sherer","Student ID":1064093,"Class Level":"First Year","Email":"shereria2023@mountunion.edu","section":"LAB2","labId":12,"start_vial":19,"Vial":31,"VialUnknown":3,"U1":6.0,"U2":12.0},{"Student Name":"Mya James Skarlinsky","Student ID":1065345,"Class Level":"First Year","Email":"skarlimj2024@mountunion.edu","section":"LAB2","labId":13,"start_vial":19,"Vial":32,"VialUnknown":4,"U1":11.0,"U2":6.0},{"Student Name":"Simon Nasrin Studer","Student ID":1070680,"Class Level":"First Year","Email":"studersn2025@mountunion.edu","section":"LAB2","labId":14,"start_vial":19,"Vial":33,"VialUnknown":5,"U1":4.0,"U2":12.0},{"Student Name":"Davit Zardiashvili","Student ID":1066790,"Class Level":"First Year","Email":"zardiada2024@mountunion.edu","section":"LAB2","labId":15,"start_vial":19,"Vial":34,"VialUnknown":6,"U1":13.0,"U2":3.0},{"Student Name":"Edwin J. Baldwin IV","Student ID":1070855,"Class Level":"First Year","Email":"baldwiej2025@mountunion.edu","section":"LAB3","labId":0,"start_vial":35,"Vial":35,"VialUnknown":7,"U1":11.0,"U2":14.0},{"Student Name":"Logan Eric Bass","Student ID":1069672,"Class Level":"First Year","Email":"bassle2025@mountunion.edu","section":"LAB3","labId":1,"start_vial":35,"Vial":36,"VialUnknown":8,"U1":6.0,"U2":13.0},{"Student Name":"Anthony James Bruce","Student ID":1065305,"Class Level":"First Year","Email":"bruceaj2024@mountunion.edu","section":"LAB3","labId":2,"start_vial":35,"Vial":37,"VialUnknown":9,"U1":6.0,"U2":11.0},{"Student Name":"Vincent Lee Crane","Student ID":1070513,"Class Level":"First Year","Email":"cranevl2025@mountunion.edu","section":"LAB3","labId":3,"start_vial":35,"Vial":38,"VialUnknown":10,"U1":6.0,"U2":12.0},{"Student Name":"Ashlyn Rose Fryman","Student ID":1069119,"Class Level":"First Year","Email":"frymanar2025@mountunion.edu","section":"LAB3","labId":4,"start_vial":35,"Vial":39,"VialUnknown":11,"U1":6.0,"U2":3.0},{"Student Name":"Christian Tyree Glenn","Student ID":1072010,"Class Level":"First Year","Email":"glennct2025@mountunion.edu","section":"LAB3","labId":5,"start_vial":35,"Vial":40,"VialUnknown":12,"U1":6.0,"U2":3.0},{"Student Name":"Noah Hodge","Student ID":1070495,"Class Level":"First Year","Email":"hodgeno2025@mountunion.edu","section":"LAB3","labId":6,"start_vial":35,"Vial":41,"VialUnknown":13,"U1":1.0,"U2":10.0},{"Student Name":"Levent David Kaynarca","Student ID":1069879,"Class Level":"First Year","Email":"kaynarld2025@mountunion.edu","section":"LAB3","labId":7,"start_vial":35,"Vial":42,"VialUnknown":14,"U1":10.0,"U2":3.0},{"Student Name":"Antonio Lamotta","Student ID":1071650,"Class Level":"First Year","Email":"lamottan2025@mountunion.edu","section":"LAB3","labId":8,"start_vial":35,"Vial":43,"VialUnknown":1,"U1":8.0,"U2":5.0},{"Student Name":"Trent Joseph Milliner","Student ID":1069446,"Class Level":"First Year","Email":"millintj2025@mountunion.edu","section":"LAB3","labId":9,"start_vial":35,"Vial":44,"VialUnknown":2,"U1":12.0,"U2":14.0},{"Student Name":"Annette Elizabeth Oberhauser","Student ID":1068651,"Class Level":"First Year","Email":"oberhaae2025@mountunion.edu","section":"LAB3","labId":10,"start_vial":35,"Vial":45,"VialUnknown":3,"U1":6.0,"U2":11.0},{"Student Name":"Luke Anthony Starkey","Student ID":1069478,"Class Level":"First Year","Email":"starkela2025@mountunion.edu","section":"LAB3","labId":11,"start_vial":35,"Vial":46,"VialUnknown":4,"U1":14.0,"U2":11.0},{"Student Name":"Mason Tulenson","Student ID":1069053,"Class Level":"First Year","Email":"tulensnc2025@mountunion.edu","section":"LAB3","labId":12,"start_vial":35,"Vial":47,"VialUnknown":5,"U1":12.0,"U2":1.0},{"Student Name":"Ayodele Ekileka Adigun","Student ID":1070645,"Class Level":"First Year","Email":"adigunae2025@mountunion.edu","section":"LAB4","labId":0,"start_vial":48,"Vial":48,"VialUnknown":6,"U1":11.0,"U2":9.0},{"Student Name":"Alec William Brodbeck","Student ID":1069004,"Class Level":"First Year","Email":"brodbeaw2025@mountunion.edu","section":"LAB4","labId":1,"start_vial":48,"Vial":49,"VialUnknown":7,"U1":1.0,"U2":13.0},{"Student Name":"Elijah Daley","Student ID":1066474,"Class Level":"First Year","Email":"daleyel2024@mountunion.edu","section":"LAB4","labId":2,"start_vial":48,"Vial":50,"VialUnknown":8,"U1":13.0,"U2":2.0},{"Student Name":"Blaise Benjamin Donatelli","Student ID":1070804,"Class Level":"First Year","Email":"donatebb2025@mountunion.edu","section":"LAB4","labId":3,"start_vial":48,"Vial":51,"VialUnknown":9,"U1":14.0,"U2":1.0},{"Student Name":"Dustin Ozborne Edwards","Student ID":1069814,"Class Level":"First Year","Email":"edwarddo2025@mountunion.edu","section":"LAB4","labId":4,"start_vial":48,"Vial":52,"VialUnknown":10,"U1":11.0,"U2":1.0},{"Student Name":"Andrew Michael Gray","Student ID":1069259,"Class Level":"First Year","Email":"grayam2025@mountunion.edu","section":"LAB4","labId":5,"start_vial":48,"Vial":53,"VialUnknown":11,"U1":7.0,"U2":3.0},{"Student Name":"Emily Grace Hawrylak","Student ID":1069977,"Class Level":"First Year","Email":"hawryleg2025@mountunion.edu","section":"LAB4","labId":6,"start_vial":48,"Vial":54,"VialUnknown":12,"U1":14.0,"U2":9.0},{"Student Name":"Josh David Jenkins","Student ID":1065104,"Class Level":"First Year","Email":"jenkinjd2024@mountunion.edu","section":"LAB4","labId":7,"start_vial":48,"Vial":55,"VialUnknown":13,"U1":7.0,"U2":5.0},{"Student Name":"Ilani Renee Jones-Wallace","Student ID":1066611,"Class Level":"First Year","Email":"jonesir2024@mountunion.edu","section":"LAB4","labId":8,"start_vial":48,"Vial":56,"VialUnknown":14,"U1":11.0,"U2":4.0},{"Student Name":"Tanner Jonathan Lebo","Student ID":1071078,"Class Level":"First Year","Email":"lebotj2025@mountunion.edu","section":"LAB4","labId":9,"start_vial":48,"Vial":57,"VialUnknown":1,"U1":6.0,"U2":13.0},{"Student Name":"Carson Scott Long","Student ID":1069422,"Class Level":"First Year","Email":"longcs2025@mountunion.edu","section":"LAB4","labId":10,"start_vial":48,"Vial":58,"VialUnknown":2,"U1":7.0,"U2":12.0},{"Student Name":"Naomi Marie Jean McCreery","Student ID":1065902,"Class Level":"First Year","Email":"mccreenm2024@mountunion.edu","section":"LAB4","labId":11,"start_vial":48,"Vial":59,"VialUnknown":3,"U1":12.0,"U2":14.0},{"Student Name":"Hunter Allen McKenzie","Student ID":1064752,"Class Level":"Sophomore","Email":"mckenzha2024@mountunion.edu","section":"LAB4","labId":12,"start_vial":48,"Vial":60,"VialUnknown":4,"U1":14.0,"U2":12.0},{"Student Name":"Cayden Michael Monk","Student ID":1065818,"Class Level":"Sophomore","Email":"monkcm2024@mountunion.edu","section":"LAB4","labId":13,"start_vial":48,"Vial":61,"VialUnknown":5,"U1":4.0,"U2":11.0},{"Student Name":"Markalla Ariel Tumbry","Student ID":1065270,"Class Level":"Sophomore","Email":"tumbryma2024@mountunion.edu","section":"LAB4","labId":14,"start_vial":48,"Vial":62,"VialUnknown":6,"U1":12.0,"U2":3.0},{"Student Name":"Dylan Wang","Student ID":1064860,"Class Level":"First Year","Email":"wangdy2024@mountunion.edu","section":"LAB4","labId":15,"start_vial":48,"Vial":63,"VialUnknown":7,"U1":3.0,"U2":5.0},{"Student Name":"Rachel Christine Washburn","Student ID":1070460,"Class Level":"Sophomore","Email":"washburc2025@mountunion.edu","section":"LAB4","labId":16,"start_vial":48,"Vial":64,"VialUnknown":8,"U1":11.0,"U2":3.0},{"Student Name":"Quincy Tinotenda Zvomuya","Student ID":1069368,"Class Level":"First Year","Email":"zvomuyqt2025@mountunion.edu","section":"LAB4","labId":17,"start_vial":48,"Vial":65,"VialUnknown":9,"U1":1.0,"U2":12.0},{"Student Name":"Nawaf Mansour M Alzuhufi","Student ID":1072730,"Class Level":"First Year","Email":"alzuhunm2025@mountunion.edu","section":"LAB5","labId":0,"start_vial":66,"Vial":66,"VialUnknown":10,"U1":2.0,"U2":5.0},{"Student Name":"Nate Scott Campbell","Student ID":1068799,"Class Level":"First Year","Email":"campbens2025@mountunion.edu","section":"LAB5","labId":1,"start_vial":66,"Vial":67,"VialUnknown":11,"U1":1.0,"U2":14.0},{"Student Name":"Daniel Claxton","Student ID":1063060,"Class Level":"Sophomore","Email":"claxtoda2023@mountunion.edu","section":"LAB5","labId":2,"start_vial":66,"Vial":68,"VialUnknown":12,"U1":8.0,"U2":3.0},{"Student Name":"Zoey Alexys Devore","Student ID":1068588,"Class Level":"First Year","Email":"devoreza2025@mountunion.edu","section":"LAB5","labId":3,"start_vial":66,"Vial":69,"VialUnknown":13,"U1":10.0,"U2":1.0},{"Student Name":"Leah Sidney Dinofrio","Student ID":1062973,"Class Level":"Junior","Email":"dinofrls2023@mountunion.edu","section":"LAB5","labId":4,"start_vial":66,"Vial":70,"VialUnknown":14,"U1":3.0,"U2":12.0},{"Student Name":"Carter Evans","Student ID":1065676,"Class Level":"First Year","Email":"evansca2024@mountunion.edu","section":"LAB5","labId":5,"start_vial":66,"Vial":71,"VialUnknown":1,"U1":6.0,"U2":13.0},{"Student Name":"Abbie Anne Gayner","Student ID":1067369,"Class Level":"Junior","Email":"gayneraa2024@mountunion.edu","section":"LAB5","labId":6,"start_vial":66,"Vial":72,"VialUnknown":2,"U1":14.0,"U2":12.0},{"Student Name":"Jake Brooks Harper","Student ID":1070721,"Class Level":"First Year","Email":"harperjb2025@mountunion.edu","section":"LAB5","labId":7,"start_vial":66,"Vial":73,"VialUnknown":3,"U1":14.0,"U2":13.0},{"Student Name":"Andrew Jesus Holmes","Student ID":1071622,"Class Level":"First Year","Email":"holmesaj2025@mountunion.edu","section":"LAB5","labId":8,"start_vial":66,"Vial":74,"VialUnknown":4,"U1":12.0,"U2":8.0},{"Student Name":"Bryan Michael Konen","Student ID":1067696,"Class Level":"First Year","Email":"konenbm2024@mountunion.edu","section":"LAB5","labId":9,"start_vial":66,"Vial":75,"VialUnknown":5,"U1":11.0,"U2":4.0},{"Student Name":"Sarah McKenzie Magyar","Student ID":1063886,"Class Level":"First Year","Email":"magyarsm2024@mountunion.edu","section":"LAB5","labId":10,"start_vial":66,"Vial":76,"VialUnknown":6,"U1":4.0,"U2":7.0},{"Student Name":"Riley Hoyt Mjolnir","Student ID":1072381,"Class Level":"First Year","Email":"mjolnirh2025@mountunion.edu","section":"LAB5","labId":11,"start_vial":66,"Vial":77,"VialUnknown":7,"U1":6.0,"U2":2.0},{"Student Name":"Allison Jae Ott","Student ID":1071490,"Class Level":"First Year","Email":"ottaj2025@mountunion.edu","section":"LAB5","labId":12,"start_vial":66,"Vial":78,"VialUnknown":8,"U1":2.0,"U2":13.0},{"Student Name":"Gabby Profusz","Student ID":1069126,"Class Level":"First Year","Email":"profusga2025@mountunion.edu","section":"LAB5","labId":13,"start_vial":66,"Vial":79,"VialUnknown":9,"U1":5.0,"U2":11.0},{"Student Name":"Hudson Paul Rice","Student ID":1063982,"Class Level":"Sophomore","Email":"ricehp2024@mountunion.edu","section":"LAB5","labId":14,"start_vial":66,"Vial":80,"VialUnknown":10,"U1":13.0,"U2":14.0},{"Student Name":"Willow June Roberts","Student ID":1070526,"Class Level":"First Year","Email":"robertwj2025@mountunion.edu","section":"LAB5","labId":15,"start_vial":66,"Vial":81,"VialUnknown":11,"U1":10.0,"U2":4.0},{"Student Name":"Stacey Winters Solomon","Student ID":1065849,"Class Level":"First Year","Email":"solomosw2024@mountunion.edu","section":"LAB5","labId":16,"start_vial":66,"Vial":82,"VialUnknown":12,"U1":6.0,"U2":8.0},{"Student Name":"Lexi Renee Anne Terrano","Student ID":1069856,"Class Level":"First Year","Email":"terranlr2025@mountunion.edu","section":"LAB5","labId":17,"start_vial":66,"Vial":83,"VialUnknown":13,"U1":4.0,"U2":14.0}]

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