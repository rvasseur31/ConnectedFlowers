/**
 * Shake the input when password aren't correct
 * @param {document.getElementById('input')} element 
 */
function shakeInput(element){
    element.classList.add('error');
    // remove the class after the animation completes
    setTimeout(function() {
        element.classList.remove('error');
    }, 300);
    element.focus()
    
}