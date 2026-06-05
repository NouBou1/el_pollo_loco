class MovableObject {
    x = 60;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    speed = 0.15;
    currentImageIndex = 0;
    energy = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawCollisionFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

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
        let i = this.currentImageIndex % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    isAboveGround() {
        return this.y < 180;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 180) {
                this.y = 180;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    hitCharacter() {
        this.character.energy -= 5;
        if (this.character.energy < 0) {
            this.character.energy = 0;
        }
        if (this.hit) {
            this.hit = false;
        }
    }
}