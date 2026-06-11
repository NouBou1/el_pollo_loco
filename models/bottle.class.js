class Bottle extends DrawableObject {
    x;
    y = 360;
    height = 60;
    width = 60;

    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x || 200 + Math.random() * 3000;
    }
}
