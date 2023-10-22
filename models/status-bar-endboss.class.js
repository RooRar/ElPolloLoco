class StatusBarEndBoss extends StatusBar {
    IMAGES_HEALTH_ENDBOSS = 
    [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];
    percent = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.x = 550;
        this.y = 40;
        this.width = 160;
        this.height = 50;
        this.IMAGES = this.IMAGES_HEALTH_ENDBOSS;
        this.setPercentage(100);
    }
}