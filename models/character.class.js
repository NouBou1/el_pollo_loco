class Character extends MovableObject {
    x = 50;
    y = 280;
    speed = 1.5;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png'
    ];
    currentImageIndex = 0;
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT) { 
                this.x += this.speed;
                console.log(`Moved right to x: ${this.x}`);
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                console.log(`Moved left to x: ${this.x}`);
            }
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.x += this.speed;

                let i = this.currentImageIndex % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImageIndex++;
            }
        }, 100);

    }


    jump() {
        if (this.world.keyboard.UP) {
            this.y -= 150;
            console.log("Character jumps");
        }
        setTimeout(() => {
            this.stopJump();
        }, 500);
  

    }

}