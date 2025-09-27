const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let lines = [];
let spacing = 30;
let speed = 1;

for (let y = 0; y < canvas.height; y += spacing) {
  lines.push(y);
}

function drawGrid() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 横線（奥へ流れる）
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 1;
  lines.forEach((y, i) => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    lines[i] += speed;
    if (lines[i] > canvas.height) {
      lines[i] = 0;
    }
  });

  // 縦線（遠近感）
  const centerX = canvas.width / 2;
  const numVerticalLines = 40;
  for (let i = -numVerticalLines; i <= numVerticalLines; i++) {
    const x = centerX + i * spacing;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(centerX + i * 0.5, canvas.height);
    ctx.stroke();
  }
}

function animate() {
  drawGrid();
  requestAnimationFrame(animate);
}

animate();
