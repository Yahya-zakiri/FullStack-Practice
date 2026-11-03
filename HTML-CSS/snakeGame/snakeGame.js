const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const dx = 10;

let snake = [{x:150, y:150} , {x:140, y:150} , {x:130, y:150} , {x:120, y:150} , {x:110, y:150}]


const drawSnakePart = snakePart => {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

const advanceSnake = () => {
    const head = {x:snake[0].x + dx, y: snake[0].y};
    snake.unshift(head);
    snake.pop();
}

const upSnake = () => {
    const head = {x: snake[0].x, y: snake[0].y - dx}
    snake.unshift(head);
    snake.pop();
}

const drawSnake = () => {snake.forEach(drawSnakePart)};


const clearCanvas = () => {
    ctx.fillStyle = "white";  ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

setTimeout(() => {clearCanvas(); advanceSnake(); drawSnake();}, 100);

main();

function main() {
    setTimeout(() => {clearCanvas(); advanceSnake(); drawSnake(); main()}, 100);
}

drawSnake();