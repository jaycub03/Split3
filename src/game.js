var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,


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
    // Load the player sprite here
    this.load.image('player', '../Assets/player_right.png');
    this.load.image("tiles", "../Assets/Prison_A5.png");
    this.load.tilemapTiledJSON("map", "../Assets/tilemap.json");


   
}

function create() {
    // Add tilemap and tileset
    const map = this.make.tilemap({ key: "map"});
    const tileset = map.addTilesetImage("Prison_A5", "tiles");

    // Add map layers

    //floor
    const backgroundLayer = map.createLayer("background", tileset, 90, -4965);
    const platformLayer = map.createLayer("platforms", tileset, 90, -4965);
    platformLayer.setCollisionByExclusion(-1, true);
//-4965
    // Player spawn location
    const spawnX = 600;
    const spawnY = map.heightInPixels - 76;

    // Create the player sprite at the calculated spawn position
    player = this.physics.add.sprite(spawnX, spawnY, 'player');

    // Set origin to the center of the sprite
    player.setOrigin(0.5, 0.5);

    // Player physics properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Set up camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);

    // Create collision between player and platforms
    this.physics.add.collider(player, platformLayer);
    platformLayer.setCollisionByProperty({collides: true});

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);  // Adding the W key
}

function update() {
    // Reset player velocity (movement)
    player.setVelocityX(0);
    player.setVelocityY(0);  // Ensure vertical velocity is also reset each frame

    // Check for spacebar press
    var spacePressed = this.input.keyboard.checkDown(cursors.space, 250);

    // Horizontal movement
    if ((cursors.left.isDown || cursors.a.isDown) && spacePressed) {
        player.setVelocityX(1100);
        player.setVelocityY(-1000);  // Move left when left arrow and space are pressed
        player.scaleX = -1;         // Mirror the sprite when moving left
        player.body.setOffset(player.width, 0); // Adjust hitbox position
    } else if ((cursors.right.isDown || cursors.d.isDown) && spacePressed) {
        player.setVelocityX(-1100);
        player.setVelocityY(-1000);  // Move right when right arrow and space are pressed
        player.scaleX = 1;          // Ensure the sprite faces right when moving right
        player.body.setOffset(0, 0); // Adjust hitbox position
    } else {
        // Set sprite direction without moving
        if (cursors.left.isDown || cursors.a.isDown) {
            player.scaleX = -1;     // Face left without moving
            player.body.setOffset(player.width, 0); // Adjust hitbox position
        } else if (cursors.right.isDown || cursors.d.isDown) {
            player.scaleX = 1;      // Face right without moving
            player.body.setOffset(0, 0); // Adjust hitbox position
        }
    }

    // Vertical movement
    if ((cursors.up.isDown || cursors.s.isDown) && spacePressed) {
        player.setVelocityY(-6000); // Move up when up arrow/W and space are pressed together
    }
}






