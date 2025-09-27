const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Beam {
  constructor(direction, pos, speed, hueOffset) {
    this.direction = direction; // 'horizontal' or 'vertical'
    this.pos = pos;
    this.offset = Math.random() * 1000;
    this.speed = speed;
    this.hueOffset = hueOffset;
    this.length = 200;
    this.x = direction === "horizontal" ? -this.length : pos;
    this.y = direction === "vertical" ? -this.length : pos;
  }

  update(time) {
    if (this.direction === "horizontal") {
      this.x += this.speed;
      this.y = this.pos + Math.sin(time / 300 + this.offset) * 20;
      if (this.x > width + this.length) this.x = -this.length;
    } else {
      this.y += this.speed;
      this.x = this.pos + Math.sin(time / 300 + this.offset) * 20;
      if (this.y > height + this.length) this.y = -this.length;
    }
  }

  draw() {
    let grad;
    if (this.direction === "horizontal") {
      grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
    } else {
      grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
    }

    for (let i = 0; i <= 1; i += 0.2) {
      let hue = (this.hueOffset + i * 360) % 360;
      grad.addColorStop(i, `hsl(${hue}, 100%, 60%)`);
    }

    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    if (this.direction === "horizontal") {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.length, this.y);
    } else {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
    }
    ctx.stroke();
  }

  getHead() {
    return {
      x: this.direction === "horizontal" ? this.x + this.length : this.x,
      y: this.direction === "horizontal" ? this.y : this.y + this.length
    };
  }
}

const beams = [];

// 横ビーム
for (let i = 0; i < 6; i++) {
  let y = (i + 1) * height / 8;
  beams.push(new Beam("horizontal", y, 2 + Math.random() * 1.5, Math.random() * 360));
}

// 縦ビーム
for (let i = 0; i < 6; i++) {
  let x = (i + 1) * width / 8;
  beams.push(new Beam("vertical", x, 2 + Math.random() * 1.5, Math.random() * 360));
}

let flashPoints = [];

function animate(time) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, width, height);

  // 光を動かす＆描く
  beams.forEach(b => {
    b.update(time);
    b.draw();
  });

  // 交差点を探す（簡易当たり判定）
  for (let i = 0; i < beams.length; i++) {
    for (let j = i + 1; j < beams.length; j++) {
      const a = beams[i], b = beams[j];
      if (a.direction !== b.direction) {
        const ha = a.getHead(), hb = b.getHead();
        const dist = Math.hypot(ha.x - hb.x, ha.y - hb.y);
        if (dist < 10) {
          flashPoints.push({ x: (ha.x + hb.x)/2, y: (ha.y + hb.y)/2, alpha: 1 });
        }
      }
    }
  }

  // フラッシュ描画
  for (let i = flashPoints.length - 1; i >= 0; i--) {
    const p = flashPoints[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.05;
    if (p.alpha <= 0) flashPoints.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
