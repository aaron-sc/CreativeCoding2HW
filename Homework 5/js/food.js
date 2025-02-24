class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    randomX() {
        this.x = random(0, width);
    }
    randomY() 
    {
        this.y = random(0, height);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    drawSpaghetti() {
        // Draw the plate
        fill(plateColor);
        ellipse(this.x, this.y, 100, 20);
    
        // Draw the spaghetti
        fill(spaghettiColor);
        ellipse(this.x, this.y, 80, 20);
    
        // Draw the sauce
        fill(sauceColor);
        ellipse(this.x, this.y, 80, 10);
    
        // Draw the meatballs
        fill(meatballsColor);
        ellipse(this.x, this.y, 10, 10);
        ellipse(this.x - 10, this.y, 10, 10);
        ellipse(this.x + 10, this.y, 10, 10);
    }
}