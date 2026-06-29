/**
 * Represents the player-controlled character: handles movement, jumping,
 * throwing bottles, animations and collected items.
 * @extends MovableObject
 */
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


    /**
     * Creates the character, preloads its animations and starts gravity and update loops.
     */
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

    /**
     * Starts the recurring loops for movement/actions and animation updates.
     */
    animate() {

        setInterval(() => {
            this.handleMovement();
            this.handleActions();
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimations();
        }, 100);
    }

    /**
     * Moves the character left or right based on the current keyboard state.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x + this.speed < this.world.level.levelEndX - this.width) {
            this.moveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 110) {
            this.moveLeft();
        }
    }

    /**
     * Handles jump and throw input for the current frame.
     */
    handleActions() {
        this.handleJump();
        this.handleThrow();
    }

    /**
     * Starts a jump when SPACE is pressed while grounded, or clears the jump flag on landing.
     */
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

    /**
     * Throws a bottle when D is pressed and the throw cooldown has elapsed.
     */
    handleThrow() {
        if (this.world.keyboard.D) {
            let currentTime = Date.now();
            if (currentTime - this.lastThrow > 1000) {
                this.throw();
                this.lastThrow = currentTime;
            }
        }
    }

    /**
     * Updates the character's current animation, unless it should be skipped.
     */
    handleAnimations() {
        if (this.shouldSkipAnimation()) {
            return;
        }
        this.selectAndPlayAnimation();
    }

    /**
     * Checks whether animation updates should be skipped (dead or game ended).
     * @returns {boolean} True if animation handling should be skipped this frame.
     */
    shouldSkipAnimation() {
        if (this.isDead()) {
            this.playDeathAnimation();
            return true;
        }
        return this.gameEnded;
    }

    /**
     * Picks and plays the animation matching hit/jump/walk/idle state.
     */
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

    /**
     * Checks whether a movement key is currently pressed.
     * @returns {boolean} True if LEFT or RIGHT is pressed.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Plays the hurt animation, hurt sound (once per hit), and stops movement sounds.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSoundIfNeeded();
        this.stopMovementSounds();
    }

    /**
     * Plays the hurt sound once per new hit, tracked via the last-hit timestamp.
     */
    playHurtSoundIfNeeded() {
        if (this.hurtSoundLastHit !== this.lastHit) {
            this.sounds.playHurtSound();
            this.hurtSoundLastHit = this.lastHit;
        }
    }

    /**
     * Pauses the walking and snoring sounds.
     */
    stopMovementSounds() {
        this.sounds.pauseWalkingSound();
        this.sounds.pauseSnoringSound();
    }

    /**
     * Plays the jump animation and stops movement sounds.
     */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.stopMovementSounds();
    }

    /**
     * Plays the walking animation and the walking sound.
     */
    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.sounds.playWalkingSound();
        this.sounds.pauseSnoringSound();
    }

    /**
     * Plays the short or long idle animation depending on idle duration.
     */
    playIdleAnimation() {
        if (this.isLongIdle()) {
            this.playLongIdleAnimation();
        } else {
            this.playShortIdleAnimation();
        }
        this.sounds.pauseWalkingSound();
    }

    /**
     * Checks whether the character has been idle for more than 10 seconds.
     * @returns {boolean} True if idle time exceeds 10000ms.
     */
    isLongIdle() {
        let idleTime = Date.now() - this.lastMovement;
        return idleTime > 10000;
    }

    /**
     * Plays the long-idle animation and the snoring sound.
     */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.sounds.playSnoringSound();
    }

    /**
     * Plays the short-idle animation and pauses the snoring sound.
     */
    playShortIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.sounds.pauseSnoringSound();
    }

    /**
     * Moves the character to the right and updates direction, camera and idle timer.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.updateCamera();
        this.lastMovement = Date.now();
    }

    /**
     * Moves the character to the left and updates direction, camera and idle timer.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.updateCamera();
        this.lastMovement = Date.now();
    }

    /**
     * Recenters the world camera on the character's current position.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Starts a jump and plays the jumping sound.
     */
    jump() {
        this.speedY = 30;
        this.isJumping = true;
        this.sounds.playJumpingSound();
        this.lastMovement = Date.now();
    }

    /**
     * Throws a bottle if the character has any left.
     */
    throw() {
        if (this.bottles > 0) {
            this.createAndThrowBottle();
            this.updateBottleCount();
            this.playThrowEffects();
        }
    }

    /**
     * Creates a new throwable bottle in the character's facing direction and adds it to the world.
     */
    createAndThrowBottle() {
        let bottle = new ThrowableObject(this.x + 50, this.y + 100, this.otherDirection, this.sounds);
        this.world.throwableObjects.push(bottle);
    }

    /**
     * Decrements the bottle count and updates the bottle statusbar.
     */
    updateBottleCount() {
        this.bottles--;
        this.world.bottleStatusbar.setAmount(this.bottles);
    }

    /**
     * Plays the throw sound and resets the idle timer.
     */
    playThrowEffects() {
        this.sounds.playThrowSound();
        this.lastMovement = Date.now();
    }

    /**
     * Increments the bottle count, updates the statusbar, and plays the collect sound.
     */
    collectBottle() {
        this.bottles++;
        this.world.bottleStatusbar.setAmount(this.bottles);
        this.sounds.playCollectBottleSound();
    }

    /**
     * Increments the coin count, updates the statusbar, and plays the collect sound.
     */
    collectCoin() {
        this.coins++;
        this.world.coinStatusbar.setAmount(this.coins);
        this.sounds.playCollectCoinSound();
    }

    /**
     * Plays the death sound (once) and advances the death animation.
     */
    playDeathAnimation() {
        this.playDeathSoundOnce();
        this.stopMovementSounds();
        this.advanceDeathAnimation();
    }

    /**
     * Plays the death sound the first time the character dies.
     */
    playDeathSoundOnce() {
        if (!this.deathSoundPlayed) {
            this.sounds.playDeathSound();
            this.deathSoundPlayed = true;
        }
    }

    /**
     * Plays the next frame of the death animation until complete.
     */
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