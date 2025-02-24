class Food {
    constructor(x2, y2) {
        this.x2 = x2;
        this.y2 = y2;
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
    drawSpaghetti() {
        // Draw the plate
        fill(plateColor);
        ellipse(this.x2, this.y2, 100, 20);
    
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