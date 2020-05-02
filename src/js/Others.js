/*
 * This file contains the javascript functions for the 
 * add-on features in the calculator. 
 * 
 */

let memoryMode = false;
let Memory;

function memoryStore() {
	
	if(memoryMode == true) {
		alert("There is already an expression in the memory.");
	} else if (memoryMode == false && checkForOperators(expression.value) == false) {
		Memory = expression.value;
		memoryMode = true;
	} else if (checkForOperators(expression.value)) {
		alert("There is an operator in the expression.");
	} 
	
}

function memoryRecall() {
	if(memoryMode && expression.value.length + Memory.length <= 15) {
		expression.value += Memory;
	} else if(memoryMode && expression.value.length + Memory.length >= 15) {
		alert("Cannot add memory: character limit would be over 15!");
	} else if(!memoryMode) {
		alert("There is no memory yet!");
	}
}

function memoryCancel() {
	Memory = "";
	memoryMode = false;
}

function checkForOperators(value) {
	let operatorCount = 0;
	for (i=value.length-1; i>=0; i--) {
		let evalExpression = value.substr(i,1);
		if (evalExpression == "+" || evalExpression == "-" || evalExpression == "*" || evalExpression == "/") {
			operatorCount++;
		}
	}
	
	if (operatorCount <= 0) return false;
	else return true;
}