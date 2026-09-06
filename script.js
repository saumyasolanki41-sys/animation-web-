const canvas= document.getElementById("canvas");
const context= canvas.getContext("2d");

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");
drawCanvas.width = window.innerWidth;
drawCanvas.height = window.innerHeight;

let lastDrawX= null;
let lastDrawY= null;
let stopDrawTimeout= null;
const STOP_DELAY= 100;

const strokes=[];
const FADE_DURATION= 7000;

const particleArray=[];
let hue=0;
let radius;

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        
        this.radius=Math.random()*6+2;
        this.speedX= Math.random();
        this.speedY= Math.random()*10;

        this.color=`hsl(${hue}, 100%, 50% )`;

        this.life=5;
        this.decay= Math.random()*0.02+0.015;
    }

    draw(){
         context.save();
        context.globalAlpha= Math.max(this.life,0);
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        context.fillStyle=this.color;
        context.fill();
         context.restore()
    }

    update(){
    this.x += this.speedX;
    this.y += -1 * this.speedY;
     this.life -= this.decay;
  }


    isDead(){
    return this.life <= 0;
  }
}  

    const drawParticles =()=>{
    particleArray.forEach((particle) =>{
    particle.draw();
  })
}

    const updateParticles =()=>{
    hue++;
    for(let i= particleArray.length-1; i>=0; i--){
    particleArray[i].update();
    if(particleArray[i].isDead()){
    particleArray.splice(i,1);
  }
}
}

    const createParticles =(x,y)=>{
    for(let i= 0; i<20; i++) {
    const particle = new Particle(x, y);
    particleArray.push(particle);
  }
}
 const drawBrushLine =(x,y)=>{
    if(lastDrawX !== null){
    strokes.push({
    x1: lastDrawX,
    y1: lastDrawY,
    x2: x,
    y2: y,
    color: hue,
    createdAt: performance.now(),
  });
  }
    lastDrawX= x;
    lastDrawY= y;
}


    const renderStrokes =()=>{
    drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);
    const now= performance.now();

    for(let i= strokes.length-1; i>=0; i--){
    const s= strokes[i];
    const age= now - s.createdAt;

    if(age > FADE_DURATION){
    strokes.splice(i,1);
    continue;
  }

    const opacity= 1 - age/FADE_DURATION;

    drawCtx.beginPath();
    drawCtx.moveTo(s.x1, s.y1);
    drawCtx.lineTo(s.x2, s.y2);
    drawCtx.strokeStyle=`hsla(${s.color}, 100%, 60%, ${opacity})`;
    drawCtx.lineWidth= 3;
    drawCtx.lineCap= "round";
    drawCtx.shadowColor=`hsla(${s.color}, 100%, 60%, ${opacity})`;
    drawCtx.shadowBlur= 6;
    drawCtx.stroke();
    drawCtx.shadowBlur= 0;
  }
}

   const handleDrawing =(event) => {
   document.getElementById("pointer").style.display = "none";
   a= event.pageX;
   b= event.pageY;
   createParticles(a, b);
   drawBrushLine(a, b);   

   clearTimeout(stopDrawTimeout);
   stopDrawTimeout= setTimeout(()=>{
   lastDrawX= null;
   lastDrawY= null;
   }, STOP_DELAY);
}


   const animate =()=>{
   requestAnimationFrame(animate);
   context.clearRect(0, 0, canvas.width, canvas.height)
   drawParticles();
   updateParticles();
}
  animate();

  const drawLoop =()=>{
    requestAnimationFrame(drawLoop);
    renderStrokes();
}
  drawLoop();

 
// new: lift the pen when the mouse leaves so lines don't jump across the screen
  canvas.addEventListener("mouseleave",()=>{
  lastDrawX= null;
  lastDrawY= null;
})


  canvas.addEventListener("mousemove",handleDrawing);

  window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 drawCanvas.width = window.innerWidth;
  drawCanvas.height = window.innerHeight;
})