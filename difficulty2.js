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

let speed = 10;  //speed of the snake

let tileCount = 20;   //total tiles = 20. or you can say pixels body

let tileSize = canvas.width / tileCount - 2;

let headX = 10;  //10 because its a grid
let headY = 10;

let lineX = 100;
let lineY = 300;

const snakeParts = [];   //array for snakeparts
const obstacleParts = [];
let tailLength = 2;      //length of snake tail after each gobble gobble

let appleX = 19;
let appleY = 19;

appleX != 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17;
appleY != 2, 3, 4, 5, 7, 13, 14, 15, 16, 17;



let obstacleX = 5;   let obstacleY = 13;         //the lower equal obstacle
let obstacle2X = 6;   let obstacle2Y = 13; 
let obstacle3X = 7;   let obstacle3Y = 13; 
let obstacle4X = 8;   let obstacle4Y = 13; 
let obstacle5X = 9;   let obstacle5Y = 13; 
let obstacle6X = 10;   let obstacle6Y = 13; 
let obstacle7X = 11;   let obstacle7Y = 13; 
let obstacle8X = 12;   let obstacle8Y = 13; 
let obstacle9X = 13;   let obstacle9Y = 13; 
let obstacle10X = 14;   let obstacle10Y = 13; 


let obsX = 5;   let obsY = 7;                  //the upper equal obstacle
let obs2X = 6;   let obs2Y = 7; 
let obs3X = 7;   let obs3Y = 7; 
let obs4X = 8;   let obs4Y = 7; 
let obs5X = 9;   let obs5Y = 7; 
let obs6X = 10;   let obs6Y = 7; 
let obs7X = 11;   let obs7Y = 7; 
let obs8X = 12;   let obs8Y = 7; 
let obs9X = 13;   let obs9Y = 7; 
let obs10X = 14;   let obs10Y = 7; 

// upper left side obstacle
let ulX1 = 2;  let ulY1 = 2;                 
let ulX2 = 3;  let ulY2 = 2;
let ulX3 = 4;  let ulY3 = 2;
let ulX4 = 5;  let ulY4 = 2;

let uldX1 = 2;  let uldY1 = 2;                 
let uldX2 = 2;  let uldY2 = 3;
let uldX3 = 2;  let uldY3 = 4;
let uldX4 = 2;  let uldY4 = 5;


//upper right obstacle
let urX1 = 17;  let urY1 = 2;                 
let urX2 = 16;  let urY2 = 2;
let urX3 = 15;  let urY3 = 2;
let urX4 = 14;  let urY4 = 2;

let urdX1 = 17;  let urdY1 = 2;                 
let urdX2 = 17;  let urdY2 = 3;
let urdX3 = 17;  let urdY3 = 4;
let urdX4 = 17;  let urdY4 = 5;


//lower lefft obstacle
let llX1 = 2;  let llY1 = 17;                 
let llX2 = 3;  let llY2 = 17;
let llX3 = 4;  let llY3 = 17;
let llX4 = 5;  let llY4 = 17;

let lldX1 = 2;  let lldY1 = 17;                 
let lldX2 = 2;  let lldY2 = 16;
let lldX3 = 2;  let lldY3 = 15;
let lldX4 = 2;  let lldY4 = 14;

//lower right obstacle

let lrX1 = 17;  let lrY1 = 17;                 
let lrX2 = 16;  let lrY2 = 17;
let lrX3 = 15;  let lrY3 = 17;
let lrX4 = 14;  let lrY4 = 17;

