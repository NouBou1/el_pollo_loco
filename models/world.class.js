class World {

    character = new Character(); // Erstellen einer Instanz der Character-Klasse
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // Charakter zeichnen
        


        // // Alle Feinde zeichnen
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}