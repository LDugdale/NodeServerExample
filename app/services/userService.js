import * as userModel from '../model/userModel';
import validator from 'validator';
import { to, throwError } from './controllerService';
import { createHash, compareHash } from '../middleware/bcrypt';

export const createUser = async (userInfo) => {
    let hashError, userId, createUserError;
    
    CheckCredentialsAreValid(userInfo);

    [hashError, userInfo.password] = await to(createHash(userInfo.password));

    if(hashError){
        throwError(hashError)
    }

    [createUserError, userId] = await to(userModel.createUser(userInfo));

    if(createUserError){
        throwError(createUserError)
    }

    userInfo.userId = userId;

    return userInfo;
}

export const authUser = async (email, password) => {

    const userInfo = {
        username: ' ',
        email: email,
        password: password
    };

    CheckCredentialsAreValid(userInfo);

    let user, userError, passwordsMatch, passwordError;

    [userError, user] = await to(userModel.findUserByEmail(email));

    if(userError) {
        throwError(userError.message);
    }

    [passwordError, passwordsMatch] = await to(compareHash(password, user.password));

    if (passwordError) {
        throwError(passwordError.message);
    }

    if (!passwordsMatch){
        throwError('Password is incorrect.')
    }

    return user;
}

const CheckCredentialsAreValid = (userInfo) => {
    let errorString;    

    if (userInfo.email && !validator.isEmail(userInfo.email)) {
        errorString = 'A valid email was not entered. '
    } else if (!userInfo.email){
        errorString = 'An email was not entered. ';
    } else if (!userInfo.username) {
        errorString = 'A username was not entered. ';
    } else if (!userInfo.password){
        errorString = 'A password was not entered. ';
    }

    if(errorString){
        throwError(errorString)
    }
}
