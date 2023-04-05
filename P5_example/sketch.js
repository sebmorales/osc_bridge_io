//use socketio to send OSC commands to other programs locally. 
//this sketch also needs to run the following node program: 
//https://github.com/sebmorales/osc_bridge_io


var socket = io("https://grass-daisy-break.glitch.me/");



function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  fill(255, 50, 50)
}


socket.on("message", function (data) {
  console.log(data);
});

function mousePressed(){
  // socket.emit("message",random(255));
  sendOSC("/Panning",(random(-1,1)));//address and value
  background(random(255));
}

//this is a function to construct the message for the osc server
function sendOSC(address,value){
  let osc_message={"address":address,"value":value};
  socket.emit("message",osc_message);
}

function keyPressed(){
  if(key=='a'){
    sendOSC("/Volume",(random(-30,6)));//address and value
  }
  if(key=="b"){
    sendOSC("/Panning",(random(-1,1)));//address and value
  }
}