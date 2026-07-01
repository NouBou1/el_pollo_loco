/**
 * Centralizes loading and playback of all game sound effects and music.
 */
class SoundManager {
    walking_sound = new Audio('assets/sounds/pepe_sounds/pepe-walk.mp3');
    jumping_sound = new Audio('assets/sounds/pepe_sounds/pepe-jump.mp3');
    hurt_sound = new Audio('assets/sounds/pepe_sounds/pepe-hurt.mp3');
    death_sound = new Audio('assets/sounds/pepe_sounds/pepe-death.mp3');
    collect_bottle_sound = new Audio('assets/sounds/pepe_sounds/collect-bottle.mp3');
    collect_coin_sound = new Audio('assets/sounds/pepe_sounds/collect-coin.mp3');
    break_sound = new Audio('assets/sounds/pepe_sounds/bottle-break.mp3');
    throw_sound = new Audio('assets/sounds/pepe_sounds/pepe-bottle-throw.mp3');
    snoring_sound = new Audio('assets/sounds/pepe_sounds/pepe-snoring.mp3');

    chicken_walking_sound = new Audio('assets/sounds/enemy/chicken/chicken-walk.mp3');
    chicken_hurt_sound = new Audio('assets/sounds/enemy/chicken/chicken-hurt.mp3');

    boss_alert_sound = new Audio('assets/sounds/enemy/boss/boss-alert.mp3');
    boss_attack_sound = new Audio('assets/sounds/enemy/boss/boss-attack.mp3');
    boss_hit_sound = new Audio('assets/sounds/enemy/boss/boss-hit.mp3');
    boss_death_sound = new Audio('assets/sounds/enemy/boss/boss-death.mp3');

    background_music = new Audio('assets/sounds/game/gamesound-loop.mp3');
    game_over_sound = new Audio('assets/sounds/game/gamesound-game-over.mp3');
    victory_sound = new Audio('assets/sounds/game/gamesound-victory.mp3');

    isMuted = false;

    /**
     * Configures looping and default volumes for ambient/looping sounds.
     */
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

    /**
     * Plays a sound while suppressing playback errors (e.g. a slow-loading source or blocked autoplay).
     * @param {HTMLAudioElement} sound - Sound to play.
     */
    safePlay(sound) {
        sound.play().catch((error) => {
            console.warn('Sound could not be played:', sound.src, error);
        });
    }

    /** Plays the character's walking sound if it isn't already playing. */
    playWalkingSound() {
        if (this.walking_sound.paused) {
            this.safePlay(this.walking_sound);
        }
    }

