class Enemy {
    constructor(renderer) {
        this.renderer = renderer;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.w = 50;
        this.h = 50;
        this.color = '#fff'
        this.speed = 10

        renderer.characters.push(this);
    }

    draw = (frame) => {
        if (frame % 20 == 0) this.move();
        this.renderer.drawSquare(this.x, this.y, this.w, this.h, this.color);
    }
    collide = () => {
        console.log("colided")
        this.renderer.characters = this.renderer.characters.filter(p => p != this)
    }
    move = () => {
        if (Math.random() * 1 > 0.5) this.x += this.speed;
        else this.x -= this.speed;
        if (Math.random() * 1 > 0.5) this.y += this.speed;
        else this.y -= this.speed;
    }
}

export default Enemy;