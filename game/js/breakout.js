var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set the starting point
var x=canvas.width/2;
var y=canvas.height-30;

//radius of ball
var ballRadius=10;

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

//set up bricks
var brickRowCount= 4;
var brickColumnCount= 5;
var brickWidth= 75;
var brickHeight= 20;
var brickPadding= 10;
var brickOffsetTop= 30;
var brickOffsetLeft= 30;

//score count
var score= 0;

//hold bricks
var bricks= [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c]=[];
	for (r=0; r<brickRowCount; r++) {
		bricks[c] [r] = {x: 0, y: 0, status: 1};
	}
}

//sounds
var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');

//draw bricks
	function drawBricks() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
			
		}
	}
}



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
	drawScore();
	drawBricks();
	collisionDetection();
	
	if(rightPressed && paddleX <canvas.width-paddleWidth){
		paddleX +=7;
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
		//check if the ball is hitting the Paddle
		if(x>paddleX && x<paddleX + paddleWidth) {
			dy = -dy;
		}
		else{
			GAMEOVER_SOUND.play();
		alert("GAME OVER");
		document.location.reload();
	}
	}


	
	x+=dx;
	y+=dy;
} //end of draw function

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX-canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX= relativeX - paddleWidth/2;
	}
}

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

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++) {
			var b=bricks[c][r];
			if(b.status==1) {
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight) {
					dy=-dy;
					b.status=0;
					score++;
					SCORE_SOUND.play();
						if(score == brickRowCount*brickColumnCount) {
							WINNING_SOUND.play();
							alert("YOU WIN, CONGRATULATIONS!");
							document.location.reload();
						}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}

setInterval(draw, 10);