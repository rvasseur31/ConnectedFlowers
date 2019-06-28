const admin = require('firebase-admin');
const fs = require('fs');
const nodemailer = require('nodemailer');
const userConfig = require('../Models/user-config.json');

module.exports = {
    firstConnection: () => {
        admin.auth()
            .createUser(userConfig)
            .then(function (user) {
                module.exports.addIdUserConfig(user.uid)
                module.exports.configureStarterPackPlant("Flowers", user.uid, require('../Models/list-plant.json'));
            }).catch(function (e) {
                if (userConfig.uid === undefined) {
                    admin.auth().getUserByEmail(userConfig.email)
                        .then(function (userRecord) {
                            module.exports.addIdUserConfig(userRecord.uid)
                        })
                        .catch(function (error) {
                            console.log("Error fetching user data:", error);
                        });
                }
            });
    },
    configureStarterPackPlant: (database, id, data) => {
        let ref = admin.database().ref('/' + id + '/' + database);
        ref.set(data)
            .then(() => {
                console.log('Les plantes ont été ajoutée');
            });
    },
    addDataToDatabase: (database, id, data) => {
        let titleRef = ["Humidity", "Temperature", "Luminosity", "Time"];
        titleRef.forEach(element => {
            let ref = admin.database().ref('/' + id + '/' + database + "/" + element);
            ref.push().set(data[element.replace(/"/g, '')])
                .then(() => {
                    console.log({ message: 'Données ajoutées', result: true });
                });
        });
    },
    getCurrentFlower: async () => {
        const ref = admin.database().ref(userConfig.id + '/CurrentsFlower/0/');
        await ref.orderByValue().once("value", async function (snapshot) {
            const ref = admin.database().ref(userConfig.id + '/Flowers/' + JSON.stringify(snapshot.val()).replace(/"/g, ''));
            await ref.orderByValue().once("value", async function (snapshot) {
                console.log(snapshot.val());
                await fs.writeFile('./files/current-flower.json', JSON.stringify(snapshot.val()), function (err) {
                    if (err) console.log(err);
                });
            });
        });
    },
    checkData: (data) => {
        let dataCurrentFlower = require('../files/current-flower.json');
        dataCurrentFlower = JSON.parse(JSON.stringify(dataCurrentFlower));
        for (let key in data) {
            if (key != "Time") {
                if (data[key] > dataCurrentFlower["optimal" + key] + (module.exports.getMaxValue(key) / 10)) {
                    console.log(key + " trop élevé");
                    module.exports.alertData();
                }
                else if (data[key] < dataCurrentFlower["optimal" + key] - (module.exports.getMaxValue(key) / 10)) {
                    console.log(key + " trop basse");
                    module.exports.alertData();
                }
                else {
                    console.log(key + " Parfaite");
                }
            }
        }
    },
    getMaxValue: (data) => {
        switch (data) {
            case "Humidity":
                return 100;
            case "Temperature":
                return 40;
            case "Luminosity":
                return 100;
            default:
                return "Error";
        }
    },
    alertData: () => {
        fs.readFile('./utils/mail.txt', function (err, data) {
            const transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'connected.flower.tls@gmail.com',
                    pass: 'flower31200',
                },
            });
            const mailOptions = {
                from: 'connected.flower.tls@gmail.com',
                to: 'rafvasseur@gmail.com',
                subject: 'Alerte, la plante est en danger',
                html: data,
            };
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                console.log(`Message sent: ${info.response}`);
            });
        });
    },
    addIdUserConfig: (id) => {
        fs.readFile('./Models/user-config.json', function (err, data) {
            let json = JSON.parse(data);
            json.id = id;
            fs.writeFile('./Models/user-config.json', JSON.stringify(json), function (err) {
                if (err) console.log(err);
            });
        });
    },
}
