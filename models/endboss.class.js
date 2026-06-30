/**
 * Represents the final boss enemy: a giant chicken that triggers when the
 * character approaches, walks into position, and then attacks.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    x = 3800;
    y = -30;
    height = 500;
    width = 400;
    speed = 2;
    energy = 20;
    maxEnergy = 20;
    contactDamage = 7;
    offset = {
        top: 100,
        left: 130,
        right: 50,
        bottom: 50
    };
    targetX = 3550;
    triggerX = 3100;
    triggered = false;
    arrived = false;
    isAttacking = false;
    attackImageIndex = 0;
    lastAttack = 0;
    attackCooldown = 1800;
    attackRange = 30;
    attackLungeDistance = 160;
    attackStartX = 0;
    attackStartTime = 0;
    attackFrameDuration = 300;
    deathAnimationComplete = false;
    deathAnimationIndex = 0;
    deathSoundPlayed = false;
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    currentImageIndex = 0;
    world;

    /**
     * Creates the endboss and starts its animation and movement loops.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Starts the boss's animation and movement update loops.
     */
    animate() {
        this.startAnimationLoop();
        this.startMovementLoop();
    }

    /**
     * Starts the recurring loop that updates the boss's animation state.
     */
    startAnimationLoop() {
        setInterval(() => {
            this.updateAnimationState();
        }, 1000 / 10);
    }

    /**
     * Starts the recurring loop that moves the boss towards its target position.
     */
    startMovementLoop() {
        setInterval(() => {
            this.moveTowardsTarget();
        }, 1000 / 60);
    }

    /**
     * Updates death, trigger, attack and animation state for the current frame.
     */
    updateAnimationState() {
        if (this.isDead()) {
            this.playDeathAnimation();
            return;
        }
        this.checkTrigger();
        this.checkAttackCondition();
        this.chooseAnimation();
    }

    /**
     * Starts an attack check if the boss is triggered, arrived, and idle.
     */
    checkAttackCondition() {
        if (this.triggered && this.arrived && !this.isAttacking) {
            this.checkAttack();
        }
    }

    /**
     * Selects and plays the appropriate animation for the boss's current state.
     */
    chooseAnimation() {
        if (this.isHit()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAttackAnimation();
        } else if (this.triggered && this.arrived) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.triggered) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Triggers the boss and plays the alert sound once the character gets close enough.
     */
    checkTrigger() {
        if (!this.triggered && this.world && this.world.character.x > this.triggerX) {
            this.triggered = true;
            if (this.sounds) {
                this.sounds.playBossAlertSound();
            }
        }
    }

    /**
     * Moves the boss towards its target position until it arrives.
     */
    moveTowardsTarget() {
        if (this.isDead() || !this.triggered || this.arrived) {
            return;
        }
        if (this.x > this.targetX) {
            this.x -= this.speed;
        } else {
            this.x = this.targetX;
            this.arrived = true;
        }
    }

    /**
     * Calculates the horizontal gap between the boss and the character.
     * @returns {number} Gap in pixels, or 0 if their bounding boxes overlap.
     */
    getGapToCharacter() {
        const character = this.world.character;
        if (character.x + character.width < this.x) {
            return this.x - (character.x + character.width);
        }
        if (this.x + this.width < character.x) {
            return character.x - (this.x + this.width);
        }
        return 0;
    }

    /**
     * Starts an attack if the character is in range and the cooldown has elapsed.
     */
    checkAttack() {
        if (!this.world) {
            return;
        }
        const now = Date.now();
        if (this.getGapToCharacter() < this.attackRange && now - this.lastAttack > this.attackCooldown) {
            this.startAttack();
        }
    }

    /**
     * Begins the attack animation and plays the attack sound.
     */
    startAttack() {
        this.isAttacking = true;
        this.attackImageIndex = 0;
        this.attackStartX = this.x;
        this.attackStartTime = Date.now();
        this.lastAttack = Date.now();
        if (this.sounds) {
            this.sounds.playBossAttackSound();
        }
    }

    /**
     * Reduces the boss's energy and plays a hit sound if available.
     * @param {number} [damage=2] - Amount of damage to apply.
     */
    hit(damage = 2) {
        super.hit(damage);
        if (this.sounds) {
            this.sounds.playBossHitSound();
        }
    }

    /**
     * Plays the next frame of the attack animation, dealing damage once it finishes.
     */
    playAttackAnimation() {
        const elapsed = Date.now() - this.attackStartTime;
        this.attackImageIndex = Math.floor(elapsed / this.attackFrameDuration);
        if (this.attackImageIndex < this.IMAGES_ATTACK.length) {
            this.img = this.imageCache[this.IMAGES_ATTACK[this.attackImageIndex]];
            this.updateAttackLunge();
        } else {
            this.hitCharacterIfInRange();
            this.x = this.attackStartX;
            this.isAttacking = false;
        }
    }

    /**
     * Moves the boss towards the character as the attack animation progresses,
     * peaking on the last frame where the hit lands.
     */
    updateAttackLunge() {
        const progress = this.attackImageIndex / (this.IMAGES_ATTACK.length - 1);
        this.x = this.attackStartX - this.attackLungeDistance * progress;
    }

    /**
     * Damages the character if still within attack range when the attack lands.
     */
    hitCharacterIfInRange() {
        const character = this.world.character;
        if (this.canHitCharacter(character)) {
            this.damageCharacter(character);
            this.setHitFlagTemporarily();
        }
    }

    /**
     * Checks whether the character is within attack range and still alive.
     * @param {Character} character - The character to check.
     * @returns {boolean} True if the character can be hit.
     */
    canHitCharacter(character) {
        return this.getGapToCharacter() < this.attackRange && !character.isDead();
    }

    /**
     * Applies attack damage to the character and updates its statusbar.
     * @param {Character} character - The character to damage.
     */
    damageCharacter(character) {
        character.hit(25);
        this.world.statusbar[0].setPercentage(character.energy);
    }

    /**
     * Sets a temporary world-level "hit" flag, cleared again after 500ms.
     */
    setHitFlagTemporarily() {
        this.world.hit = true;
        setTimeout(() => {
            this.world.hit = false;
        }, 500);
    }

    /**
     * Plays the boss's death animation and sound, once per death.
     */
    playDeathAnimation() {
        if (!this.deathSoundPlayed && this.sounds) {
            this.sounds.playBossDeathSound();
            this.deathSoundPlayed = true;
        }
        if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
            let path = this.IMAGES_DEAD[this.deathAnimationIndex];
            this.img = this.imageCache[path];
            this.deathAnimationIndex++;
        } else {
            this.deathAnimationComplete = true;
        }
    }
}
