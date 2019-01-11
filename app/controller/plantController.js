import { to, successResponse, errorResponse } from '../services/controllerService';
import { getPlants } from '../services/plantService';
import * as plantModel from '../model/plantModel';
 
export const searchPlants = async (request, response) => {
    const data = request.body;

    if(!data.searchText){
        return errorResponse(response, 'Search text required.');
    } else {
        let error, plants;

        [error, plants] = await to(getPlants(data.searchText));
    
        if(error) {
            return errorResponse(response, error, 422);
        }
    
        return successResponse(response, {message:'Successfully found plants.', plants: plants}, 200);
    }
}

var plantList = require('../../json/plantList');

export const addPlants = async (request, response) => {
    let plantId, plantNameId, plantInformationId, createPlantError, addNamesError, addInformationError;
    let plants = plantList;

    for(let subArray in plants){

        for(let plantKey in plants[subArray]){
            
            let plantInfo = plants[subArray][plantKey];

            let plant = {
                latinName: getPlantName(plantInfo.LatinName),
                genus: plantInfo.Genus
            }
            let plantNames = getplantNames(plantInfo);
            let plantInformation = plantInfo.ExtraInformation;

            [createPlantError, plantId] = await to(plantModel.createPlant(plant));

            for(let plantName in plantNames) {                
                [addNamesError, plantId] = await to(plantModel.createPlantName(plantNames[plantName], plantId));
            }

            for (let plantInformationKey in plantInformation) {
                let info = {
                    information: plantInformationKey,
                    value: plantInformation[plantInformationKey]
                };
                [addInformationError, plantInformationId] = await to(plantModel.createPlantExtraInfo(info, plantId));

            }
        }
    }
    return successResponse(response, {message:'Successfully created plants.'}, 201);

}

const getplantNames = (plant) =>{
    let names = [];
    for(let commonNames in plant.CommonNames){
        if(plant.CommonNames[commonNames]){
            let commonName = {
                name: plant.CommonNames[commonNames],
                nameType: 'CommonName'
            }
            names.push(commonName);
        }
    }

    for(let synonyms in plant.Synonyms){
        if(plant.CommonNames[synonyms]){
            let synonym = {
                name: plant.Synonyms[synonyms],
                nameType: 'Synonym'
            }
            names.push(synonym);
        }
    }
    return names;
}

const getPlantName = (plantName) => {

    let name = plantName.trim();
    if( name === "'Fastigiata'"){
        let test;
    }

    const lastPosition = name.length - 1;
    const first = name.charAt(0);
    const last = name.charAt(lastPosition);
    
    if(first === "'" && last === "'"){
        name = name.slice(1, lastPosition);
    }

    return name;
}