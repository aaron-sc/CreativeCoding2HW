class animationImage {

    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.currentAnimation;
        this.createAnimation();
        this.direction = "";

    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }

    setCurrentFrameCount(currentFrameCount) {

        this.currentFrameCount = currentFrameCount;
    }

    createAnimation() {
        this.currentAnimation = createSprite(this.x, this.y, this.w, this.h);
    }

    loadAnimation(animationType, fileNames) {


        this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
        // set the hit box
        this.currentAnimation.width = 350;
        this.currentAnimation.height = 500;
        this.currerotationSpeed = 0;
        // this.currentAnimation.debug = true;

    }


    drawAnimation(animationType) {

        this.currentAnimation.frameDelay = 5;
        this.currentAnimation.scale = .5;
        this.currentAnimation.width = 125;
        this.currentAnimation.height = 250;
        this.currentAnimation.rotation = 0;
        this.currentAnimation.rotationSpeed = 0;
        this.currentAnimation.debug = true;
        this.currentAnimation.changeAnimation(animationType);
        if(animationType == 'idle' && this.direction == 'idle') {
            this.currentAnimation.velocity.x = 0;
            this.currentAnimation.velocity.y = 0;
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 0;
            this.currentAnimation.speed = 0;

        }
        else if (animationType == 'walk' && this.direction == 'forward') {
            this.currentAnimation.direction = 0;
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.speed = this.speed;
        }
        else if (animationType == 'walk' && this.direction == 'reverse') {

            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 180;
            this.currentAnimation.speed = this.speed;

        }

        else if (animationType == 'walk' && this.direction == 'up') {
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 270;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'walk' && this.direction == 'down') {
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 90;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'walk' && this.direction == 'bottomRight') {
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 45;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'walk' && this.direction == 'bottomLeft') {
            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 135;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'walk' && this.direction == 'topRight') {
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 315;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'walk' && this.direction == 'topLeft') {
            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 225;
            this.currentAnimation.speed = this.speed;

        }
        else if (animationType == 'idle') {
            this.currentAnimation.velocity.x = 0;
            this.currentAnimation.velocity.y = 0;
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.direction = 0;
            this.currentAnimation.speed = 0;

        }


        else {
            this.currentAnimation.velocity.x = 0;
        }


    }

    incrementIndex() {

        if (this.currentFrameCount % 5 == 0) {
            this.i++;
        }

        if (this.i >= this.fileNames.length) {
            this.i = 0;
        }
    }

    updatePosition(direction) {
        this.direction = direction;

    }

    isColliding(myImage) {
        return this.currentAnimation.collide(myImage);
    }

}