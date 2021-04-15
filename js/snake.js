const snakeboard = document.getElementById("gameCanvas");
const ctx = snakeboard.getContext("2d");

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

function drawSnakePart(pt){
    ctx.fillStyle = "lightblue";
    ctx.strokestyle = 'darkblue';
    ctx.fillRect(pt.x, pt.y, 10, 10);
    ctx.strokeRect(pt.x, pt.y, 10, 10);
}

function drawSnake(snake) {
    snake.forEach(drawSnakePart);
}

drawSnake(snake);