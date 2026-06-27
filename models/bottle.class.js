class Bottle extends DrawableObject {
    x;
    y = 360;
    height = 60;
    width = 60;

    constructor(x) {
        super().loadImage(this.getRandomBottleImage());
        this.x = x || 200 + Math.random() * 3000;
    }

    getRandomBottleImage() {
        const randomNumber = Math.floor(Math.random() * 2) + 1; 
        return `assets/img/6_salsa_bottle/${randomNumber}_salsa_bottle_on_ground.png`;
    }
}
