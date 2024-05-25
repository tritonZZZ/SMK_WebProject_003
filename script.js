var container = document.getElementById("container");
var world = document.getElementById("world");
var menu = document.getElementById("menu");
var rules = document.getElementById("rules");

// Variables
var deg = Math.PI / 180; // 1 degree in radians because SIN and COS require angles in RADIANS!
var speed = 7;
var forward = 0;
var backward = 0;
var left = 0;
var right = 0;
var mouseX = mouseY = 0;
var dz = 0;
var lock = false;
var canlock = true;
var gamePaused = false;
// ---------

var map = [
	//0-x, 1-y, 2-z, 3-rotX, 4-rotY, 5-rotZ, 6-height, 7-width, 8-color
	[0, 100, 0, 90, 0, 0, 2000, 2000, "url('textures/metal_floor.jpg')"], // floor
	[0, -100, 0, 90, 0, 0, 2000, 2000, "url('textures/doom_cieling.png')"], // ceiling
	[0, 0, -100, 0, 0, 0, 200, 200, "url('textures/enemy2.png')"], // sign
	[0, 0, -1000, 0, 0, 0, 200, 2000, "url('textures/doom_wall.jpg')"], // front wall
	[0, 0, 1000, 0, 0, 0, 200, 2000, "url('textures/doom_wall.jpg')"], // hind wall
	[-1000, 0, 0, 0, 90, 0, 200, 2000, "url('textures/doom_wall.jpg')"], // left wall
	[1000, 0, 0, 0, 90, 0, 200, 2000, "url('textures/doom_wall.jpg')"], // right wall
];

document.addEventListener("mousedown", (event) => { if (!gamePaused) move(event, speed) });
document.addEventListener("keydown", (event) => { 
	if (event.key.toLowerCase() === "m") {
		activateMenu();
	} else {
		if (!gamePaused) move(event, speed);
	}
});
document.addEventListener("keyup", (event) => { if (!gamePaused) move(event, 0) });
document.addEventListener("mousemove", (event) => {
	if (!gamePaused) {
		mouseX = event.movementX;
		mouseY = event.movementY;
	}
});
document.addEventListener("pointerlockchange", (event) => {
	lock = !lock;
});
container.onclick = function() {
	if (!lock && canlock) {
		container.requestPointerLock();	
	}
}

function move(ev, vel) {
	if (ev.keyCode == 87) {
		forward = vel;
	}
	if (ev.keyCode == 83) {
		backward = vel;
	}
	if (ev.keyCode == 65) {
		left = vel;
	}
	if (ev.keyCode == 68) {
		right = vel;
	}
}

function player(x, y, z, rx, ry, rz) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;
}

var me = new player(0, 0, 0, 0, 0, 0);

function createWorld() {
	for (let i = 0; i < map.length; i++) {
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

function update() {
	if (!gamePaused) {
		// cos A   -sin A    x    x cos A - z sin A        
		//               *   =     
		// sin A    cos A    z    x sin A + z cos A
		let xxx = right - left;
		let zzz = forward - backward
		let dx =  xxx * Math.cos(me.ry * deg) - zzz * Math.sin(me.ry * deg);
		let dz =  -zzz * Math.cos(me.ry * deg) - xxx * Math.sin(me.ry * deg);

		let dry = -mouseX;
		mouseX = 0;

		me.z += dz;
		me.x += dx;

		if (lock) {
			me.ry += dry;
		}

		world.style.transform = `
			translateZ(600px)
			rotateY(${-me.ry}deg)
	 		translate3d(${-me.x}px, ${me.y}px, ${-me.z}px)
		`;
	}
}

var timer = setInterval(update, 10);

function activateMenu() {
	gamePaused = !gamePaused;
	if (gamePaused) {
		menu.style.display = "block";
		document.exitPointerLock();
	} else {
		menu.style.display = "none";
		container.requestPointerLock();
	}
}

function deactivateMenu() {
	gamePaused = false;
	menu.style.display = "none";
	container.requestPointerLock();
}

function displayRules() {
	rules.style.display = rules.style.display === "none" ? "block" : "none";
}
