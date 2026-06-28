/**
 * Base class for any object that can be drawn onto the canvas.
 */
class DrawableObject {
    currentImageIndex = 0;
    imageCache = [];
    x = 120;
    y = 120;
    height = 100;
    width = 100;
    img;

    /**
     * Loads a single image as the object's current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads a set of images into the image cache, keyed by path.
     * @param {string[]} arr - List of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's current image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn("Error loading image:", error);
            console.log("Image path:", this.img ? this.img.src : "No image loaded");
        }
    }

    /**
     * Draws the object's collision box outline for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
     */
    // drawCollisionFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
    //         const offset = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(
    //             this.x + offset.left,
    //             this.y + offset.top,
    //             this.width - offset.left - offset.right,
    //             this.height - offset.top - offset.bottom
    //         );
    //         ctx.stroke();
    //     }
    // }

}