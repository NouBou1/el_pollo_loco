class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 400;
    speed = 0.2; 

constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 700;
    this.animate();

}

animate() {
    this.moveLeft();

}
}