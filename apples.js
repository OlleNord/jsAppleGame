c = document.getElementById("c");
HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;
c.height = HEIGHT;
c.width = WIDTH;
ctx = c.getContext("2d");

window.addEventListener("mousemove", function(e) {
	padx = e.clientX-150;
	Paddle.x = Clamp(padx, 0, WIDTH-Paddle.w)
});

var lifes = 3;
var score = 10;

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
	y: 800,
	w: 300,
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

function Start() {
	setInterval("Update()", 10)
	setInterval("SpawnApples()", 700)
}
function Update() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "20px Georgia";
	ctx.fillText("Lifes: " + lifes, 10, 20);
	ctx.fillText("Score: " + score, 10, 40);
	ctx.fillText("High-Score: " + score, 10, 60);
	for (let i = 0; i < Apples.length; i++) {
		Apples[i].fall();
		Apples[i].draw();
		if (Apples[i].collision()) {
			Apples.splice(i, 1);
			console.log("Collision" + i);
			console.log(Apples);
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
Start();