let lrdX1 = 17;  let lrdY1 = 17;                 
let lrdX2 = 17;  let lrdY2 = 16;
let lrdX3 = 17;  let lrdY3 = 15;
let lrdX4 = 17;  let lrdY4 = 14;




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
    
        if (score > 10) {
            speed = 12;
        }
        if (score > 20) {
            speed = 15;
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

    if (ulX1 === headX && ulY1 == headY || ulX2 === headX && ulY2 == headY || ulX3 === headX && ulY3 == headY || ulX4 === headX && ulY4 == headY ||
        uldX1 === headX && uldY1 == headY || uldX2 === headX && uldY2 == headY || uldX3 === headX && uldY3 == headY || uldX4 === headX && uldY4 == headY){
        gameOver = true;
    }

    if (urX1 === headX && urY1 == headY || urX2 === headX && urY2 == headY || urX3 === headX && urY3 == headY || urX4 === headX && urY4 == headY ||
        urdX1 === headX && urdY1 == headY || urdX2 === headX && urdY2 == headY || urdX3 === headX && urdY3 == headY || urdX4 === headX && urdY4 == headY){
        gameOver = true;
    }

    if (llX1 === headX && llY1 == headY || llX2 === headX && llY2 == headY || llX3 === headX && llY3 == headY || llX4 === headX && llY4 == headY ||
        lldX1 === headX && lldY1 == headY || lldX2 === headX && lldY2 == headY || lldX3 === headX && lldY3 == headY || lldX4 === headX && lldY4 == headY){
        gameOver = true;
    }

    if (lrX1 === headX && lrY1 == headY || lrX2 === headX && lrY2 == headY || lrX3 === headX && lrY3 == headY || lrX4 === headX && lrY4 == headY ||
        lrdX1 === headX && lrdY1 == headY || lrdX2 === headX && lrdY2 == headY || lrdX3 === headX && lrdY3 == headY || lrdX4 === headX && lrdY4 == headY){
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

        if (gameOver) {

            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }

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
        ctx.fillRect(part.x * tileCount, part.y * tileCount , tileSize, tileSize);  //for a rectengale snake
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
    
    //equal looking obstacle
    ctx.fillStyle = "yellow";   //color of apple
    ctx.fillRect(obstacleX * tileCount, obstacleY * tileCount, tileSize, tileSize);     
    ctx.fillRect(obstacle2X * tileCount, obstacle2Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle3X * tileCount, obstacle3Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle4X * tileCount, obstacle4Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle5X * tileCount, obstacle5Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle6X * tileCount, obstacle6Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle7X * tileCount, obstacle7Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle8X * tileCount, obstacle8Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle9X * tileCount, obstacle9Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obstacle10X * tileCount, obstacle10Y * tileCount, tileSize, tileSize);


    ctx.fillRect(obsX * tileCount, obsY * tileCount, tileSize, tileSize);    
    ctx.fillRect(obs2X * tileCount, obs2Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs3X * tileCount, obs3Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs4X * tileCount, obs4Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs5X * tileCount, obs5Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs6X * tileCount, obs6Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs7X * tileCount, obs7Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs8X * tileCount, obs8Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs9X * tileCount, obs9Y * tileCount, tileSize, tileSize);
    ctx.fillRect(obs10X * tileCount, obs10Y * tileCount, tileSize, tileSize);


    //upper left obstacle

    ctx.fillRect(ulX1 * tileCount, ulY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(ulX2 * tileCount, ulY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(ulX3 * tileCount, ulY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(ulX4 * tileCount, ulY4 * tileCount, tileSize, tileSize);

    ctx.fillRect(uldX1 * tileCount, uldY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(uldX2 * tileCount, uldY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(uldX3 * tileCount, uldY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(uldX4 * tileCount, uldY4 * tileCount, tileSize, tileSize);
    

    //upper left obstacle

    ctx.fillRect(urX1 * tileCount, urY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(urX2 * tileCount, urY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(urX3 * tileCount, urY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(urX4 * tileCount, urY4 * tileCount, tileSize, tileSize);

    ctx.fillRect(urdX1 * tileCount, urdY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(urdX2 * tileCount, urdY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(urdX3 * tileCount, urdY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(urdX4 * tileCount, urdY4 * tileCount, tileSize, tileSize);

    //lower left obstacle

    ctx.fillRect(llX1 * tileCount, llY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(llX2 * tileCount, llY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(llX3 * tileCount, llY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(llX4 * tileCount, llY4 * tileCount, tileSize, tileSize);

    ctx.fillRect(lldX1 * tileCount, lldY1 * tileCount, tileSize, tileSize);    
    ctx.fillRect(lldX2 * tileCount, lldY2 * tileCount, tileSize, tileSize);
    ctx.fillRect(lldX3 * tileCount, lldY3 * tileCount, tileSize, tileSize);
    ctx.fillRect(lldX4 * tileCount, lldY4 * tileCount, tileSize, tileSize);

   //lower right obstacle

   ctx.fillRect(lrX1 * tileCount, lrY1 * tileCount, tileSize, tileSize);    
   ctx.fillRect(lrX2 * tileCount, lrY2 * tileCount, tileSize, tileSize);
   ctx.fillRect(lrX3 * tileCount, lrY3 * tileCount, tileSize, tileSize);
   ctx.fillRect(lrX4 * tileCount, lrY4 * tileCount, tileSize, tileSize);

   ctx.fillRect(lrdX1 * tileCount, lrdY1 * tileCount, tileSize, tileSize);    
   ctx.fillRect(lrdX2 * tileCount, lrdY2 * tileCount, tileSize, tileSize);
   ctx.fillRect(lrdX3 * tileCount, lrdY3 * tileCount, tileSize, tileSize);
   ctx.fillRect(lrdX4 * tileCount, lrdY4 * tileCount, tileSize, tileSize);


    
}



//Use a function similar to it for obstacle collision detection. 
//no need for line 156-160 for that to work, only to show game over
//or, just reduce point and increase  length, also, just maybe relocate the obstacle-
function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {   //if apple and snake position are same

         
        appleX = Math.floor(Math.random() * tileCount);   //check apple x and y position and make a new one elsewhere
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;       //will increase snake length and score
        tailLength++;
        score++;
        gulpSound.play();       //optional: creates a sound. not needed
    }
}



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






