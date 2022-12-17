
//board
var sizeOfBlock = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = sizeOfBlock * 5;
var snakeY = sizeOfBlock * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
//food
var foodX; 
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * sizeOfBlock;
    board.width = columns * sizeOfBlock;
    context = board.getContext("2d"); //this is used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirectionByKeyPress);
    // update();
    setInterval(update, 1000/10); //100 ms
}

function update() {
    if (gameOver) {
        return
    }
    context.fillStyle="lime";
    context.fillRect(0, 0, board.width, board.height);
    

    context.fillStyle="darkred";
    context.fillRect(foodX, foodY, sizeOfBlock, sizeOfBlock);
    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="blue";
    snakeX += velocityX * sizeOfBlock;
    snakeY += velocityY * sizeOfBlock;
    context.fillRect(snakeX, snakeY, sizeOfBlock, sizeOfBlock);
    for (let i = 0; i <snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], sizeOfBlock, sizeOfBlock);
    }

    //gameover conditions
    //condition 1
    if (snakeX < 0 || snakeX > columns*sizeOfBlock || snakeY < 0 || snakeY > rows*sizeOfBlock) {
        gameOver = true;
        alert("GAMEOVER");
    }
    //condition 2
    for (let i =0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("GAMEOVER");
        }
    }
}

function changeDirectionByKeyPress(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * columns) * sizeOfBlock;
    foodY = Math.floor(Math.random() * rows) * sizeOfBlock;
}