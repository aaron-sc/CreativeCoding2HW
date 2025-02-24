class Character {
    constructor(path, x, y) {
        this.x = x;
        this.y = y;
        this.path = path;
    }
    getImage() {
        return loadImage(this.path);
    }
    getX() {
        return this.x;
    }
    hasCollided(x2, y2, w2, h2) {
        return(
            this.x < x2 + w2 &&
            this.x + this.imageWidth > x2 &&
            this.y < y2 + h2 &&
            this.y + this.imageHeight > y2
            );
    }
    getY() {
        return this.y;
    }

}