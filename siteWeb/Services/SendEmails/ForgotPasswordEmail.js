/**
 * Send email when password is forgotten
 * @param {email of the user} emailAddress 
 */
function ForgotPasswordEmail(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        M.toast({html: 'Email envoyé à l\'adresse : ' + emailAddress, classes: 'rounded'});
    }).catch(function(error) {
        M.toast({html: error, classes: 'rounded'});
    });
}