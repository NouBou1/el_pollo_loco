class Character extends MovableObject {
x = 50;
y = 280; 
IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png'
];
currentImageIndex = 0;

constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
}

animate() {
    setInterval(() => {
        let path = this.IMAGES_WALKING[this.currentImageIndex];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
        
      
        if (this.currentImageIndex >= this.IMAGES_WALKING.length) {
            this.currentImageIndex = 0;
        }
    }, 100);
}


jump() {

    this.y -= 150; 
    console.log("Character jumps");
}
}