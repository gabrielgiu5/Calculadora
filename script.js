let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value) && value !== '.'){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleSymbol(symbol){
    switch(symbol){

        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case 'back':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;

        case '=':
            if(!previousOperator) return;

            flushOperation(parseInt(buffer));
            buffer = runningTotal;
            previousOperator = null;
            runningTotal = 0;
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0') return;

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    } else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    } else if(previousOperator === '*'){
        runningTotal *= intBuffer;
    } else if(previousOperator === '/'){
        runningTotal /= intBuffer;
    }
}

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){

        if(!event.target.classList.contains("calc-button")) return;

        buttonClick(event.target.dataset.value);
    });
}

init();