import Renderer from "./src/renderer.js";
import Player from "./src/player.js";
import Fighter from "./src/enemies/fighter.js"
import MainMenu from "./src/menu.js";

const renderer = new Renderer();
const player = new Player(renderer, 50, 50, 30, 30, "blue");
const menu = new MainMenu(renderer, player);

let count = 0;
setInterval(() => {
    if (count > 20) return;
    new Fighter(renderer);
    count++
}, 10);