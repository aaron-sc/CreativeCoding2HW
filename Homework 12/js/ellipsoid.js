class Ellipsoid extends threedshape
{
    constructor(x, y, speedX, speedY, width, height)
    {
        super(x,y, speedX, speedY);
        this.width = width;
        this.height = height;

    }

    draw()
    {
        push();
        super.moveShape();
        stroke(0);

        ellipsoid(this.width, this.height);
        pop();
    }

}
