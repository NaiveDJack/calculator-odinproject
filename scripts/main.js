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


//CALCULATOR LOGIC FUNCTIONS

function convertDigit() {
    addDigit(this.innerHTML);
}

function convertOperator() {
    addOperator(this.innerHTML);
}

function addDigit(digit) {
    if (operation.length == 0 && history.innerHTML.length !== 0) {
        clearAll();
    }
    
    if (!(digit === "." && (display.innerHTML.includes(".")
            || display.innerHTML.length == 0)))
    {
        display.innerHTML +=
        digit; 
    }
}

function addOperator(operator) {
    if (display.innerHTML.length > 0) {
        operation.push(parseFloat(display.innerHTML), operator)
        history.innerHTML += display.innerHTML + operator
        display.innerHTML = ""
    }
}

function solveOperation() {   
    if (display.innerHTML.length > 0 &
        history.innerHTML.length > 0 &
        !(history.innerHTML.slice(-1) === "=")) {
        operation.push(parseFloat(display.innerHTML))
        
        history.innerHTML += display.innerHTML + "="
        display.innerHTML = operateMultiple(operation)
        
        operation.splice(0, operation.length)
    } 
}

function clearLastDigit() {
    if (!(history.innerHTML.slice(-1) === "=")) {
        display.innerHTML = display.innerHTML.slice(0, - 1);
    }   
}

function clearAll() {
    if (display.innerHTML.length > 0 ||
        history.innerHTML.length > 0) {

            operation.splice(0, operation.length)
            history.innerHTML = ""
            display.innerHTML = ""
    }
    
}

//CALCULATOR BUTTON EVENT LISTENERS

window.addEventListener('keydown', function(e) {
        if (e.key >= 0 || e.key === '.') {
            addDigit(e.key)
        }
        
        if (e.key === 'Enter') {
            solveOperation()
        }

        if (e.key === '+'||
            e.key === '-'||
            e.key === '*'||
            e.key === '/') {
            e.preventDefault();
            addOperator(e.key)
        }

        if (e.key === 'Backspace') {
            clearLastDigit()
        }

        if (e.key === 'Delete') {
            clearAll()
        }
    })

  
digits.forEach(element => {
    element.addEventListener('click', convertDigit)   
});

operators.forEach(element => {
    element.addEventListener('click', convertOperator)
})

equals.addEventListener('click', solveOperation)
allClear.addEventListener('click', clearAll)
backspace.addEventListener('click', clearLastDigit)