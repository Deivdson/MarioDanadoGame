const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Game variables
let gameRunning = true;

// Asset loading
const playerImage = new Image();
playerImage.src = 'assets/jelani.png';

let assetsLoaded = 0;
const totalAssets = 2;

playerImage.onload = () => {
    assetLoaded();
};
playerImage.onerror = () => {
    console.error("Failed to load player image.");
    // Don\'t start the game if the main character fails to load
};

const enemyImage = new Image();
enemyImage.src = 'assets/enemy.gif';
enemyImage.onload = () => {
    assetLoaded();
};
enemyImage.onerror = () => {
    console.error("Failed to load enemy image.");
};

function assetLoaded() {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
        startGame();
    }
}

// Player class
class Player {
    constructor() {
        this.width = 40;
        this.height = 60;
        this.x = 50;
        this.y = CANVAS_HEIGHT - this.height - 20; // Start above ground
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.5;
        this.jumpStrength = -12; // Increased jump strength
        this.onGround = false;
        this.speed = 4;
    }

    draw() {
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }

    update() {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Apply horizontal movement
        this.x += this.velocityX;

        // Prevent player from going off screen horizontally
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
        
        // Prevent player from going above the screen
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        }
    }

    jump() {
        if (this.onGround) {
            this.velocityY = this.jumpStrength;
            this.onGround = false;
        }
    }

    moveLeft() {
        this.velocityX = -this.speed;
    }

    moveRight() {
        this.velocityX = this.speed;
    }

    stopMoving() {
        this.velocityX = 0;
    }
}

// Platform class
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = '#2c6b2c'; // Darker green
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Enemy class
class Enemy {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 1; // 1 for right, -1 for left
    }

    draw() {
        ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed * this.direction;

        // Reverse direction if hitting canvas edges (simple for now)
        if (this.x <= 0 || this.x + this.width >= CANVAS_WIDTH) {
            this.direction *= -1;
        }
    }
}

let player;
let platforms;
let enemies;

function initializeGameObjects() {
    player = new Player();
    platforms = [
        new Platform(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20), // Ground
        new Platform(150, CANVAS_HEIGHT - 80, 100, 20),
        new Platform(300, CANVAS_HEIGHT - 140, 150, 20),
        new Platform(500, CANVAS_HEIGHT - 80, 100, 20)
    ];
    enemies = [
        new Enemy(250, CANVAS_HEIGHT - 20 - 40, 40, 40, 1), // On ground, adjusted size
        new Enemy(400, CANVAS_HEIGHT - 140 - 40, 40, 40, 1.5) // On platform, adjusted size
    ];
}

// Keyboard input handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true; // Use e.code for layout-independent keys
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function handlePlayerMovement() {
    if (keys['ArrowLeft']) {
        player.moveLeft();
    } else if (keys['ArrowRight']) {
        player.moveRight();
    } else {
        player.stopMoving();
    }

    if (keys['Space']) { // Spacebar for jump
        player.jump();
    }
}

// Collision detection function (AABB)
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    handlePlayerMovement();

    player.update();

    // Platform collision
    player.onGround = false; // Assume not on ground until a collision proves otherwise
    for (const platform of platforms) {
        platform.draw();
        // Check for vertical collision (landing on top of a platform)
        if (player.x + player.width > platform.x && 
            player.x < platform.x + platform.width && 
            player.y + player.height > platform.y && 
            player.y < platform.y && 
            player.velocityY >= 0) {
            
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
        }
    }

    // Enemy update and collision
    for (const enemy of enemies) {
        enemy.update();
        enemy.draw();
        if (checkCollision(player, enemy)) {
            console.log('Game Over!');
            gameRunning = false; // Stop the game
            alert('Game Over! Pressione OK para reiniciar.');
            document.location.reload(); // Simple restart
            return; // Exit loop to prevent further execution
        }
    }

    player.draw();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    console.log("All assets loaded. Starting game.");
    initializeGameObjects();
    gameLoop();
}

