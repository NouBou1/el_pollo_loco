class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 719 * 5;


    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}