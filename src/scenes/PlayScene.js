class PlayScene extends Phaser.Scene {
    constructor() {
        super("PlayScene");
        this.player;
        this.cursors;
        this.block;
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
        // Adjust the player's hitbox size and offset
        this.player.body.setSize(120, 200); // Set the size (width, height) of the hitbox
        this.player.body.setOffset(25, 10); // Set the offset (x, y) of the hitbox

        // Create the first block sprite and scale it down to have a width of 100
        this.block = this.physics.add.staticSprite(500, 670, 'block');
        this.block.displayWidth = 1000;
        this.block.scaleY = 0.05; // Adjust the scale factor to maintain height
        this.block.refreshBody();
        this.physics.add.collider(this.player, this.block);

        // Create the second block sprite and make it wider than the first block
        this.block2 = this.physics.add.staticSprite(40, 190, 'block');
        this.block2.displayWidth = 400; // Wider than the first block
        this.block2.scaleY = 0.054
        this.block2.refreshBody();
        this.physics.add.collider(this.player, this.block2);


        this.block3 = this.physics.add.staticSprite(690, 610, 'block');
        this.block3.displayWidth = 600; // Wider than the first block
        this.block3.scaleY = 0.2 // Maintain the same height
        this.block3.refreshBody();
        this.physics.add.collider(this.player, this.block3);

        this.block4 = this.physics.add.staticSprite(-105, -100, 'block');
        this.block4.displayWidth = 400; // Wider than the first block
        this.block4.scaleY = 0.054;
        this.block4.refreshBody();
        this.physics.add.collider(this.player, this.block4);



        this.block5 = this.physics.add.staticSprite(590, -340, 'block');
this.block5.displayWidth = 700; // Wider than the first block
this.block5.scaleY = 0.11;
this.block5.refreshBody();
this.physics.add.collider(this.player, this.block5);


this.block6 = this.physics.add.staticSprite(1120, -910, 'block');
this.block6.displayWidth = 700; // Wider than the first block
this.block6.scaleY = 0.109;
this.block6.refreshBody();
this.physics.add.collider(this.player, this.block6);



this.block6 = this.physics.add.staticSprite(130, -910, 'block');
this.block6.displayWidth = 900; // Wider than the first block
this.block6.scaleY = 0.109;
this.block6.refreshBody();
this.physics.add.collider(this.player, this.block6);


this.block7 = this.physics.add.staticSprite(180, -1950, 'block');
this.block7.displayWidth = 900; // Wider than the first block
this.block7.scaleY = 0.09;
this.block7.refreshBody();
this.physics.add.collider(this.player, this.block7);


this.block8 = this.physics.add.staticSprite(970, -1950, 'block');
this.block8.displayWidth = 300; // Wider than the first block
this.block8.scaleY = 0.09;
this.block8.refreshBody();
this.physics.add.collider(this.player, this.block8);


this.block9 = this.physics.add.staticSprite(830, -2540, 'block');
this.block9.displayWidth = 500; // Wider than the first block
this.block9.scaleY = 0.106;
this.block9.refreshBody();
this.physics.add.collider(this.player, this.block9);


this.block10 = this.physics.add.staticSprite(90, -2540, 'block');
this.block10.displayWidth = 500; // Wider than the first block
this.block10.scaleY = 0.106;
this.block10.refreshBody();
this.physics.add.collider(this.player, this.block10);


this.block11 = this.physics.add.staticSprite(830, -2980, 'block');
this.block11.displayWidth = 500; // Wider than the first block
this.block11.scaleY = 0.106;
this.block11.refreshBody();
this.physics.add.collider(this.player, this.block11);

this.block12 = this.physics.add.staticSprite(90, -2980, 'block');
this.block12.displayWidth = 500; // Wider than the first block
this.block12.scaleY = 0.107;
this.block12.refreshBody();
this.physics.add.collider(this.player, this.block12);

this.block13 = this.physics.add.staticSprite(90, -3420, 'block');
this.block13.displayWidth = 500; // Wider than the first block
this.block13.scaleY = 0.107;
this.block13.refreshBody();
this.physics.add.collider(this.player, this.block13);

this.block14 = this.physics.add.staticSprite(830, -3420, 'block');
this.block14.displayWidth = 500; // Wider than the first block
this.block14.scaleY = 0.106;
this.block14.refreshBody();
this.physics.add.collider(this.player, this.block14);


this.block15 = this.physics.add.staticSprite(90, -3850, 'block');
this.block15.displayWidth = 500; // Wider than the first block
this.block15.scaleY = 0.106;
this.block15.refreshBody();
this.physics.add.collider(this.player, this.block15);

this.block16 = this.physics.add.staticSprite(830, -3850, 'block');
this.block16.displayWidth = 500; // Wider than the first block
this.block16.scaleY = 0.106;
this.block16.refreshBody();
this.physics.add.collider(this.player, this.block16);


this.block17 = this.physics.add.staticSprite(740, -4630, 'block');
this.block17.displayWidth = 800; // Wider than the first block
this.block17.scaleY = 0.028;
this.block17.refreshBody();
this.physics.add.collider(this.player, this.block17);

this.block18 = this.physics.add.staticSprite(790, -4680, 'block');
this.block18.displayWidth = 800; // Wider than the first block
this.block18.scaleY = 0.028;
this.block18.refreshBody();
this.physics.add.collider(this.player, this.block18);


this.block19 = this.physics.add.staticSprite(840, -4730, 'block');
this.block19.displayWidth = 800; // Wider than the first block
this.block19.scaleY = 0.028;
this.block19.refreshBody();
this.physics.add.collider(this.player, this.block19);

this.block20 = this.physics.add.staticSprite(890, -4780, 'block');
this.block20.displayWidth = 800; // Wider than the first block
this.block20.scaleY = 0.028;
this.block20.refreshBody();
this.physics.add.collider(this.player, this.block20);

this.block21 = this.physics.add.staticSprite(940, -4830, 'block');
this.block21.displayWidth = 800; // Wider than the first block
this.block21.scaleY = 0.028;
this.block21.refreshBody();
this.physics.add.collider(this.player, this.block21);

this.block22 = this.physics.add.staticSprite(990, -4880, 'block');
this.block22.displayWidth = 800; // Wider than the first block
this.block22.scaleY = 0.028;
this.block22.refreshBody();
this.physics.add.collider(this.player, this.block22);

this.block23 = this.physics.add.staticSprite(1040, -4930, 'block');
this.block23.displayWidth = 800; // Wider than the first block
this.block23.scaleY = 0.028;
this.block23.refreshBody();
this.physics.add.collider(this.player, this.block23);


this.block24 = this.physics.add.staticSprite(600, -4525, 'block');
this.block24.displayWidth = 800; // Wider than the first block
this.block24.scaleY = 0.088;
this.block24.refreshBody();
this.physics.add.collider(this.player, this.block24);


this.block25 = this.physics.add.staticSprite(730, -1380, 'block');
this.block25.displayWidth = 800; // Wider than the first block
this.block25.scaleY = 0.109;
this.block25.refreshBody();
this.physics.add.collider(this.player, this.block25);

this.block26 = this.physics.add.staticSprite(50, -1150, 'block');
this.block26.displayWidth = 200; // Wider than the first block
this.block26.scaleY = 0.209;
this.block26.refreshBody();
this.physics.add.collider(this.player, this.block26);


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

        //add police man sprites
        this.rightPolice = this.add.group();

        let rightPCoords = [
            { x: 200, y: -1150},
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
            { x: 855, y: 280},
            { x: 855, y: -580},
            { x: 855, y: -1150},
            { x: 855, y: -1640},
            { x: 855, y: -2800},
            { x: 855, y: -3225 },
            { x: 855, y: -3650 },
            { x: 855, y: -4075}

        ]

        leftPCoords.forEach(coord => {
            this.leftPolice.create(coord.x, coord.y, 'policeLeft');
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
            this.player.setVelocityY(1000);  // Move left when left arrow and space are presseds
            this.player.setTexture('shootleft'); 

            if (!this.facingLeft) {

                //this.player.setTexture('shootingLeft');
                //this.player.setTexture('player2'); // Change to block sprite
                this.facingLeft = true;
            }
        } else if ((this.cursors.right.isDown || this.cursors.d.isDown) && spacePressed) {
            this.player.setVelocityX(-600);
            this.player.setVelocityY(1000);  // Move right when right arrow and space are pressed
           // this.player.setTexture('shootingRight');
           this.player.setTexture('shootright'); 

            if (this.facingLeft) {
                //this.player.setTexture('player'); // Change back to player sprite
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
            //this.player.setTexture('shootingDown');
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300); // Move down when down arrow is pressed
        }
    }
}