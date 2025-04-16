
var idlePaths = [];
var myAnimation;
var myWalkAnimation;
var walkPaths = [];
var slidePaths = [];

var goodItems = [];
var numGoodItems = 10;
var badItems = [];
var numberBadItems = 10;
var collisionItems = [];
var numberCollisionItems = 5;
var collisionItemHealth = 100;
var powerUpItems = [];
var numberPowerUpItems = 4;

let damageBoostActive = false;
let damageBoostStartTime = 0;
let damageBoostDuration = 1000; // milliseconds


var characterDamage = 5;
var drewItems = false;
var particles = [];

var prevDirection = 0;

var score = 0;
var lives = 5;

var gameStart = false;
var gameOver = false;

// Music
var bgMusic;

// Start Button
let testButton = new Button("box", 300, 250);
testButton.width = 200;
testButton.height = 50;
testButton.cornerSize = 10;
testButton.cornerDistance = 0;
testButton.shrink = 0;
testButton.Pdist = 0;
testButton.Pshrink = 0;
testButton.col1 = [0,230,180];
testButton.col2 = [0,30,30];
testButton.stroke = [0,230,180];
testButton.strokeWeight = 1;
testButton.fill = testButton.col1;
testButton.Pfill = testButton.fill;
testButton.Pstroke = testButton.stroke;
testButton.text = "START";
testButton.textSize = 15;
testButton.textColor = testButton.col2;
testButton.PtextColor = testButton.col2;


function preload() {
    idlePaths = loadStrings("./images/idle/idle.txt");
    walkPaths = loadStrings("./images/walk/walk.txt");
    slidePaths = loadStrings("./images/slide/slide.txt")

    bgMusic = loadSound("./audio/music.wav");
    // sfxBreak = loadSound("./assets/break.mp3");
    // sfxGood = loadSound("./assets/good.mp3");
    // sfxBad = loadSound("./assets/bad.mp3");
    // sfxPower = loadSound("./assets/powerup.mp3");
}

