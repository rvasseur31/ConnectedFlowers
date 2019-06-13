/**
 * 
 * @param {*} userId 
 * @param {*} name 
 * @param {*} catergory 
 * @param {*} description 
 * @param {*} startFloweringPeriod 
 * @param {*} endFloweringPeriod 
 * @param {*} luminosity 
 * @param {*} humidity 
 * @param {*} temperature 
 * @param {*} inputImage 
 */
async function addFlower() {
    let name = $('.input-name-flower').val();
    let category = $('.input-category-flower').val();
    let description = $('.input-description-flower').val();
    let startFloweringPeriod = parseInt($('#select-start-flowering-period-flower').val());
    let endFloweringPeriod = parseInt($('#select-end-flowering-period-flower').val());
    let luminosity = parseInt($('.range-luminosity-flower').val());
    let humidity = parseInt($('.range-humidity-flower').val());
    let temperature = parseInt($('.range-temperature-flower').val());
    let inputImage = document.getElementById('get-image');
    await addImage(inputImage).then((img)=>{
        firebase.database().ref(firebase.auth().currentUser.uid + '/Flowers/').push().set(
            new Flower(name, category, description, luminosity, humidity, temperature, startFloweringPeriod,
                endFloweringPeriod, img)
        );
    }).catch((e)=>{
        console.log(e);
    });
    getElementsFromFirebaseOfTheUser(firebase.auth().currentUser.uid);
    M.toast({html: 'Ajouté!', classes: 'rounded'});
}

function preAddFlower(){
    $('#action-btn-flower').attr('onclick', 'addFlower();');
    $('#action-btn-flower').val('Ajouter');
    $('.action-btn-img-flower').html('Ajouter une image');
  }