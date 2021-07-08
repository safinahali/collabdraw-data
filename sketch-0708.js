let data;
let extension;
var y=100;
var threshold = 50;
// change this to log from different rooms
var logroom = "0";
var ms = 0;
var threshold = 500;

function preload(){
	filename = 'data.json'
	data = loadJSON(filename);	
 }

function setup() {
	createCanvas(windowWidth, 3000);
	background(250);

	text("Data logged from room: " + logroom, 20, 20);

	// noLoop();
}




function draw() {
	ms = millis();
	
	// this logs chat correctly for any string with chat. will work for files with different filename
	for (var element in data){
		var elementname = JSON.stringify(element);

		if (elementname.includes(logroom) && elementname.includes("chat")){

			for (var key in data[element]) {
				// console.log("Key: " + key);

				var round = parseInt(data[element][key].round);

				// this should work when pno is logged correctly with chat
				// text(data[element][key].pno, 600, y+500*round);
				noStroke();
				text(data[element][key].chat, 700, y+500*round);

				y = y+20;
			}

		}

		else if (elementname.includes(logroom) && elementname.includes("drawings")){

			for (var key in data[element]) {
				var threshold = 500;
				// key is a single stroke
				// console.log(data[element][key]);
				if ("table" in data[element][key]) {
					
						for (i = 0; i<data[element][key].table.length; i++){

							noFill();
							strokeWeight(12);

							var round = data[element][key].table[i].round;
					      	
				      		if(data[element][key].table[i].pinfo.playername == 0){
				      			stroke(80);
				      		}

				      		else{
				      			stroke(120);
				      		}

				      		if(ms>threshold){
				      		line(data[element][key].table[i].x, data[element][key].table[i].y+500*round, data[element][key].table[i].px, data[element][key].table[i].py+500*round);
						}

						threshold = threshold + 20;
					} 
					
				}

				
			}
		}

		else if (elementname.includes(logroom) && elementname.includes("initial")){			
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
	// if (ms>1000) {clear();}
	// console.log(ms);
}