    /** Pauses and rewinds the character's walking sound. */
    pauseWalkingSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }

    /** Plays the character's jumping sound from the start. */
    playJumpingSound() {
        this.jumping_sound.currentTime = 0;
        this.safePlay(this.jumping_sound);
    }

    /** Plays the character's hurt sound from the start. */
    playHurtSound() {
        this.hurt_sound.currentTime = 0;
        this.safePlay(this.hurt_sound);
    }

    /** Plays the character's death sound. */
    playDeathSound() {
        this.safePlay(this.death_sound);
    }

    /** Plays the bottle-collected sound from the start. */
    playCollectBottleSound() {
        this.collect_bottle_sound.currentTime = 0;
        this.safePlay(this.collect_bottle_sound);
    }

    /** Plays the coin-collected sound from the start. */
    playCollectCoinSound() {
        this.collect_coin_sound.currentTime = 0;
        this.safePlay(this.collect_coin_sound);
    }

    /** Plays the bottle-break sound from the start. */
    playBreakSound() {
        this.break_sound.currentTime = 0;
        this.safePlay(this.break_sound);
    }

    /** Plays the bottle-throw sound from the start. */
    playThrowSound() {
        this.throw_sound.currentTime = 0;
        this.safePlay(this.throw_sound);
    }

    /** Plays the chicken walking sound if it isn't already playing. */
    playChickenWalkingSound() {
        if (this.chicken_walking_sound.paused) {
            this.safePlay(this.chicken_walking_sound);
        }
    }

    /** Pauses and rewinds the chicken walking sound. */
    pauseChickenWalkingSound() {
        if (!this.chicken_walking_sound.paused) {
            this.chicken_walking_sound.pause();
            this.chicken_walking_sound.currentTime = 0;
        }
    }

    /** Plays the chicken hurt sound from the start. */
    playChickenHurtSound() {
        this.chicken_hurt_sound.currentTime = 0;
        this.safePlay(this.chicken_hurt_sound);
    }

    /** Plays the boss alert sound from the start. */
    playBossAlertSound() {
        this.boss_alert_sound.currentTime = 0;
        this.safePlay(this.boss_alert_sound);
    }

    /** Plays the boss attack sound from the start. */
    playBossAttackSound() {
        this.boss_attack_sound.currentTime = 0;
        this.safePlay(this.boss_attack_sound);
    }

    /** Plays the boss hit sound from the start. */
    playBossHitSound() {
        this.boss_hit_sound.currentTime = 0;
        this.safePlay(this.boss_hit_sound);
    }

    /** Plays the character's snoring sound if it isn't already playing. */
    playSnoringSound() {
        if (this.snoring_sound.paused) {
            this.safePlay(this.snoring_sound);
        }
    }

    /** Pauses and rewinds the character's snoring sound. */
    pauseSnoringSound() {
        if (!this.snoring_sound.paused) {
            this.snoring_sound.pause();
            this.snoring_sound.currentTime = 0;
        }
    }

    /** Plays the boss death sound. */
    playBossDeathSound() {
        this.safePlay(this.boss_death_sound);
    }

    /** Plays the background music if it isn't already playing. */
    playBackgroundMusic() {
        if (this.background_music.paused) {
            this.safePlay(this.background_music);
        }
    }

    /** Pauses and rewinds the background music. */
    pauseBackgroundMusic() {
        if (!this.background_music.paused) {
            this.background_music.pause();
            this.background_music.currentTime = 0;
        }
    }

    /** Plays the game-over sound from the start. */
    playGameOverSound() {
        this.game_over_sound.currentTime = 0;
        this.safePlay(this.game_over_sound);
    }

    /** Plays the victory sound from the start. */
    playVictorySound() {
        this.victory_sound.currentTime = 0;
        this.safePlay(this.victory_sound);
    }

    /**
     * Lists every Audio object managed by this class.
     * @returns {HTMLAudioElement[]} All managed sounds.
     */
    getAllSounds() {
        return [
            this.walking_sound, this.jumping_sound, this.hurt_sound, this.death_sound,
            this.collect_bottle_sound, this.collect_coin_sound, this.break_sound,
            this.throw_sound, this.snoring_sound, this.chicken_walking_sound,
            this.chicken_hurt_sound, this.boss_alert_sound, this.boss_attack_sound,
            this.boss_hit_sound, this.boss_death_sound, this.background_music,
            this.game_over_sound, this.victory_sound
        ];
    }

    /**
     * Toggles the muted state of every managed sound.
     * @returns {boolean} The new muted state.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.getAllSounds().forEach(sound => sound.muted = this.isMuted);
        return this.isMuted;
    }

    /**
     * Stops and rewinds every sound managed by this class.
     */
    stopAllSounds() {
        this.pauseWalkingSound();
        this.pauseSnoringSound();
        this.pauseChickenWalkingSound();
        this.pausePepeSounds();
        this.pauseMovableObjectSounds();
        this.pauseEnemySounds();
    }

    pausePepeSounds() {
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;

        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;

        this.death_sound.pause();
        this.death_sound.currentTime = 0;
    }

    pauseMovableObjectSounds() {
        this.throw_sound.pause();
        this.throw_sound.currentTime = 0;

        this.collect_bottle_sound.pause();
        this.collect_bottle_sound.currentTime = 0;

        this.collect_coin_sound.pause();
        this.collect_coin_sound.currentTime = 0;

        this.break_sound.pause();
        this.break_sound.currentTime = 0;
    }
    
    pauseEnemySounds() {
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