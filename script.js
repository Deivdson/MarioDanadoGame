const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 400
    },
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let enemies;
let victoryArea;
let cursors;
let leftButton, rightButton, jumpButton;

function preload() {
    this.load.image('jelani', 'assets/jelani.png');
    this.load.image('enemy', 'assets/enemy.gif');
    this.load.image('xuxu', 'assets/xuxu.png');

    const graphics = this.make.graphics({ fillStyle: { color: 0x2c6b2c } });
    graphics.fillRect(0, 0, 1, 1);
    graphics.generateTexture('ground', 1, 1);

    const victoryGraphics = this.make.graphics({ fillStyle: { color: 0xffd700 } });
    victoryGraphics.fillRect(0, 0, 1, 1);
    victoryGraphics.generateTexture('victory', 1, 1);
}

function create() {
    // Set world bounds
    this.physics.world.setBounds(0, 0, 800, 400);

    // Platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 380, 'ground').setScale(800, 20).refreshBody();
    platforms.create(150, 250, 'ground').setScale(100, 20).refreshBody();
    platforms.create(500, 200, 'ground').setScale(150, 20).refreshBody();
    platforms.create(750, 150, 'ground').setScale(100, 20).refreshBody();

    // Player
    player = this.physics.add.sprite(100, 200, 'jelani');
    player.setScale(0.1); // Imagem original é 484x515, reduzindo para ~48x51 pixels
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.originalScale = 0.1;
    player.crouchScale = 0.06;
    player.isCrouching = false;
    this.physics.add.collider(player, platforms);

    // Enemies (usando enemy.gif)
    enemies = this.physics.add.group();
    const enemy1 = enemies.create(400, 150, 'enemy');
    enemy1.setScale(0.15); // Reduzido para 15% do tamanho original
    enemy1.setBounce(1);
    enemy1.setCollideWorldBounds(true);
    enemy1.setVelocityX(-100);
    this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(player, enemies, () => {
        alert('Game Over!');
        this.scene.restart();
    }, null, this);

    // Adicionar xuxu (recuperação de vida)
    const xuxus = this.physics.add.group();
    
    const xuxu1 = xuxus.create(300, 210, 'xuxu');
    xuxu1.setScale(0.05);
    xuxu1.body.allowGravity = false;
    xuxu1.body.immovable = true;
    
    const xuxu2 = xuxus.create(650, 160, 'xuxu');
    xuxu2.setScale(0.05);
    xuxu2.body.allowGravity = false;
    xuxu2.body.immovable = true;

    // Colisão para coletar xuxu e recuperar vida
    this.physics.add.overlap(player, xuxus, (player, xuxu) => {
        xuxu.destroy();
        alert('Você ganhou +1 vida!');
    }, null, this);

    // Victory Area
    victoryArea = this.physics.add.staticImage(750, 100, 'victory').setScale(50, 50).refreshBody();
    this.physics.add.overlap(player, victoryArea, () => {
        alert('You Win!');
        this.scene.restart();
    }, null, this);

    // Camera
    this.cameras.main.setBounds(0, 0, 800, 400);
    this.cameras.main.startFollow(player);

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    if (!this.sys.game.device.os.desktop) {
        leftButton = this.add.text(50, 350, 'LEFT', { fontSize: '32px', fill: '#fff' }).setInteractive().setScrollFactor(0);
        rightButton = this.add.text(200, 350, 'RIGHT', { fontSize: '32px', fill: '#fff' }).setInteractive().setScrollFactor(0);
        jumpButton = this.add.text(700, 350, 'JUMP', { fontSize: '32px', fill: '#fff' }).setInteractive().setScrollFactor(0);

        leftButton.on('pointerdown', () => { cursors.left.isDown = true; });
        leftButton.on('pointerup', () => { cursors.left.isDown = false; });
        rightButton.on('pointerdown', () => { cursors.right.isDown = true; });
        rightButton.on('pointerup', () => { cursors.right.isDown = false; });
        jumpButton.on('pointerdown', () => { cursors.up.isDown = true; });
        jumpButton.on('pointerup', () => { cursors.up.isDown = false; });
    }
}

function update() {
    console.log(`Left: ${cursors.left.isDown}, Right: ${cursors.right.isDown}, Up: ${cursors.up.isDown}, Down: ${cursors.down.isDown}`);

    // Controle de agachamento
    if (cursors.down.isDown && player.body.touching.down) {
        if (!player.isCrouching) {
            player.scaleY = player.crouchScale;
            player.isCrouching = true;
        }
        player.setVelocityX(0);
    } else {
        if (player.isCrouching) {
            player.scaleY = player.originalScale;
            player.isCrouching = false;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.setFlipX(true); // Inverte para a esquerda
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.setFlipX(false); // Direção normal (direita)
        } else {
            player.setVelocityX(0);
        }
    }

    if (cursors.up.isDown && player.body.touching.down && !player.isCrouching) {
        player.setVelocityY(-330);
    }
}
