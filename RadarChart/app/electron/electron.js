//'use strict'; 

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
//const isDev = require("electron-is-dev");
const mainDir = path.basename(__dirname);
const isDev = require("electron-is-dev");

console.log("opening app");

//import csvFile from "./data/factors.csv";
let csvFile = path.join(__dirname, "/data/factors.csv");

const csv = require("csvtojson");

console.log("file csv path:", csvFile);



// Standard stuff
app.on('ready', function() {
        let mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false, transparent: true });
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

        client.on('listening', function() {
            var address = client.address();

            console.log('UDP Server listening on ' + address.address + ":" + address.port);
        });

        client.on('message', function(msg, info) {
            mainWindow.webContents.send('udp', msg.toString());
            console.log('Data received from server : ' + msg.toString());
        });

        client.bind(65000);

        //loading csv variables
        csv().fromFile(csvFile).on('end_parsed', (jsonObj) => {
                // combine csv header row and csv line to a json object
                // jsonObj.a ==> 1 or 4

                setInterval(
                    () => {
                        mainWindow.webContents.send('csv', jsonObj);
                    }, 1000
                );

                console.log(jsonObj);
            })
            .on('done', (error) => {
                console.log('end')
            })


    }

);