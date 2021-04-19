class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.countCreated = 0
        this.countMax = 5

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.tick,
            callbackScope: this
        });
        this.texture = ['assasin', 'orc']
    }

    tick() {
        if (this.countCreated < this.countMax) {
            this.createEnemy();
        }
    }

    createEnemy() {
        let enemy = Enemy.generate({
            scene: this.scene,
            x: Math.floor(Math.random() * 1280),
            y: Math.floor(Math.random() * 1280),
            texture: this.texture[Math.floor(Math.random() * 2)],
            velocity: Math.floor(100 + Math.random() * 100)
        });
        this.add(enemy)
        ++this.countCreated;
    }
}