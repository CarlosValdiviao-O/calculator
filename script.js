let numbers = [0, 0];
let buttons = Array.from(document.querySelectorAll('button'));
let currentStr = '';
let current = document.querySelector('#current');
let auxArray = [];
let former = document.querySelector('#former')

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
    if (numbers[0] == 0) numbers[0] = +currentStr.substring(0, currentStr.length-1);
    else if (numbers[1] == 0) {
      auxArray = currentStr.split(/[^0-9.]/g);
      numbers[1] = +auxArray[1];
      operate(e.target.textContent);
    }
}

function operate(operator){

}