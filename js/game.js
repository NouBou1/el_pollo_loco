let canvas; 
let world ;
let keyboard = new Keyboard();


function init() {
 
    canvas = document.getElementById("game-canvas");
       world = new World(canvas, keyboard);
    

    console.log("my character is", world.character);

}


window.addEventListener("keydown", (e) => {
    console.log("Key pressed: ", e.keyCode);
    if (e.keyCode === 32) {   
        world.character.jump();
        keyboard.SPACE = true;
    }
    if (e.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode === 38) {
        keyboard.UP = true;
    }
    if (e.keyCode === 40) {
        keyboard.DOWN = true;
    }

});


window.addEventListener("keyup", (e) => {
    console.log("Key released: ", e.code);
    if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode === 38) {
        keyboard.UP = false;
    }
    if (e.keyCode === 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode === 32) {
        keyboard.SPACE = false;
    }
});