class Coin extends DrawableObject {
    x;
    y = 360;
    height = 80;
    width = 80; 

    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x || 200 + Math.random() * 3000;
    }   

}