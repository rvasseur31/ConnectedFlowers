/**
 * Show span error when information isn't correct
 * @param {document.getElementById('span')} element 
 */
function showTextErrorMessage(element){
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
    }, 2000);
}