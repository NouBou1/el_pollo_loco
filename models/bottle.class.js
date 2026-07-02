/**
 * Represents a collectible salsa bottle placed in the level.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    x;
    y = 360;
    height = 60;
    width = 60;
    offset = { top: 18, left: 27, right: 27, bottom: 12 };

    /**
     * Creates a bottle at a given or random horizontal position.
     * @param {number} [x] - Horizontal position; random position if omitted.
     */
    constructor(x) {
        super().loadImage(this.getRandomBottleImage());
        this.x = x || 200 + Math.random() * 3000;
    }

    /**
     * Picks one of the available bottle ground images at random.
     * @returns {string} Path to the chosen bottle image.
     */
    getRandomBottleImage() {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        return `assets/img/6_salsa_bottle/${randomNumber}_salsa_bottle_on_ground.webp`;
    }
}
