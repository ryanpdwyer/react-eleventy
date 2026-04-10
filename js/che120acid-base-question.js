
var strongAcids = ["HCl", "HBr", "HI", "HNO₃", "HClO₄"];

var strongBases = ["NaOH", "KOH", "Li₂O", "Ca(OH)₂", "Na₂O"];

var weakAcids = {
	"CH₃COOH": 1.8e-5,
};

var weakBases = {
	"NH₃": 1.8e-5
};

var neutralCations = {
	"Na": 1, "Li": 1, "K": 1
};

var neutralAnions = {"Cl": -1, "Br": -1, "I": -1, "NO₃": -1, "ClO₄": -1};

var basicAnions = {"CH₃COO": 1e-14/1.8e-5};

var acidicCations = {"NH₄": 1e-14/1.8e-5};


function strongAcid() {
	// {'text': };
	conc = (Math.random()*3)
}