class ThrowableObject extends MovableObject {
    speedY = 0;
    acceleration = 4;
    x = 150;
    y = 190;
    height = 50;
    width = 50;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    imageCache = [];
    currentImageIndex = 0;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_ROTATION);
        this.applyGravity();
        this.throw();
        this.animate();
    }


    throw() {
        this.speedY = 20;
        setInterval(() => {
            this.x += 10;
        }, 25);
        console.log( this.y);

    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
    }

}