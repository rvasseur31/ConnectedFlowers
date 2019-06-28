const admin = require('firebase-admin');
const configUser = require('./Models/user-config.json');
const configAdmin = require('./Models/admin-config.json');
const utils = require('./utils/utilities.js');

admin.initializeApp({
    credential: admin.credential.cert(configAdmin),
    databaseURL: 'https://connectedflowers.firebaseio.com/'
});

utils.firstConnection();

var data = '{"Temperature":26,"Luminosity":56,"Humidity":47,"Time":0}'

try {
    data = JSON.parse(data);
    let today = new Date();
    data.Time = today.getHours() + "h";
    console.log(data);
    utils.addDataToDatabase("Sensors", configUser.id, data);
    utils.getCurrentFlower();
    utils.checkData(data);
} catch (err) {
    console.log(err);
}

// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
// const parser = port.pipe(new Readline({ delimiter: '\n' }));
// // Read the port data
// port.on("open", () => {
//     console.log('serial port open');
// });
// parser.on('data', data => {
//     try {
//         data = JSON.parse(data);
//         let today = new Date();
//         data.Time = today.getHours() + "h";
//         console.log(data);
//         utils.addDataToDatabase("Sensors", configUser.id, data);
//         utils.getCurrentFlower();
//     } catch (err) {
//         console.log(err);
//     }
// });

// utils.checkData({"Temperature":24,"Luminosity":50,"Humidity":50,"Time":0});

// utils.alertData();

//utils.addDataToDatabase("Sensors", configUser.id, {"Temperature":24,"Luminosity":50,"Humidity":50,"Time":'12h'});
