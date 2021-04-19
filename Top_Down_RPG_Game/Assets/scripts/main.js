let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 1280,
    parent: 'game',
    scene: StartScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}


let game = new Phaser.Game(config)


function remove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}