class Cloud extends MovableObject {
    y = 20; // Feste y-Position für alle Wolken
    height = 250;
    width = 400;

constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 700; // Zufällige x-Position zwischen 0 und 700


}




}