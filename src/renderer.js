class Renderer {
    constructor() {
        this.render()
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

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
        this.background.forEach(i=>i.draw());
        this.characters.forEach(i=>i.draw());
        this.projectiles.forEach(i=>i.draw());
    }

    collide = ()=>{}
    render = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.collide();
        this.paint();
        window.requestAnimationFrame(this.render);
    };

}

export default Renderer;