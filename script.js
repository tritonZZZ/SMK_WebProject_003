var container = document.getElementById("container");
var world = document.getElementById("world");

var map = [
//0-x,1-y,2-z, 3-rotX, 4-rotY, 5-rotZ, 6-height, 7-width, 8-color
	[0,0,0,0,0,0,200,200,"orange"], //0.
	[200,0,0,0,0,0,200,200,"green"], //1.
	[400,0,0,0,0,0,200,200,"blue"], //2.
	[600,0,0,0,0,0,200,200,"pink"], //3.
];
 
function createWorld(){
	for(let i = 0; i < map.length; i++){
		let myElement = document.createElement("div");
		myElement.id = `element${i}`;
		myElement.style.position = `absolute`;
		myElement.style.height = `${map[i][6]}px`;
		myElement.style.width = `${map[i][7]}px`;
		myElement.style.background = `${map[i][8]}`;
		myElement.style.transform = `translate3d(${map[i][0]}px,0px,0px)`;
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