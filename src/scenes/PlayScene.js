class PlayScene extends Phaser.Scene {
    constructor() {
        super("PlayScene");
        this.player;
        this.cursors;
        this.block;
        this.bulletsRight;
        this.bulletsLeft;
    }

    preload() {
        // Load the player/police man sprites here
        this.load.image('player', '../Assets/player_right.png');
        this.load.image('player2', '../Assets/player_left.png');
        this.load.image('shootleft', '../Assets/GuyLShoot.png');
        this.load.image('shootright', '../Assets/GuyRShoot.png');
        this.load.image('shootingDown', '../Assets/GuyDShoot.png');
        this.load.image('policeRight', '../Assets/Police.png');
        this.load.image('policeLeft', '../Assets/PoliceL.png');

        this.load.image('bulletright', '../Assets/bulletright.png');
        this.load.image('bulletleft', '../Assets/bulletleft.png');

        // Load the block sprite
        this.load.image('block', '../Assets/block.png');
        this.load.image("tiles", "../Assets/Prison_A5.png");
        this.load.tilemapTiledJSON("map", "../Assets/tilemap.json");

        // Load audio assets
        this.load.audio("gunshot", "../Assets/734059__dthetech__dd-shotgun-2b.wav");
        this.load.audio("loweredGunshot", "../Assets/734059__dthetech__dd-shotgun-2b.wav");
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
        // Adjust the player's hitbox size and offset
        this.player.body.setSize(120, 200); // Set the size (width, height) of the hitbox
        this.player.body.setOffset(25, 10); // Set the offset (x, y) of the hitbox

        // Create block sprites
        this.createBlocks();

        // Player physics properties
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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

        // Add police man sprites
        this.addPolice();

        // Create bullet groups
        this.bulletsRight = this.physics.add.group({
            defaultKey: 'bulletright',
            maxSize: 10,
            allowGravity: false
        });

        this.bulletsLeft = this.physics.add.group({
            defaultKey: 'bulletleft',
            maxSize: 10,
            allowGravity: false
        });

        // Set interval for police shooting bullets
        this.time.addEvent({
            delay: 3000, // Time interval in milliseconds
            callback: this.shootBullet,
            callbackScope: this,
            loop: true
        });

        // Add collision detection between player and bullets
        this.physics.add.collider(this.player, this.bulletsRight, this.handlePlayerHit, null, this);
        this.physics.add.collider(this.player, this.bulletsLeft, this.handlePlayerHit, null, this);

        // Add player gunshot audio
        this.playerGunshot = this.sound.add("loweredGunshot");
        this.playerGunshot.setVolume(0.5);
    }

    update() {
        // Check win condition
        if (this.player.x > 800 && this.player.y < -4990) {
            this.handlePlayerWin();
        }

        // Reset player velocity (movement)
        this.player.setVelocityX(0);
        
        var spacePressed = this.cursors.space.isDown;
    
        // Check if the player is shooting
        if (spacePressed) {
            // Play gunshot audio
            this.playerGunshot.play();

        }


        // Horizontal movement
        if ((this.cursors.left.isDown || this.cursors.a.isDown) && spacePressed) {
            this.player.setVelocityX(600);
            this.player.setVelocityY(1000);  // Move left when left arrow and space are presseds
            this.player.setTexture('shootleft'); 

            if (!this.facingLeft) {
                this.facingLeft = true;
            }
        } else if ((this.cursors.right.isDown || this.cursors.d.isDown) && spacePressed) {
            this.player.setVelocityX(-600);
            this.player.setVelocityY(1000);  // Move right when right arrow and space are pressed
            this.player.setTexture('shootright'); 

            if (this.facingLeft) {
                this.facingLeft = false;
            }
        } else {
            // Set sprite direction without moving
            if (this.cursors.left.isDown || this.cursors.a.isDown) {
                if (!this.facingLeft) {
                    this.player.setTexture('player2'); // Change to block sprite
                    this.facingLeft = true;
                }
            } else if (this.cursors.right.isDown || this.cursors.d.isDown) {
                if (this.facingLeft) {
                    this.player.setTexture('player'); // Change back to player sprite
                    this.facingLeft = false;
                }
            }
        }

        // Vertical movement
        if ((this.cursors.up.isDown || this.cursors.s.isDown) && spacePressed) {
            this.player.setVelocityY(-1000); // Move up when up arrow/S and space are pressed together
            this.player.setTexture('shootingDown'); 
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300); // Move down when down arrow is pressed
        }

        // Update bullets
        this.bulletsRight.children.each((bullet) => {
            if (bullet.active) {
                bullet.update();
            }
        }, this);

        this.bulletsLeft.children.each((bullet) => {
            if (bullet.active) {
                bullet.update();
            }
        }, this);
    }

    createBlocks() {
        const blockData = [
            { x: 500, y: 670, width: 1000, height: 0.05 },
            { x: 40, y: 190, width: 400, height: 0.054 },
            { x: 690, y: 610, width: 600, height: 0.2 },
            { x: -105, y: -100, width: 400, height: 0.054 },
            { x: 590, y: -340, width: 700, height: 0.11 },
            { x: 1120, y: -910, width: 700, height: 0.109 },
            { x: 130, y: -910, width: 900, height: 0.109 },
            { x: 180, y: -1950, width: 900, height: 0.09 },
            { x: 970, y: -1950, width: 300, height: 0.09 },
            { x: 830, y: -2540, width: 500, height: 0.106 },
            { x: 90, y: -2540, width: 500, height: 0.106 },
            { x: 830, y: -2980, width: 500, height: 0.106 },
            { x: 90, y: -2980, width: 500, height: 0.107 },
            { x: 90, y: -3420, width: 500, height: 0.107 },
            { x: 830, y: -3420, width: 500, height: 0.106 },
            { x: 90, y: -3850, width: 500, height: 0.106 },
            { x: 830, y: -3850, width: 500, height: 0.106 },
            { x: 740, y: -4630, width: 800, height: 0.028 },
            { x: 790, y: -4680, width: 800, height: 0.028 },
            { x: 840, y: -4730, width: 800, height: 0.028 },
            { x: 890, y: -4780, width: 800, height: 0.028 },
            { x: 940, y: -4830, width: 800, height: 0.028 },
            { x: 990, y: -4880, width: 800, height: 0.028 },
            { x: 1040, y: -4930, width: 800, height: 0.028 },
            { x: 600, y: -4525, width: 800, height: 0.088 },
            { x: 730, y: -1380, width: 800, height: 0.109 },
            { x: 50, y: -1150, width: 200, height: 0.209 },
        ];

        blockData.forEach(data => {
            const block = this.physics.add.staticSprite(data.x, data.y, 'block');
            block.displayWidth = data.width;
            block.scaleY = data.height;
            block.refreshBody();
            this.physics.add.collider(this.player, block);
        });
    }

    addPolice() {
        this.rightPolice = this.add.group();
        let rightPCoords = [
            { x: 50, y: -2175 },
            { x: 50, y: -2800 },
            { x: 50, y: -3225 },
            { x: 50, y: -3650 }
        ];
        rightPCoords.forEach(coord => {
            this.rightPolice.create(coord.x, coord.y, 'policeRight');
        });

        this.leftPolice = this.add.group();
        let leftPCoords = [
            { x: 855, y: 280 },
            { x: 855, y: -580 },
            { x: 855, y: -1150 },
            { x: 855, y: -1640 },
            { x: 855, y: -2800 },
            { x: 855, y: -3225 },
            { x: 855, y: -3650 },
            { x: 855, y: -4075 }
        ];
        leftPCoords.forEach(coord => {
            this.leftPolice.create(coord.x, coord.y, 'policeLeft');
        });
    }

    shootBullet() {
        const bulletOffsetY = 50; // Offset to make bullets appear lower

        // Play gunshot audio
        this.sound.play('gunshot');

        this.rightPolice.children.iterate((police) => {
            if (police.active) {
                const bullet = this.bulletsRight.get(police.x, police.y + bulletOffsetY);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.body.allowGravity = false;
                    bullet.body.velocity.x = 300;
                    bullet.update = function () {
                        if (this.x > 1000) this.setActive(false).setVisible(false);
                    };
                }
            }
        });

        this.leftPolice.children.iterate((police) => {
            if (police.active) {
                const bullet = this.bulletsLeft.get(police.x, police.y + bulletOffsetY);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.body.allowGravity = false;
                    bullet.body.velocity.x = -300;
                    bullet.update = function () {
                        if (this.x < 0) this.setActive(false).setVisible(false);
                    };
                }
            }
        });
    }

    handlePlayerHit(player, bullet) {
        // Display pop-up message
        alert("You've been shot, try again in another lifetime");

        // Restart the game
        this.scene.restart();
    }

    handlePlayerWin() {
        // Display pop-up message
        alert("Congrats, you won the game");

        // Transition to GameOverScene
        this.scene.start("GameOverScene");
    }
}
