let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    cols: 2,
    rows: 2,
    timeout: 30,
    level: 1,   
    cards: [1, 2],
    scene: new GameScene("Game")
}


let game = new Phaser.Game(config);