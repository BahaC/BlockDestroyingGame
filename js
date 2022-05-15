
const cvs = document.getElementById("Block Wreck");
const ctx = cvs.getContext("2d");

const player = {
    x : cvs.width/2 - 100/2,
    y : cvs.height - 15,
    width : 100,
    height : 10,
    color : "WHITE",
    score : 0
}

const ball = {
    x : cvs.width/2,
    y : cvs.height - 150,
    radius : 10,
    speed : 5,
    velocityX : 0,
    velocityY : 5,
    color : "WHITE"
}

function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

const block = {
    x : 0,
    y : 10,
    width : 50,
    height : 10,
    color : "WHITE"
}

function drawBlock(){
    for(let m=0; m<=60; m+=20){
        for(let i = 0; i<=cvs.width; i+=55){
        drawRect(block.x + i, block.y + m, block.width, block.height, block.color)
        }  
    }
}


function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

function render(){

    drawRect(0, 0, cvs.width, cvs.height, "RED");

    drawRect(player.x, player.y, player.width, player.height, player.color);
    
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    
    drawBlock();

}
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height - 150; 
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
    if(collision(ball,player)){
        let collidePoint = ball.y - (player.y + player.height/2); 
        collidePoint = collidePoint/(player.height/2);
        let angleRad = collidePoint * Math.PI/4;
        let direction = (ball.x < cvs.width/2)?1:-1
        ball.velocityX = ball.speed * Math.cos(angleRad) * direction;
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }
    if(cvs.height - (ball.y + ball.radius) < 0){
        resetBall();
        //if the ball touches to the ground
    }
    if(cvs.width - (ball.x + ball.radius) < 0){
        ball.velocityX = - ball.velocityX;
        //if the ball touches to the right side
    }
    if(ball.x - ball.radius < 0){
        ball.velocityX = - ball.velocityX;
        //if the ball touches to the left side
    }
    if(ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
}
cvs.addEventListener("mousemove",movePaddle);

function movePaddle(evt){
    let rect = cvs.getBoundingClientRect();

    player.x = evt.clientX - rect.top - player.width/2;
}

function collision(b,p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right 
    && b.top < p.bottom;
}

function game(){
    update();
    render();
}

const fps = 50;
setInterval(game,1000/fps);
