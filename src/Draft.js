let operatorMode = true;
let decimalMode = false;
let operators = [ "*", "/", "+", "-" ];
let operands = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
let decimal = [ "." ];
let expression = document.getElementById("box");

// add operands or operators
	function AddValue(val) {
		 /* iterate the characters in the string to check if it is a decimal point,
		 * operand, or operator
		 */
		for (i = 0; i < 10; i++) {
			if (expression.value.length >= 15) {
				alert("There is no more space for the calculator!");
			} else if (expression.value.length >= 14 && val == operators[i]) {
				alert("There is no more space for the calculator!");
			} else if (expression.value.length >= 14 && val == decimal[i]) {
				alert("There is no more space for the calculator!");
			} else if (val == operands[i]) {
				expression.value += val;
				operatorMode = false;
			} else if (val == operators[i] && operatorMode == false) {
				expression.value += val;
				operatorMode = true;
				decimalMode = false;
			} else if (val == decimal[i] && decimalMode == false) {
				expression.value += val;
				operatorMode = true;
				decimalMode = true;
		}
	}
	}
// clears all operators and operands
	function clearAll() {
		expression.value = "";
	}
// deletes one character from the string
	function delBack() {
		let string = expression;
		let lastChar = string.substr(string.length - 1); // this is to determinethe type of character that is being deleted.
		let del = string.substr(0, lastChar); // this will delete the last
											// character in the string.
	for (i = 0; i < 10; i++) {
		if (lastChar == operands[i]
				&& lastChar.substr(lastChar.length - 1) == operands[i]) {
			expression = del;
			operatorMode = false;
			let selectDecimal = string.substr(string.lastIndexOf(operators[i]),lastChar); // last known operator to last character in the string
			let decimalPoint = selectDecimal.indexOf("."); // this is to select this is to select whether it is safe to implement a decimal point or not (to avoid duplication in the string.)
			if (decimalPoint != -1) {
				decimalMode = true;
			} else if (decimalPoint == -1) {
				decimalMode = false;
			}
		} else if (lastChar == operands[i]
				&& lastChar.substr(lastChar.length - 1) == operators[i]) {
			expression = del;
			operatorMode = true;
			decimalMode = false;
		} else if (lastChar == operands[i]
				&& lastChar.substr(lastChar.length - 1) == decimal[i]) {
			expression = del;
			operatorMode = true;
			decimalMode = true;
		} else if (lastChar == operators[i]) {
			expression = del;
			operatorMode = false;
			let selectDecimal = string.substr(string.lastIndexOf(operators[i]),
					lastChar); // last known operator to last charcater in the string.
			let decimalPoint = selectDecimal.indexOf("."); // this is to select this is to select whether it is safe to implement a decimal point or not (to avoid duplication in the string.)
			if (decimalPoint != -1) {
				decimalMode = true;
			} else if (decimalPoint == -1) {
				decimalMode = false;
			}
		} else if (lastChar == decimal[i]
				&& lastChar.substr(lastChar.length - 1) == operands[i]) {
			expression = del;
			operatorMode = false;
			decimalMode = false;
		} else if (lastChar == decimal[i]
				&& lastChar.substr(lastChar.length - 1) == operators[i]) {
			expression = del;
			operatorMode = true;
			decimalMode = false;
		}
	}
}
// Get the variable and insert in input box
	function display(val) {
		expression.value = val;
	}
// solves the string
	function solve() {
		if (operatorMode == true) {
			alert("The string cannot be evaluated because the string is open!")
		} else {
			display(eval(expression.value));
			operatorMode = true;
		}
	}