
// Data tables
var Kw = 1.0e-14;

var strongAcids = [
    {formula: "HCl", nH: 1},
    {formula: "HBr", nH: 1},
    {formula: "HI", nH: 1},
    {formula: "HNO₃", nH: 1},
    {formula: "HClO₄", nH: 1},
    {formula: "H₂SO₄", nH: 2},
];

var strongBases = [
    {formula: "NaOH", nOH: 1},
    {formula: "KOH", nOH: 1},
    {formula: "Ca(OH)₂", nOH: 2},
    {formula: "Ba(OH)₂", nOH: 2},
];

var weakAcids = [
    {formula: "CH₃COOH", name: "acetic acid", Ka: 1.8e-5},
    {formula: "HCOOH", name: "formic acid", Ka: 1.8e-4},
    {formula: "HCN", name: "hydrocyanic acid", Ka: 6.2e-10},
    {formula: "HF", name: "hydrofluoric acid", Ka: 6.8e-4},
    {formula: "HNO₂", name: "nitrous acid", Ka: 4.5e-4},
    {formula: "HClO", name: "hypochlorous acid", Ka: 3.0e-8},
];

// Weak bases (as the molecular base form)
var weakBases = [
    {formula: "NH₃", name: "ammonia", Kb: 1.8e-5, conjugateAcidFormula: "NH₄Cl", conjugateAcidName: "ammonium chloride"},
    {formula: "C₅H₅N", name: "pyridine", Kb: 1.7e-9, conjugateAcidFormula: "C₅H₅NHCl", conjugateAcidName: "pyridinium chloride"},
];

// Conjugate base salts of weak acids (basic anion + neutral cation)
var basicSalts = [
    {formula: "NaCH₃COO", name: "sodium acetate", Ka: 1.8e-5},
    {formula: "NaNO₂", name: "sodium nitrite", Ka: 4.5e-4},
    {formula: "NaCN", name: "sodium cyanide", Ka: 6.2e-10},
    {formula: "NaClO", name: "sodium hypochlorite", Ka: 3.0e-8},
    {formula: "NaCHO₂", name: "sodium formate", Ka: 1.8e-4},
];

var neutralSalts = [
    {formula: "NaCl"},
    {formula: "KBr"},
    {formula: "LiNO₃"},
    {formula: "NaClO₄"},
    {formula: "KI"},
];

