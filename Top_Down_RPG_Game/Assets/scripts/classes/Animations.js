class PlayerAnimations {


    createAnimations(scene, key) {
        this.walkDown = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 78,
            end: 86
        })

        this.walkLeft = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 69,
            end: 77
        })

        this.walkRight = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 87,
            end: 95
        })

        this.walkUp = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 60,
            end: 68
        })

        this.shootUp = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 120,
            end: 132
        })


        this.shootLeft = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 133,
            end: 145
        })

        this.shootDown = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 146,
            end: 158
        })

        this.shootRight = scene.anims.generateFrameNames(key, {
            prefix: `${key}-`,
            start: 159,
            end: 171
        })

        scene.anims.create({
            key: `${key}walkDown`,
            frames: this.walkDown,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}walkUp`,
            frames: this.walkUp,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}walkLeft`,
            frames: this.walkLeft,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}walkRight`,
            frames: this.walkRight,
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}shootUp`,
            frames: this.shootUp,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}shootDown`,
            frames: this.shootDown,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}shootLeft`,
            frames: this.shootLeft,
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: `${key}shootRight`,
            frames: this.shootRight,
            frameRate: 20,
            repeat: -1
        })
    }
 
   
}