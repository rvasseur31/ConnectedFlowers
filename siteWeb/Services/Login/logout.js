function logout(){
    firebase.auth().signOut().then(function() {
        document.location.href = 'index.html';
    }).catch(function(error) {
        console.log(error);
    }); 
}