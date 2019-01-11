import { command, userSql } from '../database';
import { throwError, to } from '../services/controllerService.js';


export const createUser = async (user) => {
    let error, result;

    [error, result] = await to(command.query(userSql.insertUser(user), user));

    throwError(error);

    if(result.insertId === 0) {
        throwError('User already exists');
    }

    return result.insertId;
}

export const findUserById = async (userId) => {
    let error, user;

    [error, user] = await to(command.query(userSql.selectUserById, userId))

    throwError(error);

    if(!user[0]){
        throwError('User not found!')
    }

    return user[0];
}

export const findUserByEmail = async (username) => {
    let error, user;

    [error, user] = await to(command.query(userSql.selectUserByEmail, username))

    throwError(error);

    if(!user[0]){
        throwError('User not found!')
    }

    return user[0];
}