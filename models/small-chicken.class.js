/**
 * Represents a small chicken enemy that periodically jumps.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    height = 50;
    width = 50;
    y = 380;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };
    groundY = 380;
    energy = 1;
    contactDamage = 5;
    speedY = 0;
    acceleration = 2;
    isJumping = false;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    currentImageIndex = 0;



    /**
     * Creates a small chicken at a given or random horizontal position
     * and starts its movement, gravity and jump scheduling.
     * @param {number} [x] - Horizontal position; random position if omitted.
     */
    constructor(x = 800 + Math.random() * 3000) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = x;
        this.speed = 0.6 + Math.random() * 1.2;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyChickenGravity();
        this.scheduleNextJump();
    }

    /**
     * Starts the chicken's leftward movement and walking/dead animation loop.
     */
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Triggers a jump if the chicken is alive and not already jumping.
     */
    jump() {
        if (this.isDead() || this.isJumping) {
            return;
        }
        this.isJumping = true;
        this.speedY = 25;
    }

    /**
     * Starts a recurring gravity simulation applied while the chicken is jumping.
     */
    applyChickenGravity() {
        setInterval(() => {
            if (this.isJumping) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y >= this.groundY) {
                    this.y = this.groundY;
                    this.speedY = 0;
                    this.isJumping = false;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Schedules the chicken's next jump after a random delay, then reschedules itself.
     */
    scheduleNextJump() {
        const delay = 2000 + Math.random() * 3000;
        setTimeout(() => {
            this.jump();
            this.scheduleNextJump();
        }, delay);
    }

    /**
     * Reduces the chicken's energy and plays a hurt sound if available.
     * @param {number} [damage=2] - Amount of damage to apply.
     */
    hit(damage = 2) {
        super.hit(damage);
        if (this.sounds) {
            this.sounds.playChickenHurtSound();
        }
    }
}