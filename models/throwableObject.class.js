class ThrowableObject extends MovableObject {
    speedY = 0;
    acceleration = 4;
    x = 150;
    y = 190;
    height = 50;
    width = 50;
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    imageCache = [];
    currentImageIndex = 0;
    hasHit = false;
    splashAnimationComplete = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity();
        this.throw();
        this.animate();
    }


    throw() {
        this.speedY = 20;
        this.throwInterval = setInterval(() => {
            this.x += 10;
        }, 25);


    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    animate() {
        setInterval(() => {
            if (this.hasHit) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 100);
    }


    splash() {
        this.hasHit = true;
        clearInterval(this.throwInterval);
        this.speedY = 0;
        this.currentImageIndex = 0;
    }

    playSplashAnimation() {
        if (this.currentImageIndex < this.IMAGES_SPLASH.length) {
            let path = this.IMAGES_SPLASH[this.currentImageIndex];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        } else {
            this.splashAnimationComplete = true;
        }
    }
}