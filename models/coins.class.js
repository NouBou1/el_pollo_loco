/**
 * Represents a collectible coin placed in the level.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    x;
    y = 360;
    height = 80;
    width = 80;
    offset = { top: 33, left: 33, right: 33, bottom: 33 };

    /**
     * Creates a coin at a given or random horizontal position.
     * @param {number} [x] - Horizontal position; random position if omitted.
     */
    constructor(x) {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.x = x || 200 + Math.random() * 3000;
    }

}