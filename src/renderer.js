class Renderer {
    constructor() {
        this.render()
    }

    frame = 0;
    background = []
    characters = []
    projectiles = []

    canvas = document.querySelector("canvas");
    ctx = this.canvas.getContext("2d");

    drawCircle = (x, y, w, color = 'red') => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, w, 0, Math.PI * 2);
        this.ctx.fill();
    };

    drawSquare = (x, y, w, h, color = 'blue') => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    };

    paint = () => {
        this.frame++
        this.background.forEach(i => i.draw(this.frame));
        this.characters.forEach(i => i.draw(this.frame));
        this.projectiles.forEach(i => i.draw(this.frame));
    }

    collide = () => {
        this.projectiles.forEach(proj => {
            let hit = this.characters.filter(char => {
                const closestX = Math.max(char.x, Math.min(proj.x, char.x + char.w));
                const closestY = Math.max(char.y, Math.min(proj.y, char.y + char.h));

                const dx = proj.x - closestX;
                const dy = proj.y - closestY;

                return (dx * dx + dy * dy) <= (proj.radius * proj.radius);
            });
            if (hit.length) proj.collide()
            hit.forEach(char => char.collide());
        });
    };
    
    render = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.collide();
        this.paint();
        window.requestAnimationFrame(this.render);
    };

    init = () => {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.display = 'block';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', this.init);
    }
}

export default Renderer;