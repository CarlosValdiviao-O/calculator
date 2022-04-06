let variables = ['', ''];
let currentStr = '';
let current = document.querySelector('#current');
let auxArray = [];
let former = document.querySelector('#former');
let operator;
let resolved = false;
let firstIsNegative = false;
let aux;
let deleted = false;

let numbers = Array.from(document.querySelectorAll('.number'));
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
decimal.addEventListener('click', displayDecimal);

let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', deleteLast);

window.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
});

function display (e) {
    if (currentStr.length > 26) return;
    if (resolved == true && e.target.innerHTML <10 || currentStr == 'Dude really?') {
        resolved = false;
        clearCalculator();
    }
    let lastChar = currentStr.substring(currentStr.length-1);
    if (lastChar == '÷' || lastChar == '*' || lastChar == '-' || lastChar == '+' || lastChar == '.'){
        if (e.target.innerHTML == '÷' || e.target.innerHTML == '*' || e.target.innerHTML == '-' || e.target.innerHTML == '+' ) currentStr = currentStr.substring(0, currentStr.length-1);
        else if (currentStr.length == 1 && currentStr != '-') currentStr = ''; 
    }
    currentStr += e.target.innerHTML;
    current.textContent = currentStr;
    if (currentStr.length > 21) current.classList.add('decreaseSize');
    else current.classList.remove('decreaseSize');
}

function deleteLast() {
    former.textContent = '';
    currentStr = currentStr.substring(0, currentStr.length-1);
    current.textContent = currentStr;
    if (currentStr.substring(0, 1) == '-') firstIsNegative = true;
    else firstIsNegative = false;
    auxArray = currentStr.split(/[^0-9.]/g);
    if (firstIsNegative && auxArray.length < 3) variables[0] = +auxArray[1] * (-1);
    else if (auxArray.length < 2) variables[0] = +auxArray[0];
    deleted = true;
    if (currentStr.length < 22) current.classList.remove('decreaseSize');
}

function saveNumbers(e){
    if (currentStr == '-' || currentStr == '+' || currentStr == '*' || currentStr == '÷') return;
    if (currentStr.substring(0, 1) == '-') firstIsNegative = true;
    else firstIsNegative = false;
    resolved = false;
    if (typeof variables[0] != 'number' || deleted) { 
        variables[0] = +currentStr.substring(0, currentStr.length-1);
        operator = e.target.innerHTML;
    }
    else if (variables[1] == '' || deleted) {
        auxArray = currentStr.split(/[^0-9.]/g);
        if (auxArray[1] != '' && !firstIsNegative && auxArray[0] != '') {
            variables[0] = +auxArray[0];
            variables[1] = +auxArray[1];
        }
        else if(auxArray[1] != '' && firstIsNegative && auxArray[2] != '') {
            variables[0] = +auxArray[1] * (-1);
            variables[1] = +auxArray[2];    
        }
        if (typeof variables[0] == 'number' && typeof variables [1] == 'number') operate(operator, e.target.innerHTML);
        operator = e.target.innerHTML;
    }  
    deleted = false;
}

function operate(operator, newOperator){
    aux = variables[0];
    let decimals = getLongerDecimal();
    if (operator == '÷') {
        divide(decimals);
        if (currentStr == 'Dude really?') return;
    }
    else if (operator == '*') multiply(decimals);
    else if (operator == '-') substract(decimals);
    else if (operator == '+') add(decimals);
    former.textContent = aux + operator + variables[1] + '=';
    variables[1] = '';
    currentStr = `${variables[0]}` + newOperator;
    current.textContent = currentStr;
    if (variables[0] > 0) firstIsNegative = false;
    deleted = false;
    if (currentStr.length > 21) current.classList.add('decreaseSize');
    else current.classList.remove('decreaseSize');
}

function divide(decimals) {
    if (variables[1] == 0) {
        currentStr = 'Dude really?';
        current.textContent = currentStr;
        variables = ['', ''];
        deleted = false;
        former.textContent = '';
    }
    else {
        variables[0] = (variables[0] *(10 ** decimals)) / (variables[1] * (10 ** decimals)) ;
    }
}

function multiply (decimals) {
    variables[0] = ((variables[0] * (10 ** decimals)) * (variables[1] * (10 ** decimals))) / (10 ** (decimals * 2));
}

function substract (decimals) {
    variables[0] = ((variables[0] * (10 ** decimals)) - (variables[1] * (10 ** decimals))) / (10 ** decimals);
}

function add (decimals) {
    variables[0] = ((variables[0] * (10 ** decimals)) + (variables[1] * (10 ** decimals))) / (10 ** decimals);
}

function resolve(){
    if (resolved) return;
    let lastChar = currentStr.substring(currentStr.length-1);
    if (lastChar == '÷' || lastChar == '*' || lastChar == '-' || lastChar == '+'){
        variables[0] = +currentStr.substring(0, currentStr.length-1);
        former.textContent = variables[0] + '='; 
        currentStr = `${variables[0]}`;
        current.textContent = currentStr;
        return;
    }
    if (currentStr.substring(0, 1) == '-') firstIsNegative = true;
    if (typeof variables[0] != 'number' && variables[1] == ''){
        variables[0] = +currentStr;
        former.textContent = variables[0] + '='; 
        currentStr = `${variables[0]}`;
        current.textContent = currentStr;
        return; 
    } 
    auxArray = currentStr.split(/[^0-9.]/g);
    if (auxArray.length > 1 && auxArray[1] != '' && auxArray[2] != '') {
        if (firstIsNegative) {
            variables[0] = +auxArray[1] * (-1);
            variables[1] = +auxArray[2]; 
            if (Number.isNaN(variables[1])) return;
        }
        else variables[1] = +auxArray[1];
        if (typeof variables[0] == 'number' && typeof variables[1] == 'number') operate(operator, '');
    } 
    else {
        former.textContent = variables[0] + '=';
        currentStr = `${variables[0]}`;
        current.textContent = currentStr;
    } 
    resolved = true; 
}

function clearCalculator() {
    currentStr = '';
    current.textContent = '0';
    variables = ['', ''];
    operator = '';
    former.textContent = '';
}

function displayDecimal (e) {
    if (resolved == true || currentStr == 'Dude really?') {
        resolved = false;
        clearCalculator();
    }
    auxArray = currentStr.split(/[^0-9.]/g);
    if (auxArray[auxArray.length-1].lastIndexOf('.') < 0) {
        let lastChar = currentStr.substring(currentStr.length-1);
        if (lastChar == '÷' || lastChar == '*' || lastChar == '-' || lastChar == '+' || currentStr == '') {
            currentStr += '0';
            current.textContent = currentStr;  
        }
        currentStr += e.target.innerHTML;
        current.textContent = currentStr;
    }
}

function getLongerDecimal () {
    let a = getDecimals(variables[0]);
    let b = getDecimals(variables[1]);
    if (a>b) return a;
    else return b;
}

function getDecimals (num) {
    let counter = -1;
    let aux = num;
    while (aux % 10 != 0) {
        counter++;
        aux *= 10;
    }
    return counter;
}


// bugs when using 0 first fixed
// add delete button solved
// bug when clicking '=' when there is only one negative number fixed
// fix bug with decimal after result fixed
// bug after using clear followed by an operator, when using negatives and 'equal' fixed
// elaborate on opeartors functions to deal better with decimals solved
// fix display in both lines (former and current) when dealing with long strings fixed
// add keyboard compatibility
// improve the design
// add 7 segments font
// move things around in the code to make it look more presentable

