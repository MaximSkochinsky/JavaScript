class Enemy extends MovableObject {
    constructor(data) {
        super(data)
        this.init(data)
        this.currentGoal = {
            x : -100,
            y : -100
        }
        this.path = []
    }

    init(data) {
        super.init(data)
        this.animator = new PlayerAnimations()
        this.animator.createAnimations(this.scene, data.texture)
    }


    static generate(data) {
        return new Enemy(data)
    }

    update() {

        if (Math.abs(this.scene.player.x - this.x) < 64  && Math.abs(this.scene.player.y - this.y < 64)) {
            this.path = []
        }
        
        if (this.path.length > 0) {
            let x = Math.floor(this.x / 64)
            let y = Math.floor(this.y / 64)

            if (this.path[0][0] == x && this.path[0][1] == y) {
                this.path.shift()
            }
            else {
                this.currentGoal.x = this.path[0][0]
                this.currentGoal.y = this.path[0][1]
                this.setDirection(x, y)
            }
        }
        else if (this.path.length == 0) {
            this.setVelocity(0, 0)
            this.anims.stop()
        }

    }

}