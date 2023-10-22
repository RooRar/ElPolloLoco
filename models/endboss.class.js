class Endboss extends Movableobject {
    height = 350;
    width = 200;
    y = 90;
    currentImage = 0;
    isActivated = false;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 65,
        bottom: 10,
        right: 20,
        left: 20,
    };

    audioEndboss = new Audio('audio/chicken_attack.mp3');
    audioDead = new Audio('audio/chicke_endboss_dead.mp3');

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setStopableInterval(() => this.move(), 250);
        setStopableInterval(() => this.play(), 150);
    }

    move() {
        if (world.character.x > 2000 && !this.isActivated)
            this.isActivated = true;

        if (world.character && this.distanceToCharacter() < 400 && this.isActivated) {
            setStopableInterval(() => {
                if (((this.distanceToCharacter() < 400 && !this.isDead()) || (this.energy < 100 && !this.isDead())))
                    super.moveLeft();
            }, 1000 / 60);
            this.playAnimation(this.IMAGES_WALK)
        } 
    }

    distanceToCharacter() {
        return this.x - world.character.x;
    }

    play() {
        this.audioDead.pause();
        this.audioEndboss.pause();
        if (world.character && this.distanceToCharacter() >= 400 && !this.isHurt())
            this.playAnimation(this.IMAGES_ALERT);
        if (world.character && this.distanceToCharacter() < 250 && this.distanceToCharacter() > 50 && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.playAudio(this.audioEndboss);
        }
        if (this.isHurt())
            this.playAnimation(this.IMAGES_HURT);
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.playAudio(this.audioDead);
        }
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