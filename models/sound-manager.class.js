class SoundManager {
    walking_sound = new Audio('assets/sounds/pepe_sounds/pepe-walk.wav');
    jumping_sound = new Audio('assets/sounds/pepe_sounds/pepe-jump.wav');
    hurt_sound = new Audio('assets/sounds/pepe_sounds/pepe-hurt.mp3');
    death_sound = new Audio('assets/sounds/pepe_sounds/pepe-death.mp3');
    collect_bottle_sound = new Audio('assets/sounds/pepe_sounds/collect-bottle.wav');
    collect_coin_sound = new Audio('assets/sounds/pepe_sounds/collect-coin.mp3');
    break_sound = new Audio('assets/sounds/pepe_sounds/bottle-break.mp3');
    throw_sound = new Audio('assets/sounds/pepe_sounds/pepe-bottle-throw.wav');
    snoring_sound = new Audio('assets/sounds/pepe_sounds/pepe-snoring.mp3');

    chicken_walking_sound = new Audio('assets/sounds/enemy/chicken/chicken-walk.wav');
    chicken_hurt_sound = new Audio('assets/sounds/enemy/chicken/chicken-hurt.mp3');

    boss_alert_sound = new Audio('assets/sounds/enemy/boss/boss-alert.mp3');
    boss_attack_sound = new Audio('assets/sounds/enemy/boss/boss-attack.mp3');
    boss_hit_sound = new Audio('assets/sounds/enemy/boss/boss-hit.mp3');
    boss_death_sound = new Audio('assets/sounds/enemy/boss/boss-death.mp3');

    background_music = new Audio('assets/sounds/game/gamesound-loop.mp3');
    game_over_sound = new Audio('assets/sounds/game/gamesound-game-over.mp3');
    victory_sound = new Audio('assets/sounds/game/gamesound-victory.mp3');

    constructor() {
        this.walking_sound.loop = true;
        this.chicken_walking_sound.loop = true;
        this.background_music.loop = true;
        this.background_music.volume = 0.2;
        this.chicken_walking_sound.volume = 0.2;
        this.chicken_hurt_sound.volume = 0.3;
        this.snoring_sound.loop = true;
        this.snoring_sound.volume = 0.3;
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

    playThrowSound() {
        this.throw_sound.currentTime = 0;
        this.throw_sound.play();
    }

    playChickenWalkingSound() {
        if (this.chicken_walking_sound.paused) {
            this.chicken_walking_sound.play();
        }
    }

    pauseChickenWalkingSound() {
        if (!this.chicken_walking_sound.paused) {
            this.chicken_walking_sound.pause();
            this.chicken_walking_sound.currentTime = 0;
        }
    }

    playChickenHurtSound() {
        this.chicken_hurt_sound.currentTime = 0;
        this.chicken_hurt_sound.play();
    }

    playBossAlertSound() {
        this.boss_alert_sound.currentTime = 0;
        this.boss_alert_sound.play();
    }

    playBossAttackSound() {
        this.boss_attack_sound.currentTime = 0;
        this.boss_attack_sound.play();
    }

    playBossHitSound() {
        this.boss_hit_sound.currentTime = 0;
        this.boss_hit_sound.play();
    }

    playSnoringSound() {
        if (this.snoring_sound.paused) {
            this.snoring_sound.play();
        }
    }

    pauseSnoringSound() {
        if (!this.snoring_sound.paused) {
            this.snoring_sound.pause();
            this.snoring_sound.currentTime = 0;
        }
    }

    playBossDeathSound() {
        this.boss_death_sound.play();
    }

    playBackgroundMusic() {
        if (this.background_music.paused) {
            this.background_music.play();
        }
    }

    pauseBackgroundMusic() {
        if (!this.background_music.paused) {
            this.background_music.pause();
            this.background_music.currentTime = 0;
        }
    }

    playGameOverSound() {
        this.game_over_sound.currentTime = 0;
        this.game_over_sound.play();
    }

    playVictorySound() {
        this.victory_sound.currentTime = 0;
        this.victory_sound.play();
    }

    stopAllSounds() {
        this.pauseWalkingSound();
        this.pauseSnoringSound();
        this.pauseChickenWalkingSound();
        this.pauseBackgroundMusic();

       
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;

        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;

        this.death_sound.pause();
        this.death_sound.currentTime = 0;

        this.throw_sound.pause();
        this.throw_sound.currentTime = 0;

        this.collect_bottle_sound.pause();
        this.collect_bottle_sound.currentTime = 0;

        this.collect_coin_sound.pause();
        this.collect_coin_sound.currentTime = 0;

        this.break_sound.pause();
        this.break_sound.currentTime = 0;

        this.chicken_hurt_sound.pause();
        this.chicken_hurt_sound.currentTime = 0;

        this.boss_alert_sound.pause();
        this.boss_alert_sound.currentTime = 0;

        this.boss_attack_sound.pause();
        this.boss_attack_sound.currentTime = 0;

        this.boss_hit_sound.pause();
        this.boss_hit_sound.currentTime = 0;

        this.boss_death_sound.pause();
        this.boss_death_sound.currentTime = 0;
    }
}
