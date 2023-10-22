class Chicken extends Movableobject {
    x = 100;
    y = 350;
    height = 70;
    width = 70;
    isdead = false;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    currentImage = 0;

    offset = {
        top: 0,
        left: 5,
        right: 5,
        bottom: 0,
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.startPointChicken();
        if (this.x == 0)
            this.startPointChicken();
        this.animate();
    }

    animate() {
        setStopableInterval(() => this.move(), 1000 / 60);
        setStopableInterval(() => this.play(), 200);
    }

    startPointChicken() {
        this.x = 900 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 1.2;
    }

    move() {
        if (!this.isDead())
            this.moveLeft();
    }

    play() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}