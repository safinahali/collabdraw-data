let data;
let extension;
var y=100;

function preload(){
	filename = 'data-29170.json'
	data = loadJSON(filename);
	extension = (filename.split('-')[1]).split('.')[0];
	console.log(extension);
}

function setup() {
	createCanvas(windowWidth, 3000);
	background(250);

	// this logs chat correctly for any string with chat. will work for files with different filename
	for (var element in data){
		var elementname = JSON.stringify(element);
		if (elementname.includes('chat')){

			for (var key in data[element]) {
				console.log("Key: " + key);

				text(data[element][key], 600, y);
				y = y+20;
			}

		}

		else if (elementname.includes('drawings')){

			for (var key in data[element]) {
				// key is a single stroke

				for (i = 0; i<data[element][key].table.length; i++){
					noFill();
					strokeWeight(12);
			      	
			      	if(data[element][key].table[i].rno == 0){

			      		if(data[element][key].table[i].pno == 0){
			      			stroke(80);
			      		}

			      		else{
			      			stroke(120);
			      		}

			      		line(data[element][key].table[i].x, data[element][key].table[i].y, data[element][key].table[i].px, data[element][key].table[i].py);
			      	}

			      	else if(data[element][key].table[i].rno == 1){

			      		if(data[element][key].table[i].pno == 0){
			      			stroke(80);
			      		}

			      		else{
			      			stroke(120);
			      		}
			      		
			      		line(data[element][key].table[i].x, data[element][key].table[i].y+500, data[element][key].table[i].px, data[element][key].table[i].py+500);
			      	}

			      	else if(data[element][key].table[i].rno == 2){

			      		if(data[element][key].table[i].pno == 0){
			      			stroke(80);
			      		}

			      		else{
			      			stroke(120);
			      		}
			      		
			      		line(data[element][key].table[i].x, data[element][key].table[i].y+1000, data[element][key].table[i].px, data[element][key].table[i].py+1000);
			      	}
				}
			}

		}
	}


	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  
}