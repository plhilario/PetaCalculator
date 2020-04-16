function AddValue(val) {
	document.getElementById("box").value += val;
}

function display(val) {
	document.getElementById("box").value = val;
}

function clearAll() {
	document.getElementById("box").value = "";
}

function delBack() {
	let inputValue = document.getElementById("box").value;
	let del = inputValue.substr(0, inputValue.length - 1);
	document.getElementById("box").value = del;
}

function solve() {
	display(eval(document.getElementById("box").value))
}