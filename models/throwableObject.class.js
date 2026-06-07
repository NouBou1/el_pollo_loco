class ThrowableObject extends MovableObject {
    speedY = 10;
    acceleration = 0.5;
    x = 120;
    y = 100;
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
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
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