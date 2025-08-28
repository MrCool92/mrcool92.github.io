const canvas = document.getElementById('dots');
const ctx = canvas.getContext('2d');

let dotSpacing = 56;
let dotRadius = 2;
let speed = 0.2;

let offsetX = 0;
let offsetY = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-texture-color');

    const rows = Math.ceil(canvas.height / dotSpacing) + 1;
    const cols = Math.ceil(canvas.width / dotSpacing) + 1;

    for (let row = 0; row < rows; row++) {
        const rowOffset = row % 2 === 0 ? 0 : dotSpacing / 2;
        for (let col = 0; col < cols; col++) {
            const x = (col * dotSpacing + rowOffset + offsetX) % (cols * dotSpacing);
            const y = (row * dotSpacing + offsetY) % (rows * dotSpacing);
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    offsetX += speed;
    offsetY += speed;

    requestAnimationFrame(draw);
}

draw();
