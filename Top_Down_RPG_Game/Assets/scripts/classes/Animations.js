class PlayerAnimations {


    static createAnimations(scene) {
        PlayerAnimations.generateFrames(scene)
        PlayerAnimations.generateAnims(scene)
    }
 
    static generateFrames(scene) {

        this.walkDown = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 78,
            end: 86
        })

        this.walkLeft = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 69,
            end: 77
        })

        this.walkRight = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 87,
            end: 95
        })

        this.walkUp = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 60,
            end: 68
        })

        this.shootUp = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 120,
            end: 132
        })


        this.shootLeft = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 133,
            end: 145
        })

        this.shootDown = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 146,
            end: 158
        })

        this.shootRight = scene.anims.generateFrameNames('man', {
            prefix: 'man-',
            start: 159,
            end: 171
        })
    }



    static generateAnims(scene) {
        scene.anims.create({
            key: 'walkDown',
            frames: this.walkDown,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'walkUp',
            frames: this.walkUp,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'walkLeft',
            frames: this.walkLeft,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'walkRight',
            frames: this.walkRight,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'shootUp',
            frames: this.shootUp,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: 'shootDown',
            frames: this.shootDown,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: 'shootLeft',
            frames: this.shootLeft,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: 'shootRight',
            frames: this.shootRight,
            frameRate: 20,
            repeat: -1
        })
        
    }
}