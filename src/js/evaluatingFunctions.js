/*
 * This file contains functions that evaluate the expression.value for specific values.
 */

/*
 * checks if value is an operator
 */
function isOperator(value) {
	return operators.includes(value);
}

/*
 * checks if value is an operand
 */
function isOperand(value) {
	return operands.includes(value);
}

/*
 * checks if value is a decimal point
 */
function isDecimalPoint(value) {
	return value == ".";
}

/*
 * deletes the last character of the string
 */
function deleteLastCharacter(value) {
	let del = value.substr(0, value.length - 1);
	expression.value = del;

	return del;
}

/*
 * counts the number of decimal points in the number to avoid duplicate decimal
 * points.
 */
function computeIfDecimalMode(value) {
	let decimalCount = 0;
	for (i = value.length - 1; i >= 0; i--) {
		let evalChar = value.substr(i, 1);
		if (evalChar == ".") {
			decimalCount++;
		} else if (evalChar == "+" || evalChar == "-" || evalChar == "*"
				|| evalChar == "/") {
			break;
		}
	}

	if (decimalCount == 0)
		return false;
	else
		return true;
}

/*
 * Checks for a negative sign.
 */
function checkForNegativeSign(value) {
	let negativeCount = 0;
	for (i = value.length - 1; i >= 0; i--) {
		let evalChar = value.substr(i, 1);
		let beforeOperator = value.substr(i - 1, 1);
		if (evalChar === "-" && beforeOperator === "(") {
			negativeCount++;
			break;
		} else if (evalChar === "+" || evalChar === "-"
				&& !beforeOperator === "(" || evalChar === "*"
				|| evalChar === "/") {
			break;
		}

	}

	if (negativeCount == 0)
		return false;
	else
		return true;
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

/*
 * Checks if the first character in the expression is a negative sign.
 */
function checkForFirstNegativeSign() {
	let firstNegativeSign = expression.value.substr(0, 1);
	if (firstNegativeSign === "-")
		return true;
	else
		return false;

}

/*
 * Checks for the last character in the expression if it's either a decimal
 * point or operator.
 */
function checkLastCharacter() {
	let lastChar = expression.value.substr(expression.value.length - 1, 1);
	if (lastChar === ".") {
		sign = lastChar;
		return true;
	} else if (lastChar === "+" || lastChar === "-" || lastChar === "*"
			|| lastChar === "/") {
		sign = lastChar;
		return true;
	} else {
		return false;
	}
}