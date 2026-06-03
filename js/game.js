let canvas;
let world ;
keyboard = new Keyboard();


function init() {
 
    canvas = document.getElementById("game-canvas");
       world = new World(canvas);
    

    console.log("my character is", world.character);

}


window.addEventListener("keydown", (e) => {
    console.log("Key pressed: ", e.code);
    if (e.code === "Space") {   
        world.character.jump();
    }
    if (e.code === "ArrowRight") {
        world.character.moveRight();
    }
    if (e.code === "ArrowLeft") {
        world.character.moveLeft();
    }
    if (e.code === "ArrowUp") {
        world.character.jump();
    }
    if (e.code === "ArrowDown") {
        world.character.y += 10;
    }
});


