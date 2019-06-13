/**
 * Send verification email to check if it isn't a fake email
 */
function VerificationEmail(){
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        M.toast({html: 'Veuillez vérifier votre compte par email!', classes: 'rounded'});
    }).catch(function(error) {
        M.toast({html: error, classes: 'rounded'});
    });
}