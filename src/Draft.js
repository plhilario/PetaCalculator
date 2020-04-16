let operatorMode = true; // to check if the expression can accept an operator
let decimalMode = true; // to allow or not allow the decimal point to be placed
let expression = document.getElementById("box"); // this is where the values
													// of the operators,
													// operands, and decimal
													// points get added to.
let operators = [ "*", "/", "+", "-" ]; // an array used to iterate the parameter val.
let operands = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]; // an array used to iterate the parameter val in a function.
// add operands, operators, or decimal points
function AddValue(val) {
	if (isOperand(val)) {
		expression.value += val;
		operatorMode = false;
	} else if (isOperator(val) && !operatorMode) {
		expression.value += val;
		operatorMode = true;
		decimalMode = true;
	} else if (isDecimalPoint(val) && decimalMode) {
		expression.value += val;
		decimalMode = false;
		operatorMode = true;
	}
}
// displays the answer for the evaluated expression by the solve function
function display(answer) {
	expression.value = answer;
	if(answer.includes(".")) {
		decimalMode = false;
		operatorMode = false;
	}
}
// clears all operands, operators, and decimal points from the input box
function clearAll() {
	expression.value = "";
	operatorMode = true;
	decimalMode = true;
}
// Backspace Function
function delBack() {
	let currentDisplayValue = expression.value;
	let lastCharAfterDelete = currentDisplayValue.substr(currentDisplayValue.length - 2, 1);
	if (isOperand(lastCharAfterDelete)) {
		deleteLastCharacter(currentDisplayValue);
		operatorMode = false;
	} else if (isOperator(lastCharAfterDelete)) {
		deleteLastCharacter(currentDisplayValue);
		operatorMode = true;
		decimalMode = true;
	} else if (isDecimalPoint(lastCharAfterDelete)) {
		deleteLastCharacter(currentDisplayValue);
		decimalMode = false;
		operatorMode = true;
	}
}
// evaluates the expression
function solve() {
	let str = expression.value;
	let lastChar = str.substr(str.length - 1);
	if(lastChar == ".") {
		alert("There is a decimal point in the end!");
	} else if (operatorMode) {
		alert("There is an operator at the end!");
	} else {
		display(eval(expression.value))
		operatorMode = true;
		decimalMode = true;
	}
}

function isOperator(value) {
	return operators.includes(value);
}

function isOperand(value) {

	return operands.includes(value);
}

function isDecimalPoint(value) {

	return value == ".";
}

function deleteLastCharacter(value) {
	let del = value.substr(0, value.length - 1);
	expression.value = del;
}
