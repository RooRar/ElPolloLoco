class Character extends Movableobject {
    y = 50;
    height = 270;
    width = 130;
    speed = 10;
    coins = 0;
    bottles = 0;

    offset = {
        top: 110,
        left: 20,
        right: 20,
        bottom: 0,
    }

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEATH = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    currentImage = 0;
    world;
    idleCountUp = 0;
    jumpTimeout = false;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setStopableInterval(() => this.move(), 1000 / 60);
        setStopableInterval(() => this.play(), 120);
    }

    move() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && (this.x < this.world.getEndbossX()))
            this.moveRight();
        if (this.world.keyboard.LEFT && this.x > 0)
            this.moveLeft();
        if (this.world.keyboard.SPACE && !this.isAboveGround())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }
    
    moveLeft() {
        this.world.playAudio(this.walking_sound);
        super.moveLeft();
        this.otherDirection = true;
    }

    moveRight() {
        this.world.playAudio(this.walking_sound);
        super.moveRight();
        this.otherDirection = false;
    }

    jump() {
            this.world.playAudio(this.jumping_sound);
            super.jump();
    }

    play() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEATH);
            this.idleCountUp = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleCountUp = 0;
        } else if (this.isAboveGround() && this.speedY > -20) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleCountUp = 0;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALK);
            this.idleCountUp = 0;
        } else if (this.isIdle()) {
            this.idle();
        }
    }

    idle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleCountUp += 100;
        if (this.idleCountUp >= 5000)
            this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    isIdle() {
        return (
            !this.world.keyboard.UP && !this.world.keyboard.DOWN &&
            !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT &&
            !this.world.keyboard.SPACE && !this.world.keyboard.D
        );
    }
}