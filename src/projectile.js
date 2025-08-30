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
    collide = ()=>{
        this.renderer.projectiles = this.renderer.projectiles.filter(p => p != this)
    }
    draw = () => {
        this.renderer.drawCircle(this.x, this.y, this.radius, 'red');
        if (this.x > 0 && this.x < window.innerWidth && this.y > 0 && this.y < window.innerHeight) {
            return this.move();
        }
        this.renderer.projectiles = this.renderer.projectiles.filter(p => p != this)
    }
    move = () => {
        switch (this.facing) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;

        }
    }
}

export default Projectile;