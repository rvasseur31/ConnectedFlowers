/**
 * Template html => Return a string
 * @param {*} key 
 * @param {*} name 
 * @param {*} desc 
 * @param {*} img 
 * @param {*} startFloweringPeriod 
 * @param {*} endFloweringPeriod 
 * @param {*} luminosity 
 * @param {*} humidity 
 * @param {*} temperature 
 */
function returnTextCardFlower(key, name, desc, img, startFloweringPeriod, endFloweringPeriod,
    luminosity, humidity, temperature, currentFlower) {
    let string = `
    <div class="col s10 m6 l4 offset-s1">
        <div class="card medium card-panel hoverable">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="responsive-img activator" src="${img}" alt="image of ${name}">
            </div>
            <div class="card-content">
                <span class="card-title grey-text text-darken-4">${name}<br>
                    <i data-target="confim-delete" onclick="preDeleteFlower('${key}');" class="material-icons right modal-trigger">delete</i> 
                    <i data-target="add-Flower" onclick="preUpdateFlower('${key}')" class="material-icons right modal-trigger">create</i>`
    if (currentFlower)
        string += `<i class="material-icons right">bookmark</i>`;
    else
        string += `<i onclick="setCurrentFlower('${key}')" class="material-icons right">bookmark_border</i>`; 
    string += `
                </span>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
                <p>${desc}</p>
                <p>Luminosité : ${luminosity} %</p>
                <p>Humidité : ${humidity} %</p>
                <p>Température : ${temperature} °C</p>
                <p>Pédiore de floraison : ${startFloweringPeriod} - ${endFloweringPeriod}</p>
            </div>
        </div>
    </div>
    `
    return string;
}