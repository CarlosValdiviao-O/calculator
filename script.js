let numbers = [0, 0];
let buttons = Array.from(document.querySelectorAll('button'));
let currentStr = '';
let current = document.querySelector('#current');
let auxArray = [];
let former = document.querySelector('#former');
formerStr = '';
let operator;

for (let i=2;i < buttons.length; i++){
    buttons[i].addEventListener('click', () => {
        currentStr += buttons[i].textContent;
        current.textContent = currentStr;
    });
}

let operators = Array.from(document.querySelectorAll('.operator'));
for (let i=0;i < operators.length; i++){
    operators[i].addEventListener('click', saveNumbers);
}

function saveNumbers(e){
    if (numbers[0] == 0) {
        numbers[0] = +currentStr.substring(0, currentStr.length-1);
        operator = e.target.innerHTML;
    }
    else if (numbers[1] == 0) {
        auxArray = currentStr.split(/[^0-9.]/g);
        console.log(auxArray);
        if (auxArray[1] != '') {
            numbers[1] = +auxArray[1];
            console.log(numbers);
            operate(operator, e.target.innerHTML);
            console.log(operator, e.target.innerHTML);
            operator = e.target.innerHTML;
        }
    }
}

function operate(operator, newOperator){
   if (operator == "÷") numbers[0] = numbers[0] / numbers[1];
   else if (operator == '*') numbers[0] = numbers[0] * numbers[1];
   
    numbers[1] = 0;
    former.textContent = current.textContent;
    currentStr = `${numbers[0]}` + newOperator;
    current.textContent = currentStr;
    
    console.log(numbers);
}

//hasta aqui funciona