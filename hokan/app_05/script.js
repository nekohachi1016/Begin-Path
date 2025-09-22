const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      "rgba(0, 255, 255, 0.3)"
    ));
  }
}

function drawClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
  
  // 色を秒によって変化
  const hue = (now.getSeconds() * 6) % 360;
  const neonColor = `hsl(${hue}, 100%, 60%)`;

  ctx.shadowBlur = 20;
  ctx.shadowColor = neonColor;
  ctx.font = `${Math.floor(canvas.width / 8)}px Arial Black`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = neonColor;
  ctx.fillText(timeStr, canvas.width / 2, canvas.height / 2);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // パーティクル描画
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // 時計描画
  drawClock();

  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});