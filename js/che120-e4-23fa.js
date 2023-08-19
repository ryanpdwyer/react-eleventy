
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Roman James Alessandro","Student ID":1060452,"Class Level":"First Year","Email":"alessarj2023@mountunion.edu","section":3,"start_vial":51,"Vial":51,"VialUnknown":9,"U1":8.0,"U2":3.0},{"Student Name":"Phaedra Skye Ardoin","Student ID":1063570,"Class Level":"First Year","Email":"ardoinps2023@mountunion.edu","section":3,"start_vial":51,"Vial":52,"VialUnknown":10,"U1":3.0,"U2":12.0},{"Student Name":"Allison Barnett","Student ID":1061699,"Class Level":"Sophomore","Email":"barnetal2023@mountunion.edu","section":3,"start_vial":51,"Vial":53,"VialUnknown":11,"U1":6.0,"U2":9.0},{"Student Name":"Caleb Cabrera","Student ID":1063103,"Class Level":"Junior","Email":"cabrerca2023@mountunion.edu","section":3,"start_vial":51,"Vial":54,"VialUnknown":12,"U1":3.0,"U2":9.0},{"Student Name":"William Edward Cruny","Student ID":1059623,"Class Level":"First Year","Email":"crunywe2023@mountunion.edu","section":3,"start_vial":51,"Vial":55,"VialUnknown":13,"U1":3.0,"U2":1.0},{"Student Name":"Ty David Dennison","Student ID":1060226,"Class Level":"First Year","Email":"dennistd2023@mountunion.edu","section":3,"start_vial":51,"Vial":56,"VialUnknown":14,"U1":2.0,"U2":7.0},{"Student Name":"Joe William Drsek","Student ID":1055525,"Class Level":"Junior","Email":"drsekjw2022@mountunion.edu","section":3,"start_vial":51,"Vial":57,"VialUnknown":1,"U1":14.0,"U2":10.0},{"Student Name":"Aj James Fuller","Student ID":1056312,"Class Level":"Junior","Email":"fulleraj2022@mountunion.edu","section":3,"start_vial":51,"Vial":58,"VialUnknown":2,"U1":1.0,"U2":3.0},{"Student Name":"Austin Lee Garrett","Student ID":1052497,"Class Level":"Junior","Email":"garretal2021@mountunion.edu","section":3,"start_vial":51,"Vial":59,"VialUnknown":3,"U1":14.0,"U2":6.0},{"Student Name":"Logan Paul Gunderman","Student ID":1052605,"Class Level":"Junior","Email":"gunderlp2021@mountunion.edu","section":3,"start_vial":51,"Vial":60,"VialUnknown":4,"U1":9.0,"U2":6.0},{"Student Name":"Alexa Rose Kadilak","Student ID":1059629,"Class Level":"First Year","Email":"kadilaar2023@mountunion.edu","section":3,"start_vial":51,"Vial":61,"VialUnknown":5,"U1":7.0,"U2":12.0},{"Student Name":"Paige Louraine Lucas","Student ID":1059620,"Class Level":"First Year","Email":"lucaspl2023@mountunion.edu","section":3,"start_vial":51,"Vial":62,"VialUnknown":6,"U1":4.0,"U2":10.0},{"Student Name":"Natalie Lynn Maiorana","Student ID":1061775,"Class Level":"First Year","Email":"maioranl2023@mountunion.edu","section":3,"start_vial":51,"Vial":63,"VialUnknown":7,"U1":6.0,"U2":10.0},{"Student Name":"Logan Julius Shields","Student ID":1056107,"Class Level":"Sophomore","Email":"shieldlj2022@mountunion.edu","section":3,"start_vial":51,"Vial":64,"VialUnknown":8,"U1":9.0,"U2":5.0},{"Student Name":"Aj Jon Stallsmith","Student ID":1056864,"Class Level":"Sophomore","Email":"stallsaj2022@mountunion.edu","section":3,"start_vial":51,"Vial":65,"VialUnknown":9,"U1":3.0,"U2":8.0},{"Student Name":"Brayden H. Tosi","Student ID":1060178,"Class Level":"First Year","Email":"tosibh2023@mountunion.edu","section":3,"start_vial":51,"Vial":66,"VialUnknown":10,"U1":1.0,"U2":9.0},{"Student Name":"Gracie Rose Turner","Student ID":1056300,"Class Level":"First Year","Email":"turnergr2022@mountunion.edu","section":3,"start_vial":51,"Vial":67,"VialUnknown":11,"U1":9.0,"U2":10.0},{"Student Name":"Mallory Vidman","Student ID":1059106,"Class Level":"Sophomore","Email":"vidmanmp2022@mountunion.edu","section":3,"start_vial":51,"Vial":68,"VialUnknown":12,"U1":5.0,"U2":1.0},{"Student Name":"Evan R. Wengerter","Student ID":1055445,"Class Level":"Sophomore","Email":"wengerer2022@mountunion.edu","section":3,"start_vial":51,"Vial":69,"VialUnknown":13,"U1":12.0,"U2":2.0},{"Student Name":"McKenzie Lynn Whitted","Student ID":1061153,"Class Level":"First Year","Email":"whitteml2023@mountunion.edu","section":3,"start_vial":51,"Vial":70,"VialUnknown":14,"U1":3.0,"U2":6.0},{"Student Name":"Nick Anna","Student ID":1056135,"Class Level":"Sophomore","Email":"annani2022@mountunion.edu","section":4,"start_vial":71,"Vial":71,"VialUnknown":1,"U1":7.0,"U2":3.0},{"Student Name":"Lauren Rose Barcikoski","Student ID":1056049,"Class Level":"Sophomore","Email":"barciklr2022@mountunion.edu","section":4,"start_vial":71,"Vial":72,"VialUnknown":2,"U1":4.0,"U2":1.0},{"Student Name":"Cooper Cooper Blair","Student ID":1058046,"Class Level":"First Year","Email":"blairzc2022@mountunion.edu","section":4,"start_vial":71,"Vial":73,"VialUnknown":3,"U1":2.0,"U2":5.0},{"Student Name":"Thomas Walter Butt","Student ID":799129,"Class Level":"Sophomore","Email":"butttw2022@mountunion.edu","section":4,"start_vial":71,"Vial":74,"VialUnknown":4,"U1":7.0,"U2":5.0},{"Student Name":"James Jamal Chaney","Student ID":1051762,"Class Level":"Junior","Email":"chaneyjj2021@mountunion.edu","section":4,"start_vial":71,"Vial":75,"VialUnknown":5,"U1":4.0,"U2":14.0},{"Student Name":"Kylee Grace Fetkovich","Student ID":1060138,"Class Level":"First Year","Email":"fetkovkg2023@mountunion.edu","section":4,"start_vial":71,"Vial":76,"VialUnknown":6,"U1":4.0,"U2":1.0},{"Student Name":"Marek Xavier France","Student ID":1062131,"Class Level":"First Year","Email":"francemx2023@mountunion.edu","section":4,"start_vial":71,"Vial":77,"VialUnknown":7,"U1":13.0,"U2":10.0},{"Student Name":"Alex Michael Grzywna","Student ID":1057620,"Class Level":"First Year","Email":"grzywnam2022@mountunion.edu","section":4,"start_vial":71,"Vial":78,"VialUnknown":8,"U1":3.0,"U2":14.0},{"Student Name":"Gabrielle Carlita Hill","Student ID":1059238,"Class Level":"First Year","Email":"hillga22@icloud.com","section":4,"start_vial":71,"Vial":79,"VialUnknown":9,"U1":14.0,"U2":8.0},{"Student Name":"Kyler Ethan Curtis Keck","Student ID":1062591,"Class Level":"First Year","Email":"keckke2023@mountunion.edu","section":4,"start_vial":71,"Vial":80,"VialUnknown":10,"U1":5.0,"U2":2.0},{"Student Name":"Jack Charles Mercer","Student ID":1061377,"Class Level":"First Year","Email":"mercerjc2023@mountunion.edu","section":4,"start_vial":71,"Vial":81,"VialUnknown":11,"U1":3.0,"U2":10.0},{"Student Name":"Jamison Rose Musser","Student ID":1061721,"Class Level":"First Year","Email":"musserar2023@mountunion.edu","section":4,"start_vial":71,"Vial":82,"VialUnknown":12,"U1":7.0,"U2":9.0},{"Student Name":"Vince Neyhart","Student ID":1061982,"Class Level":"First Year","Email":"neyharvi2023@mountunion.edu","section":4,"start_vial":71,"Vial":83,"VialUnknown":13,"U1":12.0,"U2":2.0},{"Student Name":"Emily Michelle Nutter","Student ID":1060638,"Class Level":"First Year","Email":"nutterem2023@mountunion.edu","section":4,"start_vial":71,"Vial":84,"VialUnknown":14,"U1":3.0,"U2":1.0},{"Student Name":"Karlee Michelle Root","Student ID":1061683,"Class Level":"First Year","Email":"rootkm2023@mountunion.edu","section":4,"start_vial":71,"Vial":85,"VialUnknown":1,"U1":14.0,"U2":7.0},{"Student Name":"Karson Jay Siegfried","Student ID":1062192,"Class Level":"First Year","Email":"siegfrkj2023@mountunion.edu","section":4,"start_vial":71,"Vial":86,"VialUnknown":2,"U1":14.0,"U2":3.0},{"Student Name":"Kaylynn Marie Thomas","Student ID":1062556,"Class Level":"First Year","Email":"thomaskm2023@mountunion.edu","section":4,"start_vial":71,"Vial":87,"VialUnknown":3,"U1":13.0,"U2":9.0},{"Student Name":"Josh James Williams","Student ID":1060535,"Class Level":"First Year","Email":"williajj2023@mountunion.edu","section":4,"start_vial":71,"Vial":88,"VialUnknown":4,"U1":5.0,"U2":9.0},{"Student Name":"Trenton Richard Zollinger","Student ID":1062526,"Class Level":"First Year","Email":"zollintr2023@mountunion.edu","section":4,"start_vial":71,"Vial":89,"VialUnknown":5,"U1":7.0,"U2":10.0},{"Student Name":"Hollie Marie Addison","Student ID":1060770,"Class Level":"First Year","Email":"addisohm2023@mountunion.edu","section":5,"start_vial":41,"Vial":41,"VialUnknown":13,"U1":10.0,"U2":8.0},{"Student Name":"Maxwell Christopher Cooper","Student ID":1060882,"Class Level":"First Year","Email":"coopermc2023@mountunion.edu","section":5,"start_vial":41,"Vial":42,"VialUnknown":14,"U1":10.0,"U2":2.0},{"Student Name":"Emma Grace Jackson","Student ID":1059715,"Class Level":"First Year","Email":"jacksoeg2023@mountunion.edu","section":5,"start_vial":41,"Vial":43,"VialUnknown":1,"U1":10.0,"U2":7.0},{"Student Name":"Reishaad Johnson","Student ID":1054452,"Class Level":"First Year","Email":"johnsore2021@mountunion.edu","section":5,"start_vial":41,"Vial":44,"VialUnknown":2,"U1":3.0,"U2":13.0},{"Student Name":"James Allen Lutes","Student ID":1062901,"Class Level":"First Year","Email":"lutesja2023@mountunion.edu","section":5,"start_vial":41,"Vial":45,"VialUnknown":3,"U1":13.0,"U2":7.0},{"Student Name":"Caydance Frances Metcalfe","Student ID":1061279,"Class Level":"First Year","Email":"metcalcf2023@mountunion.edu","section":5,"start_vial":41,"Vial":46,"VialUnknown":4,"U1":14.0,"U2":13.0},{"Student Name":"Jared David Pasco","Student ID":1061630,"Class Level":"First Year","Email":"pascojd2023@mountunion.edu","section":5,"start_vial":41,"Vial":47,"VialUnknown":5,"U1":6.0,"U2":1.0},{"Student Name":"Benji E. Perez","Student ID":1060499,"Class Level":"First Year","Email":"perezbe2023@mountunion.edu","section":5,"start_vial":41,"Vial":48,"VialUnknown":6,"U1":3.0,"U2":9.0},{"Student Name":"Emily Elizabeth Suffecool","Student ID":799106,"Class Level":"First Year","Email":"suffecee2025@mountunion.edu","section":5,"start_vial":41,"Vial":49,"VialUnknown":7,"U1":8.0,"U2":1.0},{"Student Name":"Carson M. Burns","Student ID":1054936,"Class Level":"Junior","Email":"burnscm2022@mountunion.edu","section":2,"start_vial":21,"Vial":21,"VialUnknown":7,"U1":5.0,"U2":2.0},{"Student Name":"Deaglan Camron","Student ID":1062630,"Class Level":"First Year","Email":"camronde2023@mountunion.edu","section":2,"start_vial":21,"Vial":22,"VialUnknown":8,"U1":6.0,"U2":7.0},{"Student Name":"Marcus Jerome Coleman","Student ID":1062714,"Class Level":"First Year","Email":"colemama2023@mountunion.edu","section":2,"start_vial":21,"Vial":23,"VialUnknown":9,"U1":7.0,"U2":14.0},{"Student Name":"Wyatt J. Courtwright","Student ID":1061140,"Class Level":"First Year","Email":"courtwwj2023@mountunion.edu","section":2,"start_vial":21,"Vial":24,"VialUnknown":10,"U1":2.0,"U2":12.0},{"Student Name":"Jeffrey Brian Cronin","Student ID":795060,"Class Level":"Senior","Email":"croninjb2024@mountunion.edu","section":2,"start_vial":21,"Vial":25,"VialUnknown":11,"U1":7.0,"U2":13.0},{"Student Name":"Ryan Richard Deperro","Student ID":1060439,"Class Level":"First Year","Email":"deperrrr2023@mountunion.edu","section":2,"start_vial":21,"Vial":26,"VialUnknown":12,"U1":7.0,"U2":10.0},{"Student Name":"Lucie Doubet","Student ID":1057292,"Class Level":"Sophomore","Email":"doubetlu2022@mountunion.edu","section":2,"start_vial":21,"Vial":27,"VialUnknown":13,"U1":8.0,"U2":9.0},{"Student Name":"Reese Mia Downing","Student ID":1056072,"Class Level":"First Year","Email":"reesedowning22@gmail.com","section":2,"start_vial":21,"Vial":28,"VialUnknown":14,"U1":8.0,"U2":9.0},{"Student Name":"Anthony Michael Frank","Student ID":1059772,"Class Level":"First Year","Email":"frankam2023@mountunion.edu","section":2,"start_vial":21,"Vial":29,"VialUnknown":1,"U1":11.0,"U2":13.0},{"Student Name":"Aidan M. Green","Student ID":1055192,"Class Level":"Sophomore","Email":"greenam2022@mountunion.edu","section":2,"start_vial":21,"Vial":30,"VialUnknown":2,"U1":9.0,"U2":6.0},{"Student Name":"Nathan Allen Heater","Student ID":790826,"Class Level":"Senior","Email":"heaterna2023@mountunion.edu","section":2,"start_vial":21,"Vial":31,"VialUnknown":3,"U1":13.0,"U2":5.0},{"Student Name":"Tyler Jacob Kohlmann","Student ID":1062264,"Class Level":"First Year","Email":"kohlmatj2023@mountunion.edu","section":2,"start_vial":21,"Vial":32,"VialUnknown":4,"U1":13.0,"U2":7.0},{"Student Name":"Nico Centori Maffei","Student ID":1052946,"Class Level":"Junior","Email":"maffeinc2021@mountunion.edu","section":2,"start_vial":21,"Vial":33,"VialUnknown":5,"U1":1.0,"U2":11.0},{"Student Name":"Shannon M. Masa","Student ID":1055430,"Class Level":"Sophomore","Email":"masasm2022@mountunion.edu","section":2,"start_vial":21,"Vial":34,"VialUnknown":6,"U1":11.0,"U2":3.0},{"Student Name":"Shayne Scragg","Student ID":1056100,"Class Level":"Junior","Email":"scraggsh2022@mountunion.edu","section":2,"start_vial":21,"Vial":35,"VialUnknown":7,"U1":14.0,"U2":6.0},{"Student Name":"Olivia Miquette Smith","Student ID":1056106,"Class Level":"Sophomore","Email":"smithom2022@mountunion.edu","section":2,"start_vial":21,"Vial":36,"VialUnknown":8,"U1":1.0,"U2":10.0},{"Student Name":"Logan Swihart","Student ID":1060064,"Class Level":"First Year","Email":"swiharlo2023@mountunion.edu","section":2,"start_vial":21,"Vial":37,"VialUnknown":9,"U1":3.0,"U2":10.0},{"Student Name":"Trent Ronald Taflan","Student ID":1055537,"Class Level":"Sophomore","Email":"taflantr2022@mountunion.edu","section":2,"start_vial":21,"Vial":38,"VialUnknown":10,"U1":7.0,"U2":4.0},{"Student Name":"Logan A. Vanicek","Student ID":797802,"Class Level":"Senior","Email":"vanicela2024@mountunion.edu","section":2,"start_vial":21,"Vial":39,"VialUnknown":11,"U1":9.0,"U2":10.0},{"Student Name":"Brylie Leann Wade","Student ID":1060808,"Class Level":"First Year","Email":"wadebl2023@mountunion.edu","section":2,"start_vial":21,"Vial":40,"VialUnknown":12,"U1":7.0,"U2":3.0},{"Student Name":"Mathias Broyles","Student ID":1056269,"Class Level":"Sophomore","Email":"broylefm2022@mountunion.edu","section":1,"start_vial":1,"Vial":1,"VialUnknown":1,"U1":3.0,"U2":2.0},{"Student Name":"Kennedy Grace Burnison","Student ID":1061074,"Class Level":"First Year","Email":"burniskg2023@mountunion.edu","section":1,"start_vial":1,"Vial":2,"VialUnknown":2,"U1":4.0,"U2":11.0},{"Student Name":"Maddie Elizabeth Burton","Student ID":1055447,"Class Level":"Sophomore","Email":"burtonme2022@mountunion.edu","section":1,"start_vial":1,"Vial":3,"VialUnknown":3,"U1":14.0,"U2":9.0},{"Student Name":"Evan A. Days","Student ID":793194,"Class Level":"Senior","Email":"daysea2023@mountunion.edu","section":1,"start_vial":1,"Vial":4,"VialUnknown":4,"U1":2.0,"U2":3.0},{"Student Name":"Ethan Michael Dunlany","Student ID":1059588,"Class Level":"First Year","Email":"dunlanem2023@mountunion.edu","section":1,"start_vial":1,"Vial":5,"VialUnknown":5,"U1":4.0,"U2":12.0},{"Student Name":"Lincoln Tate Ergenbright","Student ID":1056588,"Class Level":"First Year","Email":"ergenblt2022@mountunion.edu","section":1,"start_vial":1,"Vial":6,"VialUnknown":6,"U1":5.0,"U2":7.0},{"Student Name":"Landon Timothy Gingo","Student ID":1059705,"Class Level":"First Year","Email":"gingolt2023@mountunion.edu","section":1,"start_vial":1,"Vial":7,"VialUnknown":7,"U1":9.0,"U2":3.0},{"Student Name":"Carter Julius Hancock","Student ID":799019,"Class Level":"Junior","Email":"hancoccj2024@mountunion.edu","section":1,"start_vial":1,"Vial":8,"VialUnknown":8,"U1":7.0,"U2":9.0},{"Student Name":"Zachary Ryan Lenart","Student ID":1062282,"Class Level":"First Year","Email":"lenartzr2023@mountunion.edu","section":1,"start_vial":1,"Vial":9,"VialUnknown":9,"U1":1.0,"U2":10.0},{"Student Name":"Oliviana Grace Lika","Student ID":1060189,"Class Level":"First Year","Email":"likaog2023@mountunion.edu","section":1,"start_vial":1,"Vial":10,"VialUnknown":10,"U1":4.0,"U2":3.0},{"Student Name":"Caleb Rinard","Student ID":1057437,"Class Level":"First Year","Email":"rinardca2022@mountunion.edu","section":1,"start_vial":1,"Vial":11,"VialUnknown":11,"U1":6.0,"U2":4.0},{"Student Name":"Lanie Caroline Schultz","Student ID":1060127,"Class Level":"First Year","Email":"schultlc2023@mountunion.edu","section":1,"start_vial":1,"Vial":12,"VialUnknown":12,"U1":2.0,"U2":10.0},{"Student Name":"Bailey Helena Serevicz","Student ID":1059765,"Class Level":"First Year","Email":"serevibh2023@mountunion.edu","section":1,"start_vial":1,"Vial":13,"VialUnknown":13,"U1":1.0,"U2":3.0},{"Student Name":"Thurston Charles Shaw","Student ID":1057706,"Class Level":"Sophomore","Email":"shawtc2022@mountunion.edu","section":1,"start_vial":1,"Vial":14,"VialUnknown":14,"U1":12.0,"U2":13.0},{"Student Name":"Liam Stone Charles Shields","Student ID":1061098,"Class Level":"First Year","Email":"shieldls2023@mountunion.edu","section":1,"start_vial":1,"Vial":15,"VialUnknown":1,"U1":13.0,"U2":6.0},{"Student Name":"Jake William Starkey","Student ID":1060833,"Class Level":"First Year","Email":"starkejw2023@mountunion.edu","section":1,"start_vial":1,"Vial":16,"VialUnknown":2,"U1":6.0,"U2":8.0},{"Student Name":"Kelci Marie Substelny","Student ID":1052418,"Class Level":"Junior","Email":"substekm2021@mountunion.edu","section":1,"start_vial":1,"Vial":17,"VialUnknown":3,"U1":11.0,"U2":4.0},{"Student Name":"Matt Hunter Tschantz","Student ID":1056688,"Class Level":"Sophomore","Email":"tschanmh2022@mountunion.edu","section":1,"start_vial":1,"Vial":18,"VialUnknown":4,"U1":5.0,"U2":10.0},{"Student Name":"Casey Therese Wachhaus","Student ID":1056112,"Class Level":"Sophomore","Email":"wachhact2022@mountunion.edu","section":1,"start_vial":1,"Vial":19,"VialUnknown":5,"U1":8.0,"U2":12.0}];

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
    let myForm = document.getElementById("120-water-23fa");
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
  .getElementById("120-water-23fa")
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

    const rng = new Math.seedrandom(obj.Email+'2023'+'fall-CHE120-some_more-text');


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
    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2023 ${name} ${unknowns[i]} IR. In lab: measure vial ${unknowns[2]}`);
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