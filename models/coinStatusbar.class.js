/**
 * Displays the number of collected coins as a graphical statusbar.
 * @extends DrawableObject
 */
class CoinStatusbar extends DrawableObject {
    IMAGES_COINSTATUSBAR = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates the coin statusbar, initialized at 0 coins.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSTATUSBAR);
        this.setAmount(0);
        this.x = 20;
        this.y = 110;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed image based on the number of collected coins.
     * @param {number} amount - Number of coins collected (0-5).
     */
    setAmount(amount) {
        let index = Math.min(amount, 5);
        this.img = this.imageCache[this.IMAGES_COINSTATUSBAR[index]];
    }
}