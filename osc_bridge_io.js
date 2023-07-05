'use strict';

// This  program makes uses socketio to connect to a specified web server,
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
let osc_port=10000; //program OSC Port (Max or Abelton, etc)
let osc_ip="127.0.0.1"; //local computer IP 127.0.0.1
// let osc_ip="192.168.1.7"; //local computer IP 127.0.0.1
// let socket_io_address="http://hardwaremovement.com:8877" //socket server
let socket_io_address="https://hardwaremovement.glitch.me" //socket server

console.log("attempting to connect to: "+socket_io_address)
console.log("and connecting to: "+osc_ip+" on port: "+osc_port)
let socket_client = io.connect(socket_io_address, {reconnect: true,allowEIO3: true});
socket_client.on('connect', function (socket) {
    console.log('Connected to socket server!');
});
socket_client.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});


let oscClient = new Client(osc_ip, osc_port);


socket_client.on("osc",function(osc_msg){
    console.log(osc_msg);

    oscClient.send(osc_msg.address, osc_msg.value, (err) => {
        if (err) console.log(err);
        // oscClient.close();
      });
})
