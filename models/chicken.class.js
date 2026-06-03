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
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImageIndex % this.IMAGES_WALKING.length;
            this.moveLeft(); // Huhn bewegt sich nach links
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        }, 100);
    }
}