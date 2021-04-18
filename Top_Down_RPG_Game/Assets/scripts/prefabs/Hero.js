class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 100, 'man')
        this.scene = scene
        this.movable = false
        this.fires = []
        this.init()

        this.currentGoal = {
            x : -1,
            y : -1
        }
        this.path = []
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.body.collideWorldBounds = true

        this.velocity = 200;
        this.acceleration = 0
        PlayerAnimations.createAnimations(this.scene)
        this.on(Phaser.Animations.Events.ANIMATION_REPEAT, this.onComplete, this)
        this.scene.events.on('update', this.update, this)
    }


    onComplete () {
        let condition = (this.anims.currentAnim.key == 'shootUp' || this.anims.currentAnim.key == 'shootDown' || 
        this.anims.currentAnim.key == 'shootRight' || this.anims.currentAnim.key == 'shootLeft')
        if (condition) {
            this.fire()
        }
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
                this.changeAnim('walkUp')
                this.move('walkUp', 'up')
                this.setVelocityX(0)
                this.setVelocityY(-(this.velocity + this.acceleration))
                break
            case 'down':
                this.changeAnim('walkDown')
                this.move('walkDown', 'down')
                this.setVelocityX(0)
                this.setVelocityY(this.velocity + this.acceleration)
                break
            case 'left':
                this.changeAnim('walkLeft')
                this.move('walkLeft', 'left')
                this.setVelocityY(0)
                this.setVelocityX(-(this.velocity + this.acceleration))
                break
            case 'right':
                this.changeAnim('walkRight')
                this.move('walkRight', 'right')
                this.setVelocityY(0)
                this.setVelocityX(this.velocity + this.acceleration)
                break
            default:
                break;
        }
    }

    update() {

    
        this.setVelocity(0, 0)


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
            this.anims.stop()
        }

        // this.acceleration = 0


        // this.setVelocity(0, 0)
        // var press = []
        // press.push(this.scene.cursors.up.isDown)
        // press.push(this.scene.cursors.left.isDown)
        // press.push(this.scene.cursors.right.isDown)
        // press.push(this.scene.cursors.down.isDown)
        // press.push(this.scene.cursors.space.isDown)

        // if (press.filter(item => item == true).length > 1) {
        //     this.anims.stop()
        //     this.movable = false
        //     return
        // }

        // if (this.scene.cursors.shift.isDown) {
        //     this.acceleration = this.velocity
        //     this.anims.msPerFrame = 20
        // }

        // if (this.scene.cursors.up.isDown) {
        //     this.move('walkUp', 'up')
        //     this.setVelocityY(-(this.velocity + this.acceleration))
        // }
        // else if (this.scene.cursors.down.isDown) {
        //     this.move('walkDown', 'down')
        //     this.setVelocityY(this.velocity + this.acceleration)
        // }
        // else if (this.scene.cursors.left.isDown) {
        //     this.move('walkLeft', 'left')
        //     this.setVelocityX(-(this.velocity + this.acceleration))
        // }
        // else if (this.scene.cursors.right.isDown) {
        //     this.move('walkRight', 'right')
        //     this.setVelocityX(this.velocity + this.acceleration)
        // }
        // else if (this.scene.cursors.space.isDown && this.direction == 'up') {
        //     this.anims.msPerFrame = 60
        //     this.move('shootUp', 'up')
        // }
        // else if (this.scene.cursors.space.isDown && this.direction == 'down') {
        //     this.anims.msPerFrame = 60
        //     this.move('shootDown', 'down')
        // }
        // else if (this.scene.cursors.space.isDown && this.direction == 'left') {
        //     this.anims.msPerFrame = 60
        //     this.move('shootLeft', 'left')
        // }
        // else if (this.scene.cursors.space.isDown && this.direction == 'right') {
        //     this.anims.msPerFrame = 60
        //     this.move('shootRight', 'right')
        // }
        // else {
        //     this.stop()
        // }
    }

    move(anim, direction) {
        if (!this.movable) this.anims.play(anim)
        if (!this.movable) this.movable = true
        this.direction = direction
    }

    fire() {
        this.fires.push(new Fire(this))
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