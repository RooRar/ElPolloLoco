class StatusBar extends DrawableObject {
    IMAGES = [];
    percent;

    setPercentage(percent) {
        this.percent = percent; 
        let path = this.IMAGES[this.resolveImageIndex(percent)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percent == 100)
            return 5;
        if (this.percent > 80)
            return 4;
        if (this.percent > 60)
            return 3;
        if (this.percent > 40)
            return 2;
        if (this.percent > 20)
            return 1;
        return 0;
    }
}