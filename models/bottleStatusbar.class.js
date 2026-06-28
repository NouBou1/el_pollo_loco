/**
 * Displays the number of collected bottles as a graphical statusbar.
 * @extends DrawableObject
 */
class BottleStatusbar extends DrawableObject {
    percentage = 100;
    IMAGES_BOTTLESTATUSBAR = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * Creates the bottle statusbar, initialized at 0 bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESTATUSBAR);
        this.setAmount(0);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed image based on the number of collected bottles.
     * @param {number} amount - Number of bottles collected (0-5).
     */
    setAmount(amount) {
        let index = Math.min(amount, 5);
        this.img = this.imageCache[this.IMAGES_BOTTLESTATUSBAR[index]];
    }
}   