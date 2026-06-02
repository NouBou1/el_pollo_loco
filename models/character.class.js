class Character extends MovableObject {


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.x = 50; // Startposition x
        this.y = 320; // Startposition y
    }

    jump() {
        console.log("Character jumps");
    }
}