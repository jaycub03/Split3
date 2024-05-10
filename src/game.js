var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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
    this.load.image('player', '../Assets/player.jpg');

    
}

function create () {
    // Create the player sprite
    player = this.physics.add.sprite(400, 300, 'player');

    // Player physics properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
}

function update () {
    // Reset player velocity (movement)
    player.setVelocityX(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }

    // Vertical movement (jump)
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
