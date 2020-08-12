import { React, useState, useRef } from 'https://unpkg.com/es-react@16.13.1';
import htm from 'https://unpkg.com/htm?module';

// Initialize htm
const html = htm.bind(React.createElement);

import { almostEq, getFunctionByName } from './util.js';


export function DispP({display=false, ...props}) {
	return display ? html`<p>${props.children}</p>` : null;
}


export function FeedbackP({display=false, value=0, ...props}) {
	display = display || (value === props.ans);

	display = display || ((props.min < value) && (value < props.max));

	if (props.relErr) {
		display = display || almostEq(value, props.ans, props.relErr);
	}

	return display ? html`<p>${props.children}</p>` : null;
}

export function IncorrectFeedback({guesses, maxGuesses, digits=2, ...props}) {
	let guessesRemaining =  maxGuesses-guesses;
	if (!props.display) {
		return null;
	}
	if (guesses > 0) {
		if (guessesRemaining > 0) {
			return html`<p>You have ${maxGuesses-guesses} attempts remaining.</p>`;
		} else {
			return html`<p>Incorrect.
			The correct answer is ${props.answer.toFixed(digits)} ${props.inputLabel}</p>`;
		}
	} else {
		return null;
	}
}




exportfunction QuestionLimF({correctFeedback="Correct!",
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

	// <p>Incorrect. The correct answer is {props.answer}.</p>
	// <p>Try again. You have {maxGuesses-g} gueses
	// 					remaining</p>
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

	// This works, but doesn't let me give a default feedback if all of the
	// other feedback turns out to be false (answer doesn't match any other
	// known issue).

	// 


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