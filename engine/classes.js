class shObject {
    constructor(name = "unnammed", posx = 0, posy = 0, texture = 0, posz = 0, collision = false, physics = false, visible = true, shading = false, sizey = 1, sizex = 1) {
        this.pos = { x: posx, y: posy, z: posz };
        this.texture = texture;
        this.collision = collision;
        this.physics = physics;
        this.visible = visible;
        this.name = name;
        this.shading = shading;
        this.sizey = sizey;
        this.sizex = sizex;
        this.textureHover = texture;
        this.hover = false;
        this.inChunk = false;
    }
    beginPlay() {

    }
    tick() {

    }
    onrender() {

    }
}

class shAnimation {
    constructor (name, animTex, speed) {
        this.name = name;
        this.animTex = animTex;
        this.speed = speed;
        this.playing = false;
        this.animFrame = 0;
        this.texture = this.animTex[0];
    }

    play () {
        this.playing = true;
        this.tick();
    }

    stop () {
        this.playing = false;
    }

    reset () {
        this.animFrame = 0;
    }
    
    tick () {
        if (this.playing) {
            this.animFrame += this.speed;
            if (this.animFrame >= this.animTex.length - 0.5) {
                this.animFrame = 0;
            }
            this.texture = this.animTex[this.animFrame.toFixed(0)];
        }
    }
}