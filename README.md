# OSC_Bridge_IO
Run osc_brdige_io.js locally to connect to a web server using Socket.io, this allows you to send OSC commands from the web into your computer to communicate with other programs.

This was inspired by [Gene Kogan's](https://github.com/genekogan/p5js-osc) p5js-osc program.

## Setup:
Install [Node.js](https://nodejs.org/en) if you haven't already.

Download or clone this repo

    $git clone https://github.com/sebmorales/osc_bridge_io
    $ cd osc_bridge_io/
    $ npm install

Using your favorite text editor, open the osc_brdige_io.js file and look for the following lines

    let osc_port=10000;
    let osc_ip="127.0.0.1";
    let socket_io_address="https://hardwaremovement.glitch.me"

These are the lines of code that you will need to update to your desired settings.

### osc_ip:
The **osc_ip** is the IP address of the computer you want to communicate with, in most case this might be your own computer, in that case the IP address would be **127.0.0.1** but if you are communicating with someone else within the same network, you can ask them for their IP, it will most likely look something like 192.168.0.xx


### osc_port:
Most programs (MAX, Ableton, TouchDesigner, OBS) that can communicate using OSC are able to specify which port to listen to. If you are unsure how to set the port, look for an example of how to use OSC with your desire program. 

Your program should listen to the same port number as the osc_bridge_io.js is sending to.

### socket_io_address
This is the URL to your server running in a public IP address, for this example we are using a server running on glitch.io. 


## Sending OSC from p5
OSC protocol is structured with an address, and a value. The address is really just a name for a variable, but it is really useful because it makes it easy to route different messages, for example volume or panning. 

The address always starts with a "/" for example:

    /address

or 
    
    /volume

or 

    /panning

For the value, it can a number or even a string, for our example we are sending a number with decimals (a float). Remember to map it to a value that makes sense for the program you are working with, for example a panner might go from -1 to 1, while a midi value might go from 0-127. 

**P5JS**

On P5 side, we made a function called

    sendOSC(address, value)

 It takes a an address and a value as parameters. Inside, it just combines both into a a osc_message and sends it over sockets:
    
    function sendOSC(address,value){
        let osc_message={"address":address,"value":value};
        socket.emit("message",osc_message);
    }


## Running everything together

    $ node osc_bridge_io.js

Make sure your cloud server (glitch) is also running. 
