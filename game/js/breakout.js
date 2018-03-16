var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//radius of ball
var ballRadius=10;


//set the starting point
var x=canvas.width/2;
var y=canvas.height-30;

var dx=2;
var dy=-2;

var ballColour = "#0095DD"

//define paddle to hit the ball

var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;

//left or right variables
var rightPressed=false;
var leftPressed=false;

//draw the ball
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle= ballColour;
	ctx.fill();
	ctx.closePath();
}

//draw paddle function 
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle= "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	
	if(rightPressed && paddleX <canvas.width-paddleWidth){
		paddleX +=20;
	}
	else if(leftPressed && paddleX >0) {
		paddleX -=7;
	}
	
	//Bounce
	if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
		dx=-dx;
		ballColour="blue";
		ballRadius=10;
	}

	if(y+dy < ballRadius){
		dy=-dy;
		ballColour = "red";
		ballRadius=10;
	}
	else if(y+dy> canvas.height-ballRadius) {
		alert("GAME OVER");
		document.location.reload();
	}


	
	x+=dx;
	y+=dy;
} //end of draw function

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}


function keyUpHandler(e) {
	if(e.keyCode == 39){
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}
}

setInterval(draw, 10);