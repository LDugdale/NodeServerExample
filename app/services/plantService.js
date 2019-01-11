import * as plantModel from '../model/plantModel';
import { to, throwError } from './controllerService';


export const getPlants = async (searchText) => {

    let error, plants;

    [error, plants] = await to(plantModel.searchPlants(searchText));

    if(error) {
        throwError(error);
    }

    let parsedPlants = [];
    
    for(let i = 0; i < plants.length; i++){
        
        let currentPlant = plants[i];

        if(previousPlantHasSamePlantId(i, plants, currentPlant)){
            continue;
        }

        let names = getPlantNames(i, plants, currentPlant); 

        let parsedPlant = {
            plantId: currentPlant.plantId,
            latinName: currentPlant.latinName,
            genus: currentPlant.genus,
            names: names
        };

        parsedPlants.push(parsedPlant);
    }
    return parsedPlants;
}

const previousPlantHasSamePlantId = (i, plants, currentPlant) => {
    return i > 0  && plants[i - 1].plantId === currentPlant.plantId;
}

const getPlantNames = (i, plants, currentPlant) => {
    let names = [];

    for(let j = i; j < plants.length; j++){

        let nextPlant = plants[j];

        if(currentPlant.plantId !== nextPlant.plantId){
            break;
        }

        let otherNames = {
            name: nextPlant.name,
            nameType: nextPlant.nameType
        };

        names.push(otherNames);
    }

    return names;
}