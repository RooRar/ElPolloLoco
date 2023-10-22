class Coin extends Movableobject {
    x = 200;
    y = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.height = 100;
        this.width = 100; 

        this.x = 200 + Math.random() * 2000; 
        this.y = 280 - Math.random() * 200;  
        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 150);
    }
}