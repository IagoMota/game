import Renderer from "./src/renderer.js";
import Player from "./src/player.js";
import Enemy from "./src/enemy.js";

const renderer = new Renderer();
const player = new Player(renderer, 50, 50, 30, 30, "blue");

let count = 0;
setInterval(() => {
    if (count > 9) return;  
    new Enemy(renderer);
    count++
}, 10);