/**
 * Builds a fresh level 1 instance with its own enemies, clouds, background and pickups.
 * Called once per game start/restart so a new run never inherits mutated state
 * (dead enemies, collected items, appended background layers) from a previous one.
 * @returns {Level} A newly constructed level.
 */
function createLevel1() {
    return new Level(
        [
            new Endboss(),
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),

        ],
        [
            new BackgroundObject('assets/img/5_background/layers/air.webp', 0, 0),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.webp', 0, 0),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.webp', 0, 0),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.webp', 0, 0),
            new BackgroundObject('assets/img/5_background/layers/air.webp', 719, 0),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.webp', 719, 0),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.webp', 719, 0),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.webp', 719, 0),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ]
    );
}
