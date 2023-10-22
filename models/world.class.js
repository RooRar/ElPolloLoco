class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarHealth();
    bottleStatusBar = new StatusBarBottle();
    coinStatusBar = new StatusBarCoin();
    statusBarEndBoss = new StatusBarEndBoss();
    throwableObjects = [];
    endboss = this.level.endboss[this.level.endboss.length - 1];
    timeout = false;
    throwTimeout = false;
    collideTimeout = false;

    audio_bottle = new Audio('audio/getBottle.mp3');
    audio_coin = new Audio('audio/getCoin.mp3');
    audio_healing = new Audio('audio/getHeart.mp3');
    audio_gameOver = new Audio('audio/gameOver.mp3');
    audio_lostGame = new Audio('audio/lostGame.mp3');
    audio_bgmusic = new Audio('audio/bgmusic.mp3');

    IMAGE_GAMEOVER = ['img/9_intro_outro_screens/game_over/game over.png'];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.initBottlesForLevel();
        this.initCoinsForLevel(); 
        this.initBgAudio()       
        this.checkCollisions();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    initBgAudio() {
        this.audio_bgmusic.loop = true;
        this.audio_bgmusic.volume = 0.6;
        this.playAudio(this.audio_bgmusic);
    }

    initCoinsForLevel() {
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
    }

    initBottlesForLevel() {
        this.level.bottles.push(new Bottle());
        this.level.bottles.push(new Bottle());
    }

    run() {
        this.audio_healing.pause();
        setStopableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameStatus();
        }, 80)
    }

    checkCollisions() {
        this.collideWithEnemyChicken();
        this.collideHeartForHeal();
        this.collideWithBottle();
        this.collideWithCoin();
        this.collideWithEnemyEndboss();
    }

    collideWithEnemyChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isdead && (this.character.speedY < 0)) {
                if (this.character.isAboveGround() && this.collideTimeout == false){
                    this.characterHurtEnemy(enemy);
                    this.collideTimeout =true;
                }else
                    this.enemyHurtCharacter();
            } else
                this.enemyHitByBottle(enemy);
        });
        setTimeout(() => {this.collideTimeout = false}, 500);
    }

    characterHurtEnemy(enemy) {
        enemy.isdead = true;
        this.jumpOnEnemyHead(enemy);
    }

    jumpOnEnemyHead(enemy) {
        enemy.hit();
        this.character.jump();
        this.removeChicken(enemy);
    }

    enemyHurtCharacter() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    enemyHitByBottle(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy) && this.timeout == false) {
                enemy.hit();
                bottle.hitEnemy = true;
                if (enemy instanceof Endboss) {
                    this.statusBarEndBoss.setPercentage(enemy.energy);
                    this.timeout = true;
                } if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    this.removeChicken(enemy);
                } this.timeout = true;
            }
        })
    };

    removeChicken(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 1000)
    }

    collideWithEnemyEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead())
                this.EndbossHurtCharacter();
            else
                this.enemyHitByBottle(enemy);
        })
    }

    EndbossHurtCharacter() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    collideHeartForHeal() {
        this.level.health.forEach((health) => {
            if (this.character.isColliding(health) && this.statusBar.percentage < 100 && !this.character.isDead())
                this.healCharacter();
        })
    }

    healCharacter() {
        if (this.character.energy < 30)
            this.bigheal();
        else if (this.character.energy < 60)
            this.smallheal();
        else
            this.nullheal();
        if (this.level.health.length == 0)
            this.initNewHeartForLevel();
        this.playAudio(this.audio_healing);
    }

    bigheal() {
        this.character.energy += 50;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }

    smallheal() {
        this.character.energy += 30;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }

    nullheal() {
        this.character.energy = 100;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }


    initNewHeartForLevel() {
        this.level.health.push(new Health());
    }

    checkThrowObjects() {
        if (this.canThrowBottle()) {
            if (this.canThrowRight())
                this.throwRight();
            else if (this.canThrowLeft())
                this.throwLeft();
        }
    }

    canThrowBottle() {
        return this.keyboard.D && this.character.bottles > 0 && !this.character.isDead() && this.throwTimeout == false;
    }

    canThrowRight() {
        return this.character.otherDirection == false
    }

    canThrowLeft() {
        return this.character.otherDirection == true;
    }

    throwRight() {
        let bottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);
        this.throwableObjects[this.throwableObjects.length - 1].audio_throw.pause();
        this.throwableObjects[this.throwableObjects.length - 1].throw();
        this.throwTimeout = true;
        this.timeout = false;
        this.removeBottle();
        this.bottleStatusBar.setPercentage(this.character.bottles);
        setTimeout(() => {
            this.throwTimeout = false;
        }, 1000)
    }

    throwLeft() {
        let bottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);
        this.throwableObjects[this.throwableObjects.length - 1].audio_throw.pause();
        this.throwableObjects[this.throwableObjects.length - 1].throwLeft();
        this.throwTimeout = true;
        this.timeout = false;
        this.removeBottle();
        this.bottleStatusBar.setPercentage(this.character.bottles);
        setTimeout(() => {
            this.throwTimeout = false;
        }, 1000)
    }

    collideWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.addBottle();
                if (this.character.bottles < 100)
                    this.collectItem(bottle);
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }
        });
    }

    addBottle() {
        this.character.bottles += 20;
        if (this.character.bottles > 100)
            this.character.bottles = 100;
    }

    removeBottle() {
        this.character.bottles -= 20;
        if (this.character.bottles < 0)
            this.character.bottles = 0;
    }

    collideWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.addCoin();
                if (this.character.coins < 100)
                    this.collectItem(coin);
                this.coinStatusBar.setPercentage(this.character.coins);
            }
        })
    }

    addCoin() {
        this.character.coins += 20;
        if (this.character.coins >= 100)
            this.character.coins = 100;
    }

    collectItem(item) {
        this.audio_bottle.pause();
        this.audio_coin.pause();
        if (item instanceof Bottle) {
            this.updateBottlesImages(item);
            if (this.allBottlesCollected())
                this.initBottlesForLevel();
        }
        if (item instanceof Coin)
            this.updateCoinsImages(item);
    }

    updateBottlesImages(item) {
        this.level.bottles.splice(this.level.bottles.indexOf(item), 1);
        this.playAudio(this.audio_bottle);
    }

    updateCoinsImages(item) {
        this.level.coins.splice(this.level.coins.indexOf(item), 1);
        this.playAudio(this.audio_coin);
    }

    allBottlesCollected() {
        return this.level.bottles.length == 0;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addAllLevelObjects();
        this.addGameCharacter();
        this.ctx.translate(-this.camera_x, 0);
        this.addAllStatusBar();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.repeatDrawForAnimation();
    }

    addAllLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.health);
        this.addObjectsToMap(this.throwableObjects);
    }

    addGameCharacter() {
        this.addToMap(this.character);
    }

    addAllStatusBar() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.statusBarEndBoss);
    }

    repeatDrawForAnimation() {
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection)
            this.flipImage(movableObject);
        movableObject.draw(this.ctx);
        if (movableObject.otherDirection)
            this.flipImageBack(movableObject);
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    getEndbossX() {
        return this.endboss.x;
    }

    checkEndbossOverRunCharacter() {
        return (this.getEndbossX() - this.character.x < -10);
    }

    updateCharacterEnergy() {
        this.character.energy = 0;
        this.statusBar.setPercentage(this.character.energy);
    }

    checkGameStatus() {
        if (this.character.isDead() || this.checkEndbossOverRunCharacter()) {
            this.updateCharacterEnergy();
            this.character.walking_sound.pause();
            setTimeout(() => this.playAudio(this.audio_lostGame), 100)
            this.endGame();
            setTimeout(() => showEndScreenLoose(), 3000)

        }
        else if (this.endboss.isDead()) {
            this.character.walking_sound.pause();
            setTimeout(() => this.playAudio(this.audio_gameOver), 100)
            this.endGame();
            setTimeout(() => showEndScreenGameOver(), 3000)
        }
    }

    endGame() {
        audio_bgmusic.pause();
        this.character.walking_sound.pause();
        setTimeout(() => {
            stopGame();
        }, 1000);
    }

    playAudio(sound) {
        if (audioActivated) {
            var playPromise = sound.play();
            if (playPromise !== undefined)
                playPromise.then(_ => {}).catch(() => {});
        }
    }
}