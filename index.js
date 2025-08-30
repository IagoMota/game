import Renderer from "./src/renderer.js";
import Player from "./src/player.js";

const renderer = new Renderer();
const player = new Player(renderer, 50, 50, 30, 30, "blue");
