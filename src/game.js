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
    this.load.image('player', '../Assets/player_right.jpg');
    this.load.image("tiles", "../Assets/Prison_A5.png");
    this.load.tilemapTiledJSON("map", "../Assets/tilemap.json");


   
}


function create() {
    //add tilemap
    const map = this.make.tilemap({ key: "map"});
    const tileset = map.addTilesetImage("Prison_A5", "tiles");
    const collision = map.createLayer("platforms", tileset, 0, -65);
    collision.setCollisionByExclusion(-1, true);




    // Create the player sprite
    player = this.physics.add.sprite(400, 300, 'player');


    // Player physics properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);


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
   
        player.setVelocityX(1600);
        player.setVelocityY(-11000);  // Move left when left arrow and space are pressed
        player.scaleX = -1;         // Mirror the sprite when moving left
    } else if ((cursors.right.isDown || cursors.d.isDown) && spacePressed) {
        player.setVelocityX(-1600);
        player.setVelocityY(-11000);  // Move right when right arrow and space are pressed
        player.scaleX = 1;          // Ensure the sprite faces right when moving right
    } else {
        // Set sprite direction without moving
        if (cursors.left.isDown || cursors.a.isDown) {
            player.scaleX = -1;     // Face left without moving
        } else if (cursors.right.isDown || cursors.d.isDown) {
            player.scaleX = 1;      // Face right without moving
        }
    }


    // Vertical movement
    if ((cursors.up.isDown || cursors.s.isDown) && spacePressed) {
        player.setVelocityY(-3000); // Move up when up arrow/W and space are pressed together
    }
}







