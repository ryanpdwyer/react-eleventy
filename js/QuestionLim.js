import { React, useState, useRef } from 'https://unpkg.com/es-react/dev';

import { almostEq, getFunctionByName } from './util.js';


export function DispP({display=false, ...props}) {
	return display ? <p>{props.children}</p> : null;
}


export function FeedbackP({display=false, value=0, ...props}) {
	display = display || (value === props.ans);

	display = display || ((props.min < value) && (value < props.max));

	if (props.relErr) {
		display = display || almostEq(value, props.ans, props.relErr);
	}

	return display ? <p>{props.children}</p> : null;
}

export function IncorrectFeedback({guesses, maxGuesses, digits=2, ...props}) {
	let guessesRemaining =  maxGuesses-guesses;
	if (!props.display) {
		return null;
	}
	if (guesses > 0) {
		if (guessesRemaining > 0) {
			return <p>You have {maxGuesses-guesses} attempts remaining.</p>;
		} else {
			return <p>Incorrect.
			The correct answer is {props.answer.toFixed(digits)} {props.inputLabel}</p>;
		}
	} else {
		return null;
	}
}

export function IncorrectFeedbackText({guesses, maxGuesses, ...props}) {
	let guessesRemaining =  maxGuesses-guesses;
	if (!props.display) {
		return null;
	}
	if (guesses > 0) {
		if (guessesRemaining > 0) {
			return <p>Incorrect. You have {maxGuesses-guesses} attempts remaining.</p>;
		} else {
			return <p>Incorrect.
			The correct answer is {props.answer}.</p>;
		}
	} else {
		return null;
	}
}



export function QuestionLimF({correctFeedback="Correct!",
					   incorrectFeedbackDigits=2,
					   ...props}) {
	const inputRef = useRef(null);
	const [value, setValue] = useState("");
	const [guesses, setGuesses] = useState(0);
	const maxGuesses = props.guesses || 3;
	const relErr = props.relErr || 0.015;
	const absErr = props.absErr || 1e-12;

	const correct = almostEq(value, props.answer, relErr, absErr);

	const disabled = (guesses >= maxGuesses) || correct ;

	function check(event) {
		let val = parseFloat(inputRef.current.value); // A little clunky...
		setValue(val);
		if (!almostEq(val, props.answer, relErr, absErr)) {
			setGuesses(guesses + 1);
		}

	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			check(event);
		}
	}
	let feedback = props.feedback || [];

	// Convert to an array if given just a single feedback element.
	if (!Array.isArray(feedback)) {
		feedback = [feedback];
	}

	let condIncorrectFeedback = feedback.map((x, i) => {
		x.value = value;
		x.key = i; // Should be okay since I am never re-ordering the feedback
		return FeedbackP(x);
	});

	let jsx = (<div className="question">
				{props.children}
				<p>
					<input type="number" ref={inputRef} disabled={disabled}
						onKeyPress={handleKeyPress} />
					&nbsp;
					{props.inputLabel}
					<button className="check btn btn-primary" onClick={check}
							disabled={disabled}>
						Check
					</button>
				</p>
					<DispP display={correct}>
						{correctFeedback}
					</DispP>
					{condIncorrectFeedback}
					<IncorrectFeedback guesses={guesses} maxGuesses={maxGuesses}
						digits={incorrectFeedbackDigits} {...props}
						display={!correct} />

			</div>);
	return props.hidden ? null : jsx;
}


export function QuestionF({correctFeedback="Correct!",
					   incorrectFeedbackDigits=2,
					   ...props}) {
	const inputRef = useRef(null);
	const [value, setValue] = useState("");
	const [guesses, setGuesses] = useState(0);
	const relErr = props.relErr || 0.015;
	const absErr = props.absErr || 1e-12;

	const correct = almostEq(parseFloat(value), props.answer, relErr, absErr);

	const disabled = correct;

	function check(event) {
		let val = parseFloat(inputRef.current.value); // A little clunky...
		setValue(val);
		setGuesses(guesses+1);
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			check(event);
		}
	}
	let feedback = props.feedback || [];

	// Convert to an array if given just a single feedback element.
	if (!Array.isArray(feedback)) {
		feedback = [feedback];
	}

	let condIncorrectFeedback = feedback.map((x, i) => {
		x.value = value;
		x.key = i; // Should be okay since I am never re-ordering the feedback
		return FeedbackP(x);
	});

	let jsx = (<div className="question">
				{props.children}
				<p>
					<input type="number" ref={inputRef} disabled={disabled}
						onKeyPress={handleKeyPress} />
					&nbsp;
					{props.inputLabel}
					<button className="check btn btn-primary" onClick={check}
							disabled={disabled}>
						Check
					</button>
				</p>
					<DispP display={correct}>
						{correctFeedback}
					</DispP>
					{condIncorrectFeedback}
					<DispP display={!correct && guesses > 0}>Incorrect.</DispP>
			</div>);
	return props.hidden ? null : jsx;
}



