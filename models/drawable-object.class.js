class DrawableObject {
    x = 100;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    draw(ctx) { 
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(e)
        {
            console.warn('Error loading image', e);
            console.log('Could not load image, ', this.img.src)
        }
    }

    loadImages(array) { 
        array.forEach((path) => {
            let img = new Image(); 
            img.src = path;        
            this.imageCache[path] = img; 
        });
    }

    drawFrame(ctx) { 
        if (this instanceof Character || this instanceof SmallChicken || this instanceof Chicken || this instanceof Endboss) { 
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}