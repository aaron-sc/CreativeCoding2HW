// Set up variables for the shapes
let tableLeg1, tableLeg2;
let tableTop;
let plate;
let spaghetti;
let meatballs;
let sauce;
let cup;
let water;
var x = 400;
var cupOfWaterX;
let napkinX;
let frameCounter = 0; // Counter to control movement timing
var newFont;
var timerText = 0;

// Keys
var W = 87;
var A = 65;
var S = 83;
var D = 68;

// Set Up Character
var characterWidth = 100;
var characterHeight = 150;
var templeruncharacter;
var animation = [];
var idleAnimation = [];
var templeObjects = [];
var templeObjects2 = [];
var i = 0;
var j = 0;
var counter = 0;
var characterx = 30;
var charactery = 100;
var runAnimation = [];
var running = false;
var right = false;
var left = false;


// Set up game timer
var gameTimer = 60;
var gameTimerText = "Time Remaining: " + gameTimer;
var gameRunning = true;

// Set up score
var score = 0;
var scoreText = "Score: " + score;

// Load in idle and run animation files
var idleFile = [];
var runFile = [];

// Set up food
var spagetti;
var platesOfSpaghetti = [];
var plates = 6;

function preload() {
    // Preload the images and the font
    idleFile = loadStrings('data/idle.txt');
    runFile = loadStrings('data/run.txt');

}

function setup() {
    createCanvas(2000, 1000);
    for (var i = 0; i < idleFile.length; i++) {
        templeruncharacter = new Character(idleFile[i], 30, 100);
        templeObjects[i] = templeruncharacter;
        animation[i] = templeObjects[i].getImage();
    }
    for (var i = 0; i < runFile.length; i++) {
        templeruncharacter = new Character(runFile[i], 30, 100);
        templeObjects2[i] = templeruncharacter;
        runAnimation[i] = templeObjects2[i].getImage();
    }

    // Use setInterval to call changeSpeed() every 2 seconds and incrementIndex() every 40 milliseconds
    setInterval(changeSpeed, 2000);
    setInterval(incrementIndex, 40);
    for (var i = 0; i < plates; i++) {
        spagetti = new Food(500, 500);
        spagetti.randomX();
        spagetti.randomY();
        platesOfSpaghetti.push(spagetti);
    }
}

function changeSpeed() {
    // Randomly adjust the speed of the water cup and napkin
    waterSpeed = random(1, 4); // Random speed between 1 and 4
    napkinSpeed = random(0.5, 3); // Random speed between 0.5 and 3
}

function draw() {
    background(200);
    frameCounter++; // Increment frame counter
    // Display the score
    textSize(24);
    fill(0);
    scoreText = "Score: " + score;


    // Check for game over condition
    if (score >= plates) {
        gameRunning = false;
        gameTimerText = "You Win! Final Score: " + score;
        scoreText = "";
    }
    else if (gameTimer <= 0) {
        gameRunning = false;
        gameTimerText = "Game Over! Final Score: " + score;
        scoreText = "";
    }
    text(scoreText, 10, 30);
    if(gameRunning) {

        movePlayer(); 
        // Display game timer
        textSize(20);
        fill(0);
        text(gameTimerText, width - 200, 30);
        if (frameCounter % 60 == 0) { // Update every second
            gameTimer--;
            gameTimerText = "Time Remaining: " + gameTimer;
        }

        // Draw each plate of spaghetti
        platesOfSpaghetti.forEach(function (plate) {
            // Randomly move a random plate every few frames
            if (frameCounter % 120 == 0 && random() < 0.5) {
                plate.randomX();
                plate.randomY();
            }
            plate.drawSpaghetti();
            // Check if player is touching the plate while running or idle
            if (templeObjects[i].hasCollided(plate.getX(), plate.getY(), 100, 20) || templeObjects2[i].hasCollided(plate.getX(), plate.getY(), 100, 20)) {
                // If touching, remove the plate
                platesOfSpaghetti.splice(platesOfSpaghetti.indexOf(plate), 1);
                // Increment score or perform other actions
                score++;
                
            }
        });
        
    }
    else {
        text(gameTimerText, width / 2, height / 2);
    }

}

function incrementIndex() {
    i++;
    if (i >= animation.length) {
        i = 0;
    }
}

function movePlayer()
{
    
    if(!running) image(animation[i], characterx, charactery, characterWidth, characterHeight) ;
    // change to use the draw function in character
    
    running = false;
    if (keyIsDown(W)) {
        charactery -= 5;
    }
    if (keyIsDown(S)) {
        charactery += 5;
    }
    if (keyIsDown(A) && !keyIsDown(D)) {

        running = true;
        // Flip the image horizontally
        push();
        translate(characterWidth, 0); // Move to the center of the character
        scale(-1, 1); // Flip horizontally
        image(runAnimation[i], -characterx, charactery, characterWidth, characterHeight); // Draw the flipped image
        pop();
        characterx -= 5;
    }
    if (keyIsDown(D) && !keyIsDown(A)) {
        running = true;
        // Flip to the right (moving forward)
        push();
        translate(0, 0); // Move to the center of the character
        scale(1, 1); // Flip horizontally
        image(runAnimation[i], characterx, charactery, characterWidth, characterHeight); // Draw the flipped image
        pop();
        characterx += 5;
    }
    if (characterx < 0) {
        characterx = 0;
    }
    if (characterx > width - characterWidth) {
        characterx = width - characterWidth;
    }
    if (charactery < 0) {
        charactery = 0;
    }
    if (charactery > height - characterHeight) {
        charactery = height - characterHeight;
    }
// Ensure character cant go off the right side of the screen
    if( characterx > width - characterWidth) {
        characterx = width - characterWidth;
    }
    
    templeObjects[i].x = characterx;
    templeObjects[i].y = charactery;
    templeObjects2[i].x = characterx;
    templeObjects2[i].y = charactery;
}