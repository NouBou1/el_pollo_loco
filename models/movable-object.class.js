class MovableObject {
    x = 120;
    y = 400;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += 10;
        console.log(`Moved right to x: ${this.x}`);
    }

    moveLeft() {
        this.x -= 10;
        console.log(`Moved left to x: ${this.x}`);
    }
}