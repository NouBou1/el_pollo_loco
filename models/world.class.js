class World {

    character = new Character();
    canvas;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    bottles = level1.bottles;
    coins = level1.coins;
    statusbar = [new Statusbar()];
    throwableObjects = [];
    ctx;
    keyboard;
    world;
    camera_x = 0;
    level = level1;
    hit = false;
    bottleStatusbar = new BottleStatusbar();
    coinStatusbar = new CoinStatusbar();
    endbossStatusbar = new EndbossStatusbar();
    spawnDistance = 30;      // Minimaler Abstand zwischen Gegner-Spawns in Pixeln
    nextSpawnX = 0;          // X-Position, ab der der nächste Gegner gespawnt wird
    maxChickens = 30;        // Maximale Anzahl gleichzeitig aktiver Hühner 
    spawnLimitX = 2400;      // Gegner spawnen bis zu dieser X-Position (vor dem Endboss)


    repeatBackground() {
        for (let i = 0; i < 6; i++) {
            const x = i * 718;
            const imgIndex = (i % 2) + 1;

            this.backgroundObjects.push(
                new BackgroundObject('assets/img/5_background/layers/air.png', x, 0),
                new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imgIndex}.png`, x, 0),
            );
        }
    }

    constructor(canvas, keyboard, soundManager) {
        this.initializeCanvas(canvas);
        this.initializeKeyboard(keyboard);
        this.initializeSoundManager(soundManager);
        this.initializeEndboss();
        this.initializeGameOverImage();
        this.startGame();
    }

    initializeCanvas(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }

    initializeKeyboard(keyboard) {
        this.keyboard = keyboard;
    }

    initializeSoundManager(soundManager) {
        this.character.sounds = soundManager;
        this.enemies.forEach(enemy => {
            enemy.sounds = soundManager;
        });
    }

    initializeEndboss() {
        const endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.world = this;
        }
    }

    initializeGameOverImage() {
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/game_over_a.png';
    }

    startGame() {
        this.character.sounds.playChickenWalkingSound();
        this.repeatBackground();
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkJumpOnEnemy();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkBottleEnemyCollisions();
            this.removeCompletedSplashes();
            this.spawnEnemies();
        }, 1000 / 60);
    }

    spawnEnemies() {
        if (!this.canSpawnEnemy()) {
            return;
        }
        this.scheduleNextSpawn();
        this.spawnChicken();
    }

    canSpawnEnemy() {
        const beforeLimit = this.character.x < this.spawnLimitX;
        const timeForNext = this.character.x >= this.nextSpawnX;
        const belowMax = this.countActiveChickens() < this.maxChickens;
        return beforeLimit && timeForNext && belowMax;
    }

    scheduleNextSpawn() {
        this.nextSpawnX = this.character.x + this.spawnDistance + Math.random() * 200;
    }

    countActiveChickens() {
        return this.enemies.filter(enemy => !(enemy instanceof Endboss) && !enemy.isDead()).length;
    }

    spawnChicken() {
        const spawnX = this.character.x + this.canvas.width + 100 + Math.random() * 200;
        const enemy = Math.random() < 0.6 ? new Chicken(spawnX) : new SmallChicken(spawnX);
        enemy.sounds = this.character.sounds;
        this.enemies.push(enemy);
    }

    checkCollisions() {
        this.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(enemy.contactDamage);
                this.statusbar[0].setPercentage(this.character.energy);
                this.hit = true;
                setTimeout(() => {
                    this.hit = false;
                }, 500);
            }
        });
    }

    checkCollisionsBottle() {
        this.bottles = this.bottles.filter(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.bottleStatusbar.setAmount(this.character.bottles);
                return false;
            }
            return true;
        });
    }

    checkCollisionsCoin() {
        this.coins = this.coins.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coinStatusbar.setAmount(this.character.coins);
                return false;
            }
            return true;
        });

    }

    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.hasHit) {
                    this.handleBottleHit(enemy, bottleIndex);
                }
            });
        });
    }

    handleBottleHit(enemy, bottleIndex) {
        enemy.hit();
        this.throwableObjects[bottleIndex].splash();
        if (enemy instanceof Endboss) {
            this.updateEndbossStatusbar(enemy);
        }
        if (enemy.isDead()) {
            enemy.speed = 0;
            if (!(enemy instanceof Endboss)) {
                setTimeout(() => {
                    this.removeEnemy(this.enemies.indexOf(enemy));
                }, 1000);
            }

        }
    }

    removeEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }

    updateEndbossStatusbar(endboss) {
        const percentage = (endboss.energy / endboss.maxEnergy) * 100;
        this.endbossStatusbar.setPercentage(percentage);
    }

    removeCompletedSplashes() {
        this.throwableObjects = this.throwableObjects.filter(bottle =>
            !bottle.splashAnimationComplete
        );
    }


    draw() {
        if (this.isGameOver()) {
            return;
        }
        this.clearCanvas();
        this.drawMovingObjects();
        this.drawFixedObjects();
        this.scheduleNextFrame();
    }

    isGameOver() {
        if (this.character.isDead() && this.character.deathAnimationComplete) {
            return true;
        }
        const endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.deathAnimationComplete) {
            return true;
        }
        return false;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawMovingObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawFixedObjects() {
        this.addObjectsToMap(this.statusbar);
        this.addObjectsToMap([this.bottleStatusbar]);
        this.addObjectsToMap([this.coinStatusbar]);
        const endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.triggered) {
            this.addObjectsToMap([this.endbossStatusbar]);
        }
    }

    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        if (!objects) {
            return;
        }
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.x + movableObject.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-movableObject.x - movableObject.width / 2, 0);
        }
        movableObject.draw(this.ctx);
        movableObject.drawCollisionFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.ctx.restore();
        }
    }

    checkJumpOnEnemy() {
        this.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.isVerticalAttack(enemy)) {
                    this.handleVerticalAttack(enemy, index);
                } else if (!enemy.isDead() && !this.character.isHit()) {
                    this.handleHorizontalCollision(enemy);
                }
            }
        });
    }

    isVerticalAttack(enemy) {
        const characterCenterY = this.character.y + this.character.height / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        const verticalDistance = enemyCenterY - characterCenterY;
        const threshold = 20;

        return verticalDistance > threshold &&
            this.character.speedY < 0 &&
            this.character.isAboveGround();
    }

    handleVerticalAttack(enemy, index) {
        enemy.hit();
        if (enemy instanceof Endboss) {
            this.updateEndbossStatusbar(enemy);
        }
        if (enemy.isDead()) {
            enemy.speed = 0;
            if (!(enemy instanceof Endboss)) {
                setTimeout(() => {
                    this.removeEnemy(index);
                }, 500);
            }
        }
        this.character.jump();
    }

    handleHorizontalCollision(enemy) {
        const now = new Date().getTime();
        const timeSinceLastHit = now - this.character.lastHit;
        console.log(` Zeit seit letztem Hit: ${timeSinceLastHit}ms`);
        this.character.hit(enemy.contactDamage);
        this.statusbar[0].setPercentage(this.character.energy);
    }

}