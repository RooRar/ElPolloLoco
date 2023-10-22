class StatusBarHealth extends StatusBar {
    IMAGES_HEALTH = 
    [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    percent = 100;

    constructor() {
        super(); 
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 40;
        this.width = 160;
        this.height = 50;
        this.IMAGES = this.IMAGES_HEALTH;
        this.setPercentage(100); 
    }
}