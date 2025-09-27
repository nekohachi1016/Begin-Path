const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 点を描画する関数
function drawRandomPoints(count) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 2, 2);
  }
}

// 背景を黒に
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 毎フレーム少しずつ追加描画
function animate() {
  drawRandomPoints(100);
  requestAnimationFrame(animate);
}
animate();