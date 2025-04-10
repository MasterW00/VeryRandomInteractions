
var SceneMain = new Phaser.Class ({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneMain" });
    },
    init: function() {},

    preload: function() {
        this.load.audio('honk',['assets/honk.mp3'])
        this.load.image("bullet", "assets/bullet.png");
        this.load.image('map', 'assets/map.png')
        this.load.spritesheet('dude','assets/wang.png',{frameWidth: 200,frameHeight: 170});
    },
    create: function() {
        //bullet parent group
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20,
        });
        //fire bullets
        this.input.keyboard.on('keydown-SPACE', this.shoot, this);
        //insig
        this.input.mouse.disableContextMenu();
        //backround
        this.add.image(1200,1200,'map').setScale(1.1)
        //bullets
        var activeBullets = this.bullets;
        //limits
        xLimit = 2400; //the player cannot go beyond these x and
        yLimit = 1800; //y positions 
        // The player and its settings
        player = this.physics.add.sprite(1200, 900, 'dude').setScale(.5).refreshBody();
        player.body.setSize(150,150);
        
        player2 = this.physics.add.sprite(1200, 800, 'dude').setScale(.5).refreshBody();
        player2.setTint(0xff0b89)
        player2.body.setSize(150,150);
        this.physics.add.collider(player,player2)

        //camera
        this.cameras.main.setBounds(-2400, -1800, 100000, 100000);
        //aim
        const vec = this.physics.velocityFromAngle(player.angle, 50)
        //sounds
        this.honk=this.sound.add('honk')

        //animations
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'sprint',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'rest',
            frames: [{ key: 'dude', frame:4 }],
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 6 }),
            frameRate: 10,
        });
    },
    shoot:function() {
        player.anims.play('shoot',true)
        this.honk.play()
        var bullet = this.bullets.get(player.x,player.y)
        // vector as direction only by setting the speed param to 1
        const vec = this.physics.velocityFromAngle(player.angle, 1)

        // manually set a 50px magnitude change in x and y (dx, dy)
        const dx = vec.x * 50
        const dy = vec.y * 50

        // bullet velocity using a magnitude of 300
        const vx = vec.x * 1000
        const vy = vec.y * 1000
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = vx;
            bullet.body.velocity.y= vy;
        }
    },
    update: function() {
         //player animations
    A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    Dn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    lf = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    Rt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    Sh = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    Sp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(!player2.x ==2400 || !player2.x==0)
    {player2.setVelocityX(0);}
    if(!player2.x ==2400 || !player2.x==0)
    {player2.setVelocityY(0);}
    if (A.isDown && Sh.isDown && player.x >= 0)
    {
       player.setVelocityX(-250);
       if (!Sp.isDown)
       player.anims.play('sprint', true);
    }
    else if (D.isDown && Sh.isDown && player.x <= 2400)
    {
       player.setVelocityX(250);
       if (!Sp.isDown)
       player.anims.play('sprint', true);
    }
    else if (A.isDown && player.x >= 0)
    {
       player.setVelocityX(-90);
       if (!Sp.isDown)
       player.anims.play('walk', true);
    }
    else if (D.isDown && player.x <= 2400)
    {
        player.setVelocityX(90);
        if (!Sp.isDown)
        player.anims.play('walk', true);
    }
    else{
        player.setVelocityX(0);
    }
    if (W.isDown && Sh.isDown && player.y >= 0)
    {
       player.setVelocityY(-250);
       if (!Sp.isDown)
       player.anims.play('sprint', true);
    }
    else if (S.isDown && Sh.isDown && player.y <= 2400)
    {
       player.setVelocityY(250);
       if (!Sp.isDown)
       player.anims.play('sprint', true);
    }

    else if(W.isDown && player.y >= 0)
    {  
        player.setVelocityY(-90);
        if (!Sp.isDown)
        player.anims.play('walk', true);
    }
    else if(S.isDown && player.y <= 2400)
    {
        player.setVelocityY(90);
        if (!Sp.isDown)
        player.anims.play('walk', true);
    }
    else
    {
        player.setVelocityY(0);

    }
    if(player.body.velocity.x == 0 && player.body.velocity.y == 0 && !Sp.isDown)
    {
        player.anims.play('rest', true);
    }
    
    if(D.isDown)
    {
        player.angle = 0
    }
    if(A.isDown)
        {
            player.angle =+ 180
        }
    if(W.isDown)
    {
        player.angle =- 90
        if(D.isDown)
        {
            player.angle =- 45
        }
        if (A.isDown)
        {
            player.angle =- 135
        }
    }

    if (S.isDown)
    {
        player.angle =+ 90
        if(D.isDown)
        {
        player.angle =+ 45
        }
        if(A.isDown)
        {
            player.angle =+ 135
        }
    }
    this.cameras.main.centerOn(player.x, player.y);

        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < -5 || b.x < -5 || b.y > 2400 || b.x >2400 || hit==true) {
                    b.setActive(false);
                }
            }
        }.bind(this));
        hit = false
   
    }
});