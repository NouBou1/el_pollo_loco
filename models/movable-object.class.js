/**
 * Base class for drawable objects that can move and take damage.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    x = 60;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    speed = 0.15;
    currentImageIndex = 0;
    energy = 100;
    lastHit = 0;
    contactDamage = 2;


    /**
     * Checks whether this object's collision box overlaps another's.
     * Uses each object's `offset` (if defined) to shrink the raw sprite
     * bounding box down to its actual visible area.
     * @param {MovableObject} mo - The other object to check against.
     * @returns {boolean} True if the collision boxes overlap.
     */
    isColliding(mo) {
        const a = this.getCollisionBox();
        const b = mo.getCollisionBox();
        return a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height;
    }

    /**
     * Continuously moves the object to the left at its current speed.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Resets the object's vertical position to the ground level.
     */
    stopJump() {
        this.y = 180;
    }

    /**
     * Stops the object's horizontal movement.
     */
    stopMove() {
        this.speed = 0;
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
     * Advances through a sequence once and holds on the last frame instead of looping.
     * @param {string[]} images - Sequence of image paths to play once.
     */
    playAnimationOnce(images) {
        let i = Math.min(this.currentImageIndex, images.length - 1);
        this.img = this.imageCache[images[i]];
        this.currentImageIndex++;
    }

    /**
     * Checks whether the object is currently above ground level.
     * @returns {boolean} True if above ground, or always true for throwable objects.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Starts a recurring gravity simulation for this object.
     */
    applyGravity() {
        setInterval(() => {
            this.updateGravityPhysics();
            this.applyGroundLimit();
        }, 1000 / 25);
    }

    /**
     * Applies one gravity step, updating vertical position and speed.
     */
    updateGravityPhysics() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    /**
     * Clamps the object to ground level once it lands, unless it's a throwable object.
     */
    applyGroundLimit() {
        if (!(this instanceof ThrowableObject) && this.y > 180) {
            this.y = 180;
            this.speedY = 0;
        }
    }

    /**
     * Checks whether the object was hit within the last 500ms.
     * @returns {boolean} True if recently hit.
     */
    isHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    /**
     * Reduces the object's energy by the given damage amount.
     * @param {number} [damage=2] - Amount of damage to apply.
     */
    hit(damage = 2) {
        const whoAmI = this.constructor.name;
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks whether the object's energy has been depleted.
     * @returns {boolean} True if energy is zero.
     */
    isDead() {
        return this.energy == 0;
    }
}


