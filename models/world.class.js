class World {

    character = new Character(); // Erstellen einer Instanz der Character-Klasse
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    canvas;
    clouds = [
        new Cloud(),
        new Cloud(),
    ];
    backgroundObjects = [


        new BackgroundObject('img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0)
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Canvas löschen

        this.addObjectsToMap(this.backgroundObjects); // Hintergrundobjekte zeichnen
        this.addObjectsToMap(this.clouds); // Wolken zeichnen
        this.addObjectsToMap([this.character]); // Charakter zeichnen
        this.addObjectsToMap(this.enemies); // Feinde zeichnen


        requestAnimationFrame(() => this.draw()); // Animation fortsetzen
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
}