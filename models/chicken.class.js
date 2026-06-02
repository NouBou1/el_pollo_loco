class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 370; // Feste y-Position für alle Hühner1

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 300 + Math.random() * 700; // Zufällige x-Position zwischen 500 und 2500


    }




}