class Character extends MovableObject {
    x = 100;
    y = 180;
    height = 250;
    width = 100;
    speed = 3.5;
    IMAGES_WALKING = [
       
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    currentImageIndex = 0;
    world;
    speedY = 0;
    acceleration = 2.5;
    isJumping = false;
    otherDirection = false;
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);

        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x + this.speed < this.world.level.levelEndX - this.width) { 
                this.x += this.speed;
                this.otherDirection = false;
                this.world.camera_x = -this.x + 100;
                console.log(`Moved right to x: ${this.x}`);
                console.log(`World level end X: ${this.world.level.levelEndX}`);
            }
            if (this.world.keyboard.LEFT && this.x > 110  ) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.world.camera_x = -this.x + 100;
                console.log(`Moved left to x: ${this.x}`);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
  
         
        }, 1000 / 60);

        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 100);

    }



    jump() {
        this.speedY = 30;
    }

}