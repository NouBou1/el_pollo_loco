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


    repeatBackground() {
        for (let i = 0; i < 6; i++) {
            const x = i * 719;
            const imgIndex = (i % 2) + 1;

            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', x, 0),
                new BackgroundObject(`img/5_background/layers/2_second_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`img/5_background/layers/3_third_layer/${imgIndex}.png`, x, 0),
                new BackgroundObject(`img/5_background/layers/1_first_layer/${imgIndex}.png`, x, 0),
            );
        }
    }

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.world = this;
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over.png';
     
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
        }, 100);
    }

    checkCollisions() {
        this.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
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
        if (enemy.isDead()) {
            enemy.speed = 0;
            setTimeout(() => {
                this.removeEnemy(this.enemies.indexOf(enemy));
            }, 1000);

        }
    }

    removeEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }

    removeCompletedSplashes() {
        this.throwableObjects = this.throwableObjects.filter(bottle =>
            !bottle.splashAnimationComplete
        );
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.character.isDead()) {
            this.showGameOver();
            return;
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects like statusbar ------
        this.addObjectsToMap(this.statusbar);
        this.addObjectsToMap([this.bottleStatusbar]);
        this.addObjectsToMap([this.coinStatusbar]);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });


    }

    showGameOver() {
        this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    addObjectsToMap(objects) {
        if (!objects) {
            console.error('Array is undefined!');
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
                const characterCenterY = this.character.y + this.character.height / 2;
                const enemyCenterY = enemy.y + enemy.height / 2;

                const verticalDistance = enemyCenterY - characterCenterY;
                const threshold = 20;
                if (verticalDistance > threshold && this.character.speedY < 0 && this.character.isAboveGround()) {
                    // Vertikale Kollision
                    enemy.hit();
                    if (enemy.isDead()) {
                        enemy.speed = 0;
                        setTimeout(() => {
                            this.removeEnemy(index);
                        }, 500);
                    }
                    this.character.jump();
                } else if (!enemy.isDead()) {
                    // Horizontale Kollision 
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                    this.hit = true;
                    setTimeout(() => {
                        this.hit = false;
                    }, 500);
                }
            }
        });
    }

}