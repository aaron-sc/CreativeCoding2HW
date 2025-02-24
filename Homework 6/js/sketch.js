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
var templeruncharacter;
var animation = [];
var idleAnimation = [];
var templeObjects = [];
var i = 0;
var j = 0;
var counter = 0;
var characterx = 30;
var charactery = 100;
var runAnimation = [];
var running = false;
var flip = false;

// Load in idle and run animation files
var idleFile = [];
var runFile = [];

// Set up food
var spagetti;
var platesOfSpaghetti = [];

function preload() {
    // Preload the images and the font
    idleFile = loadStrings('data/idle.txt');
    runFile = loadStrings('data/run.txt');

}

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < idleFile.length; i++) {
        templeruncharacter = new Character(idleFile[i], 30, 100);
        templeObjects[i] = templeruncharacter;
        animation[i] = templeObjects[i].getImage();
    }
    for (var i = 0; i < runFile.length; i++) {
        templeruncharacter = new Character(runFile[i], 30, 100);
        console.log(templeruncharacter.toString());
        templeObjects[i] = templeruncharacter;
        runAnimation[i] = templeObjects[i].getImage();
    }

    // Use setInterval to call changeSpeed() every 2 seconds and incrementIndex() every 40 milliseconds
    setInterval(changeSpeed, 2000);
    setInterval(incrementIndex, 40);
    for (var i = 0; i < 4; i++) {
        spagetti = new Food(350, 350);
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
    background(150);
    movePlayer();

    frameCounter++; // Increment frame counter

    // Draw each plate of spaghetti
    platesOfSpaghetti.forEach(function (plate) {
        plate.drawSpaghetti();
        // Check if player is touching the plate
        if (templeObjects[i].hasCollided(plate.getX(), plate.getY(), 100, 20)) {
            // If touching, remove the plate
            platesOfSpaghetti.splice(platesOfSpaghetti.indexOf(plate), 1);
            // Increment score or perform other actions
        }
    });
}

function incrementIndex() {
    i++;
    if (i >= animation.length) {
        i = 0;
    }
}

function movePlayer()
{
    
    if(!running) image(animation[i], characterx, charactery, 100, 150) ;
    // change to use the draw function in character
    
    running = false;
    if (keyIsDown(W)) {
        charactery -= 5;
    }
    if (keyIsDown(S)) {
        charactery += 5;
    }
    if (keyIsDown(A)) {
        running = true;
        image(runAnimation[i], characterx, charactery, 100, 150) ;
        characterx -= 5;
    }
    if (keyIsDown(D)) {
        running = true;
        image(runAnimation[i], characterx, charactery, 100, 150) ;
        characterx += 5;
    }
    if (characterx < 0) {
        characterx = 0;
    }
    if (characterx > width - 100) {
        characterx = width - 100;
    }

    if (charactery > height - 150) {
        charactery = height - 150;
    }
    templeObjects[i].x = characterx;
    templeObjects[i].y = charactery;
}