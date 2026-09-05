const canvas= document.getElementById("canvas");
const context= canvas.getContext("2d");

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

const particleArray=[];
let hue=0;
let radius;

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        
        this.radius=Math.random()*6+2;
        this.speedX= Math.random();
        this.speedY= Math.random()*20;

        this.color=`hsl(${hue}, 100%, 50% )`;
    }

    draw(){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        context.fillStyle=this.color;
        context.fill();
    }

    update(){
    this.x += this.speedX;
    this.y += -1 * this.speedY;
  }
}

    const drawParticles =()=>{
    particleArray.forEach((particle) =>{
    particle.draw();
  })
}

    const updateParticles =()=>{
    hue++;
    particleArray.forEach((particle) => {
    particle.update();
  })
}

    const createParticles =(x,y)=>{
    for(let i= 0; i<20; i++) {
    const particle = new Particle(x, y);
    particleArray.push(particle);
  }
}
   const handleDrawing =(event) => {
   document.getElementById("pointer").style.display = "none";
   a= event.pageX;
   b= event.pageY;
   createParticles(a, b);
}

   const animate =()=>{
   requestAnimationFrame(animate);
   context.fillStyle = "rgba(0, 0, 0, 0.25)";
   context.fillRect(0, 0, canvas.width, canvas.height);
   drawParticles();
   updateParticles();
}
  animate();

  canvas.addEventListener("mousemove",handleDrawing);

  window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})