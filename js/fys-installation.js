
function show(element) {
	const el  = document.getElementById(element);
	el.removeAttribute("hidden");
}


function hide(element) {
	const el  = document.getElementById(element);
	el.setAttribute("hidden", true);
}

window.show = show;
window.hide = hide;

function randomizeElements(listEl) {
	for (var i = listEl.children.length; i >= 0; i--) {
    listEl.appendChild(listEl.children[Math.random() * i | 0]);
	}
}



function randomInput() {
	const modelOptions = [ {"Teachable Machine Image": ["Classifier", "Dynamic Time Warping"]},
{"Teachable Machine Pose": ["Classifier", "Dynamic Time Warping"]},
{"Teachable Machine Audio": ["Classifier", "Dynamic Time Warping"]},
{"Wekinator Machine Pose": ["Classifier", "Regression", "Dynamic Time Warping"]},
{"Wekinator Machine Face": ["Classifier", "Regression", "Dynamic Time Warping"]},
{"Wekinator Machine Hand or Palm": ["Classifier", "Regression", "Dynamic Time Warping"]}
];
	const modelInt = Math.floor(Math.random()*6);
	const model = Object.keys(modelOptions[modelInt])[0];
	let output;
	if (model.includes("Teachable")) {
		if (Math.random()<0.8) {
			output = "Classifier";
		} else {
			output = "Dynamic Time Warping";
		}
	} else {
		const r = Math.random();
		if (r<0.6) {
			output = "Classifier";
		} else if (r<0.9) {
			output = "Regression";
		} else {
			output = "Dynamic Time Warping";
		}
	}
	let text = `${model} with a ${output} output.`;
	document.getElementById("suggested-model").innerText = text;
}

window.randomInput = randomInput;



const listDivs = document.querySelectorAll(".randomize-list ul")

listDivs.forEach(randomizeElements);