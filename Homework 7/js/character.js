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

      toString() {
        return "Character: " + this.path + ", x: " + this.x + ", y: " + this.y;
      }

}