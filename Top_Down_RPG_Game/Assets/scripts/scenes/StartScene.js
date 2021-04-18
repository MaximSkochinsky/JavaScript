class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
        this.path = []
        this.coordX = 0
        this.coordY = 0
    }

    preload() {
        this.load.atlas('man', 'Assets/images/man.png', 'Assets/images/man.json')
        this.load.atlas('arrow', 'Assets/images/arrow.png', 'Assets/images/arrow.json')
        this.load.image("terrain", "Assets/images/terrain_atlas.png")
        this.load.tilemapTiledJSON('map', "Assets/images/map/map.json")
        this.load.audio('shot', "Assets/audio/shot.mp3")
        this.load.audio('witcher', "Assets/Witcher_Best/Spikeroog.mp3")
    }


    getTileID(x, y) {
        var tile = this.map.getTileAt(x, y);
        return tile.index;
    }


    handle(pointer) {
        this.gridBackup = this.grid.clone()
        let x1 = Math.floor(this.player.x / 64)
        let y1 = Math.floor(this.player.y / 64)

        let x2 = Math.floor(pointer.x / 64)
        let y2 = Math.floor(pointer.y / 64)


        this.path = this.finder.findPath(x1, y1, x2, y2, this.gridBackup)
        this.moveCharacter(this.path)
    }


    create() {

        this.input.on('pointerup', this.handle, this)
        this.sound.play('witcher')

        this.map = this.add.tilemap('map')
        let terrain = this.map.addTilesetImage("terrain_atlas", "terrain")

        let botLayer = this.map.createLayer("bot", [terrain], 0, 0)


        var grid = [];
        for(var y = 0; y < this.map.height; y++){
            var col = [];
            for(var x = 0; x < this.map.width; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x, y, this.map));
            }
            grid.push(col);
        }
        

        let topLayer = this.map.createLayer("top", [terrain], 0, 0).setDepth(1)

        this.player = new Hero(this)
        this.cursors = this.input.keyboard.createCursorKeys()



       



        var tileset = this.map.tilesets[0];
        var properties = tileset.tileProperties;
        var acceptableTiles = [];

    for(var i = tileset.firstgid-1; i < tileset.total; i++){ // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
        if(!properties.hasOwnProperty(i)) {
            // If there is no property indicated at all, it means it's a walkable tile
            acceptableTiles.push(i+1);
            continue;
        }
        if(!properties[i].collides) acceptableTiles.push(i+1);
    }
    



    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (acceptableTiles.indexOf(grid[i][j]) == -1) {
                grid[i][j] = 1
            }
            else {
                grid[i][j] = 0
            }
        }
    }




    
    for (let i = 0; i < this.map.layers[1].data.length; i++) {
        for (let j = 0; j <this.map.layers[1].data[0].length; j++) {
            let data = this.map.layers[1].data[i][j]
            if (data.index != -1) {
                if (acceptableTiles.indexOf(data.index) == -1) {
                    grid[i][j] = 1
                }
            }
        }
    }

    this.grid = grid


    this.grid = new PF.Grid(grid.length, grid[0].length, grid);

    this.finder = new PF.AStarFinder();
       
}

    



moveCharacter(path){
     this.player.path = path
};


    
}