class Hero extends MovableObject {
    constructor(data) {
        super(data)
        this.init(data)
    }

    init(data) {
        super.init(data)
        this.fires = []
        this.animator = new PlayerAnimations()
        this.animator.createAnimations(this.scene, this.id)
    }

    onComplete () {
        let condition = (this.anims.currentAnim.key == `${this.id}shootUp` || this.anims.currentAnim.key == `${this.id}shootDown` || 
        this.anims.currentAnim.key == `${this.id}shootRight` || this.anims.currentAnim.key == `${this.id}shootLeft`)
        if (condition) {
            this.fire()
        }
    }

    update() {
        this.acceleration = 0
        this.anims.msPerFrame = 20
        this.setVelocity(0, 0)
        var press = []
        press.push(this.scene.cursors.up.isDown)
        press.push(this.scene.cursors.left.isDown)
        press.push(this.scene.cursors.right.isDown)
        press.push(this.scene.cursors.down.isDown)
        press.push(this.scene.cursors.space.isDown)
        if (press.filter(item => item == true).length > 1) {
            this.anims.stop()
            this.movable = false
            return
        }

        if (this.scene.cursors.shift.isDown) {
            this.acceleration = this.velocity
            this.anims.msPerFrame = 10
        }

        if (this.scene.cursors.up.isDown) {
            this.move(`${this.id}walkUp`, 'up')
            this.setVelocityY(-(this.velocity + this.acceleration))
        }
        else if (this.scene.cursors.down.isDown) {
            this.move(`${this.id}walkDown`, 'down')
            this.setVelocityY(this.velocity + this.acceleration)
        }
        else if (this.scene.cursors.left.isDown) {
            this.move(`${this.id}walkLeft`, 'left')
            this.setVelocityX(-(this.velocity + this.acceleration))
        }
        else if (this.scene.cursors.right.isDown) {
            this.move(`${this.id}walkRight`, 'right')
            this.setVelocityX(this.velocity + this.acceleration)
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'up') {
            this.anims.msPerFrame = 40
            this.move(`${this.id}shootUp`, 'up')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'down') {
            this.anims.msPerFrame = 40
            this.move(`${this.id}shootDown`, 'down')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'left') {
            this.anims.msPerFrame = 40
            this.move(`${this.id}shootLeft`, 'left')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'right') {
            this.anims.msPerFrame = 40
            this.move(`${this.id}shootRight`, 'right')
        }
        else {
            this.stop()
        }
    }

    fire() {
        this.fires.push(new Fire(this))
    }
}