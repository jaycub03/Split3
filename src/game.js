var config = {
    type: Phaser.AUTO,
    width: 912,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 15000 },
            debug: true // Enable debug to visualize collision boundaries
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
var block;

var game = new Phaser.Game(config);

function preload () {
    // Load the player sprite here
    this.load.image('player', '../Assets/player_right.png');
    // Load the block sprite
    this.load.image('block', '../Assets/block.png');
}

function create() {
    // Create the player sprite
    player = this.physics.add.sprite(400, 300, 'player');

    // Create the block sprite and scale it down
    block = this.physics.add.staticSprite(500, 500, 'block');
    block.setScale(0.1); // Adjust the scale factor as needed
    block.refreshBody(); // Refresh the body to apply the scale

    // Player physics properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Set up collision between player and block
    this.physics.add.collider(player, block);

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
    cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); 
    cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);  // Adding the S key
}

function update() {
    // Reset player velocity (movement)
    player.setVelocityX(0);
    player.setVelocityY(0);  // Ensure vertical velocity is also reset each frame

    // Check for spacebar press
    var spacePressed = this.input.keyboard.checkDown(cursors.space, 250);

    // Horizontal movement
    if ((cursors.left.isDown || cursors.a.isDown) && spacePressed) {
        player.setVelocityX(-600);
        player.setVelocityY(-1000);  // Move left when left arrow and space are pressed
        player.scaleX = -1;         // Mirror the sprite when moving left
        player.body.setOffset(player.width, 0);
    } else if ((cursors.right.isDown || cursors.d.isDown) && spacePressed) {
        player.setVelocityX(600); 
        player.setVelocityY(-1000);  // Move right when right arrow and space are pressed
        player.scaleX = 1;          // Ensure the sprite faces right when moving right
        player.body.setOffset(0, 0);
    } else {
        // Set sprite direction without moving
        if (cursors.left.isDown || cursors.a.isDown) {
            player.scaleX = -1;     // Face left without moving
            player.body.setOffset(player.width, 0);
        } else if (cursors.right.isDown || cursors.d.isDown) {
            player.scaleX = 1;      // Face right without moving
            player.body.setOffset(0, 0);
        }
    }

    // Vertical movement
    if ((cursors.up.isDown || cursors.s.isDown) && spacePressed) {
        player.setVelocityY(-3000); // Move up when up arrow/S and space are pressed together
    }
}
