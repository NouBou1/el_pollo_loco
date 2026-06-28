/**
 * Holds all entities that make up a playable level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 719 * 5;
    bottles;
    coins;

    /**
     * Creates a level from its constituent entity collections.
     * @param {MovableObject[]} enemies - Enemies present in the level.
     * @param {Cloud[]} clouds - Background clouds.
     * @param {BackgroundObject[]} backgroundObjects - Background layer images.
     * @param {Bottle[]} bottles - Collectible bottles.
     * @param {Coin[]} coins - Collectible coins.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}