testButton.render = function(){
  
    // animations
    let Ptimer = this.timeSincePressedChange
    let Htimer = min(this.timeSinceHoverChange, Ptimer)
    
    if(this.hover && !this.pressed){ // when hovered over
    //   this.cornerDistance = Clerp(this.Pdist, 10, sin(min(Htimer*2,1)*PI/2))
      this.shrink = Clerp(this.Pshrink, 3, Htimer*5)
      this.fill = ClerpColor(this.Pfill, this.col2, Htimer*5)
      this.textColor = ClerpColor(this.PtextColor, this.col1, Htimer*5)
    }else if(this.pressed){ // when clicked
      this.cornerDistance = Clerp(this.Pdist, 15, sin(min(Ptimer*4,1)*PI/2))
      this.shrink = Clerp(this.Pshrink, 5, Ptimer*5)
      this.fill = ClerpColor(this.Pfill, this.col1, Ptimer*5)
      this.textColor = ClerpColor(this.PtextColor, this.col2, Htimer*5)
    }else{ // when not hovered or clicked
      this.cornerDistance = Clerp(this.Pdist, 0, sin(min(Htimer*2,1)*PI/2))
      this.shrink = Clerp(this.Pshrink, 0, Htimer*5)
      this.fill = ClerpColor(this.Pfill, this.col1, Htimer*5)
      this.textColor = ClerpColor(this.PtextColor, this.col2, Htimer*5)
    }
    
    
    fill(this.fill)
    stroke(this.fill)
    rect(this.x + this.shrink, this.y + this.shrink, this.width - 2*this.shrink, this.height - 2*this.shrink)
    
    textAlign(CENTER,CENTER)
    noStroke()
    fill(this.textColor)
    textSize(this.textSize)
    text(this.text,this.x + this.shrink, this.y + this.shrink, this.width - 2*this.shrink, this.height - 2*this.shrink)
    
    let x = this.x
    let y = this.y
    let w = this.width
    let h = this.height
    let d = this.cornerDistance
    let s = this.cornerSize
    
    stroke(this.stroke)
    strokeWeight(this.strokeWeight)
    
    // top left corner
    line(x - d, y - d, x - d + s, y - d)
    line(x - d, y - d, x - d, y - d + s)
    
    // top right corner
    line(x + w + d, y - d, x + w + d - s, y - d)
    line(x + w + d, y - d, x + w + d, y - d + s)
    
    // bottom left corner
    line(x - d, y + h + d, x - d + s, y + h + d)
    line(x - d, y + h + d, x - d, y + h + d - s)
    
    // bottom right corner
    line(x + w + d, y + h + d, x + w + d - s, y + h + d)
    line(x + w + d, y + h + d, x + w + d, y + h + d - s)
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
function createCollisionItem(x, y, health) {
    var collisionImage = createSprite(x, y, 'static');
    collisionImage.img = "./images/rock.png";
    collisionImage.scale = 0.05;
    collisionImage.textSize = 20;
    collisionImage.diameter = 110;
    collisionImage.health = health;
    collisionImage.text = collisionImage.health;
    collisionImage.x = x;
    collisionImage.y = y;
    return collisionImage;
}
function createPowerUpItem(x, y) {
    var powerUpImage = createSprite(x, y, 'static');
    powerUpImage.img = "./images/star.png";
    powerUpImage.scale = 0.05;
    powerUpImage.diameter = 100;
    return powerUpImage;
}
function setup() {
    createCanvas(900, 800);
    var animationW = 50;
    var animationH = 50;
    myAnimation = new animationImage(200, 200, animationW, animationH, 3);
    myAnimation.loadAnimation('idle', idlePaths);
    myAnimation.loadAnimation('walk', walkPaths);
    myAnimation.loadAnimation('slide', slidePaths);
    myAnimation.debug = true;



}

function explode(x, y) {
    for (var i = 0; i < 60; i++) {
        var particle = new Particle(x, y);
        particles.push(particle);
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
    }

    
    for (var i = 0; i < 60; i++) {
        particles[i].show();
        if(particles[i].finished()) {
            particles.splice(i, 1);
        }
    }

}
function checkCollision(isSlide) {
    myAnimation.currentAnimation.rotationSpeed = 0;
    myAnimation.currentAnimation.rotation = 0;
    for (var i = 0; i < goodItems.length; i++) {
        if (myAnimation.isColliding(goodItems[i])) {
            score++;
            goodItems[i].remove();
            goodItems.splice(i, 1);
        }
    }
    for (var i = 0; i < badItems.length; i++) {
        if (myAnimation.isColliding(badItems[i])) {
            lives--;
            badItems[i].remove();
            badItems.splice(i, 1);
            if (lives <= 0) {
                gameOver = true;
            }
        }
    }
    for (var i = 0; i < collisionItems.length; i++) {
        if (myAnimation.isColliding(collisionItems[i]) && isSlide == true) {
            collisionItems[i].health -= characterDamage;
            // myAnimation.drawAnimation('idle');
            // myAnimation.updatePosition('idle');
            myAnimation.currentAnimation.velocity.x = 0;
            myAnimation.currentAnimation.velocity.y = 0;
            console.log(collisionItems[i].health);
            collisionItems[i].text = collisionItems[i].health;
            if (collisionItems[i].health <= 0) {
                explode(collisionItems[i].x, collisionItems[i].y);
                collisionItems[i].remove();
                collisionItems.splice(i, 1); 
                // remove all the particles
                for (var j = 0; j < particles.length; j++) {
                    if (particles[j].finished()) {
                        particles.splice(j, 1);
                    }
                }
            }
        }

    }
    for (var i = 0; i < powerUpItems.length; i++) {
        if (myAnimation.isColliding(powerUpItems[i])) {
            powerUpItems[i].remove();
            powerUpItems.splice(i, 1);
            characterDamage += 5;
        }
    }
}



// display all the frames using the draw function as a loop
function draw() {
    background(0);
    if(testButton.pressed && gameStart == false){
        gameStart = true;
        testButton.hidden = true;
        bgMusic.loop();
        bgMusic.setVolume(0.1);
    }
    else {
        myAnimation.currentAnimation.opacity = 0;

    }
    if (gameOver) {
        fill(255);
        textSize(32);
        text('Game Over', width / 2 - 50, height / 2);
        text('Score: ' + score, width / 2 - 50, height / 2 + 50);
        myAnimation.drawAnimation('idle');
        myAnimation.updatePosition('idle');
        // Remove all items from the screen
        for (var i = 0; i < goodItems.length; i++) {
            goodItems[i].remove();
        }
        for (var i = 0; i < badItems.length; i++) {
            badItems[i].remove();
        }
        for (var i = 0; i < collisionItems.length; i++) {
            collisionItems[i].remove();
        }
        for (var i = 0; i < powerUpItems.length; i++) {
            powerUpItems[i].remove();
        }
        
    }

    if (gameStart) {
        // Display the score and lives
        fill(255);
        textSize(32);
        noStroke();
        textAlign(LEFT);
        text('Score: ' + score, 10, 30);
        text('Lives: ' + lives, 10, 60);
        text('Damage: ' + characterDamage, 10, 90);
        myAnimation.currentAnimation.opacity = 255;
if(drewItems == false){
    for (var i = 0; i < numGoodItems; i++) {
        var goodItem = createGoodItem(random(0, width), random(0, height));
        goodItems.push(goodItem);
    }
    for (var i = 0; i < numberBadItems; i++) {
        var badItem = createBadItem(random(0, width), random(0, height));
        badItems.push(badItem);
    }
    for (var i = 0; i < numberCollisionItems; i++) {
        var collisionItem = createCollisionItem(random(0, width), random(0, height), collisionItemHealth);
        collisionItems.push(collisionItem);
    }
    for (var i = 0; i < numberPowerUpItems; i++) {
        var powerUpItem = createPowerUpItem(random(0, width), random(0, height));
        powerUpItems.push(powerUpItem);
    }
    drewItems = true;
}
        if (kb.holding('d') && kb.holding('s')) {
            myAnimation.updatePosition('bottomRight');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }
        else if (kb.pressing('a') && kb.pressing('s')) {
            myAnimation.updatePosition('bottomLeft');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }
        else if (kb.pressing('d') && kb.pressing('w')) {
            myAnimation.updatePosition('topRight');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }
        else if (kb.pressing('a') && kb.pressing('w')) {
            myAnimation.updatePosition('topLeft');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }

        else if (kb.pressing('shift') && kb.pressing('d')) {

            myAnimation.updatePosition('forward');
            myAnimation.drawAnimation('slide');
            checkCollision(true);
        }
        else if (kb.pressing('shift') && kb.pressing('a')) {

            myAnimation.updatePosition('reverse');
            myAnimation.drawAnimation('slide');
            checkCollision(true);
        }
        else if (kb.pressing('d')) {
            myAnimation.updatePosition('forward');
            myAnimation.drawAnimation('walk');
            prevDirection = 0;
            checkCollision(false);
        }
        else if (kb.pressing('a')) {
            myAnimation.updatePosition('reverse');
            myAnimation.drawAnimation('walk');
            prevDirection = 180;
            checkCollision(false);
        }
        else if (kb.pressing('s')) {
            myAnimation.updatePosition('down');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }
        else if (kb.pressing('w')) {
            myAnimation.updatePosition('up');
            myAnimation.drawAnimation('walk');
            checkCollision(false);
        }
        else {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
            checkCollision(false);
        }
    }

        if (collisionItems.length == 0 && gameStart) {
        fill(255);
        textSize(32);
        text('You Win!', width / 2 - 50, height / 2);
        text('Score: ' + score, width / 2 - 50, height / 2 + 50);
        myAnimation.drawAnimation('idle');
        myAnimation.updatePosition('idle');
        noloop();
    }
}