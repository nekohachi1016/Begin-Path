const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let width,height;
function resize(){
width=canvas.width=window.innerWidth;
height=canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

class Star{
constructor(x,y){
this.x=x;
this.y=y;
this.vx=(Math.random()-0.5)*0.2;
this.vy=(Math.random()-0.5)*0.2;
this.hue=Math.random()*360;
this.radius=2+Math.random()*1.5;
}
update(stars){
this.hue+=0.2;
if(this.hue>360)this.hue-=360;
for(let other of stars){
if(other===this)continue;
const dx=other.x-this.x;
const dy=other.y-this.y;
const dist=Math.sqrt(dx*dx+dy*dy);
if(dist<150&&dist>1){
const force=0.0005;
this.vx+=dx*force;
this.vy+=dy*force;
}
}
this.x+=this.vx;
this.y+=this.vy;
if(this.x<0||this.x>width)this.vx*=-1;
if(this.y<0||this.y>height)this.vy*=-1;
}
draw(){
ctx.beginPath();
ctx.fillStyle=`hsl(${this.hue},100%,80%)`;
ctx.shadowColor=`hsl(${this.hue},100%,80%)`;
ctx.shadowBlur=10;
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fill();
ctx.shadowBlur=0;
}
}

const stars=[];
canvas.addEventListener("pointerdown",(e)=>{
stars.push(new Star(e.clientX,e.clientY));
});

function drawLines(){
for(let i=0;i<stars.length;i++){
for(let j=i+1;j<stars.length;j++){
const a=stars[i],b=stars[j];
const dx=a.x-b.x,dy=a.y-b.y;
const dist=Math.sqrt(dx*dx+dy*+dy);
if(dist<150){
const opacity=1-dist/150;
ctx.beginPath();
ctx.strokeStyle=`rgba(255,255,255,${opacity})`;
ctx.moveTo(a.x,a.y);
ctx.lineTo(b.x,b.y);
ctx.stroke();
}
}
}
}

function animate(){
ctx.fillStyle="rgba(0,0,0,0.2)";
ctx.fillRect(0,0,width,height);
drawLines();
for(let star of stars){
star.update(stars);
star.draw();
}
requestAnimationFrame(animate);
}


animate();