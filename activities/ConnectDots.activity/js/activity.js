const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 5;
const spacing = 70;
const dots = [];
const lines = [];
const boxes = {};

let selectedDot = null;

// create dots
for(let i=0;i<gridSize;i++){
    for(let j=0;j<gridSize;j++){
        dots.push({
            x:50 + i*spacing,
            y:50 + j*spacing
        });
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // draw lines
    ctx.strokeStyle="black";
    ctx.lineWidth=4;
    lines.forEach(l=>{
        ctx.beginPath();
        ctx.moveTo(l.a.x,l.a.y);
        ctx.lineTo(l.b.x,l.b.y);
        ctx.stroke();
    });

    // draw boxes
    for(let key in boxes){
        let b = boxes[key];
        ctx.fillStyle="lightblue";
        ctx.fillRect(b.x,b.y,spacing,spacing);
    }

    // draw dots
    dots.forEach(dot=>{
        ctx.beginPath();
        ctx.arc(dot.x,dot.y,6,0,Math.PI*2);
        ctx.fillStyle="black";
        ctx.fill();
    });
}

canvas.addEventListener("click",(e)=>{
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let clickedDot = null;

    dots.forEach(dot=>{
        const dist = Math.hypot(mx-dot.x,my-dot.y);
        if(dist<10) clickedDot=dot;
    });

    if(!clickedDot) return;

    if(selectedDot==null){
        selectedDot=clickedDot;
    }
    else{

        const dx = Math.abs(selectedDot.x - clickedDot.x);
        const dy = Math.abs(selectedDot.y - clickedDot.y);

        if(dx==spacing && dy==0 || dx==0 && dy==spacing){

            lines.push({a:selectedDot,b:clickedDot});
            checkBoxes();
        }

        selectedDot=null;
    }

    draw();
});

function checkBoxes(){

    for(let i=0;i<gridSize-1;i++){
        for(let j=0;j<gridSize-1;j++){

            const x=50+i*spacing;
            const y=50+j*spacing;

            const top = hasLine(x,y,x+spacing,y);
            const bottom = hasLine(x,y+spacing,x+spacing,y+spacing);
            const left = hasLine(x,y,x,y+spacing);
            const right = hasLine(x+spacing,y,x+spacing,y+spacing);

            if(top && bottom && left && right){
                boxes[i+"-"+j]={x:x,y:y};
            }
        }
    }
}

function hasLine(x1,y1,x2,y2){
    return lines.some(l=>
        (l.a.x==x1 && l.a.y==y1 && l.b.x==x2 && l.b.y==y2) ||
        (l.a.x==x2 && l.a.y==y2 && l.b.x==x1 && l.b.y==y1)
    );
}

draw();
