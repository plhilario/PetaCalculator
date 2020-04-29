let operatorMode = true; // to check if the expression can accept an operator
let decimalMode = true; // to allow or not allow the decimal point to be placed
let expression = document.getElementById("box"); // this is where the values
													// of the operators,
													// operands, and decimal
													// points get added to.
let operators = [ "*", "/", "+", "-" ]; // an array used to iterate the parameter val.
let operands = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]; // an array used to iterate the parameter val in a function.
// add operands, operators, or decimal points
function addValue(val) {
	
	if (expression.value.length >= 15) {
		alert("Exceeded amount of characters reached! Only 15 characters allowed.");
	} else if (isOperand(val)) {
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
	let newDisplay = deleteLastCharacter(currentDisplayValue);
	let lastCharAfterDelete = newDisplay.substr(newDisplay.length - 1, 1);
	if (isOperand(lastCharAfterDelete)) {
		operatorMode = false;
		decimalMode = computeIfDecimalMode(newDisplay);
	} else if (isOperator(lastCharAfterDelete)) {
		operatorMode = true;
		decimalMode = true;
	} else if (isDecimalPoint(lastCharAfterDelete)) {
		decimalMode = false;
		operatorMode = false;
	}
}
// evaluates the expression
function solve() {
	let str = expression.value;
	let lastChar = str.substr(str.length - 1);
	if(lastChar == ".") {
		alert("There is a decimal point in the end!");
	} else if (isOperator(lastChar)) {
		alert("There is an operator at the end!");
	} else {
		display(eval(expression.value))
		operatorMode = false;	
		decimalMode = true;
	}
}

// checks if the added value is an operator
function isOperator(value) {
	return operators.includes(value);
}
// checks if the added value is an operand
function isOperand(value) {
	return operands.includes(value);
}
// checks if the added value is a decimal point
function isDecimalPoint(value) {
	return value == ".";
}

// deletes the last character of the string
function deleteLastCharacter(value) {
	let del = value.substr(0, value.length - 1);
	expression.value = del;
	
	return del;
}
// counts the number of decimal points in the number to avoid duplicate decimal points.
function computeIfDecimalMode(value) {
	let decimalCount = 0;
	for (i=value.length-1; i>=0; i--) {
		let evalChar = value.substr(i,1);
		if (evalChar == ".") {
			decimalCount++;
		} else if (evalChar == "+" || evalChar == "-" || evalChar == "*" || evalChar == "/") {
			break;
		}
	}
	
	if (decimalCount <= 0) return true;
	else return false;
}
