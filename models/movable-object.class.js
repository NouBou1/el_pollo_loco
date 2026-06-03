class MovableObject {
    x = 60;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = [];

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
        this.x -= 10;
        console.log(`Moved left to x: ${this.x}`);
    }
}