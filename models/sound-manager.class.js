class SoundManager {
    walking_sound = new Audio('assets/sounds/pepe_sounds/pepe-walk.wav');
    jumping_sound = new Audio('assets/sounds/pepe_sounds/pepe-jump.wav');
    hurt_sound = new Audio('assets/sounds/pepe_sounds/pepe-hurt.mp3');
    death_sound = new Audio('assets/sounds/pepe_sounds/pepe-death.mp3');
    collect_bottle_sound = new Audio('assets/sounds/pepe_sounds/collect-bottle.wav');
    collect_coin_sound = new Audio('assets/sounds/pepe_sounds/collect-coin.mp3');
    break_sound = new Audio('assets/sounds/pepe_sounds/bottle-break.mp3');

    constructor() {
        this.walking_sound.loop = true;
    }

    playWalkingSound() {
        if (this.walking_sound.paused) {
            this.walking_sound.play();
        }
    }

    pauseWalkingSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }

    playJumpingSound() {
        this.jumping_sound.currentTime = 0;
        this.jumping_sound.play();
    }

    playHurtSound() {
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play();
    }

    playDeathSound() {
        this.death_sound.play();
    }

    playCollectBottleSound() {
        this.collect_bottle_sound.currentTime = 0;
        this.collect_bottle_sound.play();
    }

    playCollectCoinSound() {
        this.collect_coin_sound.currentTime = 0;
        this.collect_coin_sound.play();
    }

    playBreakSound() {
        this.break_sound.currentTime = 0;
        this.break_sound.play();
    }
}
