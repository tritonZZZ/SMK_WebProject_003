var container = document.getElementById("container");
var world = document.getElementById("world");

//variables
var speed = 7;
var forward = 0;
var dz = 0;
//---------

var map = [
//0-x,1-y,2-z, 3-rotX, 4-rotY, 5-rotZ, 6-height, 7-width, 8-color
	[0,0,0,0,0,0,200,200,"orange"], //0. front wall
	[0,0,-200,0,0,0,200,200,"green"], //1. hinder wall
	[100,0,100,0,90,0,200,200,"blue"], //2.
	[100,0,-100,0,90,0,200,200,"violet"],
	[0,-100,-100,90,0,0,200,200,"brown"], //3.
	[0,-100,100,90,0,0,200,200,"cyan"],
];

document.addEventListener("keydown", (event) => {this.move(event, speed)});
document.addEventListener("keyup", (event) => {this.move(event, 0)});

function move(ev, vel){
	if(ev.keyCode == 87){
		forward = vel;
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
		myElement.style.transform = `rotateX(${map[i][3]}deg) rotateY(${map[i][4]}deg) rotateZ(${map[i][5]}deg) translate3d(${map[i][0]}px,${map[i][1]}px,${map[i][2]}px)`;
		world.append(myElement);
	}
}

createWorld();

function update(){
	dz = forward;

	me.z += dz;

 	world.style.transform = `
 		rotateY(${0}deg)
 		translate3d(500px, 300px, ${me.z}px)`;
}

 timer = setInterval(update, 10);