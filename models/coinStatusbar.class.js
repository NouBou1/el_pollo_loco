class CoinStatusbar extends DrawableObject {
    IMAGES_COINSTATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSTATUSBAR);
        this.setAmount(0);
        this.x = 20;
        this.y = 110;
        this.width = 200;
        this.height = 60;
    }

    setAmount(amount) {
        let index = Math.min(amount, 5);
        this.img = this.imageCache[this.IMAGES_COINSTATUSBAR[index]];
    }
}