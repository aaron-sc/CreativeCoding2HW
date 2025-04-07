var shape1, shape2, shape3;
var shapes = [];
var currentNumber = 0;
let myFont;

function preload() {
    myFont = loadFont('fonts/Italiana-Regular.ttf');
  }
  
function setup()
{
    createCanvas(800,800, WEBGL);
    shape1 = new Box(random(100,200),random(100,200), 0.25, .05, 50, 25);
    shape2 = new Cylinder(random(-50,-200),random(-10,-200), 0.1, .025, 50, 25);
    shape3 = new Ellipsoid(random(-50,-200),random(80,300), 0.33, .01, 110, 55);
    shape4 = new Cone(random(0,-200),random(100,300), 0.1, .33, 60, 100);
    shape5 = new Torus(random(100,-200),random(50,300), 0.33, .33, 50, 25);


    shapes[0] = shape1;
    shapes[1] = shape2;
    shapes[2] = shape3;
    shapes[3] = shape4;
    shapes[4] = shape5;
    normalMaterial();
    setInterval(changeShape, 1500);
}

function draw()
{
    background(120,100, 40);
   // console.log(round(random(0,2)));
    

   // Add a title and name to the piece
   textFont(myFont);
    textSize(40);
    fill(0, 0, 0);
    text('Funny 3D madness', -350, -350);
    textSize(25);
    text('by: Aaron Santa Cruz', -350, -320);
    normalMaterial();
   shapes[currentNumber].draw();


}

function changeShape()
{
    currentNumber = round(random(0,4));
}