// Helper functions
function randConc() {
    // Random concentration: 0.010 to 3.0, rounded to 2 sig figs
    var val = Math.random() * 2.99 + 0.01;
    if (val < 0.1) {
        return Math.round(val * 1000) / 1000;
    } else {
        return Math.round(val * 100) / 100;
    }
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function roundpH(val) {
    return Math.round(val * 100) / 100;
}

// Question generators - each returns {text, category, pH, explanation}
function generateStrongAcid() {
    var acid = pickRandom(strongAcids);
    var conc = randConc();
    var Hconc = conc * acid.nH;
    var pH = roundpH(-Math.log10(Hconc));
    return {
        text: conc + " M " + acid.formula,
        category: "Strong acid",
        pH: pH,
        explanation: "[H⁺] = " + (acid.nH > 1 ? acid.nH + " × " : "") + conc + " = " + Hconc.toPrecision(2) + " M, pH = -log(" + Hconc.toPrecision(2) + ") = " + pH.toFixed(2)
    };
}

function generateStrongBase() {
    var base = pickRandom(strongBases);
    var conc = randConc();
    var OHconc = conc * base.nOH;
    var pOH = -Math.log10(OHconc);
    var pH = roundpH(14 - pOH);
    return {
        text: conc + " M " + base.formula,
        category: "Strong base",
        pH: pH,
        explanation: "[OH⁻] = " + (base.nOH > 1 ? base.nOH + " × " : "") + conc + " = " + OHconc.toPrecision(2) + " M, pOH = -log(" + OHconc.toPrecision(2) + ") = " + pOH.toFixed(2) + ", pH = 14 - " + pOH.toFixed(2) + " = " + pH.toFixed(2)
    };
}

function generateWeakAcid() {
    var acid = pickRandom(weakAcids);
    var conc = randConc();
    var H = Math.sqrt(acid.Ka * conc);
    var pH = roundpH(-Math.log10(H));
    return {
        text: conc + " M " + acid.formula,
        category: "Weak acid",
        pH: pH,
        explanation: "[H⁺] = √(Ka × C) = √(" + acid.Ka.toExponential(1) + " × " + conc + ") = " + H.toExponential(2) + " M, pH = " + pH.toFixed(2)
    };
}

function generateWeakBaseSalt() {
    // A salt like NaNO₂ where the anion is the conjugate base of a weak acid
    var salt = pickRandom(basicSalts);
    var conc = randConc();
    var Kb = Kw / salt.Ka;
    var OH = Math.sqrt(Kb * conc);
    var pOH = -Math.log10(OH);
    var pH = roundpH(14 - pOH);
    return {
        text: conc + " M " + salt.formula,
        category: "Weak base",
        pH: pH,
        explanation: "Kb = Kw/Ka = " + Kb.toExponential(1) + ", [OH⁻] = √(Kb × C) = √(" + Kb.toExponential(1) + " × " + conc + ") = " + OH.toExponential(2) + " M, pOH = " + pOH.toFixed(2) + ", pH = " + pH.toFixed(2)
    };
}

function generateWeakBaseMolecular() {
    // A molecular weak base like NH₃
    var base = pickRandom(weakBases);
    var conc = randConc();
    var OH = Math.sqrt(base.Kb * conc);
    var pOH = -Math.log10(OH);
    var pH = roundpH(14 - pOH);
    return {
        text: conc + " M " + base.formula,
        category: "Weak base",
        pH: pH,
        explanation: "[OH⁻] = √(Kb × C) = √(" + base.Kb.toExponential(1) + " × " + conc + ") = " + OH.toExponential(2) + " M, pOH = " + pOH.toFixed(2) + ", pH = " + pH.toFixed(2)
    };
}

function generateAcidicSalt() {
    // Conjugate acid of a weak base, e.g. NH₄Cl, C₅H₅NHCl
    var base = pickRandom(weakBases);
    var conc = randConc();
    var Ka = Kw / base.Kb;
    var H = Math.sqrt(Ka * conc);
    var pH = roundpH(-Math.log10(H));
    return {
        text: conc + " M " + base.conjugateAcidFormula + " (" + base.conjugateAcidName + ")",
        category: "Weak acid",
        pH: pH,
        explanation: "Ka = Kw/Kb = " + Ka.toExponential(1) + ", [H⁺] = √(Ka × C) = √(" + Ka.toExponential(1) + " × " + conc + ") = " + H.toExponential(2) + " M, pH = " + pH.toFixed(2)
    };
}

function generateNeutralSalt() {
    var salt = pickRandom(neutralSalts);
    var conc = randConc();
    return {
        text: conc + " M " + salt.formula,
        category: "Neutral",
        pH: 7.00,
        explanation: "Both ions are spectators (strong acid cation + strong acid anion), so pH = 7.00"
    };
}

function generateBuffer() {
    var acid = pickRandom(weakAcids);
    var concAcid = randConc();
    var concBase = randConc();
    // Build a salt name from the acid
    var saltFormula = "Na" + acid.formula.replace(/^H/, "");
    var pKa = -Math.log10(acid.Ka);
    var pH = roundpH(pKa + Math.log10(concBase / concAcid));
    return {
        text: concAcid + " M " + acid.formula + " / " + concBase + " M " + saltFormula,
        category: "Buffer",
        pH: pH,
        explanation: "pKa = -log(" + acid.Ka.toExponential(1) + ") = " + pKa.toFixed(2) + ", pH = pKa + log([A⁻]/[HA]) = " + pKa.toFixed(2) + " + log(" + concBase + "/" + concAcid + ") = " + pH.toFixed(2)
    };
}

// All generators with equal weight
var generators = [
    generateStrongAcid,
    generateStrongBase,
    generateWeakAcid,
    generateWeakBaseSalt,
    generateWeakBaseMolecular,
    generateAcidicSalt,
    generateNeutralSalt,
    generateBuffer,
];

var currentQuestion = null;

function newQuestion() {
    var gen = pickRandom(generators);
    currentQuestion = gen();
    document.querySelector(".question").innerHTML =
        "Categorize and calculate the pH of <strong>" + currentQuestion.text + "</strong>.";
    document.querySelector("input.form-control").value = "";
    document.querySelector(".soln").hidden = true;
}

function checkAnswer() {
    if (!currentQuestion) return;
    var userAnswer = parseFloat(document.querySelector("input.form-control").value);
    var soln = document.querySelector(".soln");
    soln.hidden = false;

    if (isNaN(userAnswer)) {
        soln.innerHTML = "<strong>Category:</strong> " + currentQuestion.category +
            "<br><strong>pH = " + currentQuestion.pH.toFixed(2) + "</strong>" +
            "<br>" + currentQuestion.explanation;
        soln.className = "soln text-info";
        return;
    }

    var diff = Math.abs(userAnswer - currentQuestion.pH);
    if (diff < 0.05) {
        soln.innerHTML = "✓ Correct! pH = " + currentQuestion.pH.toFixed(2) +
            "<br><strong>Category:</strong> " + currentQuestion.category +
            "<br>" + currentQuestion.explanation;
        soln.className = "soln text-success";
    } else {
        soln.innerHTML = "✗ Not quite. pH = " + currentQuestion.pH.toFixed(2) +
            "<br><strong>Category:</strong> " + currentQuestion.category +
            "<br>" + currentQuestion.explanation;
        soln.className = "soln text-danger";
    }
}

// Set up on page load
document.addEventListener("DOMContentLoaded", function() {
    newQuestion();
    document.querySelector("button.btn-primary").addEventListener("click", checkAnswer);
});
