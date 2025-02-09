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
let frameCounter = 0; // Counter to control movement timing
var newFont;
var timerText = 0;
var forkImg;
var napkinImg;
var treeImg;
let waterSpeed = 2; // Initial speed of water cup

// Set up colors for the shapes
let tableLegColor;
let tableTopColor;
let plateColor;
let spaghettiColor;
let meatballsColor;
let sauceColor;
let cupColor;
let waterColor;

function preload() {
    // Preload the images and the font
    newFont = loadFont('fonts/Italiana-Regular.ttf');
    forkImg = loadImage('images/fork.png');
    napkinImg = loadImage('images/napkin.png');
    treeImg = loadImage('images/tree.png');
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

    // Draw the napkin on the left side of the table
    image(napkinImg, x + 50, y - 80, 50, 50); // Napkin on the left, properly placed on the table
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
    // Randomly adjust the speed of the water cup
    waterSpeed = random(1, 4); // Random speed between 1 and 4
}

function draw() {
    background(150);

    // Draw the tree in the background
    image(treeImg, 250, 50, 300, 300);

    // Draw borders
    noStroke();
    fill(0, 100, 255);
    rect(0, 0, 800, 25); // Top border
    rect(0, 25, 25, 600); // Left border
    rect(25, 575, 800, 25); // Bottom border
    rect(775, 25, 25, 600); // Right border

    // Draw text
    fill(0);
    textFont(newFont);
    textSize(25);
    text("Aaron Santa Cruz", 550, 560);
    text("Spagetti Dinner", 50, 50);

    // Draw table and items
    drawTable(50, 400);
    drawPlateofSpaghetti(x, 350);

    // Draw fork (static, on the table to the right of the plate)
    image(forkImg, x + 100, 370, 80, 30);

    // Move the water cup
    cupOfWaterX += waterSpeed;
    if (cupOfWaterX > 700 || cupOfWaterX < 500) {
        waterSpeed *= -1; // Reverse direction if out of bounds
    }

    // Draw the moving water cup
    drawCupofWater(cupOfWaterX, 320);

    // Move plate of spaghetti with keyboard
    if (keyIsPressed) {
        if (key == 'a') {
            x -= 5;
        }
        if (key == 'd') {
            x += 5;
        }

        // Keep the plate within table bounds
        if (x < 100) {
            x = 100;
        }
        if (x > 700) {
            x = 700;
        }
    }

    frameCounter++; // Increment frame counter
}
