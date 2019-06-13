/**
 * Create account when click on the button
 * Manages errors
 */
document.getElementById("sign-up-SignUp").addEventListener('click', async function(){
    let error = false;
    let email = document.getElementById("email-SignUp");
    let password = document.getElementById("password-SignUp");
    let passwordConfirm = document.getElementById("password-confirm-SignUp");
    let emailIsTaken = document.getElementById("email-taken-SignUp");
    let passwordIsTooShort = document.getElementById("password-too-short-SignUp");
    
    if (password.value == passwordConfirm.value){
        await firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch((e) => {
            if (e.code == "auth/weak-password"){
                error = true;
                borderRedInput(password);
                borderRedInput(passwordConfirm);
                showTextErrorMessage(passwordIsTooShort)
            }
            else if (e.code == "auth/email-already-in-use"){
                error = true;
                showTextErrorMessage(emailIsTaken);
            }
        })
        // If everything is ok => send verification email and go to mainMenu
        // The user is connected
        if (!error){
            await VerificationEmail();
            document.location.href = '../../index.html';
        }
    }
    else{
        shakeInput(password);
        shakeInput(passwordConfirm);
    }
});

/**
 * Go to Sign in page
 */
document.getElementById("sign-in-SignUp").addEventListener('click', function(){
    document.location.href = '../Connection/connection.html';
});