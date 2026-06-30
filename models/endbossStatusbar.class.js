/**
 * Displays the endboss's health as a graphical statusbar.
 * @extends DrawableObject
 */
class EndbossStatusbar extends DrawableObject {
    percentage = 100;
    IMAGES_STATUSBAR = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png'
    ];

    /**
     * Creates the endboss statusbar, initialized at 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }

    /**
     * Updates the displayed health percentage and corresponding image.
     * @param {number} percentage - Health percentage between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.getImageIndex()];
        this.img = this.imageCache[path];
        this.x = 500;
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Maps the current percentage to an index into {@link EndbossStatusbar#IMAGES_STATUSBAR}.
     * @returns {number} Image index from 0 (full) to 5 (empty).
     */
    getImageIndex() {
        if (this.percentage >= 95) {
            return 0;
        } else if (this.percentage >= 75) {
            return 1;
        } else if (this.percentage >= 50) {
            return 2;
        } else if (this.percentage >= 25) {
            return 3;
        } else if (this.percentage >= 0) {
            return 4;
        } else {
            return 5;
        }
    }
}
