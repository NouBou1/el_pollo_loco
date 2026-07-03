/**
 * Displays the number of collected bottles as a graphical statusbar.
 * @extends DrawableObject
 */
class BottleStatusbar extends DrawableObject {
    percentage = 100;
    total = 1;
    IMAGES_BOTTLESTATUSBAR = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.webp',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.webp',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.webp',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.webp',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.webp',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.webp'
    ];

    /**
     * Creates the bottle statusbar, initialized at 0 bottles.
     * @param {number} total - Total number of bottles collectible in the level.
     */
    constructor(total = 5) {
        super();
        this.loadImages(this.IMAGES_BOTTLESTATUSBAR);
        this.total = total > 0 ? total : 1;
        this.setAmount(0);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed image based on the share of collected bottles relative to the level total.
     * @param {number} amount - Number of bottles collected so far.
     */
    setAmount(amount) {
        let percentage = (amount / this.total) * 100;
        let index = this.getImageIndex(percentage);
        this.img = this.imageCache[this.IMAGES_BOTTLESTATUSBAR[index]];
    }

    /**
     * Maps a collected percentage to an index into {@link BottleStatusbar#IMAGES_BOTTLESTATUSBAR}.
     * @param {number} percentage - Share of bottles collected, 0-100.
     * @returns {number} Image index from 0 (empty) to 5 (full).
     */
    getImageIndex(percentage) {
        if (percentage <= 0) {
            return 0;
        }
        if (percentage >= 100) {
            return 5;
        }
        return Math.min(4, Math.ceil(percentage / 20));
    }
}