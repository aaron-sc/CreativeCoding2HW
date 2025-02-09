// Set up variables for the shapes
let tableLeg1, tableLeg2
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
var image;


// Set up colors for the shapes
let tableLegColor;
let tableTopColor;
let plateColor;
let spaghettiColor;
let meatballsColor;
let sauceColor;
let cupColor;
let waterColor;


function preload()
{
    // preload the images and the font here from
    // newFont = loadFont('../fonts/Italiana-Regular.ttf');
    image = loadImage('images/provar.png');
}

function setup()
{
    createCanvas(800,600);
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
        cupOfWaterX = random(100, 700);
    } while (abs(cupOfWaterX - x) < 100); // Ensure cup is at least 100 pixels away from the plate
}


function drawTable(x, y) {
    // Draw the table legs
    fill(tableLegColor);
    rect(x, y, 20, 100);
    rect(x + 680, y, 20, 100);
    rect(x + 340, y, 20, 100);
    rect(x + 680, y, 20, 100);

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



function draw()
{
    background(150);
    // upper border
    image(donut,100,100);
    noStroke();
    fill(0,100,255);
    rect(0,0,800,25);
    // left border
    rect(0,25,25,600);
    // bottom border
    rect(25,575,800,25);
    // right border
    rect(775,25,25,600);

    fill(0);
    textFont(newFont);
    textSize(25);
    text("Aaron Santa Cruz",550,560);
    text("Spagetti Dinner",50,50);

    // draw the shapes
    drawTable(50, 400);
    drawPlateofSpaghetti(x, 350);
    drawCupofWater(cupOfWaterX, 320);

    // Move the cup of water every 60 frames (~1 second at 60 FPS)
    if (frameCounter % 60 == 0) {
        cupOfWaterX += random(-10, 10);  // Move slightly in a random direction

        if (cupOfWaterX < 100) {
            cupOfWaterX = 100;
        }
        if (cupOfWaterX > 700) {
            cupOfWaterX = 700;
        }
    }

    frameCounter++; // Increment frame counter

    // Move plate of spaghetti with keyboard
    if (keyIsPressed) {
        if (key == 'a') {
            x -= 5;
        }
        if (key == 'd') {
            x += 5;
        }

        if (x < 100) {
            x = 100;
        }
        if (x > 700) {
            x = 700;
        }
    }
}
