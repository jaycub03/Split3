var config = 
{
    type: Phaser.AUTO,
    width: 912,
    height: 720,
    backgroundColor: 0x000000,
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 15000 },
            debug: true // Enable debug to visualize collision boundaries
        }
    },

    scene: [MenuScene, PlayScene, GameOverScene],
};

const game = new Phaser.Game(config);
