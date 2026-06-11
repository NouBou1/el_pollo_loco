class BottleStatusbar extends DrawableObject {
    percentage = 100;
    IMAGES_BOTTLESTATUSBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESTATUSBAR);
        this.setAmount(0);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 60;
    }

    setAmount(amount) {
        let index = Math.min(amount, 5);
        this.img = this.imageCache[this.IMAGES_BOTTLESTATUSBAR[index]];
    }
}   