document.getElementById("game").style.display = "block";
let paused = false;

const canvas = document.getElementById("game");  //identifying canvas with game, and declaring it as a constant
const ctx = canvas.getContext("2d");  //context is to be 2 dimensional

class SnakePart {   //to track the length of snake
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;  //speed of the snake

let tileCount = 20;   //total tiles = 20. or you can say pixels body
let tileSize = canvas.width / tileCount - 2;

let headX = 10;  //10 because its a grid
let headY = 10;

let lineX = 100;
let lineY = 300;

const snakeParts = [];   //array for snakeparts
const obstacleParts = [];
let tailLength = 2;      //length of snake tail after each gobble gobble

let appleX = 5;
let appleY = 5;

let obstacleX = 5;   let obstacleY = 13; 
let obstacle2X = 6;   let obstacle2Y = 13; 
let obstacle3X = 7;   let obstacle3Y = 13; 
let obstacle4X = 8;   let obstacle4Y = 13; 
let obstacle5X = 9;   let obstacle5Y = 13; 
let obstacle6X = 10;   let obstacle6Y = 13; 
let obstacle7X = 11;   let obstacle7Y = 13; 
let obstacle8X = 12;   let obstacle8Y = 13; 
let obstacle9X = 13;   let obstacle9Y = 13; 
let obstacle10X = 14;   let obstacle10Y = 13; 


let obsX = 5;   let obsY = 7; 
let obs2X = 6;   let obs2Y = 7; 
let obs3X = 7;   let obs3Y = 7; 
let obs4X = 8;   let obs4Y = 7; 
let obs5X = 9;   let obs5Y = 7; 
let obs6X = 10;   let obs6Y = 7; 
let obs7X = 11;   let obs7Y = 7; 
let obs8X = 12;   let obs8Y = 7; 
let obs9X = 13;   let obs9Y = 7; 
let obs10X = 14;   let obs10Y = 7; 


let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;    //to move the snake
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");   //sound is craeted whenever snake is eaten

//game loop
function drawGame() {    //it loops the game. loops animation frame and interval
    if(!paused){
        
        xVelocity = inputsXVelocity;
        yVelocity = inputsYVelocity;
    
        changeSnakePosition();    //this function call is to move the location of the snake
        let result = isGameOver();  //change game position cause we wanna do that before clearing screen
        if (result) {
            return;
        }
    
        clearScreen();   //clears the screen and allows draw
    
        checkAppleCollision(); //function to check if snake collides with food
        drawApple();
        drawObstacle();
        drawSnake();
    
        drawScore();
    
        if (score > 5) {
            speed = 9;
        }
        if (score > 10) {
            speed = 11;
        }
    
        setTimeout(drawGame, 1000 / speed);
    }

}

function isGameOver() {
    let gameOver = false;   //variable gameOver is false by default unless condition matches

    //if there is velocity, then game started. else game will not start
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if (obstacleX === headX && obstacleY == headY ||obstacle2X === headX && obstacle2Y == headY ||obstacle3X === headX && obstacle3Y == headY ||obstacle4X === headX && obstacle4Y == headY ||
        obstacle5X === headX && obstacle5Y == headY ||obstacle6X === headX && obstacle6Y == headY ||obstacle7X === headX && obstacle7Y == headY ||obstacle8X === headX && obstacle8Y == headY ||
        obstacle9X === headX && obstacle9Y == headY ||obstacle10X === headX && obstacle10Y == headY) {   //if apple and snake position are same
        gameOver = true;
    }

    if (obsX === headX && obsY == headY ||obs2X === headX && obs2Y == headY ||obs3X === headX && obs3Y == headY ||obs4X === headX && obs4Y == headY ||
        obs5X === headX && obs5Y == headY ||obs6X === headX && obs6Y == headY ||obs7X === headX && obs7Y == headY ||obs8X === headX && obs8Y == headY ||
        obs9X === headX && obs9Y == headY ||obs10X === headX && obs10Y == headY) {   //if apple and snake position are same
        gameOver = true;
    }

 

    
    

    //for the walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) { //if snake hits left of screen
        gameOver = true;
    } else if (headY < 0) {  //snake hitting up of screen
        gameOver = true;
    } else if (headY === tileCount) {  //snake moving down
        gameOver = true;
    }

