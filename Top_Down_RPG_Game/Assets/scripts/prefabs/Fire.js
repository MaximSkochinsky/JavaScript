class Fire extends Phaser.Physics.Arcade.Sprite {
    constructor(source) {
        super(source.scene, source.x, source.y, 'arrow', 'arrow-1')
        this.setScale(0.5, 0.5)
        this.scene = source.scene
        this.velocity = 600
        this.init(source)
        this.scene.events.on('update', this.update, this)
    }


    init(source) {
        this.source = source
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.scene.sound.play('shot')
        switch(source.direction) {
            case 'right':
                this.setVelocityX(this.velocity)
                this.setFrame('arrow-3')
                break
            case 'left':
                this.setVelocityX(-this.velocity)
                this.setFrame('arrow-1')
                break
            case 'up':
                this.setVelocityY(-this.velocity)
                this.x += 5
                this.setFrame('arrow-0')
                break
            case 'down':
                this.setVelocityY(this.velocity)
                this.setFrame('arrow-2')
                break
        }
    }

    update() {
        if (this.x > config.width || this.x < 0) {
            this.destroy()
            this.source.fires = remove(this.source.fires, this)
        }
        if (this.y > config.height || this.y < 0) {
            this.destroy()
            this.source.fires = remove(this.source.fires, this)
        }

    }

    static generate(source) {
        return new Fire(source)
    }
}