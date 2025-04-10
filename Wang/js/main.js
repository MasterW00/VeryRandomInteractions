var physicsConfig = {
    default: 'arcade',
    arcade: {
        debug: true
    }
}
var config = {
    type: Phaser.AUTO,
    width: 1225,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    backgroundColor: "#5DACD8",
    parent: 'phaser-game',
    physics: physicsConfig,
    scene: [SceneTwo,SceneMain]
};

var game = new Phaser.Game(config);
