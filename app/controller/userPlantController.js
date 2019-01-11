import { to, successResponse, errorResponse } from '../services/controllerService';
import * as userPlantService from '../services/userPlantService';

export const addUserPlant = async (request, response) => {

    const userPlantData = request.body;

    if(!userPlantData.plantId){
        return errorResponse(response, 'Plant ID required.');
    } else if(!userPlantData.plantId) {
            return errorResponse(response, 'nickname required.');
    } else {
        let error, userPlantId;

        [error, userPlantId] = await to(userPlantService.addUserPlant(userPlantData, request.headers.authorization));
    
        if(error) {
            return errorResponse(response, error, 422);
        }
    
        return successResponse(response, {message:'Successfully add user plant.', userPlantId: userPlantId}, 200);
    }
}

export const getUserPlants = async (request, response) => {
 
    let error, userPlants;

    [error, userPlants] = await to(userPlantService.getUserPlants(request.headers.authorization));

    if(error) {
        return errorResponse(response, error, 422); 
    }

    return successResponse(response, {message:'Successfully add user plant.', userPlants: userPlants}, 200);
}

export const getUserPlant = async (request, response) => {

    const userPlantId = request.query['userPlantId'];

    if(!userPlantId){
        return errorResponse(response, 'User plant ID required.');
    } else {

        let error, userPlants;

        [error, userPlants] = await to(userPlantService.getUserPlant(userPlantId));

        if(error) {
            return errorResponse(response, error, 422); 
        }

        return successResponse(response, {message:'Successfully add user plant.', userPlants: userPlants}, 200);
    }
    
}

export const uploadUserPlantImage = async (request, response) => {


}
