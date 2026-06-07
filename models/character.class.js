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
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',

    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    currentImageIndex = 0;
    world;
    speedY = 0;
    acceleration = 2.5;
    isJumping = false;
    otherDirection = false;
    lastThrow = 0;



    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();        
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x + this.speed < this.world.level.levelEndX - this.width) {
                this.x += this.speed;
                this.otherDirection = false;
                this.world.camera_x = -this.x + 100;

            }
            if (this.world.keyboard.LEFT && this.x > 110) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.world.camera_x = -this.x + 100;

            }
            if (this.world.keyboard.SPACE) {
                if (!this.isAboveGround() && !this.isJumping) {
                    this.jump();
                }
            }
            if (!this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.isJumping = false;
            }
            if (this.world.keyboard.D) {
                let currentTime = Date.now();
                if (currentTime - this.lastThrow > 1000) {
                    this.throw();
                    this.lastThrow = currentTime;

                }
            }

        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHit()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }

            else {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 100);

    }



    jump() {
        this.speedY = 30;
        this.isJumping = true;

    }


    throw() {
        let bottle = new ThrowableObject(this.x + 50, this.y + 100);
        this.world.throwableObjects.push(bottle);
    }




}