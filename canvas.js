const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var frameNumber = 0;

const ballRadius = 15;
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballDX = 3.5;
var ballDY = -3.5;

var playerHeight = 20;
var playerWidth = 20;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = (canvas.height - playerHeight) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
const playerSpeed = 7;
var burdenLevel = 0;

var pickupX = canvas.width / 2;
var pickupY = canvas.width / 2;
const radDX = 0.1;
var direction = true;
var pickupRadius = 15;
var pickupColor = "#FFFF00";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

//draws a bouncing ball
function drawBall() {
    ctx.beginPath();
    //draws a circle
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    //fills the circle
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //clears the canvas so we can draw a new frame
    frameNumber++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlayer();
    drawPickup(pickupColor);

    if(ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if(ballY + ballDY > canvas.height - ballRadius || ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if(ballX > playerX && ballX < playerX + playerWidth && ballY > playerY && ballY < playerY + playerHeight) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    } else if(pickupX + pickupRadius > playerX && pickupX - pickupRadius < (playerX + playerWidth) && pickupY + pickupRadius > playerY && pickupY - pickupRadius < (playerY + playerHeight)) {
        pickup();

    }


    if(rightPressed) {
        playerX += (playerSpeed - (0.5 * burdenLevel));
        if (playerX + playerWidth > canvas.width){
            playerX = canvas.width - playerWidth;
        }
    }
    if(leftPressed) {
        playerX -= (playerSpeed - (0.5 * burdenLevel));
        if (playerX < 0){
            playerX = 0;
        }
    }
    if(upPressed) {
        playerY -= (playerSpeed - (0.5 * burdenLevel));
        if (playerY < 0) {
            playerY = 0;
        }
    }
    if(downPressed) {
        playerY += (playerSpeed - (0.5 * burdenLevel));
        if (playerY + playerHeight > canvas.height){
            playerY = canvas.height - playerHeight;
        }
    }

    ballX += ballDX;
    ballY += ballDY;
}

function drawPickup(color) {
    ctx.beginPath();
    ctx.arc(pickupX, pickupY, calculateRadius(), 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function calculateRadius() {
    if (frameNumber % 50 === 0) {
        if (direction) {
            direction = false;
        } else {
            direction = true;
        }
    }

    if(direction) {
        pickupRadius += radDX;
    } else {
        pickupRadius -= radDX;
    }
    return pickupRadius;
}

function pickup() {
    burdenLevel += 1;
    pickupY = Math.min(Math.max(canvas.height * Math.random(), pickupRadius), canvas.height - pickupRadius);
    pickupX = Math.min(Math.max(canvas.width * Math.random(), pickupRadius), canvas.width - pickupRadius);
    if(burdenLevel === 9) {
        pickupColor = "#FFFFFF";
    } else {
        pickupColor = "#FFFF00";
    }

    if(burdenLevel === 10) {
        //spawn enemy
        burdenLevel = 0;
    }
}

var interval = setInterval(draw, 10);
