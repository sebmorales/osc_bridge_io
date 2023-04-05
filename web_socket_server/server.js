//basic server running on glitch, it will use socketio to brodcast any message it recieves under the eventname "message"

let express = require('express'); 
let app = express();
let server = app.listen(process.env.PORT || 3000);
console.log('server running')

var socket = require('socket.io');
var io = socket(server, {
    //this allows external websites to connect
  cors: {
    origin: true
  },
  //this allows older socket versions to connect
  allowEIO3: true
});

io.sockets.on('connection', newConnection);



function newConnection(socket){
  console.log("new Connection");
  socket.on("message", function(eventName){
    //this will send to everyone connected to the site
    io.emit("message", eventName)
    console.log(eventName)
  })
 
}
