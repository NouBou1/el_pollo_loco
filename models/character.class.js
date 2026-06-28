class Character extends MovableObject {
    x = 100;
    y = 180;
    height = 250;
    width = 100;
    speed = 3;
    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 5
    };
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png'
    ];
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',

    ];
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    currentImageIndex = 0;
    world;
    speedY = 0;
    acceleration = 2.5;
    isJumping = false;
    otherDirection = false;
    lastThrow = 0;
    bottles = 0;
    coins = 0;
    hurtSoundLastHit = 0;
    deathSoundPlayed = false;
    deathAnimationIndex = 0;
    deathAnimationComplete = false;
    lastMovement = Date.now();
    sounds;
    gameEnded = false;


    constructor() {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.handleMovement();
            this.handleActions();
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimations();
        }, 100);
    }

    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x + this.speed < this.world.level.levelEndX - this.width) {
            this.moveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 110) {
            this.moveLeft();
        }
    }

    handleActions() {
        this.handleJump();
        this.handleThrow();
    }

    handleJump() {
        if (this.world.keyboard.SPACE) {
            if (!this.isAboveGround() && !this.isJumping) {
                this.jump();
            }
        }
        if (!this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.isJumping = false;
        }
    }

    handleThrow() {
        if (this.world.keyboard.D) {
            let currentTime = Date.now();
            if (currentTime - this.lastThrow > 1000) {
                this.throw();
                this.lastThrow = currentTime;
            }
        }
    }

    handleAnimations() {
        if (this.shouldSkipAnimation()) {
            return;
        }
        this.selectAndPlayAnimation();
    }

    shouldSkipAnimation() {
        if (this.isDead()) {
            console.log('Character is DEAD! Energy:', this.energy, 'deathAnimationIndex:', this.deathAnimationIndex);
            this.playDeathAnimation();
            return true;
        }
        return this.gameEnded;
    }

    selectAndPlayAnimation() {
        if (this.isHit()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else if (this.isMoving()) {
            this.playWalkAnimation();
        } else {
            this.playIdleAnimation();
        }
    }

    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSoundIfNeeded();
        this.stopMovementSounds();
    }

    playHurtSoundIfNeeded() {
        if (this.hurtSoundLastHit !== this.lastHit) {
            this.sounds.playHurtSound();
            this.hurtSoundLastHit = this.lastHit;
        }
    }

    stopMovementSounds() {
        this.sounds.pauseWalkingSound();
        this.sounds.pauseSnoringSound();
    }

    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.stopMovementSounds();
    }

    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.sounds.playWalkingSound();
        this.sounds.pauseSnoringSound();
    }

    playIdleAnimation() {
        if (this.isLongIdle()) {
            this.playLongIdleAnimation();
        } else {
            this.playShortIdleAnimation();
        }
        this.sounds.pauseWalkingSound();
    }

    isLongIdle() {
        let idleTime = Date.now() - this.lastMovement;
        return idleTime > 10000;
    }

    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.sounds.playSnoringSound();
    }

    playShortIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.sounds.pauseSnoringSound();
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.updateCamera();
        this.lastMovement = Date.now();
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.updateCamera();
        this.lastMovement = Date.now();
    }

    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    jump() {
        this.speedY = 30;
        this.isJumping = true;
        this.sounds.playJumpingSound();
    }

    throw() {
        if (this.bottles > 0) {
            this.createAndThrowBottle();
            this.updateBottleCount();
            this.playThrowEffects();
        }
    }

    createAndThrowBottle() {
        let bottle = new ThrowableObject(this.x + 50, this.y + 100, this.otherDirection, this.sounds);
        this.world.throwableObjects.push(bottle);
    }

    updateBottleCount() {
        this.bottles--;
        this.world.bottleStatusbar.setAmount(this.bottles);
    }

    playThrowEffects() {
        this.sounds.playThrowSound();
        this.lastMovement = Date.now();
    }

    collectBottle() {
        this.bottles++;
        this.world.bottleStatusbar.setAmount(this.bottles);
        this.sounds.playCollectBottleSound();
    }

    collectCoin() {
        this.coins++;
        this.world.coinStatusbar.setAmount(this.coins);
        this.sounds.playCollectCoinSound();
    }

    playDeathAnimation() {
        this.playDeathSoundOnce();
        this.stopMovementSounds();
        this.advanceDeathAnimation();
    }

    playDeathSoundOnce() {
        if (!this.deathSoundPlayed) {
            this.sounds.playDeathSound();
            this.deathSoundPlayed = true;
        }
    }

    advanceDeathAnimation() {
        if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
            let path = this.IMAGES_DEAD[this.deathAnimationIndex];
            this.img = this.imageCache[path];
            this.deathAnimationIndex++;
        } else {
            this.deathAnimationComplete = true;
        }
    }

}