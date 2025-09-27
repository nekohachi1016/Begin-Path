const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 波紋データ
let ripples = [];

canvas.addEventListener("click", (e) => {
  ripples.push({
    x: e.clientX,
    y: e.clientY,
    radius: 0,
    hue: Math.random() * 360,
    alpha: 1
  });
});

function animate() {
  // 残像を出すためにやや透明な黒で塗り潰し
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, width, height);

  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${r.hue}, 100%, 60%, ${r.alpha})`;
    ctx.lineWidth = 3;
    ctx.stroke();

    r.radius += 2;
    r.alpha -= 0.008;
    r.hue += 1;

    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
