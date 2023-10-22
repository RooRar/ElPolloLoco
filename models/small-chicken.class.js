class SmallChicken extends Movableobject {
    x = 100;
    y = 370;
    height = 50;
    width = 50;
    isdead = false;

    IMAGES_WALK = 
    [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    offset = {
        top: 0,
        left: 2,
        right: 2,
        bottom: 0
    }

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.startPointSmallChicken();
        if (this.x == 0)
            this.startPointSmallChicken();
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setStopableInterval(() => this.moveSmallChicken(), 1000 / 60);
        setStopableInterval(() => this.playSmallChicken(), 200);
    }

    startPointSmallChicken() {
        this.x = 400 + Math.random() * 1000;
        this.speed = 0.25 + Math.random() * 1.5;
    }

    moveSmallChicken() {
        if (!this.isDead())
            this.moveLeft();
    }

    playSmallChicken() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALK);
        }
    }
}