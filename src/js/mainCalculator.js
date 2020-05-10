/*
 * Author: Paris Hilario (c) 2020
 */

let operatorMode = true; // to check if the expression can accept an operator
let decimalMode = true; // to allow or not allow the decimal point to be placed
let expression = document.getElementById("box"); // this is the placeholder
// where the values
// of the operators,
// operands, and decimal
// points get added to.
let operators = [ "*", "/", "+", "-" ]; // valid operator values.
let operands = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]; // valid
// operand
// values.
let negativeSign = false;
/*
 * add operands, operators, or decimal points
 */
function addValue(val) {

	if (expression.value.length >= 15) {
		alert("Exceeded amount of characters reached! Only 15 characters allowed.");
	} else if (isOperand(val)) {
		expression.value += val;
		operatorMode = false;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = checkForNegativeSign(expression.value);
	} else if (isOperator(val) && !operatorMode && negativeSign) {
		expression.value = expression.value + ")" + val;
		operatorMode = true;
		decimalMode = true;
		negativeSign = false;
	} else if (isDecimalPoint(val) && !decimalMode) {
		expression.value += val;
		decimalMode = true;
		operatorMode = true;
		negativeSign = true;
	} else if (val === "-" && operatorMode && !negativeSign) {
		expression.value = expression.value + "(" + val;
		operatorMode = true;
		decimalMode = true;
		negativeSign = true;
	} else if (isOperator(val) && !operatorMode && !negativeSign) {
		expression.value += val;
		operatorMode = true;
		decimalMode = true;
		negativeSign = false;
	}
}

/*
 * displays the answer for the evaluated expression by the solve function
 */
function display(answer) {
	expression.value = answer;
}

/*
 * clears all operands, operators, and decimal points from the input box
 */
function clearAll() {
	expression.value = "";
	operatorMode = true;
	decimalMode = true;
	negativeSign = false;
}

/*
 * Backspace Function
 */
function delBack() {
	let currentDisplayValue = expression.value;
	let newDisplay = deleteLastCharacter(currentDisplayValue);
	let lastCharAfterDelete = newDisplay.substr(newDisplay.length - 1, 1);
	if (isOperand(lastCharAfterDelete)) {
		if (expression.value.length == 0) {
			operatorMode = true;
		} else {
			operatorMode = false;
		}
		decimalMode = computeIfDecimalMode(newDisplay);
		negativeSign = checkForNegativeSign(newDisplay);
	} else if (isOperator(lastCharAfterDelete)
			&& checkForNegativeSign(expression.value)) {
		operatorMode = true;
		decimalMode = true;
		negativeSign = true;
	} else if (isOperator(lastCharAfterDelete)
			&& !checkForNegativeSign(expression.value)) {
		operatorMode = true;
		decimalMode = true;
		negativeSign = false;
	} else if (isDecimalPoint(lastCharAfterDelete)) {
		decimalMode = true;
		operatorMode = true;
		negativeSign = true;
	} else if (lastCharAfterDelete === "(") {
		expression.value = deleteLastCharacter(newDisplay);
		operatorMode = true;
		decimalMode = true;
		negativeSign = false;
	} else if (lastCharAfterDelete === ")") {
		expression.value = deleteLastCharacter(newDisplay);
		operatorMode = false;
		decimalMode = true;
		negativeSign = true;
	} else if (expression.value === "") {
		operatorMode = true;
		decimalMode = true;
		negativeSign = false;
	}
}

//
// evaluates the expression
//
function solve() {
	let str = expression.value;
	let lastChar = str.substr(str.length - 1);
	if (lastChar == ".") {
		alert("There is a decimal point in the end!");
	} else if (isOperator(lastChar)) {
		alert("There is an operator at the end!");
	} else if (expression.value == 0) {
		alert("There is nothing written in the expression.");
	} else if (checkForNegativeSign(expression.value)) {
		expression.value = expression.value + ")";
		display(eval(expression.value))
		operatorMode = false;
		decimalMode = false;
		negativeSign = false;
	} else {
		display(eval(expression.value))
		operatorMode = false;
		decimalMode = false;
	}
}
