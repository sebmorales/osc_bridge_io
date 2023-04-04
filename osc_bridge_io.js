'use strict';

// This program makes uses socketio to connect to a specified web server, 
// then rotues the messages recieved though OSC to a specified port and ip
//
// MORAKANA for IRL URL class 2023

let express = require('express'); 
let app = express();
let server = app.listen(process.env.PORT || 3000);
console.log('server running')

let io = require('socket.io-client');
const { Client, Message } = require('node-osc');


//////
//  VARIABLES
/////
let osc_port=7331; //program OSC Port (Max or Abelton, etc)
let osc_ip="127.0.0.1"; //local computer IP 127.0.0.1
let socket_io_address="http://pvtmsockets.glitch.me" //socket server


let socket_client = io.connect(socket_io_address, {reconnect: true});
socket_client.on('connect', function (socket) {
    console.log('Connected to socket server!');
});



let oscClient = new Client(osc_ip, osc_port);


socket_client.on("message",function(osc_msg){
    console.log(osc_msg);

    oscClient.send(osc_msg.address, osc_msg.value, (err) => {
        if (err) console.log(err);
        // oscClient.close();
      });
})
