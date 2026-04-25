const lect = document.getElementById("lecture-grade");
const lab = document.getElementById("lab-grade");
const current = document.getElementById("current-grade");
const finalExam = document.getElementById("final-grade");
const overall = document.getElementById("overall-grade");

function calcCurrentGrade() {
    current.value = ((lect.value * 2 + lab.value * 1) / 3).toFixed(1);
}

lect.addEventListener("input", calcCurrentGrade);
lab.addEventListener("input", calcCurrentGrade);

document.getElementById("calc").onclick = function () {
    overall.value = (current.value * 0.75 + finalExam.value * 0.25).toFixed(1);
};

document.getElementById("calc-final").onclick = function () {
    finalExam.value = (overall.value * 4 - current.value * 3).toFixed(1);
};
