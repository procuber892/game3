const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Simple rectangle object for demonstration
let rect = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.5,
    friction: 0.9
};

// Update function to apply physics
function update() {
    // Apply gravity
    rect.velocityY += rect.gravity;
    
    // Apply friction
    rect.velocityX *= rect.friction;
    rect.velocityY *= rect.friction;

    // Update position
    rect.x += rect.velocityX;
    rect.y += rect.velocityY;

    // Collision detection with canvas edges
    if (rect.x + rect.width > canvas.width || rect.x < 0) {
        rect.velocityX = -rect.velocityX * 0.7;
    }
    if (rect.y + rect.height > canvas.height || rect.y < 0) {
        rect.velocityY = -rect.velocityY * 0.7;
    }

    // Keep object within canvas bounds
    rect.x = Math.max(0, Math.min(rect.x, canvas.width - rect.width));
    rect.y = Math.max(0, Math.min(rect.y, canvas.height - rect.height));
}

// Draw function to render the object
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Event listener for mouse interaction
canvas.addEventListener('mousedown', function (event) {
    const rectCenterX = rect.x + rect.width / 2;
    const rectCenterY = rect.y + rect.height / 2;
    const angle = Math.atan2(event.clientY - rectCenterY, event.clientX - rectCenterX);
    const force = 10;

    rect.velocityX = Math.cos(angle) * force;
    rect.velocityY = Math.sin(angle) * force;
});
