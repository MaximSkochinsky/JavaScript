class GameScene extends Phaser.Scene {
    constructor() {
        super('Level');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.score = 0
    }
  
    create() {
        this.createBackground()
        this.player = new Player(this)
        this.enemies = new Enemies(this)
        this.createCompleteEvents()
        this.addOverlap()
        this.createText()
        this.sound.play('theme', {loop: true})
    }

    createCompleteEvents() {
        this.player.once('killed', this.onComplete, this)
        this.events.on('enemies-killed', this.onComplete, this)
    }

    onComplete() {
        this.sound.stopAll()
        this.scene.start('Start', {
            score: this.score,
            completed: this.player.active
        })
    }

    addOverlap() {
        this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this)  
    }

    onOverlap(source, target) {
        if (source != this.player && target != this.player) {
            ++this.score
            this.scoreText.setText(`Score: ${this.score}`)
        }

        if (this.enemies.contains(target) || this.player == target) {
             Boom.generate(this, target.x, target.y)
             this.sound.play('boomSound', {volume: 0.3, rate: 0.5})
        }
        source.setAlive(false)
        target.setAlive(false)
    }

    update() {
        this.player.move()
        this.bg.tilePositionX += 5 
    }

    createText() {
        this.scoreText = this.text = this.add.text(50, 50, "Score: 0", {
            fontFamily: "Impact, fantasy",
            fontSize: '42px',
            color: 'Black',
            align: 'center'
        })
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
    }
    
}