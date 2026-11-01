const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-display');
const clearBtn = document.getElementById('clear');


function calculate(n1 = 0, operator, n2 = 0){

    switch(operator) {
        case'add' : return(Number (n1) + Number (n2)); break;
        case 'minus' : return(Number (n1) - Number (n2));break;
        case 'multiply' : return(Number (n1) * Number (n2));break;
        case 'divide' : return(Number (n1) / Number (n2));break;

        default: return n1;break;
    }
}

keys.addEventListener('click', e => {
    
    
    
    if(e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        let displayContent = display.textContent;
        
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('highlighted'));
        
        if (!action){
          const previousKeyType = calculator.dataset.previousKeyType;

            if (displayContent === '0' || previousKeyType === 'operator') {
                    display.textContent = keyContent;
                    calculator.dataset.previousKeyType = '';
                } else {
                    display.textContent = displayContent + keyContent;
                }

                clearBtn.textContent = "CE";
        }

        if(
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('highlighted');

            calculator.dataset.previousKeyType = 'operator';

            calculator.dataset.firstVal = displayContent;
            calculator.dataset.operator = action;


        }

        if(action === 'decimal') {
            console.log(display.textContent.includes('.'))
            if( !(display.textContent.includes('.')) ) {
                if(calculator.dataset.previousKeyType !== 'operator'){
                display.textContent = displayContent + '.';
                } else{
                    display.textContent = '0' + '.';
                }
            }
            clearBtn.textContent = "CE";
        }

        if(action === 'clear') {
            display.textContent = '0';
            calculator.dataset.firstVal = 0;
            calculator.dataset.operator = 0;
            clearBtn.textContent = 'AC';
        }

        if(action === 'calculate') {
            const firstValue = calculator.dataset.firstVal;
            const secondValue = displayContent;
            const operator = calculator.dataset.operator;

            
                result = calculate(firstValue, operator, secondValue);

            display.textContent = result;
        }
    }
});