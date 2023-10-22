class Bottle extends Movableobject {
    
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2000; 
        this.y = 360;
        this.width = 50;
        this.height = 75;
        this.offset = {
            top: 20,
            left: 20,
            right: 20,
            bottom: 10
        }
    }
}  