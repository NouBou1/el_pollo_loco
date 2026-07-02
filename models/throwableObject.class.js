/**
 * Represents a thrown bottle that flies, can hit an enemy, and then splashes.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    speedY = 0;
    acceleration = 4;
    x = 150;
    y = 190;
    height = 50;
    width = 50;
    offset = {
        top: 8,
        left: 7,
        right: 7,
        bottom: 6
    };
    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.webp'
    ];
    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.webp',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.webp'
    ];
    imageCache = [];
    currentImageIndex = 0;
    hasHit = false;
    splashAnimationComplete = false;
    sounds;

    /**
     * Creates a throwable bottle and starts its flight, gravity and animation.
     * @param {number} x - Starting horizontal position.
     * @param {number} y - Starting vertical position.
     * @param {boolean} [otherDirection=false] - Throws to the left if true, right if false.
     * @param {SoundManager} sounds - Sound manager used for break sound effects.
     */
    constructor(x, y, otherDirection = false, sounds) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.sounds = sounds;
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity();
        this.throw();
        this.animate();
    }

    /**
     * Starts the bottle's horizontal flight in its throw direction.
     */
    throw() {
        this.speedY = 20;
        const direction = this.otherDirection ? -1 : 1;
        this.throwInterval = this.startInterval(() => {
            this.x += 10 * direction;
        }, 25);
    }

    /**
     * Advances to the next frame of a given image sequence.
     * @param {string[]} images - Sequence of image paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    /**
     * Starts the rotation or splash animation loop depending on hit state.
     */
    animate() {
        this.startInterval(() => {
            if (this.hasHit) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 100);
    }

    /**
     * Stops the bottle's flight and starts the splash animation.
     */
    splash() {
        this.hasHit = true;
        clearInterval(this.throwInterval);
        this.speedY = 0;
        this.currentImageIndex = 0;
        this.sounds.playBreakSound();
    }

    /**
     * Plays the next frame of the splash animation until complete.
     */
    playSplashAnimation() {
        if (this.currentImageIndex < this.IMAGES_SPLASH.length) {
            let path = this.IMAGES_SPLASH[this.currentImageIndex];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        } else {
            this.splashAnimationComplete = true;
        }
    }
}