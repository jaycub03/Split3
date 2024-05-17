var config = {
    type: Phaser.AUTO,
    width: 912,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 15000 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var game = new Phaser.Game(config);

function preload () {
    this.load.image('player', '../Assets/player_right.png');
    this.load.image("tiles", "../Assets/Prison_A5.png");
    this.load.tilemapTiledJSON("map", "../Assets/tilemap.json");
}

function create() {
    const map = this.make.tilemap({ key: "map"});
    const tileset = map.addTilesetImage("Prison_A5", "tiles");

    const backgroundLayer = map.createLayer("layer1", tileset, 0, 0);
    //const platformLayer = map.createLayer("platforms", tileset, -100, -4965);
    //platformLayer.setCollisionByExclusion(-1, true);

    const spawnX = 300;
    const spawnY = 500;

    player = this.physics.add.sprite(spawnX, spawnY, 'player');
    player.setOrigin(0.5, 0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player, true, 0.1, 0.1);  // Adjusted to follow player both horizontally and vertically

    this.physics.add.collider(player, backgroundLayer);
    backgroundLayer.setCollisionByProperty({collides: true});

    cursors = this.input.keyboard.createCursorKeys();
    cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
}

function update() {
    player.setVelocityX(0);
    player.setVelocityY(0);

    var spacePressed = this.input.keyboard.checkDown(cursors.space, 250);

    if ((cursors.left.isDown || cursors.a.isDown) && spacePressed) {
        player.setVelocityX(1100);
        player.setVelocityY(-1000);
        player.scaleX = -1;
        player.body.setOffset(player.width, 0);
    } else if ((cursors.right.isDown || cursors.d.isDown) && spacePressed) {
        player.setVelocityX(-1100);
        player.setVelocityY(-1000);
        player.scaleX = 1;
        player.body.setOffset(0, 0);
    } else {
        if (cursors.left.isDown || cursors.a.isDown) {
            player.scaleX = -1;
            player.body.setOffset(player.width, 0);
        } else if (cursors.right.isDown || cursors.d.isDown) {
            player.scaleX = 1;
            player.body.setOffset(0, 0);
        }
    }

    if ((cursors.up.isDown || cursors.s.isDown) && spacePressed) {
        player.setVelocityY(-6000);
    }
}
