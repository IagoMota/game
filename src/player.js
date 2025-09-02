import Projectile from "./projectile.js";

class Player {
    constructor(renderer, x = 0, y = 0, w = 10, h = 10) {
        this.renderer = renderer;
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = 'green'
        this.speed = 10
        this.projectileRadius = 5;
        renderer.characters.push(this);
    }

    collide = () => {
        console.log("oopsie")
    }
    draw = () => {
        this.renderer.drawSquare(this.x, this.y, this.w, this.h, this.color);
    }

    init = () => {
        let facing = 'right';
        const pressed = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        }

        const int = {
            w: null,
            a: null,
            s: null,
            d: null,
            space: null
        }

        const dirStack = [];
        const keyToFacing = { w: 'up', a: 'left', s: 'down', d: 'right' };

        const pushDir = (k) => {
            if (!dirStack.includes(k)) dirStack.push(k);
            updateFacingFromStack();
        };
        const popDir = (k) => {
            const i = dirStack.indexOf(k);
            if (i !== -1) dirStack.splice(i, 1);
            updateFacingFromStack();
        };
        const updateFacingFromStack = () => {
            const last = dirStack[dirStack.length - 1];
            if (last) facing = keyToFacing[last];
        };

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'd': {
                    if (pressed.d) return
                    if (pressed.a) {
                        clearInterval(int.a)
                        int.a = null
                    }
                    pressed.d = true
                    int.d = setInterval(() => {
                        this.x += this.speed
                    }, 25)
                    pushDir('d')
                    break;
                }
                case 'a': {
                    if (pressed.a) return
                    if (pressed.d) {
                        clearInterval(int.d)
                        int.d = null
                    }
                    pressed.a = true
                    int.a = setInterval(() => {
                        this.x -= this.speed
                    }, 25)
                    pushDir('a')
                    break;
                }
                case 'w': {
                    if (pressed.w) return
                    if (pressed.s) {
                        clearInterval(int.s)
                        int.s = null
                    }
                    pressed.w = true
                    int.w = setInterval(() => {
                        this.y -= this.speed
                    }, 25)
                    pushDir('w')
                    break;
                }
                case 's': {
                    if (pressed.s) return
                    if (pressed.w) {
                        clearInterval(int.w)
                        int.w = null
                    }
                    pressed.s = true
                    int.s = setInterval(() => {
                        this.y += this.speed
                    }, 25)
                    pushDir('s')
                    break;
                }
                case ' ': {
                    if (pressed.space) return
                    pressed.space = true
                    this.int = setInterval(() => {
                        let properX = facing === 'left' ? this.x - 25 : facing === 'right' ? this.x + this.w + 25 : this.x + (this.w / 2)
                        let properY = facing === 'up' ? this.y - 25 : facing === 'down' ? this.y + this.h + 25 : this.y + (this.h / 2)
                        new Projectile(properX, properY, facing, 25, this.renderer, this.projectileRadius);
                        console.log(this.projectileRadius)
                    }, 50);
                    break;
                }
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'd': {
                    clearInterval(int.d)
                    pressed.d = false
                    if (pressed.a && !int.a) {
                        int.a = setInterval(() => {
                            this.x -= this.speed
                        }, 25)
                    }
                    popDir('d')
                    break;
                }
                case 'a': {
                    clearInterval(int.a)
                    pressed.a = false
                    if (pressed.d && !int.d) {
                        int.d = setInterval(() => {
                            this.x += this.speed
                        }, 25)
                    }
                    popDir('a')
                    break;
                }
                case 'w': {
                    clearInterval(int.w)
                    pressed.w = false
                    if (pressed.s && !int.s) {
                        int.s = setInterval(() => {
                            this.y += this.speed
                        }, 25)
                    }
                    popDir('w')
                    break;
                }
                case 's': {
                    clearInterval(int.s)
                    pressed.s = false
                    if (pressed.w && !int.w) {
                        int.w = setInterval(() => {
                            this.y -= this.speed
                        }, 25)
                    }
                    popDir('s')
                    break;
                }
                case ' ': {
                    clearInterval(this.int)
                    pressed.space = false
                }
            }
        })
        window.addEventListener("wheel", (event) => {
            if (event.deltaY < 0 && this.projectileRadius < 19) {
                this.projectileRadius++
                if (this.speed > 4) this.speed--
            }
            if (event.deltaY > 0 && this.projectileRadius > 1) {
                this.projectileRadius--
                if (this.speed < 15) this.speed++
            }



        }, { passive: false });
    }
}

export default Player;