/*
 * This file contains the javascript functions for the 
 * add-on features in the calculator. 
 */

let memoryMode = false; // lets the memory buttons decide to cache the given
// expression.
let Memory; // the variable where the expression is stored.
let negativeMemory = false; // used if the memory is a negative operand.
let sign = "";
/*
 * This function adds numbers into its memory for later purposes.
 */
function memoryStore() {

	if (memoryMode) {
		alert("There is already an expression in the memory.");
	} else if (checkForOperators(expression.value)
			&& !checkForFirstNegativeSign()) {
		alert("There is an operator in the expression.");
	} else if (expression.value.length <= 0) {
		alert("There is nothing written in the expression.");
	} else if (checkLastCharacter()) {
		alert("There is a decimal point or operator at the end of the expression.");
	} else if (!checkForOperators(expression.value)
			&& !checkForFirstNegativeSign() && !checkLastCharacter()) {
		Memory = expression.value;
		memoryMode = true;
		decimalMode = computeIfDecimalMode(expression.value);
		document.getElementById("box2").value = "Memory: " + Memory;
	} else if (checkForFirstNegativeSign()) {
		Memory = expression.value;
		memoryMode = true;
		negativeMemory = true;
		decimalMode = computeIfDecimalMode(expression.value);
		document.getElementById("box2").value = "Memory: " + Memory;
	}
}

/*
 * This function adds the memory into the expression itself.
 */
function memoryRecall() {
	if (!memoryMode) {
		alert("There is no memory!");
	} else if (!checkLastCharacter() && expression.value.length > 0) {
		alert("Please add an operator before recalling memory.");
	} else if (expression.value.length + Memory.length >= 15) {
		alert("Cannot add memory because it would go over 15 characters.");
	} else if (checkLastCharacter() && !isOperator(sign)) {
		alert("The expression ends with a decimal point.");
	} else if (checkLastCharacter() && isOperator(sign) && negativeSign) {
		alert("There is a negative sign at the end of the expression.");
	} else if (expression.value.length == 0 && !negativeMemory) {
		expression.value += Memory;
		operatorMode = false;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = false;
	} else if (expression.value.length == 0 && negativeMemory) {
		expression.value = expression.value + "(" + Memory;
		operatorMode = false;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = true;
	} else if (checkLastCharacter() && isOperator(sign) && !negativeMemory
			&& !negativeSign) {
		expression.value += Memory;
		operatorMode = false;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = false;
	} else if (checkLastCharacter() && isOperator(sign) && negativeMemory
			&& !negativeSign) {
		expression.value = expression.value + "(" + Memory;
		operatorMode = false;
		decimalMode = computeIfDecimalMode(expression.value);
		negativeSign = true;
	}
}

/*
 * This function removes the data embedded in the memory.
 */
function memoryCancel() {
	if (memoryMode) {
		Memory = "";
		memoryMode = false;
		document.getElementById("box2").value = "";
	} else {
		alert("There is no memory!");
	}
}

