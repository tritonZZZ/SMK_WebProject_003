var container = document.getElementById("container");
var world = document.getElementById("world");

var map = [
//0-x,1-y,2-z, 3-rotX, 4-rotY, 5-rotZ, 6-height, 7-width, 8-color
	[0,0,0,0,0,0,200,200,"orange"], //0. front wall
	[0,0,-200,0,0,0,200,200,"green"], //1. hinder wall
	[100,0,100,0,90,0,200,200,"blue"], //2.
	[100,0,-100,0,90,0,200,200,"violet"],
	[0,-100,-100,90,0,0,200,200,"brown"], //3.
	[0,-100,100,90,0,0,200,200,"cyan"],
];

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
 	world.style.transform = `
 		rotateY(${0}deg)
 		translate3d(100px, 50px, 0px)`;
}

 timer = setInterval(update, 10);