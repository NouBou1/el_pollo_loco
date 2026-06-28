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





    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    stopJump() {
        this.y = 180;
    }

    stopMove() {
        this.speed = 0;
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    applyGravity() {
        setInterval(() => {
            this.updateGravityPhysics();
            this.applyGroundLimit();
        }, 1000 / 25);
    }

    updateGravityPhysics() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    applyGroundLimit() {
        if (!(this instanceof ThrowableObject) && this.y > 180) {
            this.y = 180;
            this.speedY = 0;
        }
    }

    isHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    hit(damage = 2) {
        const whoAmI = this.constructor.name; 
        console.log(`${whoAmI} getroffen | Schaden: ${damage} | Energy: ${this.energy} → ${this.energy - damage}`);
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
    }
    isDead() {
        return this.energy == 0;
    }
}


