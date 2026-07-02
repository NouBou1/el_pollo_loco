/**
 * Represents a background cloud that drifts across the level.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 400;
    speed = 0.2;

    /**
     * Creates a cloud at a random horizontal position and starts its movement.
     */
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.webp');
        this.x = Math.random() * 700;
        this.animate();

    }

    /**
     * Starts the continuous leftward drift of the cloud.
     */
    animate() {
        this.moveLeft();
    }
}