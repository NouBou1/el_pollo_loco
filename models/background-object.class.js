/**
 * Represents a static background layer image positioned along the level.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background object aligned to the bottom of the canvas.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background segment.
     * @param {number} y - Unused; vertical position is derived from height.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;

    }
}