/**
 * Displays the number of collected coins as a graphical statusbar.
 * @extends DrawableObject
 */
class CoinStatusbar extends DrawableObject {
    total = 1;
    IMAGES_COINSTATUSBAR = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.webp',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.webp',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.webp',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.webp',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.webp',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.webp'
    ];

    /**
     * Creates the coin statusbar, initialized at 0 coins.
     * @param {number} total - Total number of coins collectible in the level.
     */
    constructor(total = 5) {
        super();
        this.loadImages(this.IMAGES_COINSTATUSBAR);
        this.total = total > 0 ? total : 1;
        this.setAmount(0);
        this.x = 20;
        this.y = 110;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed image based on the share of collected coins relative to the level total.
     * @param {number} amount - Number of coins collected so far.
     */
    setAmount(amount) {
        let percentage = (amount / this.total) * 100;
        let index = this.getImageIndex(percentage);
        this.img = this.imageCache[this.IMAGES_COINSTATUSBAR[index]];
    }

    /**
     * Maps a collected percentage to an index into {@link CoinStatusbar#IMAGES_COINSTATUSBAR}.
     * @param {number} percentage - Share of coins collected, 0-100.
     * @returns {number} Image index from 0 (empty) to 5 (full).
     */
    getImageIndex(percentage) {
        if (percentage >= 95) {
            return 5;
        } else if (percentage >= 75) {
            return 4;
        } else if (percentage >= 55) {
            return 3;
        } else if (percentage >= 35) {
            return 2;
        } else if (percentage >= 15) {
            return 1;
        } else {
            return 0;
        }
    }
}