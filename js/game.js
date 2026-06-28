let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOverImage;
let winImage;
let soundManager = new SoundManager();

function init() {
    canvas = document.getElementById("game-canvas");
    loadImages();
    showStartScreen();
    setupMobileControls();
    canvasTapToStart();
    soundManager.playBackgroundMusic();
}

function canvasTapToStart() {
    canvas.addEventListener('pointerdown', () => {
        if (!gameStarted) {
            startOrRestartGame();
        }
    });
}

function setupMobileControls() {
    bindControlButton('btn-left', 'LEFT');
    bindControlButton('btn-right', 'RIGHT');
    bindControlButton('btn-jump', 'SPACE');
    bindControlButton('btn-throw', 'D');
}

function bindControlButton(buttonId, keyboardKey) {
    const button = document.getElementById(buttonId);
    const press = createPressHandler(keyboardKey);
    const release = createReleaseHandler(keyboardKey);
    attachPointerEvents(button, press, release);
}

function createPressHandler(keyboardKey) {
    return (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = true;
    };
}

function createReleaseHandler(keyboardKey) {
    return (e) => {
        e.preventDefault();
        keyboard[keyboardKey] = false;
    };
}

function attachPointerEvents(button, press, release) {
    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('pointercancel', release);
}

function loadImages() {
    gameOverImage = new Image();
    gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/game_over_a.png';
    winImage = new Image();
    winImage.src = 'assets/img/intro_outro/you_win_b.png';
}

function showStartScreen() {
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    gameStarted = true;
    world = new World(canvas, keyboard, soundManager);
    checkGameState();
}

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

function isEndbossDefeated() {
    const endboss = world.enemies.find(enemy => enemy instanceof Endboss);
    return endboss && endboss.isDead() && endboss.deathAnimationComplete;
}


function endGame() {
    world.character.gameEnded = true;
    world.character.sounds.stopAllSounds();
}

function showGameOver() {
    gameStarted = false;
    endGame();
    world.character.sounds.playGameOverSound();
    let ctx = canvas.getContext('2d');
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
}

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

function restartGame() {
    location.reload();
}

function toggleLegend() {
    const legend = document.getElementById('controls-legend');
    if (legend.classList.contains('hidden')) {
        showLegend();
    } else {
        hideLegend();
    }
}

function showLegend() {
    document.getElementById('controls-legend').classList.remove('hidden');
    document.getElementById('toggle-legend-btn').textContent = '✖ Steuerung ausblenden';
}

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

function handleKeyDown(e) {
    const keyAction = KEY_MAPPINGS[e.keyCode];
    if (keyAction) {
        keyboard[keyAction] = true;
    }
}

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

function startOrRestartGame() {
    if (world) {
        restartGame();
    } else {
        startGame();
    }
}