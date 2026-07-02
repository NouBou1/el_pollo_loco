/**
 * Represents a normal walking chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 370;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };
    energy = 1;
    contactDamage = 10;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.webp',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.webp',
    ];
    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.webp'
    ];
    currentImageIndex = 0;



    /**
     * Creates a chicken at a given or random horizontal position.
     * @param {number} [x] - Horizontal position; random position if omitted.
     */
    constructor(x = 800 + Math.random() * 3000) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.webp');

        this.x = x;
        this.speed = 0.4 + Math.random() * 1.0;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
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