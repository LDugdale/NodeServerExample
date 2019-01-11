import { command, plantSql } from '../database';
import { throwError, to } from '../services/controllerService.js';

export const searchPlants = async (text) => {
    let error, plants;

    [error, plants] = await to(command.query(plantSql.searchPlants(text)))

    throwError(error);

    return plants;
}

export const createPlant = async (plant) => {
    let error, result;

    [error, result] = await to(command.query(plantSql.insertPlant, plant));

    throwError(error);

    return result.insertId;
}

export const createPlantName = async (plant, plantId) => {
    let error, result;

    [error, result] = await to(command.query(plantSql.insertPlantName(plant, plantId), plant));

    throwError(error);

    return result.insertId;
}

export const createPlantExtraInfo = async (plant, plantId) => {
    let error, result;

    [error, result] = await to(command.query(plantSql.insertPlantExtraInfo(plant, plantId), plant));

    throwError(error);

    return result.insertId;
}