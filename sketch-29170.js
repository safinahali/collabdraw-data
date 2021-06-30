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

		var drawingstring = "drawings"+extension;
		var chatstring = "chat" + extension;
		var initialstring = "initial-coordinates" + extension;

		if (elementname.includes(chatstring)){

			for (var key in data[element]) {
				console.log("Key: " + key);

				text(data[element][key], 600, y);
				y = y+20;
			}

		}

		else if (elementname.includes(drawingstring)){

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

		else if (elementname.includes(initialstring)){			
			for (var key in data[element]) {
				stroke(50,102,152);
			    strokeWeight(12);
			    noFill();
			    bezier(data[element][key][0], data[element][key][1], data[element][key][2], data[element][key][3], data[element][key][4], data[element][key][5], data[element][key][6], data[element][key][7]);
			    bezier(data[element][key][8], data[element][key][9]+500, data[element][key][10], data[element][key][11]+500, data[element][key][12], data[element][key][13]+500, data[element][key][14], data[element][key][15]+500);
			    bezier(data[element][key][16], data[element][key][17]+1000, data[element][key][18], data[element][key][19]+1000, data[element][key][20], data[element][key][21]+1000, data[element][key][22], data[element][key][23]+1000);
			}

		}
	}


	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  
}