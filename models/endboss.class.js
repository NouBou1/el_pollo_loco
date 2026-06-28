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
        left: 50,
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
    attackCooldown = 2500;
    attackRange = 150;
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        this.startAnimationLoop();
        this.startMovementLoop();
    }

    startAnimationLoop() {
        setInterval(() => {
            this.updateAnimationState();
        }, 1000 / 2);
    }

    startMovementLoop() {
        setInterval(() => {
            this.moveTowardsTarget();
        }, 1000 / 60);
    }

    updateAnimationState() {
        if (this.isDead()) {
            this.playDeathAnimation();
            return;
        }
        this.checkTrigger();
        this.checkAttackCondition();
        this.chooseAnimation();
    }

    checkAttackCondition() {
        if (this.triggered && this.arrived && !this.isAttacking) {
            this.checkAttack();
        }
    }

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

    checkTrigger() {
        if (!this.triggered && this.world && this.world.character.x > this.triggerX) {
            this.triggered = true;
            if (this.sounds) {
                this.sounds.playBossAlertSound();
            }
        }
    }

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

    checkAttack() {
        if (!this.world) {
            return;
        }
        const now = Date.now();
        if (this.getGapToCharacter() < this.attackRange && now - this.lastAttack > this.attackCooldown) {
            this.startAttack();
        }
    }

    startAttack() {
        this.isAttacking = true;
        this.attackImageIndex = 0;
        this.lastAttack = Date.now();
        if (this.sounds) {
            this.sounds.playBossAttackSound();
        }
    }

    hit(damage = 2) {
        super.hit(damage);
        if (this.sounds) {
            this.sounds.playBossHitSound();
        }
    }

    playAttackAnimation() {
        if (this.attackImageIndex < this.IMAGES_ATTACK.length) {
            this.img = this.imageCache[this.IMAGES_ATTACK[this.attackImageIndex]];
            if (this.attackImageIndex === this.IMAGES_ATTACK.length - 1) {
                this.hitCharacterIfInRange();
            }
            this.attackImageIndex++;
        } else {
            this.isAttacking = false;
        }
    }

    hitCharacterIfInRange() {
        const character = this.world.character;
        if (this.canHitCharacter(character)) {
            this.damageCharacter(character);
            this.setHitFlagTemporarily();
        }
    }

    canHitCharacter(character) {
        return this.getGapToCharacter() < this.attackRange && !character.isDead();
    }

    damageCharacter(character) {
        character.hit(20);
        this.world.statusbar[0].setPercentage(character.energy);
    }

    setHitFlagTemporarily() {
        this.world.hit = true;
        setTimeout(() => {
            this.world.hit = false;
        }, 500);
    }

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
