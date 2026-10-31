const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-display');


keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        let displayContent = display.textContent;

        Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('highlighted'));

        if (!action){
            if(displayContent === '0') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayContent + keyContent;
            }
        }

        if(
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('highlighted');
        }

        if(action === 'decimal') {
            display.textContent = displayContent + '.';
        }

        if(action === 'clear') {
            console.log('clear key!');
        }

        if(action === 'calculate') {
            console.log('equal key!');
        }
    }
});