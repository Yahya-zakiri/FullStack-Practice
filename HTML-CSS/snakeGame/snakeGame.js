const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
let dx = 10;
let dy = 0;
let foodX = 0;
let foodY = 0;
let changingDirection;
let snake = [{x:150, y:150}];
const scoreHolder = document.getElementById('score');
let score = 0;
const title = document.getElementById('main-title');

createFood();
main();


document.addEventListener("keydown", changeDirection);

function main() {
    setTimeout(() => {clearCanvas(); changingDirection = false; drawFood(); advanceSnake();  drawSnake();
         
        if (gameOver()){
            title.innerText = 'Game Over!'
            title.style.color = 'red';
            clearCanvas();
            restart();
        }else {
            title.innerText = 'Welcome to Snake!'
            title.style.color = 'black';
            main();
        }
    
    }, 
        
        100);
}
function randomTen(min, max) {return Math.round((Math.random() * (max - min) + min) / 10) * 10;}



function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(snakePart.x[0], snakePart[0], 50, 50);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function advanceSnake() {
    let foodIsOnSnake = ((snake[0].x == foodX) && (snake[0].y == foodY));
    const head = {x:snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);



    if(foodIsOnSnake){
            score += 10;
            createFood();
            scoreHolder.innerText = score;
        }

        else{
            snake.pop();
        }

}

function drawSnake() {
    snake.forEach(drawSnakePart)
};


function clearCanvas() {
    ctx.fillStyle = "white";  ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}



function changeDirection (event)  {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy == -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if(changingDirection) return;

    changingDirection = true;

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



function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);
    }
    
    const drawFood = () => {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }

function gameOver() {
    
    for(let i = 1; i < snake.length; i++){
        const colided = (snake[0].x === snake[i].x && snake[0].y === snake[i].y);
        if (colided) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitUpWall = snake[0].y < 0;
    const hitDownWall = snake[0].y > gameCanvas.height - 10;

    return (hitLeftWall || hitDownWall || hitRightWall || hitUpWall);
}

function restart() {
    document.addEventListener('keydown', ()=> {
        location.reload();
    } );
}