/**
 * Update the informations of the media
 * @param {key of the media} key 
 */
async function updateFlower(key) {
    let name = $('.input-name-flower').val();
    let category = $('.input-category-flower').val();
    let description = $('.input-description-flower').val();
    let startFloweringPeriod = parseInt($('#select-start-flowering-period-flower').val());
    let endFloweringPeriod = parseInt($('#select-end-flowering-period-flower').val());
    let luminosity = parseInt($('.range-luminosity-flower').val());
    let humidity = parseInt($('.range-humidity-flower').val());
    let temperature = parseInt($('.range-temperature-flower').val());
    let user = firebase.auth().currentUser;
    if ($('.file-path').val() == ""){
        await firebase.database().ref(user.uid + '/Flowers/' + key).update(new FlowerWithoutImage(
            name, category, description, luminosity, humidity, temperature, 
            startFloweringPeriod, endFloweringPeriod));
    }
    else{
        let inputImage = document.getElementById("get-image-AddMedia");
        await addImage(inputImage).then(async (img)=>{
            await firebase.database().ref(user.uid + '/Flowers/' + key).update(new Flower(
                name, category, description, luminosity, humidity, temperature, 
                startFloweringPeriod, endFloweringPeriod, img));
        }).catch((e)=>{
            console.log(e);
        });
    }
    
    M.toast({ html: 'Modifié!', classes: 'rounded' });
    getElementsFromFirebaseOfTheUser(user.uid);
}

async function preUpdateFlower(key) {
    $('#action-btn-flower').attr('onclick', 'updateFlower("'+ key +'");');
    $('#action-btn-flower').val('Modifier');
    $('.action-btn-img-flower').html('Modifier l\'image');
    $('.file-path').val("");
    const ref = firebase.database().ref(firebase.auth().currentUser.uid + '/Flowers/' + key);
    await ref.orderByValue().once("value", function (snapshot) {
        $('.input-name-flower').val(snapshot.val().name);
        $('.input-category-flower').val(snapshot.val().category);
        $('.input-description-flower').val(snapshot.val().description);
        $('#select-start-flowering-period-flower').val(snapshot.val().startFloweringPeriod);
        $('#select-end-flowering-period-flower').val(snapshot.val().endFloweringPeriod);
        $('select').formSelect();
        $('.range-luminosity-flower').val(snapshot.val().optimalLuminosity);
        $('.range-humidity-flower').val(snapshot.val().optimalHumidity);
        $('.range-temperature-flower').val(snapshot.val().optimalTemperature);
        M.updateTextFields();
    });
}


