const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
let dx = 10;
let dy = 0;
let foodX = 0;
let foodY = 0;

let snake = [{x:150, y:150}];


function main() {
    setTimeout(() => {clearCanvas(); drawFood(); advanceSnake();  drawSnake(); main()}, 100);
}
const randomTen = (min, max) => {return Math.round((Math.random() * (max - min) + min) / 10) * 10;}



const drawSnakePart = snakePart => {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

const advanceSnake = () => {
    const head = {x:snake[0].x + dx, y: snake[0].y + dy};
    const tail = {x: snake[snake.length - 1].x + 10, y: snake[snake.length - 1].y + 10}
    snake.unshift(head);
    snake.pop();
    snake.forEach(part => {
        const foodIsOnSnake = ((part.x == foodX) && (part.y == foodY));
        
        if(foodIsOnSnake){
            snake.push(tail);
            createFood();
        }
    });
}

const drawSnake = () => {snake.forEach(drawSnakePart)};


const clearCanvas = () => {
    ctx.fillStyle = "white";  ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}



const changeDirection = event => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy == -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;
    
    if(keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if(keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    
    if(keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    
    if(keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}


document.addEventListener("keydown", changeDirection);

const createFood = () => {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);
    }
    
    const drawFood = () => {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }
    createFood();
    main();