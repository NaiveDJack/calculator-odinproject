const digits = document.querySelectorAll('.digit'),
operators = document.querySelectorAll('.operator'),
equals = document.querySelector('#equals'),
allClear = document.querySelector('#all-clear'),
backspace = document.querySelector('#backspace'),
display = document.querySelector('#display'),
history = document.querySelector('#history');

const operation = []

//OPERATIONS
function add (num1, num2) {
	console.log(num1 + num2)
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
    if (operator === '+') {
        return add(num1, num2);
    }
    if (operator === '-') {
        return subtract(num1, num2);
    }
    if (operator === '*') {
        return multiply(num1, num2);
    }
    if (operator === '/') {
        return divide(num1, num2);
    }
}

function operateMultiple (array) {
    while (array.length > 1) {
        if (array.includes('/')) {
            let pos = array.findIndex(element => (element == '/'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('*')) {
            let pos = array.findIndex(element => (element == '*'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('-')) {
            let pos = array.findIndex(element => (element == '-'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
        else if (array.includes('+')) {
            let pos = array.findIndex(element => (element == '+'));
            let stepResult = operate(array[pos], array[pos - 1], array[pos + 1]);
            array.splice(pos - 1, 3, stepResult);
        }
    }
    
    return array[0]
}


//CALCULATOR BUTTONS LOGIC

digits.forEach(element => {
    element.addEventListener('click', () => {
        if (operation.length == 0 && history.innerHTML.length !== 0) {
            clearAll();
        }
        
        if (!(element.id === "dot" && (display.innerHTML.includes(".")
                || display.innerHTML.length == 0)))
        {
            display.innerHTML +=
            element.innerHTML; 
        }
              
    })    
});

operators.forEach(element => {
    element.addEventListener('click', () => {
        if (display.innerHTML.length > 0) {
            operation.push(parseInt(display.innerHTML), element.innerHTML)
            history.innerHTML += display.innerHTML + element.innerHTML
            display.innerHTML = ""
        }
    })
})

equals.addEventListener('click', () => {
    if (display.innerHTML.length > 0 & history.innerHTML.length > 0) {
        operation.push(parseInt(display.innerHTML))
        history.innerHTML += display.innerHTML + "="
        display.innerHTML = operateMultiple(operation)
        operation.splice(0, operation.length)
    }
    
})

allClear.addEventListener('click', clearAll)
backspace.addEventListener('click', clearLastDigit)


function clearLastDigit() {
    display.innerHTML = display.innerHTML.slice(0, - 1);
}

function clearAll() {
    operation.splice(0, operation.length)
    history.innerHTML = ""
    display.innerHTML = ""
}