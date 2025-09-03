class Renderer {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.grid = new Map();
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

    getCellKey = (x, y) => {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
    };

    buildGrid = () => {
        this.grid.clear();

        const addToGrid = (obj, listName) => {
            const key = this.getCellKey(obj.x, obj.y);
            if (!this.grid.has(key)) {
                this.grid.set(key, { projectiles: [], characters: [] });
            }
            this.grid.get(key)[listName].push(obj);
        };

        this.characters.forEach(char => addToGrid(char, "characters"));
        this.projectiles.forEach(proj => addToGrid(proj, "projectiles"));
    };

    getNearbyCharacters = (proj) => {
        const nearby = [];
        const cellX = Math.floor(proj.x / this.cellSize);
        const cellY = Math.floor(proj.y / this.cellSize);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = `${cellX + dx},${cellY + dy}`;
                const cell = this.grid.get(key);
                if (cell && cell.characters.length) {
                    nearby.push(...cell.characters);
                }
            }
        }
        return nearby;
    };


    collide = () => {
        this.projectiles.forEach(proj => {
            const candidates = this.getNearbyCharacters(proj);

            const hit = candidates.filter(char => {
                const closestX = Math.max(char.x, Math.min(proj.x, char.x + char.w));
                const closestY = Math.max(char.y, Math.min(proj.y, char.y + char.h));

                const dx = proj.x - closestX;
                const dy = proj.y - closestY;

                return (dx * dx + dy * dy) <= (proj.radius * proj.radius);
            });

            if (hit.length) proj.collide();
            hit.forEach(char => char.collide());
        });
    };


    render = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.buildGrid();
        this.collide();
        this.paint();
        window.requestAnimationFrame(this.render);
    };


    init = () => {
        this.render()
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