function setCurrentFlower(key){
  let id = firebase.auth().currentUser.uid;
  firebase.database().ref(id + '/CurrentsFlower/').set(
    {0: key}
  )
  M.toast({html: 'Nouvelle plante actuelle sélectionnée'})
  getElementsFromFirebaseOfTheUser(id);
}