/**
 * Check if user is connected
 * If YES => show addMedia and logout in the navbar
 * If NO => show Sign in and Sign up in the navbar
 */
function loginOrNot(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("login").style.display = "none";
            document.getElementById("when-login").style.display = "block";
            getElementsFromFirebaseOfTheUser(user.uid);
        } 
        else {
            document.getElementById("login").style.display = "block";
            document.getElementById("when-login").style.display = "none";
        }
    });
}