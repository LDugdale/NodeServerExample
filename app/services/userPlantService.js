import * as userPlantModel from '../model/userPlantModel';
import { to, throwError } from './controllerService';
import { readToken } from './tokenService';

export const addUserPlant = async (data, bearerToken) => {
    
    const token = readToken(bearerToken);
    const userPlant = {
        plantId: data.plantId,
        userId: token.userId,
        nickname: data.nickname
    };

    let error, userPlantId;

    [error, userPlantId] = await to(userPlantModel.createUserPlant(userPlant));

    if(error) {
        throwError(error);
    }

    return userPlantId;
}

export const getUserPlants = async (bearerToken) => {

    const token = readToken(bearerToken);

    let error, userPlants;

    [error, userPlants] = await to(userPlantModel.getUserPlants(token.userId));

    if(error) {
        throwError(error);
    }

    return userPlants;
}

export const getUserPlant = async (userPlantId) => {

    let error, userPlant;

    [error, userPlant] = await to(userPlantModel.getUserPlant(userPlantId));

    if(error) {
        throwError(error);
    }

    let parsedUserPlant = parseUserPlant(userPlant);

    return parsedUserPlant;
}

const parseUserPlant = (userPlant) => {

    let names = [];
    for(let i = 0; i < userPlant.length; i++){

        let name = {
            name: userPlant[i].name,
            nameType: userPlant[i].nameType
        };
        names.push(name);
    }

    const parsedUserPlant = {
        usersPlantsId: userPlant[0].usersPlantsId,
        nickname: userPlant[0].nickname,
        latinName: userPlant[0].latinName,
        names: names,
    };    

    return parsedUserPlant;
}