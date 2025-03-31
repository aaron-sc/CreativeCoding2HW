
var idlePaths = [];
var myAnimation;
var myWalkAnimation;
var walkPaths = [];
var catImage;

var goodItems = [];
var numGoodItems = 10;
var badItems = [];
var numberBadItems = 10;
var collisionItems = [];
var numberCollisionItems = 3;

const particles = [];

var score = 0;
var lives = 5;

var gameStart = true;

function preload() {
   idlePaths = loadStrings("./images/idle/idle.txt");
   walkPaths = loadStrings("./images/walk/walk.txt");
}
function createGoodItem(x, y) {
    var goodImage = createSprite(x, y, 'static');
    goodImage.img = "./images/green-circle.png";
    goodImage.scale = 0.05;
    goodImage.diameter = 100;
    return goodImage;
}
function createBadItem(x, y) {
    var badImage = createSprite(x, y, 'static');
    badImage.img = "./images/red-circle.png";
    badImage.scale = 0.08;
    badImage.diameter = 100;
    return badImage;
}
function createCollisionItem(x, y) {
    var collisionImage = createSprite(x, y, 'static');
    collisionImage.img = "./images/rock.png";
    collisionImage.scale = 0.05;
    collisionImage.diameter = 110;
    return collisionImage;
}
function setup() {
  createCanvas(900,800);
  var animationW = 125;
  var animationH = 200;
  myAnimation = new animationImage(200, 200, animationW, animationH, 3);
  myAnimation.loadAnimation('idle', idlePaths);
  myAnimation.loadAnimation('walk', walkPaths);
  myAnimation.debug = true;
// Spawn Good Items, Bad Items, and Collision Items not touching each other or the player
    for(var i = 0; i < numGoodItems; i++)
    {
        var goodItem = createGoodItem(random(0, width), random(0, height));
        goodItems.push(goodItem);
    }
    for(var i = 0; i < numberBadItems; i++)
    {
        var badItem = createBadItem(random(0, width), random(0, height));
        badItems.push(badItem);
    }
    for(var i = 0; i < numberCollisionItems; i++)
    {
        var collisionItem = createCollisionItem(random(0, width), random(0, height));
        collisionItems.push(collisionItem);
    }
    
}

function explode(x, y) {
    for (let i = 0; i < 5; i++) {
        let p = new Particle(x,y);
        particles.push(p);
        
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        console.log(particles[i]);
        if (particles[i].finished()) {
          // remove this particle
          
          particles.splice(i, 1);
        }
      }
}
function checkCollision() {
    myAnimation.currentAnimation.rotationSpeed = 0;
    myAnimation.currentAnimation.rotation = 0;
    for(var i = 0; i < goodItems.length; i++)
        {
            if(myAnimation.isColliding(goodItems[i]))
            {
                score++;
                goodItems[i].remove();
                goodItems.splice(i, 1);
            }
        }
        for(var i = 0; i < badItems.length; i++)
        {
            if(myAnimation.isColliding(badItems[i]))
            {
                lives--;
                badItems[i].remove();
                badItems.splice(i, 1);
                if(lives <= 0)
                    {
                        gameStart = false;
                    }
            }
        }
        for(var i = 0; i < collisionItems.length; i++)
        {
            if(myAnimation.isColliding(collisionItems[i]))
            {
                explode(collisionItems[i].x, collisionItems[i].y);
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');
                myAnimation.currentAnimation.velocity.x = 0;
                myAnimation.currentAnimation.velocity.y = 0;
            }

        }
}



// display all the frames using the draw function as a loop
function draw() 
{   
    background(0);

    if(gameStart == false)
    {
        fill(255);
        textSize(32);
        text('Game Over', width/2 - 50, height/2);
        text('Score: ' + score, width/2 - 50, height/2 + 50);
        myAnimation.drawAnimation('idle');
        myAnimation.updatePosition('idle');
    }
    else if(score == numGoodItems)
    {
        fill(255);
        textSize(32);
        text('You Win', width/2 - 50, height/2);
        text('Score: ' + score, width/2 - 50, height/2 + 50);
        myAnimation.drawAnimation('idle');
        myAnimation.updatePosition('idle');
    }
    if(gameStart) { 
    // Display the score and lives
    fill(255);
    textSize(32);
    text('Score: ' + score, 10, 30);
    text('Lives: ' + lives, 10, 60);

    if(kb.pressing('d'))
    {
        myAnimation.updatePosition('forward');
        myAnimation.drawAnimation('walk');  
        checkCollision();   
    }
    else if(kb.pressing('a'))
    {
        myAnimation.updatePosition('reverse');
        myAnimation.drawAnimation('walk');
        checkCollision();   
    }
    else if(kb.pressing('s'))
    {
        myAnimation.updatePosition('down');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else if(kb.pressing('w'))
    {
        myAnimation.updatePosition('up');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else if(kb.pressing('d') && kb.pressing('s'))
    {
        myAnimation.updatePosition('bottomRight');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else if(kb.pressing('a') && kb.pressing('s'))
    {
        myAnimation.updatePosition('bottomLeft');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else if(kb.pressing('d') && kb.pressing('w'))
    {
        myAnimation.updatePosition('topRight');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else if(kb.pressing('a') && kb.pressing('w'))
    {
        myAnimation.updatePosition('topLeft');
        myAnimation.drawAnimation('walk');
        checkCollision();        
    }
    else
    {
        myAnimation.drawAnimation('idle');
        myAnimation.updatePosition('idle');
        checkCollision();
    } }
}