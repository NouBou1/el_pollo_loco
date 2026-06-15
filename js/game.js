let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOverImage;
let winImage;

function init() {
    canvas = document.getElementById("game-canvas");
    loadImages();
    showStartScreen();
}

function loadImages() {
    gameOverImage = new Image();
    gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over.png';
    winImage = new Image();
    winImage.src = 'img/intro_outro/You Win B.png';
}

function showStartScreen() {
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    gameStarted = true;
    world = new World(canvas, keyboard);
    checkGameState();
}

function checkGameState() {
    setInterval(() => {
        if (!world || !gameStarted) return;

        if (world.character.isDead()) {
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


function showGameOver() {
    gameStarted = false;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
}

function showWin() {
    gameStarted = false;
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

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode === 38) {
        keyboard.SPACE = true;
    }
    if (e.keyCode === 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode === 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode === 38) {
        keyboard.SPACE = false;
    }
    if (e.keyCode === 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode === 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode === 68) {
        keyboard.D = false;
    }
});

document.addEventListener('keydown', (e) => {
    if (!gameStarted && e.keyCode === 13) {
        if (world) {
            restartGame();
        } else {
            startGame();
        }
    }
});