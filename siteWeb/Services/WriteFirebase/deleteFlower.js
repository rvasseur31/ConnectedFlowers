/**
 * Delete a media
 * @param {key of the media} key
 */
async function deleteFlower(key) {
    let user = firebase.auth().currentUser;
    await firebase.database().ref(user.uid + '/Flowers/' + key).remove();
    M.toast({ html: 'Supprimé!', classes: 'rounded' });
    getElementsFromFirebaseOfTheUser(user.uid);
}

function preDeleteFlower(key){
    $('#confim-delete-yes-btn').attr('onclick', 'deleteFlower("'+ key +'");');
}