$(document).ready(function () {
  $('.modal').modal();
  $('select').formSelect();
});
loginOrNot(); //check if the user is connected

var humidity = [];
var luminosity = [];
var temperature = [];
var time = [];

async function getDataFlower() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const ref = firebase.database().ref(user.uid + '/Sensors/');
      await ref.orderByValue().once("value", function (snapshot) {
        let size = Object.values(snapshot.val().Time).length;
        // Affiche les 24 derniers éléments
        if (size >= 24){
          humidity = Object.values(snapshot.val().Humidity).slice(size-24, size);
          temperature = Object.values(snapshot.val().Temperature).slice(size-24, size);
          luminosity = Object.values(snapshot.val().Luminosity).slice(size-24, size);
          time = Object.values(snapshot.val().Time).slice(size-24, size);

        }
        else{
          humidity = Object.values(snapshot.val().Humidity);
          temperature = Object.values(snapshot.val().Temperature);
          luminosity = Object.values(snapshot.val().Luminosity);
          time = Object.values(snapshot.val().Time);
        }
        var humidityData = {
          label: "Humidité",
          data: humidity,
          lineTension: 0.3,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'transparent',
          pointBorderColor: 'black',
          pointBackgroundColor: 'black',
        };

        var luminosityData = {
          label: "Luminosité",
          data: luminosity,
          lineTension: 0.3,
          fill: false,
          borderColor: 'yellow',
          backgroundColor: 'transparent',
          pointBorderColor: 'black',
          pointBackgroundColor: 'black',
        };

        var temperatureData = {
          label: "Température",
          data: temperature,
          lineTension: 0.3,
          fill: false,
          borderColor: 'red',
          backgroundColor: 'transparent',
          pointBorderColor: 'black',
          pointBackgroundColor: 'black',
        };

        var speedData = {
          labels: time,
          datasets: [humidityData, luminosityData, temperatureData]
        };

        new Chart(document.getElementById("chart"), {
          type: 'line',
          data: speedData,
          options: {}
        });
      });
    }
  });
}

getDataFlower();




