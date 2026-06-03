class MovableObject {
    x = 60;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    speed = 0.15; 

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

    moveRight() {
        this.x += 10;
        console.log(`Moved right to x: ${this.x}`);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; 
        }, 1000 / 60);
    }

    stopJump() {
        this.y = 300; 
        console.log("Character stops jumping");
    }

    stopMove() {
        this.speed = 0;
        console.log("Character stops moving");
    }
}