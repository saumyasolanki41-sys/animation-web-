const canvas= document.getElementById("canvas");
const context= canvas.getcontext("2d");

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

const particles=[];
let hue=0;

class particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.radius=Math.random()*6+2;
        this.color=`hsl(${hue}, 100%, 50% )`;
    }

    draw(){
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );
        context.fillStyle=this.color;
        context.fill();
    }
}