/**
 * Connection when click on the button
 * Manages errors
 */
document.getElementById("sign-in-Connection").addEventListener('click', async function(){
    let error = false;
    let email = document.getElementById("email-Connection");
    let password = document.getElementById("password-Connection");
    let emailNotExist = document.getElementById("email-not-exist-Connection");

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(await function(e) {
        if (e.code == "auth/wrong-password"){
            error = true;
            shakeInput(password);
        }
        else if (e.code == "auth/user-not-found"){
            error = true;
            showTextErrorMessage(emailNotExist);
        }
    });
    if (!error){
        document.location.href = '../../index.html';
    }
});

/**
 * Go to Sign up page
 */
document.getElementById("sign-up-Connection").addEventListener('click', function(){
    document.location.href = '../CreateAccount/createAccount.html';
});