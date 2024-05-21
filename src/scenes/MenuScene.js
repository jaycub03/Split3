class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        //load image/audio assets
        this.load.image("menuBackground", "./assets/mainmenu.png")
        this.load.audio('gameMusic', './assets/the_big_heist.wav')

    }

    create() {

        //add menu background image 
        this.backgroundImage = this.add.tileSprite(0, 0, 912, 720, "menuBackground").setOrigin(0, 0)
        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        this.music = this.sound.add('gameMusic')
        this.music.setVolume(0.3)


    }

    update() {
        //check for keyboard input P to start game
        if (this.startGame.isDown)
        {
            this.music.play({loop: true})
            this.scene.start("PlayScene")
        }
            
    }

}