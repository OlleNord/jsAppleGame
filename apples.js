c = document.getElementById("c");
HEIGHT = window.innerHeight-(window.innerHeight/10);
WIDTH = window.innerWidth-(window.innerWidth/10);
c.height = HEIGHT;
c.width = WIDTH;
ctx = c.getContext("2d");

window.addEventListener("mousemove", function(e) {
	padx = e.clientX-(Paddle.w);
	Paddle.x = Clamp(padx, 0, WIDTH-Paddle.w)
});
c.addEventListener("touchstart", function(e) {
	console.log(e.touches);
	console.log(e);
	padx = e.clientX-(Paddle.w);
	Paddle.x = Clamp(padx, 0, WIDTH-Paddle.w);
	ctx.fillText(Paddle.x, 200, 200);
	ctx.fillText(e, 200, 600);
	/* padx = e.clientX-(Paddle.w);
	Paddle.x = Clamp(padx, 0, WIDTH-Paddle.w) */
});

var lifes = 3;
var score = 0;
var highscore = localStorage.getItem("highscore");

function Clamp(varr, n1, n2) {
	if (varr < n1) {
		varr = n1;
	}
	if (varr > n2) {
		varr = n2;
	}
	return varr;
}
var Apples = [];
var Paddle = {
	x: c.width/2-150,
	y: HEIGHT-100,
	w: WIDTH/10,
	h: 40
};
class Apple {
	constructor(x, y, r, vel, name) {
		this.x = x;
		this.y = y-y;
		this.r = r;
		this.vel = vel;
		this.name = name;
	}
	draw() {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fill();
		ctx.fillStyle = "green";
		ctx.beginPath();
		ctx.arc(this.x, this.y-this.r+this.r/3, this.r/3.2, 0, Math.PI*0.8, false);
		ctx.fill();
	}
	fall() {
		this.y += this.vel;
		
	}
	collision() {
		if (Paddle.y-this.r < this.y && this.x+this.r > Paddle.x && this.x-this.r < Paddle.x+Paddle.w) {
			this.y = -100;
			this.vel = 0;
			score++;
			return true;
		} else if (this.y > HEIGHT+this.r) {
			this.y = -100;
			this.vel = 0;
			lifes--;
			return true;	
		}
		
	}
}
var upd = setInterval("Update()", 10)

var spw = setInterval("SpawnApples()", 700)
var gov;
function Update() {
	if (lifes < 1) {
		clearInterval(upd);
		var gov = setInterval("Gameover()", 2000);
	}
	ctx.clearRect(0, 0, c.width, c.height);
	
	ctx.font = "20px Georgia";
	ctx.fillText("Lifes: " + lifes, 10, 20);
	ctx.fillText("Score: " + score, 10, 40);
	ctx.fillText("High-Score: " + highscore, 10, 60);
	for (let i = 0; i < Apples.length; i++) {
		Apples[i].fall();
		Apples[i].draw();
		if (Apples[i].collision()) {
			Apples.splice(i, 1);
		}
	}
	ctx.fillStyle = "black";
	ctx.fillRect(Paddle.x, Paddle.y, Paddle.w, Paddle.h);
}
function SpawnApples() {
	let i = 0;
	i++;
	Apples.push(new Apple(Math.floor(Math.random() * WIDTH), 0, (Math.random()*30)+20, (Math.random()*3)+1, "Apple "+(i+1)));
}
function Gameover() {
	if (score > highscore) {
		highscore = score;
		localStorage.setItem("highscore", highscore);
	}
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "100px Georgia";
	ctx.fillText("Score: " + score, 10, HEIGHT-(HEIGHT/3));
	ctx.fillText("High-Score: " + localStorage.getItem("highscore"), 10, HEIGHT-(HEIGHT/4));
	clearInterval(gov);
}
