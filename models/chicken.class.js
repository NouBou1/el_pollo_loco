class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 370; 
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImageIndex = 0;



    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 700; 
        this.speed = 0.4 + Math.random() * 1.0;
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