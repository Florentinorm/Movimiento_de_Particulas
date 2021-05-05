// variables
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particulaGrandeArray = [];
let hue = 0;

window.addEventListener('rezize', function(){
    canvas.width = window.innerWidth;
    canvas.width = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; 1<10; i++){
        particulaGrandeArray.push(new Particula())
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<5; i++){
        particulaGrandeArray.push(new Particula());
    }
});

function ParticulaGrande(){
    for( let i=0;i<particulaGrandeArray.length;i++){
        particulaGrandeArray[i].Actualizar();
        particulaGrandeArray[i].dibujar();
        for(let j=i; j<particulaGrandeArray.length;j++){
            const dx = particulaGrandeArray[i].x - particulaGrandeArray[i].x;
            const dy = particulaGrandeArray[i].y - particulaGrandeArray[i].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);
            if(distancia < 100){
                ctx.beginPath();
                ctx.strokeStyle = particulaGrandeArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particulaGrandeArray[i].x,particulaGrandeArray[i].y);
                ctx.lineTo(particulaGrandeArray[j].x,particulaGrandeArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particulaGrandeArray[i].size <= 0.3){
            particulaGrandeArray.splice(i,1);
            console.log(particulaGrandeArray.length)
            i--
        }
    }
}

function Animacion(){
    console.log(ctx);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ParticulaGrande();
    hue +=2;
    requestAnimationFrame(Animacion)
}
Animacion();

// objeto o clase
class Particula{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() *15+1;
        this.spedY = Math.random() *3-1.5;
        this.spedX = Math.random() *3-1.5;
        this.color = 'hsl('+hue+ ',100%,50%)';
    }
    Actualizar(){
        this.x += this.spedX;
        this.y += this.spedY;
        if(this.size>0.2)this.size -=0.5;
    }
    dibujar(){
        ctx.filleStyle = this.color;
        ctx.beginPath();
        ctx.fill();
    }
}