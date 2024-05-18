class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image("menuBackground", "./assets/mainmenu.png")
    }

    create() {
        this.backgroundImage = this.add.tileSprite(0, 0, 912, 720, "menuBackground").setOrigin(0, 0)
        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }

    update() {
        if (this.startGame.isDown)
        {
            this.scene.start("PlayScene")
        }
            
    }

}