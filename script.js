var container = document.getElementById("container");
var world = document.getElementById("world");

var x = 0;

function createWorld(){
	for(let i = 1; i < 4; i++){
		let myElement = document.createElement("div");
		myElement.id = "element"+i;
		myElement.style.position = "abolute";
		myElement.style.height = 200+"px";
		myElement.style.width = 200+"px";
		myElement.style.background = "orange";
		world.append(myElement);
	}
}

createWorld();

function update(){
 	world.style.transform = `
 		rotateY(${x}deg)
 		translate3d(500px, 300px, 0px)`;
 	//x++;
}

 timer = setInterval(update, 10);