/*
 * This file contains the javascript functions for the 
 * add-on features in the calculator. 
 * 
 */

let memoryMode = false;
let Memory;
let negativeMemory = false;

/*
 * This function adds numbers into its memory for later purposes.
 */
function memoryStore() {

	if (memoryMode) {
		alert("There is already an expression in the memory.");
	} else if (!memoryMode && checkForOperators(expression.value)
			&& !checkForFirstNegativeSign()) {
		alert("There is an operator in the expression.");
	} else if (expression.value.length <= 0) {
		alert("There is nothing written in the expression.");
	} else if (!memoryMode && !checkForOperators(expression.value) && !checkForFirstNegativeSign()) {
		Memory = expression.value;
		memoryMode = true;
		decimalMode = computeIfDecimalMode(expression.value);
	} else if (!memoryMode && checkForFirstNegativeSign()) {
		Memory = expression.value;
		memoryMode = true;
		negativeMemory = true;
		decimalMode = computeIfDecimalMode(expression.value);
	} else if (!memoryMode && checkForDecimalPoint()) {
		alert("There is a decimal point at the end of the expression.");
	}
}

/*
 * This function adds the memory into the expression itself.
 */
function memoryRecall() {
	if (memoryMode && expression.value.length + Memory.length <= 15
			&& negativeMemory && operatorMode) {
		expression.value = expression.value + "(" + Memory;
		negativeSign = true;
		operatorMode = true;
		decimalMode = true;
	} else if (memoryMode && expression.value.length + Memory.length <= 15
			&& !negativeMemory && !computeIfDecimalMode) {
		expression.value += Memory;
		operatorMode = true;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = false;
	} else if (memoryMode && expression.value.length + Memory.length >= 15) {
		alert("Cannot add memory: character limit would be over 15!");
	} else if (!memoryMode) {
		alert("There is no memory!");
	} else if (memoryMode && expression.value.length + Memory.length <= 15
			&& negativeMemory && !operatorMode) {
		alert("Put an operator before recalling memory.");
	} else if (computeIfDecimalMode) {
		alert("Put an operator before recalling memory.")
	}
}

/*
 * This function removes the data embedded in the memory.
 */
function memoryCancel() {
	if (memoryMode) {
		Memory = "";
		memoryMode = false;
	} else if (!memoryMode) {
		alert("There is no memory!");
	}
}

/*
 * Checks for an operator
 */
function checkForOperators(value) {
	let operatorCount = 0;
	for (i = value.length - 1; i >= 0; i--) {
		let evalExpression = value.substr(i, 1);
		if (evalExpression == "+" || evalExpression == "-"
				|| evalExpression == "*" || evalExpression == "/") {
			operatorCount++;
		}
	}

	if (operatorCount == 0)
		return false;
	else
		return true;
}

function checkForFirstNegativeSign() {
	let firstNegativeSign = expression.value.substr(0, 1);
	if (firstNegativeSign === "-")
		return true;
	else
		return false;

}

function checkForDecimalPoint() {
	let decimalPoint = expression.value.substr(0, 1);
	if (decimalPoint === ".")
		return true;
	else
		return false;

}
