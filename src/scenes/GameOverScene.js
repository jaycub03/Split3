class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    preload() {
        //load credits background
        this.load.image("goBackground", "./assets/credits.png")
    }

    create() {
        //add credits background image 
        this.backgroundImage = this.add.tileSprite(0, 0, 912, 720, "goBackground").setOrigin(0, 0)
        this.startOverGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }

    update() {
        //check for keyboard input P to start over game
        if (this.startOverGame.isDown)
            {
                this.scene.start("PlayScene")
            }
    }

}