let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    scene: StartScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}


let game = new Phaser.Game(config)


function remove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}