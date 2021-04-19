class Boom extends Phaser.GameObjects.Sprite {
    static generate(scene, x, y){
        return new Boom({scene, x, y})
    }
    
    constructor(target) {

        super(target.scene, target.x, target.y, 'boom', 'boom1')
        this.init();


        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom',
            start: 1, 
            end: 4
        })

        this.scene.anims.create({
            key: 'booom',
            frames,
            frameRate: 10,
            repeat: 0
        })

        this.play('booom')

        this.once('animationcomplete', ()  => {
            this.destroy()
            }
            , this);

    }



    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
    }


}