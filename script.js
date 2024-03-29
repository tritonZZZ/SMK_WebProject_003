var container = document.getElementById("container");
var world = document.getElementById("world");

//variables
var speed = 7;
var forward = 0;
var backward = 0;
var left = 0;
var right = 0;
var dz = 0;
//---------

var map = [
//0-x,1-y,2-z, 3-rotX, 4-rotY, 5-rotZ, 6-height, 7-width, 8-color
	[0,100,0,90,0,0,2000,2000,"url('textures/grass.jpg')"], //0. floor
	[0,0,-1000,0,0,0,200,2000,"url('textures/brick_wall.jpg')"], //front wall
	[0,0,1000,0,0,0,200,2000,"url('textures/brick_wall.jpg')"], //hinder wall
	[-1000,0,0,0,90,0,200,2000,"url('textures/brick_wall.jpg')"], //left wall
	[1000,0,0,0,90,0,200,2000,"url('textures/brick_wall.jpg')"], //left wall
];

document.addEventListener("keydown", (event) => {this.move(event, speed)});
document.addEventListener("keyup", (event) => {this.move(event, 0)});

function move(ev, vel){
	if(ev.keyCode == 87){
		forward = vel;
	}
	if(ev.keyCode == 83){
		backward = vel;
	}
	if(ev.keyCode == 65){
		left = vel;
	}
	if(ev.keyCode == 68){
		right = vel;
	}
}

function player(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

var me = new player(0, 0, 0);

function createWorld(){
	for(let i = 0; i < map.length; i++){
		let myElement = document.createElement("div");
		myElement.id = `element${i}`;
		myElement.style.position = `absolute`;
		myElement.style.height = `${map[i][6]}px`;
		myElement.style.width = `${map[i][7]}px`;
		myElement.style.background = `${map[i][8]}`;
		myElement.style.opacity = 0.8;
		myElement.style.transform = `			
			translate3d(
				${(600 - (map[i][7]/2) + map[i][0])}px, 
				${(400 - (map[i][6]/2) + map[i][1])}px, 
				${map[i][2]}px
			)

			rotateX(${map[i][3]}deg) 
			rotateY(${map[i][4]}deg) 
			rotateZ(${map[i][5]}deg) 
		`;
		world.append(myElement);
	}
}

createWorld();

function update(){
	dz = forward - backward;
	dx = left - right;

	me.z += dz;
	me.x += dx;

 	world.style.transform = `
 		translate3d(${me.x}px, ${me.y}px, ${me.z}px)`;
}

 timer = setInterval(update, 10);