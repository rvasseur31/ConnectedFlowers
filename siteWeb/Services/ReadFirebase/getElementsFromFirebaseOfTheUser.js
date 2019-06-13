/**
 * Retrieve the user's media
 * @param {id of the user} id 
 */
async function getElementsFromFirebaseOfTheUser(id){
    let affiche = $("#show-list-flowers");
    let string = "";
    let currentFlower = "";
    const refCurrentFlower = firebase.database().ref(id + '/CurrentsFlower/0');
    await refCurrentFlower.orderByValue().once("value", function(snapshot) {
        currentFlower = snapshot.val();
    });
    const ref = firebase.database().ref(id + '/Flowers/');
    await ref.orderByValue().once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            string += returnTextCardFlower(childSnapshot.key, val.name, val.description,
                val.img, transformMonthNumberIntoMonthLetter(val.startFloweringPeriod),
                transformMonthNumberIntoMonthLetter(val.endFloweringPeriod), val.optimalLuminosity,
                val.optimalHumidity, val.optimalTemperature, (currentFlower == childSnapshot.key) ? true : false);
        })
        affiche.html(string);
    });
    
};

function transformMonthNumberIntoMonthLetter(number){
    switch (number) {
        case 1:
            return "Janvier";
        case 2:
            return "Février";
        case 3:
            return "Mars";
        case 4:
            return "Avril";
        case 5:
            return "Mai";
        case 6:
            return "Juin";
        case 7:
            return "Juillet";
        case 8:
            return "Août";
        case 9:
            return "Septembre";
        case 10:
            return "Octobre";
        case 11:
            return "Novembre";
        case 12:
            return "Décembre";
        default:
            return "Mois inconnu"
    }
}