class Projectile {
    constructor(x, y, facing, speed, renderer) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.speed = speed;
        this.renderer = renderer;
        this.radius = 5;

        renderer.projectiles.push(this);
        new Audio('./audio/pew.mp3').play();
    }
    draw = () => {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'red');        
        this.move();
    }
    move = () => {        
        switch (this.facing) {
            case 'up':
                if (this.y - this.speed < 0) {
                    this.renderer.projectiles = this.renderer.projectiles.filter(p => p !== this);
                    return;
                }
                this.y -= this.speed;
                break;
            case 'down':
                if (this.y + this.speed > this.renderer.height) {
                    this.renderer.projectiles = this.renderer.projectiles.filter(p => p !== this);
                    return;
                }
                this.y += this.speed;
                break;
            case 'left':
                if (this.x - this.speed < 0) {
                    this.renderer.projectiles = this.renderer.projectiles.filter(p => p !== this);
                    return;
                }
                this.x -= this.speed;
                break;
            case 'right':
                if (this.x + this.speed > this.renderer.width) {
                    this.renderer.projectiles = this.renderer.projectiles.filter(p => p !== this);
                    return;
                }
                this.x += this.speed;
                break;

        }
    }
}

export default Projectile;