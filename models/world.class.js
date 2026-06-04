class World {

    character = new Character();
    canvas;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    ctx;
    keyboard;
    world;
    camera_x = 0;
    level = level1;

    repeatBackground() {
        for (let i = 0; i < 6; i++) {
            const x = i * 719;
            const imgIndex = (i % 2) + 1;

            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', x, 0),
                new BackgroundObject(`img/5_background/layers/2_second_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`img/5_background/layers/3_third_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`img/5_background/layers/1_first_layer/${imgIndex}.png`, x, 0),
            );
        }
    }




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.world = this;
        this.repeatBackground();
        this.draw();
        this.setWorld();

    }

    setWorld() {
        this.character.world = this;
    }



    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.x + movableObject.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-movableObject.x - movableObject.width / 2, 0);
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        if (movableObject.otherDirection) {
            this.ctx.restore();
        }
    }
}