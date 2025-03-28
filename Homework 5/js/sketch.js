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
var forkImg;
var napkinImg;
var treeImg;
let waterSpeed = 2; // Initial speed of water cup
let napkinSpeed = 1; // Initial speed of napkin

// Set up colors for the shapes
let tableLegColor;
let tableTopColor;
let plateColor;
let spaghettiColor;
let meatballsColor;
let sauceColor;
let cupColor;
let waterColor;

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

// Set up food
var spagetti;
var platesOfSpaghetti = [];

function preload() {
    // Preload the images and the font
    newFont = loadFont('fonts/Italiana-Regular.ttf');
    forkImg = loadImage('images/fork.png');
    napkinImg = loadImage('images/napkin.png');
    treeImg = loadImage('images/tree.png');
    for (var i = 0; i < 10; i++) {
        templeruncharacter = new Character('character/Idle__00' + i + '.png', 30, 100);
        templeObjects[i] = templeruncharacter;
    }
    for (var i = 0; i <templeObjects.length; i++) {
        animation[i] = templeObjects[i].getImage();
    }
}

function setup() {
    createCanvas(800, 600);
    tableLegColor = color(255, 204, 153);
    tableTopColor = color(139, 69, 19);
    plateColor = color(255);
    spaghettiColor = color(255, 255, 102);
    meatballsColor = color(153, 101, 21);
    sauceColor = color(255, 0, 0);
    cupColor = color(255);
    waterColor = color(0, 191, 255);

    x = 400; // Plate starts in the center

    // Generate a cup position that does not overlap with the plate
    do {
        cupOfWaterX = random(500, 700); // Only on the right-hand side
    } while (abs(cupOfWaterX - x) < 100); // Ensure cup is at least 100 pixels away from the plate

    napkinX = random(100, 300); // Napkin moves on the left-hand side of the table

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

function drawTable(x, y) {
    // Draw the table legs
    fill(tableLegColor);
    rect(x, y, 20, 100);
    rect(x + 680, y, 20, 100);
    rect(x + 340, y, 20, 100);

    // Draw the table top
    fill(tableTopColor);
    rect(x, y - 50, 700, 50);
}

function drawPlateofSpaghetti(x, y) {
    // Draw the plate
    fill(plateColor);
    ellipse(x, y, 100, 20);

    // Draw the spaghetti
    fill(spaghettiColor);
    ellipse(x, y, 80, 20);

    // Draw the sauce
    fill(sauceColor);
    ellipse(x, y, 80, 10);

    // Draw the meatballs
    fill(meatballsColor);
    ellipse(x, y, 10, 10);
    ellipse(x - 10, y, 10, 10);
    ellipse(x + 10, y, 10, 10);
}

function drawCupofWater(x, y) {
    // Draw the cup
    fill(cupColor);
    rect(x, y, 20, 30);

    // Draw the water
    fill(waterColor);
    ellipse(x + 10, y, 20, 10);
}

function changeSpeed() {
    // Randomly adjust the speed of the water cup and napkin
    waterSpeed = random(1, 4); // Random speed between 1 and 4
    napkinSpeed = random(0.5, 3); // Random speed between 0.5 and 3
}

function draw() {
    background(150);
    movePlayer();

    image(animation[i], characterx, charactery, 100, 150) ;
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
    if (keyIsDown(W)) {
        charactery -= 5;
    }
    if (keyIsDown(S)) {
        charactery += 5;
    }
    if (keyIsDown(A)) {
        characterx -= 5;
    }
    if (keyIsDown(D)) {
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