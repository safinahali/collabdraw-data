let data;
let extension;
var y=100;
var j = 100;
var threshold = 50;
// change this to log from different rooms
var logroom = "2";
var ms = 0;
var threshold = 500;
var timer;
var speed = 200;
var startTime = 16000000000000;
var chatKeysPrinted = [];
var roomSelect = document.getElementById('roomselect');

function preload(){
	filename = 'room-2-valid.json'
	data = loadJSON(filename);	
 }

function setup() {
	createCanvas(windowWidth, 3000);
	background(250);

	text("Data logged from room: " + logroom, 20, 20);
	timer = millis();
	// noLoop();
	text("Speed", 600,10);
	slider = createSlider(1, 25, 10, 5);
    slider.position(600, 20);
	slider.style('width', '80px');
	//for getting first draw : need to fix this

// 	for (var element in data){
// 		 var draws = data[element]
// 		 draws = Object.values(data[element])
// 	}
// 	 // sort draws by epoch
// 	 // draws.sort((a,b) => {a.epoch > b.epoch}? 1: -1)
// 	 console.log("first time is " + draws[0]["epoch"]);
}

function changeroom(){
	clear();
	background(250);
	logroom = roomSelect.value;
	return;
}


function draw() {
	ms = millis();
	// speed = slider.value();
	
	for (var element in data){
		var elementname = JSON.stringify(element);

		if (elementname.includes("room"+logroom+":") && elementname.includes("drawings")){

			for (var key in data[element]) {
				var threshold = 500;

				if("epoch" in data[element][key]){
					if(data[element][key].epoch < startTime){
						startTime = data[element][key].epoch;
					}
				}

				if ("table" in data[element][key]) {
					
						for (i = 0; i<data[element][key].table.length; i++){
							noFill();
							strokeWeight(8);

							var round = data[element][key].table[i].round;
					      	
				      		if(data[element][key].table[i].pinfo.playername == 0){
				      			stroke(80);
				      		}

				      		else{
				      			stroke(120);
				      		}
				      		
				      		//this is the first epoch in data
				      		if(ms>(data[element][key].epoch-startTime)/speed){
				      			line(data[element][key].table[i].x, data[element][key].table[i].y+500*round, data[element][key].table[i].px, data[element][key].table[i].py+500*round);

				      			var currentpath = document.getElementById('thispart');
				      			currentpath.innerHTML = "STATUS: round: " + round + " player: " + data[element][key].table[i].pinfo.playername + " part: " +  data[element][key].table[i].part ;
							}

						threshold = threshold + 20;
					} 
				}
			}
		}


		else if (elementname.includes("room"+logroom+":") && elementname.includes("chat")){
			y=100;
			

			for (var key in data[element]) {
				ms = millis();
				var round = parseInt(data[element][key].round);	

				
				if (ms>(data[element][key].epoch-startTime)/speed){
					// var currentchat = document.getElementById('thischat');
					// currentchat.innerHTML = "CHAT MSG: " + data[element][key].chat;

					noStroke();
					fill(0);

					
					if (chatKeysPrinted.includes(key)==false){
						chatKeysPrinted.push(key);
						// this should work when pno is logged correctly with chat
						textFont('Georgia', 18);
						text("player: " + data[element][key].pno + " in round: " + data[element][key].round, 600, y+300*round);
						
						text(data[element][key].chat, 850, y+300*round);
						y = y+35;	
					}	
				}
			}

		}

		else if (elementname.includes("room"+logroom+":") && elementname.includes("initial")){			
			for (var key in data[element]) {
				stroke(50,102,152);
			    strokeWeight(8);
			    noFill();
			    bezier(data[element][key][0], data[element][key][1], data[element][key][2], data[element][key][3], data[element][key][4], data[element][key][5], data[element][key][6], data[element][key][7]);
			    bezier(data[element][key][8], data[element][key][9]+500, data[element][key][10], data[element][key][11]+500, data[element][key][12], data[element][key][13]+500, data[element][key][14], data[element][key][15]+500);
			    bezier(data[element][key][16], data[element][key][17]+1000, data[element][key][18], data[element][key][19]+1000, data[element][key][20], data[element][key][21]+1000, data[element][key][22], data[element][key][23]+1000);
			}

		}
	}
}