const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// 星データ作成
const stars = Array.from({ length: 200 }).map(() => ({
  x: Math.random() * w,
  y: Math.random() * h,
  radius: Math.random() * 1.5 + 0.5,
  alpha: Math.random(),
  speed: Math.random() * 0.02 + 0.005,
  offset: Math.random() * Math.PI * 2
}));

// 流れ星用
let shootingStars = [];
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: Math.random() * h * 0.5,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 6 + 4,
    life: 0,
    maxLife: 60
  });
}

// 描画ループ
let time = 0;
function draw() {
  ctx.clearRect(0, 0, w, h);
  
  // 背景（ちょっと透明にして残像効果）
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, w, h);

  // 星描画（瞬き）
  stars.forEach(star => {
    star.alpha = 0.5 + 0.5 * Math.sin(time * star.speed + star.offset);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });

  // 流れ星描画
  shootingStars.forEach((s, i) => {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y + s.length);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();

    s.x += s.speed;
    s.y -= s.speed;
    s.life++;

    // 寿命切れ
    if (s.life > s.maxLife) shootingStars.splice(i, 1);
  });

  // ランダムに流れ星生成
  if (Math.random() < 0.01) {
    spawnShootingStar();
  }

  time++;
  requestAnimationFrame(draw);
}

draw();