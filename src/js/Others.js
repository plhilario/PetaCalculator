/*
 * This file contains the javascript functions for the 
 * add-on features in the calculator. 
 * 
 */

let sign;
let memoryMode = false;
let Memory;
let negativeMemory = false;

function memoryStore() {

	if (memoryMode) {
		alert("There is already an expression in the memory.");
	} else if (!memoryMode && checkForOperators(expression.value)
			&& !sign === "-") {
		alert("There is an operator in the expression.");
	} else if (expression.value.length <= 0) {
		alert("There is nothing written in the expression.");
	} else if (!memoryMode && !checkForOperators(expression.value)) {
		Memory = expression.value;
		memoryMode = true;
	} else if (!memoryMode && checkForOperators(expression.value)
			&& sign === "-" && !checkForParentheses(expression.value)) {
		Memory = expression.value;
		memoryMode = true;
		negativeMemory = true;
	} else if (!memoryMode && checkForOperators(expression.value)
			&& sign === "-" && checkForParentheses(expression.value)) {
		alert("There is a parentheses in the expression.");
	}

}

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

function memoryCancel() {
	if (memoryMode) {
		Memory = "";
		memoryMode = false;
	} else if (!memoryMode) {
		alert("There is no memory!");
	}
}

function checkForOperators(value) {
	let operatorCount = 0;
	for (i = value.length - 1; i >= 0; i--) {
		let evalExpression = value.substr(i, 1);
		if (evalExpression == "+" || evalExpression == "-"
				|| evalExpression == "*" || evalExpression == "/") {
			operatorCount++;
			sign = evalExpression;
		}
	}

	if (operatorCount <= 0)
		return false;
	else
		return true;
}

function checkForParentheses(value) {
	let parenthesesCount = 0;
	for (i = value.length - 1; i >= 0; i--) {
		let evalExpression = value.substr(i, 1);
		if (evalExpression == "(" || evalExpression == ")") {
			parenthesesCount++;
		}
	}

	if (parenthesesCount <= 0)
		return false;
	else
		return true;
}