class Statusbar extends DrawableObject {
    percentage = 100;
    IMAGES_STATUSBAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.getImageIndex()];
        this.img = this.imageCache[path];
        this.x = 20;
        this.y = 20;
        this.width = 200;
        this.height = 60;

    }

    getImageIndex() {
        if (this.percentage >= 95) {
            return 0;  
        } else if (this.percentage >= 75) {
            return 1;  
        } else if (this.percentage >= 55) {
            return 2;  
        } else if (this.percentage >= 35) {
            return 3;  
        } else if (this.percentage >= 15) {
            return 4;  
        } else {
            return 5;  
        }
    }

}