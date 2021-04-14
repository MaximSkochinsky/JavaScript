class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
    }

    preload() {
        this.load.atlas('man', 'Assets/images/man.png', 'Assets/images/man.json')
        this.load.atlas('arrow', 'Assets/images/arrow.png', 'Assets/images/arrow.json')
        this.load.image("terrain", "Assets/images/terrain_atlas.png")
        this.load.tilemapTiledJSON('map', "Assets/images/map/map.json")
        this.load.audio('shot', "Assets/audio/shot.mp3")
    }

    create() {
        let map = this.add.tilemap('map')
        let terrain = map.addTilesetImage("terrain_atlas", "terrain")

        let botLayer = map.createLayer("bot", [terrain], 0, 0).setDepth(0)
        let topLayer = map.createLayer("top", [terrain], 0, 0).setDepth(1)

        this.player = new Hero(this)
        this.cursors = this.input.keyboard.createCursorKeys()


        this.physics.add.collider(this.player, topLayer)
        topLayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.player, botLayer)
        botLayer.setCollisionByProperty({collides: true})
        botLayer.setCollision([566, 567])

    }

}