class World {

    character = new Character(); // Erstellen einer Instanz der Character-Klasse
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Canvas löschen

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // Charakter zeichnen
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height); // Feinde zeichnen
        });

        requestAnimationFrame(() => this.draw()); // Animation fortsetzen

        // // Alle Feinde zeichnen
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}