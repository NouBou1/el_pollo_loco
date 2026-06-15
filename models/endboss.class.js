class Endboss extends MovableObject {
    x = 2800;
    y = -30;
    height = 500;
    width = 400;
    speed = 0.15;
    energy = 20;
    deathAnimationComplete = false;
    deathAnimationIndex = 0;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    currentImageIndex = 0;
    world;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimation();
            } else if (this.isHit()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (i >= 10) {
                    this.playAnimation(this.IMAGES_ALERT);
                }
                i++;
                if (i >= 20) {
                    i = 0;
                }
            }

        }, 1000 / 2);
    }

      playDeathAnimation() {  // ← NEU: Diese ganze Methode
        if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
            let path = this.IMAGES_DEAD[this.deathAnimationIndex];
            this.img = this.imageCache[path];
            this.deathAnimationIndex++;
        } else {
            this.deathAnimationComplete = true;
        }
    }
} 