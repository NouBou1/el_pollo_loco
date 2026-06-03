class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 370; // Feste y-Position für alle Hühner1
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImageIndex = 0;



    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 700; // Zufällige x-Position zwischen 200 und 900
        this.speed = 0.4 + Math.random() * 1.0; // Zufällige Geschwindigkeit zwischen 0.4 und 1.4
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            let path = this.IMAGES_WALKING[this.currentImageIndex];
            this.img = this.imageCache[path];
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_WALKING.length;
        }, 100);
    }
}