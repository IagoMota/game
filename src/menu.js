export default class MainMenu {
    constructor(renderer, player) {
        this.renderer = renderer;
        this.player = player;

        this.bindMenuButtons();
        this.playSong();
    }

    menuElement = document.getElementById('mainscreen');
    startButton = document.getElementById('startButton');
    settingsButton = document.getElementById('settingsButton');
    exitButton = document.getElementById('exitButton');
    menuSong = null

    #hide() {
        this.menuElement.style.display = 'none';
    }
    playSong = () => {
        const playAudio = () => {
            if (!this.menuSong) {
                this.menuSong = new Audio('../audio/menu_bgm.mp3');
                this.menuSong.loop = true;
                this.menuSong.volume = 1;
            }
            this.menuSong.play().catch(() => {
            });
        };


        const userInteractionHandler = () => {
            playAudio();
            document.removeEventListener('click', userInteractionHandler);
            document.removeEventListener('keydown', userInteractionHandler);
        };

        document.addEventListener('click', userInteractionHandler);
        document.addEventListener('keydown', userInteractionHandler);

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.menuSong) {
                this.menuSong.play().catch(() => { });
            }
        });
    };

    killSong = () => {
        this.menuSong.pause();
        this.menuSong.src = '';
        this.menuSong.load();
        this.menuSong = null;
    }

    bindMenuButtons = () => {
        this.startButton.addEventListener('click', () => {
            new Audio('../audio/menu_click.mp3').play()

            let int = setInterval(() => {
                console.log(this.menuSong.volume)
                if (this.menuSong.volume > 0.1) {
                    this.menuSong.volume -= 0.05
                } else {
                    clearInterval(int)
                    this.killSong();
                    new Audio('../audio/exploding_sun.mp3').play()
                }

            }, 75);
            setTimeout(() => {
                this.#hide();
                this.renderer.init();
                this.player.init();
            }, 1000);

        });
        this.settingsButton.addEventListener('click', () => {
            new Audio('../audio/menu_click.mp3').play()
            console.log('Settings clicked');
        });
        this.exitButton.addEventListener('click', () => {
            new Audio('../audio/menu_click.mp3').play()
            console.log('Exit clicked');
        });


        this.startButton.addEventListener('mouseover', () => {
            new Audio("../audio/menu_hover.mp3").play()
        });
        this.settingsButton.addEventListener('mouseover', () => {
            new Audio("../audio/menu_hover.mp3").play()
        });
        this.exitButton.addEventListener('mouseover', () => {
            new Audio("../audio/menu_hover.mp3").play()
        });
    }

}
