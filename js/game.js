let canvas;
let world ;


function init() {
 
    canvas = document.getElementById("game-canvas");
       world = new World(canvas);
    

    console.log("my character is", world.character);

}
