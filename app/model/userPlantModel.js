import { command, userPlantSql } from '../database';
import { throwError, to } from '../services/controllerService.js';

export const createUserPlant = async (userPlant) => {
    let error, result;

    [error, result] = await to(command.query(userPlantSql.insertUserPlant, userPlant));

    throwError(error);

    return result.insertId;
}

export const getUserPlants = async (userId) => {
    let error, userPlants;

    [error, userPlants] = await to(command.query(userPlantSql.getUserPlants, userId));

    throwError(error);

    return userPlants;
}

export const getUserPlant = async (userPlantId) => {
    let error, userPlants;

    [error, userPlants] = await to(command.query(userPlantSql.getUserPlant, userPlantId));

    throwError(error);

    return userPlants;
}