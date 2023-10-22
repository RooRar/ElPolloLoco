class Movableobject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    bottlePercentage = 100;
    lastHit = 0;
    speedEnemy = 0.55;
    speedEndBoss = 0.25;
    speedCloud = 0.03; 

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    hit_enemy_chicken = new Audio('audio/hit_on_head.mp3');
    hit_enemy_Endboss = new Audio('audio/hit_Endboss.mp3');
    character_hurt = new Audio('audio/hurt_low_grunt.mp3');

    applyGravity() {  
        setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&  
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    hit() {
        this.hit_enemy_chicken.pause();
        this.hit_enemy_Endboss.pause();
        this.character_hurt.pause();
            if (this instanceof Character) {
                this.characterLooseEnergy();
                this.timepassedLastHitCharacter();
            } else if (this instanceof Endboss) {
                this.enemyBossLooseEnergy();
                this.timepassedLastHitEnemyBoss();
            } else if (this instanceof Chicken || this instanceof SmallChicken)
                this.enemyChickenkilled();
    }

    characterLooseEnergy() {
        this.energy -= 5;
        this.playAudio(this.character_hurt);
    }

    timepassedLastHitCharacter() {
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    enemyBossLooseEnergy() {
        this.energy -= 30;
        this.playAudio(this.hit_enemy_Endboss);
    }

    timepassedLastHitEnemyBoss() {
        if (this.energy <= 10) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    enemyChickenkilled() {
        this.playAudio(this.hit_enemy_chicken);
        this.energy = 0;
    }

    isDead() {
        return this.energy == 0; 
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1; 
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]]; 
        this.currentImage++;
    }

    moveRight() {  
        this.x += this.speed; 
    }

    moveLeft() {
        if (this instanceof Cloud)
            this.x -= this.speedCloud; 
        if (this instanceof Character)
            this.x -= this.speed; 
        if (this instanceof Chicken || this instanceof SmallChicken)
            this.x -= this.speedEnemy;
        if (this instanceof Endboss)
            this.x -= this.speedEndBoss;   
    }

    jump() {
        this.speedY = 25; 
    };

    playAudio(audio) {
        if (audioActivated) {
            var playPromise = audio.play();
            if (playPromise !== undefined)
                playPromise.then(_ => {}).catch(() => {});
        }
    }
}