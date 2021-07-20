let data;
let extension;
var y=100;
var j = 100;
// change this to log from different rooms
var logroom = "2";
var loground = "0";
var chatKeysPrinted = [];
var sortedEpochs = [];
var drawEpochs = [];

function preload(){
	filename = 'collaborative-draw-clean-default-rtdb-export.json'
	data = loadJSON(filename);	
 }

function setup() {
	createCanvas(windowWidth, 3000);
	background(250);
	sortedEpochs = sortEpochs();
	console.log(sortedEpochs);
	makeDrawings(logroom);
	// noLoop();
}

function changeroom(){
	clear();
	background(250);
	var roomSelect = document.getElementById('roomselect');
	var logroom = roomSelect.value;
	makeDrawings(logroom);
	return;
}

// function changeround(){
// 	clear();
// 	background(250);
// 	var roundSelect = document.getElementById('roundselect');
// 	var loground = roundSelect.value;
// 	return;
// }

function sortEpochs(){
	for (var element in data){
		var elementname = JSON.stringify(element);
		//if it is a drawing from room 0
		if (elementname.includes("room"+logroom+":") && elementname.includes("drawings")){
			for (var key in data[element]) {
				if("epoch" in data[element][key]){
					drawEpochs.push(data[element][key].epoch);
					sortedEpochs = drawEpochs.sort();
				}
			}
		}
	}
	return sortedEpochs;
}

function makeDrawings(logroom) {
	for (var element in data){
		var elementname = JSON.stringify(element);
		//if it is a drawing from room 0
		if (elementname.includes("room"+logroom+":") && elementname.includes("drawings")){

			for (var key in data[element]) {
				
				//actual drawing info data table
				if ("table" in data[element][key]) {
					
					for (i = 0; i<data[element][key].table.length; i++){
						noFill();
						strokeWeight(12);

						loground = data[element][key].table[i].round;

						//change this to a condition for loground
						// if(data[element][key].table[i].round == loground){
							//go by the epochs and add 500 for new drawings
							// for(j = 0; j<sortedEpochs.length; j++){
								// if(sortedEpochs[3] < data[element][key].epoch < sortedEpochs[4]){
									//different colors for different users
									console.log(data[element][key].table[i].pinfo.playername);
						      		if(data[element][key].table[i].pinfo.playername%2 == 0){
						      			stroke(100,0,20);
						      		}
						      		else{
						      			stroke(20,100,0);

						      		}

						      		line(data[element][key].table[i].x+50, data[element][key].table[i].y+500*loground, data[element][key].table[i].px+50, data[element][key].table[i].py+500*loground);
								// }
							// }
						// }
					} 
				}
			}
		}


		// else if (elementname.includes("room"+logroom+":") && elementname.includes("chat")){
		// 	y=100;
			

		// 	for (var key in data[element]) {
		// 		var round = parseInt(data[element][key].round);	
				
		// 		if (ms>(data[element][key].epoch-startTime)/speed){
		// 			// var currentchat = document.getElementById('thischat');
		// 			// currentchat.innerHTML = "CHAT MSG: " + data[element][key].chat;

		// 			noStroke();
		// 			fill(0);
					
		// 			if (chatKeysPrinted.includes(key)==false){
		// 				chatKeysPrinted.push(key);
		// 				// this should work when pno is logged correctly with chat
		// 				textFont('Georgia', 18);
		// 				text("player: " + data[element][key].pno + " in round: " + data[element][key].round, 600, y+300*round);
						
		// 				text(data[element][key].chat, 850, y+300*round);
		// 				y = y+35;	
		// 			}	
		// 		}
		// 	}

		// }

		else if (elementname.includes("room"+logroom+":") && elementname.includes("initial")){			
			for (var key in data[element]) {
				stroke(50,102,152);
			    strokeWeight(12);
			    noFill();
			    bezier(data[element][key][0]+50, data[element][key][1], data[element][key][2]+50, data[element][key][3], data[element][key][4]+50, data[element][key][5], data[element][key][6]+50, data[element][key][7]);
			    bezier(data[element][key][8]+50, data[element][key][9]+500, data[element][key][10]+50, data[element][key][11]+500, data[element][key][12]+50, data[element][key][13]+500, data[element][key][14]+50, data[element][key][15]+500);
			    bezier(data[element][key][16]+50, data[element][key][17]+1000, data[element][key][18]+50, data[element][key][19]+1000, data[element][key][20]+50, data[element][key][21]+1000, data[element][key][22]+50, data[element][key][23]+1000);
			}

		}
	}
}