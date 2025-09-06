import Enemy from "./Enemy.js";

export default class Fighter extends Enemy {
    constructor(renderer) {
        super(renderer, "../../pictures/enemies/fighter/fu.png");
    }    
}