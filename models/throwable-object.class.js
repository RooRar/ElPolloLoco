class ThrowableObject extends Movableobject {

    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    hitEnemy = false;
    audio_throw = new Audio('audio/throw.mp3');

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 80;
        this.animate();
    }

    throw() {
        this.speedY = 24;
        this.applyGravity();
        this.playAudio(this.audio_throw);
        setStopableInterval(() => this.x += 14, 40);
    }

    throwLeft() {
        this.speedY = 24;
        this.applyGravity();
        this.playAudio(this.audio_throw);
        setStopableInterval(() => this.x -= 14, 40);
    }

    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            if (this.hitEnemy) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 100);
    }

    playAudio(sound) {
        if (audioActivated) {
            var playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(() => {});
            }
        }
    }
}