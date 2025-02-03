// File for drawing a spagetti dinner using p5.js on a table

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

// Set up colors for the shapes
let tableLegColor;
let tableTopColor;
let plateColor;
let spaghettiColor;
let meatballsColor;
let sauceColor;
let cupColor;
let waterColor;

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
    cupOfWaterX = random(100, 700);
    
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

function drawPlateofSpagetti(x, y) {
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
    textSize(25);
    text("Aaron Santa Cruz",550,560);
    text("Spagetti Dinner",50,50);

    // draw the shapes
    // table
    drawTable(50, 400);
    // table top
    fill(tableTopColor);
    // plate of spaghetti
    drawPlateofSpagetti(x, 350);
    // randomly place the cup of water
    drawCupofWater(cupOfWaterX, 320);

    // move plate of spaghetti and dont let it fall off of the table
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