function RadioOption({ind, name, checked, children, onClick, disabledGuesses=false, ...props}) {
	return (<li><input type="radio"
	disabled={disabledGuesses} name={name} checked={checked} onClick={onClick} id={`${ind}-${name}`} value={ind} {...props} />
	<label htmlFor={`${ind}-${name}`}>{children}</label></li>);
}

function CheckOption({ind, name, children, disabledGuesses=false, ...props}) {
	return (<p><input type="checkbox"
	disabled={disabledGuesses} name={name} id={`${ind}-${name}`} value={ind} {...props} />
	<label htmlFor={`${ind}-${name}`}>{children}</label>
	</p>);
}


export function MCQ({name, options, defaultFeedback,
	correctFeedback="Correct!",
	guesses=3,
	disabled=false,
	update=()=>null,
 ...props}) {

	let [selected, setSelected] = useState(-9999);
	const [userGuesses, setUserGuesses] = useState(0);

	let answer = options.findIndex(x => x.correct);

	function changeHandler(event) {
		console.log(`ChangeHandlerCalled from ${name}, ${event.target.value}, ${selected}`);
		setSelected(parseInt(event.target.value));
		setUserGuesses(userGuesses + 1);
	}

	let correct = selected === answer;
	let disabledGuesses = disabled || userGuesses >= guesses || correct;

	console.log(`Rerendered MCQ ${name}, selected: ${selected}, selected type: ${typeof selected}`);

	let optionsJsx = options.map((x, i) => (<RadioOption key={i} ind={i}
	disabled={disabledGuesses} name={name} checked={i===selected} onClick={changeHandler}>{x.children}</RadioOption>));

	let optionFeedback = selected >= 0 ? options[selected].feedback : null;

	let showDefaultFeedback = defaultFeedback && (!correct) && userGuesses > 0;

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let jsx = (<div className="question">
	{props.children}
	<ol type="A">
	{optionsJsx}
	</ol>
	<div className="feedback">
	<DispP display={correct}>{correctFeedback}</DispP>
	<DispP display={showDefaultFeedback}>{defaultFeedback}</DispP>
	<DispP display={optionFeedback}>{optionFeedback}</DispP>
	<IncorrectFeedbackText guesses={userGuesses} maxGuesses={guesses} answer={alphabet.charAt(answer)}
	{...props}
	display={!correct} />
	</div>
	</div>);
	return props.hidden ? null : jsx;
}

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;
  
	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.
  
	for (var i = 0; i < a.length; ++i) {
	  if (a[i] !== b[i]) return false;
	}
	return true;
  }
  
export function MCQMulti({name, options, defaultFeedback,
	correctFeedback="Correct!",
	guesses=3,
	disabled=false,
	update=()=>null,
 ...props}) {

	const [userGuesses, setUserGuesses] = useState(0);
	const [correct, setCorrect] = useState(false);

	let answer = options.map(x => x.correct===true);



	const checkAnswer = () => {
		const currentAnswer = options.map((x, i) => document.getElementById(`${i}-${name}`).checked
		);
		setUserGuesses(userGuesses+1);
		if (arraysEqual(currentAnswer, answer)) {
			setCorrect(true);
		} else {
			setCorrect(false);
		}
		console.log(arraysEqual(currentAnswer, answer));
	}

	// let correct = selected === answer;
	let disabledGuesses = disabled || userGuesses >= guesses || correct;


	let optionsJsx = options.map((x, i) => (<CheckOption key={i} ind={i}
	disabled={disabledGuesses} name={name} >{x.children}</CheckOption>));

	// let optionFeedback = selected >= 0 ? options[selected].feedback : null;

	let showDefaultFeedback = defaultFeedback && (!correct) && userGuesses > 0;

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let jsx = (<div className="question">
	{props.children}
	{optionsJsx}
	<button onClick={checkAnswer} className="btn btn-primary">Check answer</button>
	<br/>
	<div className="feedback">
	<DispP display={correct}>{correctFeedback}</DispP>
	<DispP display={showDefaultFeedback}>{defaultFeedback}</DispP>
	{/* <DispP display={optionFeedback}>{optionFeedback}</DispP> */}
	<IncorrectFeedbackText guesses={userGuesses} maxGuesses={guesses} answer={alphabet.charAt(answer)}
	{...props}
	display={!correct} />
	</div>
	</div>);
	return props.hidden ? null : jsx;
}

