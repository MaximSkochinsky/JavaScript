class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 64, 64, 'man')
        this.scene = scene
        this.movable = false
        this.fires = []
        this.init()
        this.scene.events.on('update', this.update, this)
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.body.collideWorldBounds = true

        this.velocity = 100;
        this.acceleration = 0
        PlayerAnimations.createAnimations(this.scene)
        this.on(Phaser.Animations.Events.ANIMATION_REPEAT, this.onComplete, this)
    }


    onComplete () {
        let condition = (this.anims.currentAnim.key == 'shootUp' || this.anims.currentAnim.key == 'shootDown' || 
        this.anims.currentAnim.key == 'shootRight' || this.anims.currentAnim.key == 'shootLeft')
        if (condition) {
            this.fire()
        }
    }

    getDirection(x, y) {
        if (x - this.currentGoal.x < 0) return 'right' 
        else if (x - this.currentGoal.x > 0) return 'left' 
        else if (y - this.currentGoal.y > 0) return 'up' 
        else if (y - this.currentGoal.y < 0) return 'down'
        else return null
    }

    setDirection(x, y) {
        switch(this.getDirection(x, y)){
            case 'up':
                if (this.anims.currentAnim) {
                    if (this.anims.currentAnim.key != 'walkUp') this.anims.stop()
                }
                this.move('walkUp', 'up')
                this.setVelocityX(0)
                this.setVelocityY(-(this.velocity + this.acceleration))
                break
            case 'down':
                if (this.anims.currentAnim) {
                    if (this.anims.currentAnim.key != 'walkDown') this.anims.stop()
                }
                this.move('walkDown', 'down')
                this.setVelocityX(0)
                this.setVelocityY(this.velocity + this.acceleration)
                break
            case 'left':
                if (this.anims.currentAnim) {
                    if (this.anims.currentAnim.key != 'walkLeft') this.anims.stop()
                }
                this.move('walkLeft', 'left')
                this.setVelocityY(0)
                this.setVelocityX(-(this.velocity + this.acceleration))
                break
            case 'right':
                if (this.anims.currentAnim) {
                    if (this.anims.currentAnim.key != 'walkRight') this.anims.stop()
                }
                this.move('walkRight', 'right')
                this.setVelocityY(0)
                this.setVelocityX(this.velocity + this.acceleration)
                break
            default:
                break;
        }
    }

    update() {
       
        this.setVelocityY(0)
        this.setVelocityX(0)
        this.acceleration = 0

        var press = []
        press.push(this.scene.cursors.up.isDown)
        press.push(this.scene.cursors.left.isDown)
        press.push(this.scene.cursors.right.isDown)
        press.push(this.scene.cursors.down.isDown)

        if (press.filter(item => item == true).length > 1) {
            this.anims.stop()
            this.movable = false
            return
        }

        if (this.scene.cursors.shift.isDown) {
            this.acceleration = this.velocity
            this.anims.msPerFrame = 20
        }

        if (this.scene.cursors.up.isDown) {
            this.move('walkUp', 'up')
            this.setVelocityY(-(this.velocity + this.acceleration))
        }
        else if (this.scene.cursors.down.isDown) {
            this.move('walkDown', 'down')
            this.setVelocityY(this.velocity + this.acceleration)
        }
        else if (this.scene.cursors.left.isDown) {
            this.move('walkLeft', 'left')
            this.setVelocityX(-(this.velocity + this.acceleration))
        }
        else if (this.scene.cursors.right.isDown) {
            this.move('walkRight', 'right')
            this.setVelocityX(this.velocity + this.acceleration)
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'up') {
            this.anims.msPerFrame = 60
            this.move('shootUp', 'up')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'down') {
            this.anims.msPerFrame = 60
            this.move('shootDown', 'down')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'left') {
            this.anims.msPerFrame = 60
            this.move('shootLeft', 'left')
        }
        else if (this.scene.cursors.space.isDown && this.direction == 'right') {
            this.anims.msPerFrame = 60
            this.move('shootRight', 'right')
        }
        else {
            this.anims.stop()
            this.movable = false
        }
    }

    move(anim, direction) {
        if (!this.movable) this.anims.play(anim)
        if (!this.movable) this.movable = true
        this.direction = direction
    }

    fire() {
        this.fires.push(new Fire(this))
    }

}