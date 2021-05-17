const digits = document.querySelectorAll('.digit')
display = document.querySelector('#result')
history = document.querySelector('#operation');


//OPERATIONS
function add (num1, num2) {
	return num1 + num2
}

function subtract (num1, num2) {
	return num1 - num2	
}

function multiply (num1, num2) {
    return num1 * num2
}

function divide (num1, num2) {
    return num1 / num2
}

function operate (operator, num1, num2) {
    if (operator === 'add') {
        return add(num1, num2);
    }
    if (operator === 'subtract') {
        return subtract(num1, num2);
    }
    if (operator === 'multiply') {
        return multiply(num1, num2);
    }
    if (operator === 'divide') {
        return divide(num1, num2);
    }
}

function operateMultiple (array) {
    while (array.length > 1) {
        if (array.includes('divide')) {
            let pos = array.findIndex(element => (element == 'divide'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('multiply')) {
            let pos = array.findIndex(element => (element == 'multiply'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('subtract')) {
            let pos = array.findIndex(element => (element == 'subtract'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('add')) {
            let pos = array.findIndex(element => (element == 'add'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
    }
    
}



digits.forEach(element => {
    element.addEventListener('click', () => {
        document.getElementById("operation").innerHTML +=
        element.innerHTML;       
    })    
});