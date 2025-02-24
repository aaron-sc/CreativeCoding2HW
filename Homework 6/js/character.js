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
    getY() {
        return this.y;
    }
    hasCollided(x2, y2, w2, h2) {
        return this.x < x2 + w2 &&
            this.x + 100 > x2 &&
            this.y < y2 + h2 &&
            this.y + 150 > y2;
      }
      toString() {
        return "Character: " + this.path + ", x: " + this.x + ", y: " + this.y;
      }

}