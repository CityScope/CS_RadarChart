//'use strict'; 

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
//const isDev = require("electron-is-dev");
const mainDir = path.basename(__dirname);
const isDev = require("electron-is-dev");

console.log("opening app");

// Standard stuff
app.on('ready', function() {
        let mainWindow = new BrowserWindow({ width: 800, height: 600, frame:false, transparent:true });
        const dirname = __dirname || path.resolve(path.dirname(''));

        if (process.env.WEBBASED) {
            mainWindow.loadURL("http://localhost:3000");
        } else {
            mainWindow.loadURL(`file://${path.join(dirname, "./index.html")}`);
        }

        console.log("TEST UDP");

        //listen to udp client
        var udp = require('dgram');
        var buffer = require('buffer');

        // creating a client socket
        var client = udp.createSocket('udp4');

        client.on('listening', function () {
            var address = client.address();
            
            console.log('UDP Server listening on ' + address.address + ":" + address.port);
        });

        client.on('message',function(msg,info){
            mainWindow.webContents.send('udp',msg.toString());
            console.log('Data received from server : ' + msg.toString());
        });

        client.bind(6000);

    }

);

