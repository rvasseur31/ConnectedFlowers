class Flower{
    constructor(name, category, description, optimalLuminosity, optimalHumidity, optimalTemperature,
        startFloweringPeriod, endFloweringPeriod, img){
        this.name = name;
        this.description = description;
        this.category = category;
        this.optimalLuminosity = optimalLuminosity;
        this.optimalHumidity = optimalHumidity;
        this.optimalTemperature = optimalTemperature;
        this.startFloweringPeriod = startFloweringPeriod;
        this.endFloweringPeriod = endFloweringPeriod
        this.img = img;
    }
}

class FlowerWithoutImage{
    constructor(name, category, description, optimalLuminosity, optimalHumidity, optimalTemperature,
        startFloweringPeriod, endFloweringPeriod){
        this.name = name;
        this.description = description;
        this.category = category;
        this.optimalLuminosity = optimalLuminosity;
        this.optimalHumidity = optimalHumidity;
        this.optimalTemperature = optimalTemperature;
        this.startFloweringPeriod = startFloweringPeriod;
        this.endFloweringPeriod = endFloweringPeriod
    }
}