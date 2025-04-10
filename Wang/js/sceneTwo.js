var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneTwo" });
        
    },
    init: function() {},
    preload: function() {
        this.load.image("title","assets/wang.png");
        this.load.audio('honk',['assets/honk.mp3'])
        this.i=0
         
    },
    create: function() {
        this.honk=this.sound.add('honk')
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.add.image(620,100,"title").setScale(.75);
        //title text
        this.title = this.add.text(200 ,100 ,'W A N G', { font: '200px Arial Black', fill: '#fff' });
        this.title.setStroke('#abc', 16);
        this.title.setShadow(2, 2, "#333333", 2, true, true);
        //startbutton
        this.start = this.add.text(200,350 , 'start', {font: '100px Arial Black', fill:'#fff'});
        this.start.setStroke('#000', 16);
        this.start.setShadow(0, 0, "#333333", 0, true, true);
        this.start.setTint(0xbeffee,0xaaffb0,0x00ff00,0xaaffba);
        this.start.setInteractive();
        this.start.on('pointerover', () => { this.start.setStroke('#555', 20); this.honk.play()});
        this.start.on('pointerout', () => { this.start.setStroke('#000', 16)});
        this.start.on('pointerdown', () => {this.scene.start('SceneMain')});
        const set = this.add.text(700, 350 , 'useless', {font: '100px Arial Black', fill:'#fff'});
    },
    update: function() {
        
        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.title.setTint(top, top, bottom, bottom);

        this.i ++;

        if (this.i === 360)
        {
            this.i = 0;
        }
    }
});