    // if snake crashes on itself
    //use to replicate difficulty
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];  //imagine a part that is equal to any snake part
        if (part.x === headX && part.y === headY) {  //if that part has same coordination of any smack with snake head, game over
            gameOver = true;
            break;
        }
    }

    //optional css
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";



        
    

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {     //draws the score
    ctx.fillStyle = "white";   //color and fond size
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10/*position of score*/);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";  //makes the context, or snake green
    for (let i = 0; i < snakeParts.length; i++) {   //drawing additional snake part after eating
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);  //for a rectengale snake
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;      //quite self explanatory, changes movement
    headY = headY + yVelocity;
}

function drawApple() {     //craetes the food item for snake to collide
    ctx.fillStyle = "red";   //color of apple
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);   //defining apple as rectangle
    
}

function drawObstacle() {     //craetes the food item for snake to collide
    
    ctx.fillStyle = "yellow";   //color of apple
    ctx.fillRect(obstacleX * tileCount, obstacleY * tileCount, tileSize, tileSize);   //defining apple as rectangle    
    ctx.fillRect(obstacle2X * tileCount, obstacle2Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle3X * tileCount, obstacle3Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle4X * tileCount, obstacle4Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle5X * tileCount, obstacle5Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle6X * tileCount, obstacle6Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle7X * tileCount, obstacle7Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle8X * tileCount, obstacle8Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle9X * tileCount, obstacle9Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle10X * tileCount, obstacle10Y * tileCount, tileSize, tileSize);


    ctx.fillRect(obsX * tileCount, obsY * tileCount, tileSize, tileSize);   //defining apple as rectangle    
    ctx.fillRect(obs2X * tileCount, obs2Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs3X * tileCount, obs3Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs4X * tileCount, obs4Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs5X * tileCount, obs5Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs6X * tileCount, obs6Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs7X * tileCount, obs7Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs8X * tileCount, obs8Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs9X * tileCount, obs9Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs10X * tileCount, obs10Y * tileCount, tileSize, tileSize);
    

    /*ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();*/
    
}



//Use a function similar to it for obstacle collision detection. 
//no need for line 156-160 for that to work, only to show game over
//or, just reduce point and increase  length, also, just maybe relocate the obstacle-
function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {   //if apple and snake position are same
        appleX = Math.floor(Math.random() * tileCount);   //check apple x and y position and make a new one elsewhere
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;       //will increase snake length and score
        score++;
        gulpSound.play();       //optional: creates a sound. not needed
    }
}


/*function checkObstacleCollision() {
    if (obstacleX === headX && obstacleY == headY) {   //if apple and snake position are same
        isGameOver();
    }
}*/

document.body.addEventListener("keydown", keyDown);    //controls the snake with keyboard

function keyDown(event) {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {  //using keycode of arrow signs
        //87 is w
        if (inputsYVelocity == 1) return;   //to prevent the snake to cross itself back
        inputsYVelocity = -1;     //y = -1 because y increases if I go down, but we're going up
        inputsXVelocity = 0;      //no movement on the x axis, so value is 0
    }

    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
        // 83 is s
        if (inputsYVelocity == -1) return;
        inputsYVelocity = 1;
        inputsXVelocity = 0;
    }

    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
        // 65 is a
        if (inputsXVelocity == 1) return;
        inputsYVelocity = 0;
        inputsXVelocity = -1;
    }

    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
        //68 is d
        if (inputsXVelocity == -1) return;
        inputsYVelocity = 0;
        inputsXVelocity = 1;
    }

    if (event.keyCode == 32) {
        //32 is spacebar
        togglePause();
        document.getElementById("resumeButton").style.display = "block";
    }
}

function togglePause() {
    if (!paused) {
        paused = true;
    } else if (paused) {
        paused = false;
    }
}

drawGame();


function newGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("buttonReturn").style.display = "block";
    document.getElementById("leaderButton").style.display = "none";
    document.getElementById("controlButton").style.display = "none";
    document.getElementById("creditButton").style.display = "none";
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    drawGame();
}

function controlButton() {
    document.getElementById("controls").style.display = "block";
    document.getElementById("mainMenu").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("buttonReturn").style.display = "block";
    document.getElementById("leaderButton").style.display = "none";
    document.getElementById("controlButton").style.display = "none";
    document.getElementById("creditButton").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("credits").style.display = "none";
}

function creditButton() {
    document.getElementById("credits").style.display = "block";
    document.getElementById("controls").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("buttonReturn").style.display = "block";
    document.getElementById("leaderButton").style.display = "none";
    document.getElementById("controlButton").style.display = "none";
    document.getElementById("creditButton").style.display = "none";
    document.getElementById("newGame").style.display = "none";
}

function resumeButton() {
    document.getElementById("resumeButton").style.display = "none";
    paused = false;
    drawGame();
}

function returnButton() {
    window.location.reload();
}






