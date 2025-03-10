class Food {
    constructor(x2, y2, badFood) {
        this.x2 = x2;
        this.y2 = y2;
        this.badFood = badFood;
    }
    randomX() {
        this.x2 = random(0, width);
    }
    randomY() 
    {
        this.y2 = random(0, height);
    }
    getX() {
        return this.x2;
    }
    getY() {
        return this.y2;
    }
    getWidth() {
        return 100;
    }
    getHeight() {
        return 20;
    }
    drawSpaghetti() {
        // Draw the plate (use circles)
        if(!this.badFood) {
            fill(255, 255, 255);
            ellipse(this.x2, this.y2, 100, 20);
        }
        else {
            fill(255, 0, 0);
            ellipse(this.x2, this.y2, 100, 20);
        }
        var spaghettiColor = color(255, 255, 102);
        var meatballsColor = color(153, 101, 21);
        var sauceColor = color(255, 0, 0);
        
        // Draw the spaghetti
        fill(spaghettiColor);
        ellipse(this.x2, this.y2, 80, 20);
    
        // Draw the sauce
        fill(sauceColor);
        ellipse(this.x2, this.y2, 80, 10);
    
        // Draw the meatballs
        fill(meatballsColor);
        ellipse(this.x2, this.y2, 10, 10);
        ellipse(this.x2 - 10, this.y2, 10, 10);
        ellipse(this.x2 + 10, this.y2, 10, 10);
    }
}