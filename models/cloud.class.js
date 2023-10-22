class Cloud extends Movableobject {
    y = 25;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2500; 
        this.animate();
    }

    animate() { 
        setStopableInterval(() => {
            this.moveLeft();
        }, 120 / 60)    
    }
}