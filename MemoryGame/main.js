let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    cols: 5,
    rows: 2,
    timeout: 3,
    cards: [1, 2, 3, 4, 5],
    scene: new GameScene("Game")
}


let game = new Phaser.Game(config);