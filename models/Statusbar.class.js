class Statusbar extends DrawableObject {
    percentage = 100;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
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
        
    }

    getImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 80) {
            return 1;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 4;
        } else {
            return 5;
        }
    }


}