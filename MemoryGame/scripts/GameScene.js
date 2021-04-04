class GameScene extends Phaser.Scene {
    constructor (id) {
        super (id)
    }

    preload () {
        this.load.image('bg', '/assets/images/background.png')  
        this.load.image('card', '/assets/images/card.png')  
        this.load.image('card1', '/assets/images/card1.png')  
        this.load.image('card2', '/assets/images/card2.png')  
        this.load.image('card3', '/assets/images/card3.png')  
        this.load.image('card4', '/assets/images/card4.png')  
        this.load.image('card5', '/assets/images/card5.png')  


        this.load.audio('card', '/assets/sounds/card.mp3')
        this.load.audio('complete', '/assets/sounds/complete.mp3')
        this.load.audio('success', '/assets/sounds/success.mp3')
        this.load.audio('theme', '/assets/sounds/theme.mp3')
        this.load.audio('timeout', '/assets/sounds/timeout.mp3')
    }

    createText() {
        this.timeoutText = this.add.text(10, 330, "Time:" , {
            font: '36px Arial',
            fill: '#ffffff'
        })
    }
    
    
    onTimerTick () {
        
        this.timeoutText.setText("Time: " + this.timeout);
        
        if (this.timeout <= 0) {
            this.timer.paused = true;
            this.sounds.timeout.play()
            config.level = 1
            this.restart()
        } else {
            console.log('here')
            --this.timeout;
        }
    }


    createTimer() {
        this.time.removeAllEvents()
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
    }

    createSounds() {
        this.sounds = {
            card: this.sound.add('card', {volume: 1}),
            complete: this.sound.add('complete', {volume: 1}),
            success: this.sound.add('success', {volume: 1}),
            theme: this.sound.add('theme', {volume: 0.1}),
            timeout: this.sound.add('timeout', {volume: 1}),
        };
       this.sounds.theme.play()
    }


    createLevel () {
        switch(config.level){
            case 1:
                config.timeout = 30
                config.rows = 2
                config.cols = 2
                config.cards = [1, 2]
                break
            case 2:
                config.timeout = 20
                config.rows = 2
                config.cols = 3
                config.cards = [1, 2, 3]
                break
            case 3:
                config.timeout = 25
                config.rows = 2
                config.cols = 4
                config.cards = [1, 2, 3, 4]
                break
            case 4:
                config.timeout = 30
                config.rows = 2
                config.cols = 5
                config.cards = [1, 2, 3, 4, 5]
                break
            case 5:
                config.timeout = 25
                config.rows = 2
                config.cols = 5
                config.cards = [1, 2, 3, 4, 5]
                break
            case 6:
                config.timeout = 20
                config.rows = 2
                config.cols = 5
                config.cards = [1, 2, 3, 4, 5]
                break
        }
    }

    create () {
        this.createLevel()
        this.timeout = config.timeout;
        this.createTimer();
        this.createSounds();
        this.createBackground();
        this.createText();
        this.createCards();
        this.start()
    }
    
   

    restart () {
        console.log("restart")
        let count = 0;
        let onCardMoveComplete = () => {
            ++count;
            if (count >= this.cards.length) {
                this.create()
            }
        };

        
        this.cards.forEach(card => {
            card.move({
                x: this.sys.game.config.width + card.width,
                y: this.sys.game.config.height + card.height,
                delay: card.position.delay,
                callback: onCardMoveComplete
            });
        });

        
    }

    start () {

        this.timeout = config.timeout;
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.timer.paused = false;
        this.initCards();
        this.showCards()
    }

    initCards () {
        let positions = this.getCardPositions();
        this.cards.forEach(card => {
            card.init(positions.pop())
        });
    }

    showCards() {
        this.cards.forEach(card => {
            card.depth = card.position.delay;
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay
            })
        });
    }

    createBackground () {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    createCards () {
        this.cards = [];
        let positions = this.getCardPositions();
        Phaser.Utils.Array.Shuffle(positions);
        

        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value, positions.pop()));
            }
        }
       
        this.input.on("gameobjectdown", this.onCardClicked, this);
    }

    onCardClicked(pointer, card) {
        if (card.opened) return;


        if (this.openedCard) {
            if (this.openedCard.value == card.value) {
                this.openedCard = null;
                this.openedCardsCount++;
                if (this.openedCardsCount != this.cards.length / 2) this.sounds.complete.play()
            }
            else {
                this.sounds.card.play()
                this.openedCard.close();
                this.openedCard = card;
            }
        }
        else {
            this.sounds.card.play()
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardsCount == this.cards.length / 2) {
            this.sounds.success.play()
            config.level++
            if (config.level > 6) config.level = 1
            this.restart()
        }
    }


    getCardPositions = function () {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        
    
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + cardWidth / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + cardHeight / 2;
    

        let id = 0;   
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                    delay: ++id * 100
                });
            }
        }
    
        return  Phaser.Utils.Array.Shuffle(positions);;
    }



}




