
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [{"Student Name":"Joe Michael Annichine","Student ID":1065532,"Class Level":"First Year","Email":"annichjm2024@mountunion.edu","section":"LAB2","labId":0,"start_vial":16,"Vial":16,"VialUnknown":2,"U1":3.0,"U2":12.0},{"Student Name":"Celeste R. Box","Student ID":1065844,"Class Level":"First Year","Email":"boxcr2024@mountunion.edu","section":"LAB2","labId":1,"start_vial":16,"Vial":17,"VialUnknown":3,"U1":4.0,"U2":11.0},{"Student Name":"Noah Dontrez Frederick","Student ID":1057038,"Class Level":"First Year","Email":"fredernd2022@mountunion.edu","section":"LAB2","labId":2,"start_vial":16,"Vial":18,"VialUnknown":4,"U1":11.0,"U2":2.0},{"Student Name":"Ashton Getz","Student ID":1066613,"Class Level":"First Year","Email":"getzas2024@mountunion.edu","section":"LAB2","labId":3,"start_vial":16,"Vial":19,"VialUnknown":5,"U1":11.0,"U2":2.0},{"Student Name":"Macy Dawn Gotschall","Student ID":1065269,"Class Level":"First Year","Email":"gotschmd2024@mountunion.edu","section":"LAB2","labId":4,"start_vial":16,"Vial":20,"VialUnknown":6,"U1":9.0,"U2":13.0},{"Student Name":"Allyson Nicole Kadri","Student ID":1065856,"Class Level":"First Year","Email":"kadrian2024@mountunion.edu","section":"LAB2","labId":5,"start_vial":16,"Vial":21,"VialUnknown":7,"U1":2.0,"U2":1.0},{"Student Name":"Cory Richard Martin","Student ID":1064753,"Class Level":"First Year","Email":"martincr2024@mountunion.edu","section":"LAB2","labId":6,"start_vial":16,"Vial":22,"VialUnknown":8,"U1":14.0,"U2":7.0},{"Student Name":"Meghan Rita McCafferty","Student ID":1064792,"Class Level":"First Year","Email":"mccaffmr2024@mountunion.edu","section":"LAB2","labId":7,"start_vial":16,"Vial":23,"VialUnknown":9,"U1":5.0,"U2":13.0},{"Student Name":"Riley Jane McCombs","Student ID":1066246,"Class Level":"First Year","Email":"mccombrj2024@mountunion.edu","section":"LAB2","labId":8,"start_vial":16,"Vial":24,"VialUnknown":10,"U1":3.0,"U2":8.0},{"Student Name":"Anna Grace Ostroski","Student ID":1064678,"Class Level":"First Year","Email":"ostrosag2024@mountunion.edu","section":"LAB2","labId":9,"start_vial":16,"Vial":25,"VialUnknown":11,"U1":9.0,"U2":4.0},{"Student Name":"Jared David Pasco","Student ID":1061630,"Class Level":"First Year","Email":"pascojd2023@mountunion.edu","section":"LAB2","labId":10,"start_vial":16,"Vial":26,"VialUnknown":12,"U1":3.0,"U2":7.0},{"Student Name":"Elena Joan Pesut","Student ID":1061930,"Class Level":"First Year","Email":"pesutej2023@mountunion.edu","section":"LAB2","labId":11,"start_vial":16,"Vial":27,"VialUnknown":13,"U1":10.0,"U2":7.0},{"Student Name":"Ryan William Schnering","Student ID":1067729,"Class Level":"First Year","Email":"schnerrw2024@mountunion.edu","section":"LAB2","labId":12,"start_vial":16,"Vial":28,"VialUnknown":14,"U1":6.0,"U2":2.0},{"Student Name":"Kailyn Nicole Schwall","Student ID":1065064,"Class Level":"First Year","Email":"schwalkn2024@mountunion.edu","section":"LAB2","labId":13,"start_vial":16,"Vial":29,"VialUnknown":1,"U1":5.0,"U2":14.0},{"Student Name":"Ian Sherer","Student ID":1064093,"Class Level":"First Year","Email":"shereria2023@mountunion.edu","section":"LAB2","labId":14,"start_vial":16,"Vial":30,"VialUnknown":2,"U1":11.0,"U2":7.0},{"Student Name":"Gracelyn Josephine Skupski","Student ID":1064655,"Class Level":"First Year","Email":"skupskgj2024@mountunion.edu","section":"LAB2","labId":15,"start_vial":16,"Vial":31,"VialUnknown":3,"U1":7.0,"U2":2.0},{"Student Name":"Randy Tawiah","Student ID":797214,"Class Level":"Senior","Email":"tawiahr2024@mountunion.edu","section":"LAB2","labId":16,"start_vial":16,"Vial":32,"VialUnknown":4,"U1":12.0,"U2":7.0},{"Student Name":"Jackson William Ahebwa","Student ID":1064480,"Class Level":"First Year","Email":"ahebwajw2024@mountunion.edu","section":"LAB5","labId":0,"start_vial":60,"Vial":60,"VialUnknown":4,"U1":2.0,"U2":6.0},{"Student Name":"Maddalyn P. Bean","Student ID":1065293,"Class Level":"First Year","Email":"beanmp2024@mountunion.edu","section":"LAB5","labId":1,"start_vial":60,"Vial":61,"VialUnknown":5,"U1":4.0,"U2":3.0},{"Student Name":"Donovan Christopher Geiger","Student ID":1065315,"Class Level":"First Year","Email":"geigerdc2024@mountunion.edu","section":"LAB5","labId":2,"start_vial":60,"Vial":62,"VialUnknown":6,"U1":3.0,"U2":5.0},{"Student Name":"Asher C. Hart","Student ID":1065819,"Class Level":"First Year","Email":"hartac2024@mountunion.edu","section":"LAB5","labId":3,"start_vial":60,"Vial":63,"VialUnknown":7,"U1":11.0,"U2":2.0},{"Student Name":"James Patrick Hoose","Student ID":1064724,"Class Level":"First Year","Email":"hoosejp2024@mountunion.edu","section":"LAB5","labId":4,"start_vial":60,"Vial":64,"VialUnknown":8,"U1":9.0,"U2":13.0},{"Student Name":"Joshua Thomas Hurlbut","Student ID":1066277,"Class Level":"First Year","Email":"hurlbujt2024@mountunion.edu","section":"LAB5","labId":5,"start_vial":60,"Vial":65,"VialUnknown":9,"U1":1.0,"U2":10.0},{"Student Name":"Jake Edward Kapper","Student ID":1065457,"Class Level":"First Year","Email":"kapperje2024@mountunion.edu","section":"LAB5","labId":6,"start_vial":60,"Vial":66,"VialUnknown":10,"U1":9.0,"U2":5.0},{"Student Name":"Hayden Earl Lewis Krise","Student ID":1064396,"Class Level":"First Year","Email":"krisehe2024@mountunion.edu","section":"LAB5","labId":7,"start_vial":60,"Vial":67,"VialUnknown":11,"U1":6.0,"U2":8.0},{"Student Name":"Skylar Jade Lawson","Student ID":1063930,"Class Level":"First Year","Email":"lawsonsj2024@mountunion.edu","section":"LAB5","labId":8,"start_vial":60,"Vial":68,"VialUnknown":12,"U1":4.0,"U2":8.0},{"Student Name":"Madison Mann","Student ID":1060711,"Class Level":"First Year","Email":"mannma2023@mountunion.edu","section":"LAB5","labId":9,"start_vial":60,"Vial":69,"VialUnknown":13,"U1":5.0,"U2":8.0},{"Student Name":"Bayley Reece McClelland","Student ID":1067572,"Class Level":"First Year","Email":"mcclelbr2024@mountunion.edu","section":"LAB5","labId":10,"start_vial":60,"Vial":70,"VialUnknown":14,"U1":11.0,"U2":13.0},{"Student Name":"Felix Angel Moreno","Student ID":1059785,"Class Level":"First Year","Email":"morenofa2023@mountunion.edu","section":"LAB5","labId":11,"start_vial":60,"Vial":71,"VialUnknown":1,"U1":4.0,"U2":3.0},{"Student Name":"Quinn Joel Patrykus","Student ID":1066614,"Class Level":"First Year","Email":"patrykqj2024@mountunion.edu","section":"LAB5","labId":12,"start_vial":60,"Vial":72,"VialUnknown":2,"U1":13.0,"U2":1.0},{"Student Name":"Justin Phillips","Student ID":1061457,"Class Level":"First Year","Email":"philliju2023@mountunion.edu","section":"LAB5","labId":13,"start_vial":60,"Vial":73,"VialUnknown":3,"U1":1.0,"U2":9.0},{"Student Name":"MacKenzie J. Rummell","Student ID":1064170,"Class Level":"First Year","Email":"rummelmj2024@mountunion.edu","section":"LAB5","labId":14,"start_vial":60,"Vial":74,"VialUnknown":4,"U1":3.0,"U2":10.0},{"Student Name":"Quinlin Daniel Smith","Student ID":1066050,"Class Level":"First Year","Email":"smithqd2024@mountunion.edu","section":"LAB5","labId":15,"start_vial":60,"Vial":75,"VialUnknown":5,"U1":10.0,"U2":9.0},{"Student Name":"Lexi Lynne Stone","Student ID":1065564,"Class Level":"First Year","Email":"stoneal2024@mountunion.edu","section":"LAB5","labId":16,"start_vial":60,"Vial":76,"VialUnknown":6,"U1":8.0,"U2":7.0},{"Student Name":"Braydon C. Tichy","Student ID":1065105,"Class Level":"First Year","Email":"tichybc2024@mountunion.edu","section":"LAB5","labId":17,"start_vial":60,"Vial":77,"VialUnknown":7,"U1":14.0,"U2":12.0},{"Student Name":"Caden Alexander Buxton","Student ID":1066421,"Class Level":"First Year","Email":"buxtonca2024@mountunion.edu","section":"LAB4","labId":0,"start_vial":43,"Vial":43,"VialUnknown":1,"U1":12.0,"U2":13.0},{"Student Name":"Simon Wayne Conrad","Student ID":1065715,"Class Level":"First Year","Email":"conradsw2024@mountunion.edu","section":"LAB4","labId":1,"start_vial":43,"Vial":44,"VialUnknown":2,"U1":10.0,"U2":9.0},{"Student Name":"Alfonso Cruz III","Student ID":1064321,"Class Level":"First Year","Email":"cruzal2024@mountunion.edu","section":"LAB4","labId":2,"start_vial":43,"Vial":45,"VialUnknown":3,"U1":14.0,"U2":9.0},{"Student Name":"Ethan Matthew Curl","Student ID":1066721,"Class Level":"First Year","Email":"curlem2024@mountunion.edu","section":"LAB4","labId":3,"start_vial":43,"Vial":46,"VialUnknown":4,"U1":5.0,"U2":2.0},{"Student Name":"Elijah Daley","Student ID":1066474,"Class Level":"First Year","Email":"daleyel2024@mountunion.edu","section":"LAB4","labId":4,"start_vial":43,"Vial":47,"VialUnknown":5,"U1":3.0,"U2":12.0},{"Student Name":"Gavin Lee Elliott","Student ID":1066415,"Class Level":"First Year","Email":"elliotgl2024@mountunion.edu","section":"LAB4","labId":5,"start_vial":43,"Vial":48,"VialUnknown":6,"U1":9.0,"U2":7.0},{"Student Name":"Bri Renee Glaser","Student ID":1066119,"Class Level":"First Year","Email":"glaserbr2024@mountunion.edu","section":"LAB4","labId":6,"start_vial":43,"Vial":49,"VialUnknown":7,"U1":2.0,"U2":3.0},{"Student Name":"Cam Charles Guspyt","Student ID":1064576,"Class Level":"First Year","Email":"guspytcc2024@mountunion.edu","section":"LAB4","labId":7,"start_vial":43,"Vial":50,"VialUnknown":8,"U1":9.0,"U2":3.0},{"Student Name":"Braeden Alexander Hauf","Student ID":1063872,"Class Level":"First Year","Email":"haufba2024@mountunion.edu","section":"LAB4","labId":8,"start_vial":43,"Vial":51,"VialUnknown":9,"U1":13.0,"U2":8.0},{"Student Name":"Nick R. Henle","Student ID":1062270,"Class Level":"Sophomore","Email":"henlenr2023@mountunion.edu","section":"LAB4","labId":9,"start_vial":43,"Vial":52,"VialUnknown":10,"U1":6.0,"U2":12.0},{"Student Name":"Matt Joel Kurtz","Student ID":1064829,"Class Level":"First Year","Email":"kurtzmj2024@mountunion.edu","section":"LAB4","labId":10,"start_vial":43,"Vial":53,"VialUnknown":11,"U1":9.0,"U2":2.0},{"Student Name":"Isabelle Marie Moreland","Student ID":1064215,"Class Level":"First Year","Email":"morelaim2024@mountunion.edu","section":"LAB4","labId":11,"start_vial":43,"Vial":54,"VialUnknown":12,"U1":4.0,"U2":7.0},{"Student Name":"Ian Trevor Pack","Student ID":1064850,"Class Level":"First Year","Email":"packit2024@mountunion.edu","section":"LAB4","labId":12,"start_vial":43,"Vial":55,"VialUnknown":13,"U1":2.0,"U2":7.0},{"Student Name":"Patrick James Pasho","Student ID":1060838,"Class Level":"First Year","Email":"pashopj2023@mountunion.edu","section":"LAB4","labId":13,"start_vial":43,"Vial":56,"VialUnknown":14,"U1":2.0,"U2":12.0},{"Student Name":"Zoe Jane Seabeck","Student ID":1061621,"Class Level":"First Year","Email":"seabeczj2023@mountunion.edu","section":"LAB4","labId":14,"start_vial":43,"Vial":57,"VialUnknown":1,"U1":4.0,"U2":12.0},{"Student Name":"Maddox Henry Snyder","Student ID":1065282,"Class Level":"First Year","Email":"snydermh2024@mountunion.edu","section":"LAB4","labId":15,"start_vial":43,"Vial":58,"VialUnknown":2,"U1":8.0,"U2":10.0},{"Student Name":"Steven Reese Utter","Student ID":1056491,"Class Level":"Sophomore","Email":"uttersr2022@mountunion.edu","section":"LAB4","labId":16,"start_vial":43,"Vial":59,"VialUnknown":3,"U1":13.0,"U2":11.0},{"Student Name":"Callie Marie Anderson","Student ID":1065107,"Class Level":"First Year","Email":"anderscm2024@mountunion.edu","section":"LAB3","labId":0,"start_vial":33,"Vial":33,"VialUnknown":5,"U1":4.0,"U2":1.0},{"Student Name":"Tierney Alexandra Chesney","Student ID":1065463,"Class Level":"Sophomore","Email":"chesneta2024@mountunion.edu","section":"LAB3","labId":1,"start_vial":33,"Vial":34,"VialUnknown":6,"U1":4.0,"U2":3.0},{"Student Name":"Stephanie Joye Esswein","Student ID":1064975,"Class Level":"First Year","Email":"essweisj2024@mountunion.edu","section":"LAB3","labId":2,"start_vial":33,"Vial":35,"VialUnknown":7,"U1":11.0,"U2":14.0},{"Student Name":"Kaio Marques Grubb","Student ID":1067701,"Class Level":"First Year","Email":"grubbkm2024@mountunion.edu","section":"LAB3","labId":3,"start_vial":33,"Vial":36,"VialUnknown":8,"U1":14.0,"U2":13.0},{"Student Name":"Grant Hetherton","Student ID":1065195,"Class Level":"First Year","Email":"hethergr2024@mountunion.edu","section":"LAB3","labId":4,"start_vial":33,"Vial":37,"VialUnknown":9,"U1":6.0,"U2":12.0},{"Student Name":"Grayson Alan Lehman","Student ID":1064152,"Class Level":"First Year","Email":"lehmanga2024@mountunion.edu","section":"LAB3","labId":5,"start_vial":33,"Vial":38,"VialUnknown":10,"U1":9.0,"U2":8.0},{"Student Name":"Nolan Daniel McNeal","Student ID":1054453,"Class Level":"Junior","Email":"mcnealnd2021@mountunion.edu","section":"LAB3","labId":6,"start_vial":33,"Vial":39,"VialUnknown":11,"U1":8.0,"U2":2.0},{"Student Name":"Jake Charles Miller","Student ID":1049848,"Class Level":"Senior","Email":"millerjc2021@mountunion.edu","section":"LAB3","labId":7,"start_vial":33,"Vial":40,"VialUnknown":12,"U1":6.0,"U2":1.0},{"Student Name":"Zachary Thomas Olechnowicz","Student ID":1064773,"Class Level":"First Year","Email":"olechnzt2024@mountunion.edu","section":"LAB3","labId":8,"start_vial":33,"Vial":41,"VialUnknown":13,"U1":1.0,"U2":2.0},{"Student Name":"McKenzie Lynn Whitted","Student ID":1061153,"Class Level":"First Year","Email":"whitteml2023@mountunion.edu","section":"LAB3","labId":9,"start_vial":33,"Vial":42,"VialUnknown":14,"U1":4.0,"U2":2.0},{"Student Name":"Veronica Magbor Abange","Student ID":1061944,"Class Level":"First Year","Email":"abangevm2023@mountunion.edu","section":"LAB1","labId":0,"start_vial":1,"Vial":1,"VialUnknown":1,"U1":12.0,"U2":5.0},{"Student Name":"Cameron Robert Burnett","Student ID":1059941,"Class Level":"First Year","Email":"burnetcr2023@mountunion.edu","section":"LAB1","labId":1,"start_vial":1,"Vial":2,"VialUnknown":2,"U1":4.0,"U2":11.0},{"Student Name":"Jaiden Amari Butler","Student ID":1060961,"Class Level":"First Year","Email":"butlerja2023@mountunion.edu","section":"LAB1","labId":2,"start_vial":1,"Vial":3,"VialUnknown":3,"U1":10.0,"U2":4.0},{"Student Name":"Collin Anthony Doskocz","Student ID":1065845,"Class Level":"First Year","Email":"doskocca2024@mountunion.edu","section":"LAB1","labId":3,"start_vial":1,"Vial":4,"VialUnknown":4,"U1":7.0,"U2":8.0},{"Student Name":"Landon Lee Froehlich","Student ID":1064502,"Class Level":"First Year","Email":"froehlll2024@mountunion.edu","section":"LAB1","labId":4,"start_vial":1,"Vial":5,"VialUnknown":5,"U1":13.0,"U2":7.0},{"Student Name":"Aidan Thomas Green","Student ID":1067825,"Class Level":"First Year","Email":"greenat2024@mountunion.edu","section":"LAB1","labId":5,"start_vial":1,"Vial":6,"VialUnknown":6,"U1":13.0,"U2":2.0},{"Student Name":"Rylie Christine Haynes","Student ID":1060317,"Class Level":"First Year","Email":"haynesrc2023@mountunion.edu","section":"LAB1","labId":6,"start_vial":1,"Vial":7,"VialUnknown":7,"U1":8.0,"U2":5.0},{"Student Name":"Nick James Howrylak","Student ID":1064617,"Class Level":"First Year","Email":"howrylnj2024@mountunion.edu","section":"LAB1","labId":7,"start_vial":1,"Vial":8,"VialUnknown":8,"U1":6.0,"U2":2.0},{"Student Name":"Kristin Rose Mickovic","Student ID":1061093,"Class Level":"First Year","Email":"mickovkr2023@mountunion.edu","section":"LAB1","labId":8,"start_vial":1,"Vial":9,"VialUnknown":9,"U1":8.0,"U2":13.0},{"Student Name":"Hemy Lee Parker","Student ID":1057421,"Class Level":"Junior","Email":"parkerhl2022@mountunion.edu","section":"LAB1","labId":9,"start_vial":1,"Vial":10,"VialUnknown":10,"U1":14.0,"U2":9.0},{"Student Name":"Noah Benjamin Swartzentruber","Student ID":1065258,"Class Level":"First Year","Email":"swartznb2024@mountunion.edu","section":"LAB1","labId":10,"start_vial":1,"Vial":11,"VialUnknown":11,"U1":3.0,"U2":12.0},{"Student Name":"Shaun Thomas","Student ID":1066112,"Class Level":"Senior","Email":"thomasqu2024@mountunion.edu","section":"LAB1","labId":11,"start_vial":1,"Vial":12,"VialUnknown":12,"U1":1.0,"U2":9.0},{"Student Name":"Shelby Walker","Student ID":1067429,"Class Level":"First Year","Email":"walkersh2024@mountunion.edu","section":"LAB1","labId":12,"start_vial":1,"Vial":13,"VialUnknown":13,"U1":12.0,"U2":8.0},{"Student Name":"Jake Whiteley","Student ID":1067292,"Class Level":"First Year","Email":"whitelja2024@mountunion.edu","section":"LAB1","labId":13,"start_vial":1,"Vial":14,"VialUnknown":14,"U1":12.0,"U2":4.0},{"Student Name":"Nathaniel James Woerther","Student ID":799174,"Class Level":"Junior","Email":"woerthnj2021@mountunion.edu","section":"LAB1","labId":14,"start_vial":1,"Vial":15,"VialUnknown":1,"U1":10.0,"U2":8.0},{"Student Name":"Student A","Student ID":"X","Class Level":"X","Email":"studenta@mountunion.edu","section":"LAB9","labId":0,"start_vial":78,"Vial":78,"VialUnknown":8,"U1":10.0,"U2":6.0},{"Student Name":"Student B","Student ID":"X","Class Level":"X","Email":"studentb@mountunion.edu","section":"LAB9","labId":1,"start_vial":78,"Vial":79,"VialUnknown":9,"U1":10.0,"U2":4.0},{"Student Name":"Student C","Student ID":"X","Class Level":"X","Email":"studentc@mountunion.edu","section":"LAB9","labId":2,"start_vial":78,"Vial":80,"VialUnknown":10,"U1":7.0,"U2":1.0},{"Student Name":"Student D","Student ID":"X","Class Level":"X","Email":"studentd@mountunion.edu","section":"LAB9","labId":3,"start_vial":78,"Vial":81,"VialUnknown":11,"U1":4.0,"U2":12.0}];

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-24fa");
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
  .getElementById("120-water-24fa")
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

    const rng = new Math.seedrandom(obj.Email+'2024'+'fall-CHE120-morales-boydkimball');


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