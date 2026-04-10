function revealAnswers() {
	Array.from(document.querySelectorAll("span.answer")).forEach( x => x.hidden = false);
	Array.from(document.querySelectorAll("div.answer")).forEach( x => x.style.display = "block");
	Array.from(document.querySelectorAll("li.answer")).forEach( x => x.hidden = false);
}

function revealpHs() {
	Array.from(document.querySelectorAll("div.pH-ans")).forEach( x => x.style.display = "block");
	Array.from(document.querySelectorAll("li.pH-ans")).forEach( x => x.hidden = false);
}