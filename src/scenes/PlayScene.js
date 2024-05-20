class PlayScene extends Phaser.Scene {
    constructor() {
        super("PlayScene");
        this.player;
        this.cursors;
        this.block;
    }

    preload() {
        // Load the player sprite here
        this.load.image('player', '../Assets/player_right.png');
        // Load the block sprite
        this.load.image('block', '../Assets/block.png');
        this.load.image("tiles", "../Assets/Prison_A5.png");
        this.load.tilemapTiledJSON("map", "../Assets/tilemap.json");
    }

    create() {
        // Create the tilemap and tileset
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("Prison_A5", "tiles");
        const collisionLayer = map.createLayer("layer1", tileset, 0, -5280);

        // Enable collisions for the collision layer
        collisionLayer.setCollisionByProperty({ collides: true });

        // Create the player sprite
        this.player = this.physics.add.sprite(400, 300, 'player');

        // Create the block sprite and scale it down
        this.block = this.physics.add.staticSprite(500, 500, 'block');
        this.block.setScale(0.1); // Adjust the scale factor as needed
        this.block.refreshBody(); // Refresh the body to apply the scale

        // Player physics properties
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Set up collision between player and block
        this.physics.add.collider(this.player, this.block);

        // Set up collision between player and the collision layer
        this.physics.add.collider(this.player, collisionLayer);

        // Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
        this.cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); 
        this.cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);  // Adding the S key
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  // Add space key

        // Camera setup
        this.cameras.main.startFollow(this.player);

        // Adjust camera bounds to include the offset position of the tilemap layer
        this.cameras.main.setBounds(0, -5280, map.widthInPixels, map.heightInPixels + 5280);

        // Set world bounds to include the offset position of the tilemap layer
        this.physics.world.setBounds(0, -5280, map.widthInPixels, map.heightInPixels + 5280);

        // Debugging collision boxes (optional)
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        collisionLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    update() {
        // Reset player velocity (movement)
        this.player.setVelocityX(0);
        
        // Check for spacebar press
        var spacePressed = this.cursors.space.isDown;

        // Horizontal movement
        if ((this.cursors.left.isDown || this.cursors.a.isDown) && spacePressed) {
            this.player.setVelocityX(600);
            this.player.setVelocityY(1000);  // Move left when left arrow and space are pressed
            this.player.scaleX = -1;         // Mirror the sprite when moving left
            this.player.body.setOffset(this.player.width, 0);
        } else if ((this.cursors.right.isDown || this.cursors.d.isDown) && spacePressed) {
            this.player.setVelocityX(-600); 
            this.player.setVelocityY(1000);  // Move right when right arrow and space are pressed
            this.player.scaleX = 1;          // Ensure the sprite faces right when moving right
            this.player.body.setOffset(0, 0);
        } else {
            // Set sprite direction without moving
            if (this.cursors.left.isDown || this.cursors.a.isDown) {
                this.player.scaleX = -1;     // Face left without moving
                this.player.body.setOffset(this.player.width, 0);
            } else if (this.cursors.right.isDown || this.cursors.d.isDown) {
                this.player.scaleX = 1;      // Face right without moving
                this.player.body.setOffset(0, 0);
            }
        }

        // Vertical movement
        if ((this.cursors.up.isDown || this.cursors.s.isDown) && spacePressed) {
            this.player.setVelocityY(-1000); // Move up when up arrow/S and space are pressed together
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300); // Move down when down arrow is pressed
        }
    }
}
