let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOverImage;
let winImage;
let soundManager = new SoundManager();

/**
 * Initializes the canvas, preloads images, shows the start screen,
 * wires up mobile controls and tap-to-start, and starts the background music.
 */
function init() {
    canvas = document.getElementById("game-canvas");
    loadImages();
    showStartScreen();
    setupMobileControls();
    canvasTapToStart();
    soundManager.playBackgroundMusic();
}

/**
 * Starts the game when the canvas is tapped before the game has started.
 */
function canvasTapToStart() {
    canvas.addEventListener('pointerdown', () => {
        if (!gameStarted) {
            startOrRestartGame();
        }
    });
}

/**
 * Binds the on-screen mobile control buttons to their keyboard equivalents.
 */
function setupMobileControls() {
    bindControlButton('btn-left', 'LEFT');
    bindControlButton('btn-right', 'RIGHT');
    bindControlButton('btn-jump', 'SPACE');
    bindControlButton('btn-throw', 'D');
}

/**
 * Wires a single on-screen button to press/release a keyboard state flag.
 * @param {string} buttonId - DOM id of the control button.
 * @param {string} keyboardKey - Property on the {@link Keyboard} instance to toggle.
 */
function bindControlButton(buttonId, keyboardKey) {
    const button = document.getElementById(buttonId);
    const press = createPressHandler(keyboardKey);
    const release = createReleaseHandler(keyboardKey);
    attachPointerEvents(button, press, release);
}

/**
 * Creates a pointerdown handler that sets the given keyboard flag to true.
 * @param {string} keyboardKey - Property on the {@link Keyboard} instance to set.
 * @returns {function(PointerEvent): void} Event handler.
 */
function createPressHandler(keyboardKey) {
    return (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = true;
    };
}

/**
 * Creates a pointer-release handler that sets the given keyboard flag to false.
 * @param {string} keyboardKey - Property on the {@link Keyboard} instance to clear.
 * @returns {function(PointerEvent): void} Event handler.
 */
function createReleaseHandler(keyboardKey) {
    return (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = false;
    };
}

/**
 * Attaches press/release pointer event listeners to a control button.
 * @param {HTMLElement} button - Button element to attach listeners to.
 * @param {function(PointerEvent): void} press - Handler for pointerdown.
 * @param {function(PointerEvent): void} release - Handler for pointerup/leave/cancel.
 */
function attachPointerEvents(button, press, release) {
    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('pointercancel', release);
}

/**
 * Preloads the game-over and victory screen images.
 */
function loadImages() {
    gameOverImage = new Image();
    gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/game_over_a.png';
    winImage = new Image();
    winImage.src = 'assets/img/intro_outro/you_win_b.png';
}

/**
 * Draws the start screen image onto the canvas once it has loaded.
 */
function showStartScreen() {
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

/**
 * Creates the game world and starts monitoring win/lose conditions.
 */
function startGame() {
    gameStarted = true;
    world = new World(canvas, keyboard, soundManager);
    checkGameState();
}

/**
 * Polls the world for game-over or victory conditions.
 */
function checkGameState() {
    setInterval(() => {
        if (!world || !gameStarted) return;

        if (world.character.isDead() && world.character.deathAnimationComplete) {
                showGameOver();

        } else if (isEndbossDefeated()) {
            showWin();
        }
    }, 100);
}

/**
 * Checks whether the endboss has died and finished its death animation.
 * @returns {boolean} True if the endboss is fully defeated.
 */
function isEndbossDefeated() {
    const endboss = world.enemies.find(enemy => enemy instanceof Endboss);
    return endboss && endboss.isDead() && endboss.deathAnimationComplete;
}

/**
 * Marks the run as ended and stops all game sounds.
 */
function endGame() {
    world.character.gameEnded = true;
    world.character.sounds.stopAllSounds();
}

/**
 * Ends the run, plays the game-over sound, and draws the game-over screen.
 */
function showGameOver() {
    gameStarted = false;
    endGame();
    world.character.sounds.playGameOverSound();
    let ctx = canvas.getContext('2d');
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
}

/**
 * Ends the run, plays the victory sound, and draws the centered win screen.
 */
function showWin() {
    gameStarted = false;
    endGame();
    world.character.sounds.playVictorySound();
    let ctx = canvas.getContext('2d');
    let scale = 0.7;
    let imgWidth = canvas.width * scale;
    let imgHeight = (winImage.height / winImage.width) * imgWidth;

    let x = (canvas.width - imgWidth) / 2;
    let y = (canvas.height - imgHeight) / 2;
    ctx.drawImage(winImage, x, y, imgWidth, imgHeight);
}

/**
 * Reloads the page to restart the game from scratch.
 */
function restartGame() {
    location.reload();
}

/**
 * Shows or hides the controls legend depending on its current visibility.
 */
function toggleLegend() {
    const legend = document.getElementById('controls-legend');
    if (legend.classList.contains('hidden')) {
        showLegend();
    } else {
        hideLegend();
    }
}

/**
 * Reveals the controls legend and updates the toggle button's label.
 */
function showLegend() {
    document.getElementById('controls-legend').classList.remove('hidden');
    document.getElementById('toggle-legend-btn').textContent = '✖ Steuerung ausblenden';
}

/**
 * Hides the controls legend and updates the toggle button's label.
 */
function hideLegend() {
    document.getElementById('controls-legend').classList.add('hidden');
    document.getElementById('toggle-legend-btn').textContent = 'Steuerung anzeigen';
}

document.addEventListener('click', (e) => {
    const legend = document.getElementById('controls-legend');
    const toggleButton = document.getElementById('toggle-legend-btn');
    if (legend.classList.contains('hidden') || legend.contains(e.target) || toggleButton.contains(e.target)) {
        return;
    }
    hideLegend();
});

const KEY_MAPPINGS = {
    32: 'SPACE',
    37: 'LEFT',
    38: 'SPACE',
    39: 'RIGHT',
    40: 'DOWN',
    68: 'D'
};

/**
 * Sets the matching keyboard flag to true for a recognized keydown event.
 * @param {KeyboardEvent} e - The keydown event.
 */
function handleKeyDown(e) {
    const keyAction = KEY_MAPPINGS[e.keyCode];
    if (keyAction) {
        keyboard[keyAction] = true;
    }
}

/**
 * Sets the matching keyboard flag to false for a recognized keyup event.
 * @param {KeyboardEvent} e - The keyup event.
 */
function handleKeyUp(e) {
    const keyAction = KEY_MAPPINGS[e.keyCode];
    if (keyAction) {
        keyboard[keyAction] = false;
    }
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

document.addEventListener('keydown', (e) => {
    if (!gameStarted && e.keyCode === 13) {
        startOrRestartGame();
    }
});

/**
 * Starts a fresh game, or restarts (reloads) if a game is already running.
 */
function startOrRestartGame() {
    if (world) {
        restartGame();
    } else {
        startGame();
    }
}