let variables = ['', ''];
let numbers = Array.from(document.querySelectorAll('.number'));
let currentStr = '';
let current = document.querySelector('#current');
let auxArray = [];
let former = document.querySelector('#former');
let operator;
let resolved = false;
let firstIsNegative = false;
let aux;

for (let i=0;i < numbers.length; i++) numbers[i].addEventListener('click', display);

let operators = Array.from(document.querySelectorAll('.operator'));
for (let i=0;i < operators.length; i++) {
    operators[i].addEventListener('click', display);
    operators[i].addEventListener('click', saveNumbers); 
}

let equal = document.querySelector('#equal');
equal.addEventListener('click',resolve);

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearCalculator);

let decimal = document.querySelector('#float');
decimal.addEventListener('click', checkDecimal);

function display (e) {
    if (resolved == true && e.target.innerHTML <10) {
        resolved = false;
        clearCalculator();
    }
    currentStr += e.target.innerHTML;
    current.textContent = currentStr;
}

function saveNumbers(e){
    if (currentStr.substring(0, 1) == '-') firstIsNegative = true;
    resolved = false;
    let lastChar = currentStr.substring(currentStr.length-2, currentStr.length-1);
    if (lastChar == '÷' || lastChar == '*' || lastChar == '-' || lastChar == '+'){
        currentStr =`` + variables[0] + e.target.innerHTML;
        current.textContent = currentStr;
        operator = e.target.innerHTML;
    }
    if (variables[0] == '') { //&& variables[1] == 0
        variables[0] = +currentStr.substring(0, currentStr.length-1);
        operator = e.target.innerHTML;
    }
    else if (variables[1] == '') {
        auxArray = currentStr.split(/[^0-9.]/g);
        console.log(auxArray);
        if (auxArray[1] != '' && !firstIsNegative && auxArray[0] != '') {
            variables[0] = +auxArray[0];
            variables[1] = +auxArray[1];
        }
        else if(auxArray[1] != '' && firstIsNegative && auxArray[2] != '') {
            variables[0] = +auxArray[1] * (-1);
            variables[1] = +auxArray[2];    
        }
        console.log(variables);
        console.log(operator);
        if (typeof variables[0] == 'number' && typeof variables [1] == 'number') operate(operator, e.target.innerHTML);
        operator = e.target.innerHTML;
    }  
}

function operate(operator, newOperator){
    aux = variables[0];
    console.log(variables);
    if (operator == '÷') variables[0] = variables[0] / variables[1];
    else if (operator == '*') variables[0] = variables[0] * variables[1];
    else if (operator == '-') variables[0] = variables[0] - variables[1];
    else if (operator == '+') variables[0] = variables[0] + variables[1];
    former.textContent = aux + operator + variables[1] + '=';
    variables[1] = '';
    currentStr = `${variables[0]}` + newOperator;
    current.textContent = currentStr;
    console.log (variables);
    if (variables[0] > 0) firstIsNegative = false;
}

function resolve(){
    if (currentStr.substring(0, 1) == '-') firstIsNegative = true;
    if (variables[0] == 0 && variables[1] == 0){
        variables[0] = +currentStr;
        former.textContent = variables[0] + '=';  
    } 
    auxArray = currentStr.split(/[^0-9.]/g);
    console.log(auxArray); 
    if (auxArray.length > 1 && auxArray[1] != '') {
        if (firstIsNegative) {
            variables[0] = +auxArray[1] * (-1);
            variables[1] = +auxArray[2]; 
        }
        else variables[1] = +auxArray[1];
        if (typeof variables[0] == 'number' && typeof variables [1] == 'number') operate(operator, '');
    } 
    else {
        former.textContent = variables[0] + '=';
    } 
    resolved = true; 
}

function clearCalculator() {
    currentStr = '';
    current.textContent = '0';
    variables = [0, 0];
    operator = '';
    former.textContent = '';
}

function checkDecimal () {

}


// bugs to solve when pressed '=' many times gives NaN or Infinity
//               when pressed a operator (except for '-') at the start of the string cant operate