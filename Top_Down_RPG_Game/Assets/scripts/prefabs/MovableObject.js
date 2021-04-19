class MovableObject extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        super(data.scene, data.x, data.y, data.texture)
        this.scene = data.scene
        this.movable = false
        this.id = data.texture
    }

    init(data) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.body.collideWorldBounds = true
        this.velocity = data.velocity;
        this.acceleration = 0
        this.scene.events.on('update', this.update, this)
    }


    getDirection(x, y) {
        if (x - this.currentGoal.x < 0) {
            // console.log('right')
            return 'right' 
        }
        else if (x - this.currentGoal.x > 0){
            // console.log('left')
            return 'left'
        }  
        else if (y - this.currentGoal.y > 0) {
            // console.log('up')
            return 'up'
        } 
        else if (y - this.currentGoal.y < 0) {
            // console.log('down')
            return 'down'
        }
    }


    setDirection(x, y) {
        switch(this.getDirection(x, y)){
            case 'up':
                this.changeAnim(`${this.id}walkUp`)
                this.move(`${this.id}walkUp`, 'up')
                this.setVelocityX(0)
                this.setVelocityY(-(this.velocity + this.acceleration))
                break
            case 'down':
                this.changeAnim(`${this.id}walkDown`)
                this.move(`${this.id}walkDown`, 'down')
                this.setVelocityX(0)
                this.setVelocityY(this.velocity + this.acceleration)
                break
            case 'left':
                this.changeAnim(`${this.id}walkLeft`)
                this.move(`${this.id}walkLeft`, 'left')
                this.setVelocityY(0)
                this.setVelocityX(-(this.velocity + this.acceleration))
                break
            case 'right':
                this.changeAnim(`${this.id}walkRight`)
                this.move(`${this.id}walkRight`, 'right')
                this.setVelocityY(0)
                this.setVelocityX(this.velocity + this.acceleration)
                break
            default:
                break;
        }
    }


    move(anim, direction) {
        if (!this.movable) this.anims.play(anim)
        if (!this.movable) this.movable = true
        this.direction = direction
    }

    stop() {
            this.anims.stop()
            this.movable = false
    }

    changeAnim(key) {
       if (this.anims.currentAnim) {
            if (this.anims.currentAnim.key != key) {
                this.stop()
            }
        }
    }

}