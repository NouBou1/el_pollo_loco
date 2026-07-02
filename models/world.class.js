/**
 * Owns and orchestrates the entire game world: the character, enemies,
 * level objects, statusbars, collision checks, spawning and rendering.
 */
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
    bottleStatusbar = new BottleStatusbar(this.bottles.length);
    coinStatusbar = new CoinStatusbar(this.coins.length);
    endbossStatusbar = new EndbossStatusbar();
    spawnDistance = 30;    
    nextSpawnX = 0;          
    maxChickens = 30;       
    spawnLimitX = 2400;      


    /**
     * Fills the background with repeating, parallax-layered background objects.
     */
    repeatBackground() {
        for (let i = 0; i < 6; i++) {
            const x = i * 718;
            const imgIndex = (i % 2) + 1;

            this.backgroundObjects.push(
                new BackgroundObject('assets/img/5_background/layers/air.webp', x, 0),
                new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${imgIndex}.webp`, x, 0),
                new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${imgIndex}.webp`, x, 0),
                new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${imgIndex}.webp`, x, 0),
            );
        }
    }

    /**
     * Creates the game world and starts it.
     * @param {HTMLCanvasElement} canvas - Canvas element to render onto.
     * @param {Keyboard} keyboard - Shared keyboard input state.
     * @param {SoundManager} soundManager - Shared sound manager.
     */
    constructor(canvas, keyboard, soundManager) {
        this.initializeCanvas(canvas);
        this.initializeKeyboard(keyboard);
        this.initializeSoundManager(soundManager);
        this.initializeEndboss();
        this.initializeGameOverImage();
        this.startGame();
    }

    /**
     * Stores the canvas and its 2D rendering context.
     * @param {HTMLCanvasElement} canvas - Canvas element to render onto.
     */
    initializeCanvas(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }

    /**
     * Stores the shared keyboard input state.
     * @param {Keyboard} keyboard - Shared keyboard input state.
     */
    initializeKeyboard(keyboard) {
        this.keyboard = keyboard;
    }

    /**
     * Assigns the sound manager to the character and all current enemies.
     * @param {SoundManager} soundManager - Shared sound manager.
     */
    initializeSoundManager(soundManager) {
        this.character.sounds = soundManager;
        this.enemies.forEach(enemy => {
            enemy.sounds = soundManager;
        });
    }

    /**
     * Links the endboss (if present among the enemies) back to this world.
     */
    initializeEndboss() {
        const endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.world = this;
        }
    }

    /**
     * Preloads the game-over image shown when the run ends.
     */
    initializeGameOverImage() {
        this.gameOverImage = new Image();
        this.gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/game_over_a.webp';
    }

    /**
     * Starts ambient sound, builds the background, and kicks off rendering and the game loop.
     */
    startGame() {
        this.character.sounds.playChickenWalkingSound();
        this.repeatBackground();
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    /**
     * Gives the character a back-reference to this world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the recurring game loop: collisions, cleanup and enemy spawning.
     */
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

    /**
     * Spawns a new chicken enemy if spawn conditions allow it.
     */
    spawnEnemies() {
        if (!this.canSpawnEnemy()) {
            return;
        }
        this.scheduleNextSpawn();
        this.spawnChicken();
    }

    /**
     * Checks whether a new enemy may be spawned right now.
     * @returns {boolean} True if before the spawn limit, past the next spawn point, and under the chicken cap.
     */
    canSpawnEnemy() {
        const beforeLimit = this.character.x < this.spawnLimitX;
        const timeForNext = this.character.x >= this.nextSpawnX;
        const belowMax = this.countActiveChickens() < this.maxChickens;
        return beforeLimit && timeForNext && belowMax;
    }

    /**
     * Picks the character x-position at which the next enemy may spawn.
     */
    scheduleNextSpawn() {
        this.nextSpawnX = this.character.x + this.spawnDistance + Math.random() * 200;
    }

    /**
     * Counts currently alive, non-endboss enemies.
     * @returns {number} Number of active chickens.
     */
    countActiveChickens() {
        return this.enemies.filter(enemy => !(enemy instanceof Endboss) && !enemy.isDead()).length;
    }

    /**
     * Spawns a new Chicken or SmallChicken ahead of the character.
     */
    spawnChicken() {
        const spawnX = this.character.x + this.canvas.width + 100 + Math.random() * 200;
        const enemy = Math.random() < 0.6 ? new Chicken(spawnX) : new SmallChicken(spawnX);
        enemy.sounds = this.character.sounds;
        this.enemies.push(enemy);
    }

    /**
     * Checks for character-enemy collisions and applies contact damage.
     */
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

    /**
     * Removes bottles the character touches and updates the bottle count.
     */
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

    /**
     * Removes coins the character touches and updates the coin count.
     */
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

    /**
     * Checks every thrown bottle against every enemy for a hit.
     */
    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.hasHit) {
                    this.handleBottleHit(enemy, bottleIndex);
                }
            });
        });
    }

    /**
     * Applies bottle damage to an enemy, splashes the bottle, and removes the enemy if it died.
     * @param {MovableObject} enemy - Enemy that was hit.
     * @param {number} bottleIndex - Index of the bottle in {@link World#throwableObjects}.
     */
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

    /**
     * Removes an enemy from the enemies list by index.
     * @param {number} enemyIndex - Index of the enemy to remove.
     */
    removeEnemy(enemyIndex) {
        this.enemies.splice(enemyIndex, 1);
    }

    /**
     * Updates the endboss statusbar from its current energy ratio.
     * @param {Endboss} endboss - The endboss whose statusbar should be updated.
     */
    updateEndbossStatusbar(endboss) {
        const percentage = (endboss.energy / endboss.maxEnergy) * 100;
        this.endbossStatusbar.setPercentage(percentage);
    }

    /**
     * Removes thrown bottles whose splash animation has finished.
     */
    removeCompletedSplashes() {
        this.throwableObjects = this.throwableObjects.filter(bottle =>
            !bottle.splashAnimationComplete
        );
    }

    /**
     * Renders one frame and schedules the next, unless the game has ended.
     */
    draw() {
        if (this.isGameOver()) {
            return;
        }
        this.clearCanvas();
        this.drawBackgroundObjects();
        this.drawFixedObjects();
        this.drawForegroundObjects();
        this.scheduleNextFrame();
    }

    /**
     * Checks whether the run has ended via character death or endboss death.
     * @returns {boolean} True if the game is over.
     */
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

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    /**
     * Draws camera-relative background layers that must stay behind the HUD: backdrop, clouds and pickups.
     */
    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws camera-relative foreground actors on top of the HUD: character, enemies and thrown bottles.
     */
    drawForegroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap([this.character]);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all screen-fixed objects: health, bottle and coin statusbars,
     * plus the endboss statusbar once the boss has been triggered.
     */
    drawFixedObjects() {
        this.addObjectsToMap(this.statusbar);
        this.addObjectsToMap([this.bottleStatusbar]);
        this.addObjectsToMap([this.coinStatusbar]);
        const endboss = this.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.triggered) {
            this.addObjectsToMap([this.endbossStatusbar]);
        }
    }

    /**
     * Schedules the next call to {@link World#draw} via requestAnimationFrame.
     */
    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws a collection of drawable objects onto the canvas.
     * @param {DrawableObject[]} objects - Objects to draw, may be undefined/empty.
     */
    addObjectsToMap(objects) {
        if (!objects) {
            return;
        }
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Draws a single object, mirroring it horizontally if facing the other direction.
     * @param {DrawableObject} movableObject - Object to draw.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.x + movableObject.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-movableObject.x - movableObject.width / 2, 0);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawCollisionFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.ctx.restore();
        }
    }

    /**
     * Checks character-enemy collisions and routes them to a vertical (jump)
     * or horizontal (contact damage) handler.
     */
    checkJumpOnEnemy() {
        const jumpState = this.captureJumpState();
        this.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.isVerticalAttack(enemy, jumpState)) {
                    this.handleVerticalAttack(enemy, index);
                } else if (!enemy.isDead() && !this.character.isHit()) {
                    this.handleHorizontalCollision(enemy);
                }
            }
        });
    }

    /**
     * Snapshots the character's fall state before any enemy is processed this frame,
     * so a stomp bounce on one enemy can't change how the next enemy is classified.
     * @returns {{speedY: number, aboveGround: boolean}} Jump state at the start of the frame.
     */
    captureJumpState() {
        return {
            speedY: this.character.speedY,
            aboveGround: this.character.isAboveGround(),
        };
    }

    /**
     * Checks whether the character is jumping down onto the given enemy.
     * @param {MovableObject} enemy - Enemy to check against.
     * @param {{speedY: number, aboveGround: boolean}} jumpState - Character's fall state at frame start.
     * @returns {boolean} True if this counts as a stomp/jump attack.
     */
    isVerticalAttack(enemy, jumpState) {
        const characterCenterY = this.character.y + this.character.height / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        const verticalDistance = enemyCenterY - characterCenterY;
        const threshold = 20;

        return verticalDistance > threshold &&
            jumpState.speedY < 0 &&
            jumpState.aboveGround;
    }

    /**
     * Applies jump-attack damage to an enemy, removes it if dead, and bounces the character.
     * @param {MovableObject} enemy - Enemy that was jumped on.
     * @param {number} index - Index of the enemy in {@link World#enemies}.
     */
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

    /**
     * Applies contact damage to the character from a side collision with an enemy.
     * @param {MovableObject} enemy - Enemy the character collided with.
     */
    handleHorizontalCollision(enemy) {
        const now = new Date().getTime();
        const timeSinceLastHit = now - this.character.lastHit;
        this.character.hit(enemy.contactDamage);
        this.statusbar[0].setPercentage(this.character.energy);
    }

}