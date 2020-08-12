import { React, useState, useRef } from 'https://unpkg.com/es-react@16.13.1';

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
					<button className="check" onClick={check}
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


export function MCQ({name, options, defaultFeedback,
	correctFeedback="Correct!",
	guesses=3,
	disabled=false,
	update=()=>null,
 ...props}) {

	let [selected, setSelected] = useState(-1);
	const [userGuesses, setUserGuesses] = useState(0);

	let answer = options.findIndex(x => x.correct);

	function changeHandler(event) {
		setSelected(parseInt(event.target.value));
		setUserGuesses(userGuesses + 1);
	}

	let correct = selected === answer;
	let disabledGuesses = disabled || userGuesses >= guesses || correct;

	let optionsJsx = options.map((x, i) =>
	(<li key={i}><input type="radio"
	disabled={disabledGuesses} name={name} checked={i===selected} key={i} onClick={changeHandler} value={i} />
	<label htmlFor={name}>{x.children}</label></li>)
	);

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

