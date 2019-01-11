import { to, successResponse, errorResponse } from '../services/controllerService';
import { createToken } from '../services/tokenService';
import * as userService from '../services/userService';
import passport from 'passport';

export const createUser = async (request, response) => {
    const userInfo = request.body;

    if(!userInfo.userName && !userInfo.email){
        return errorResponse(response, 'Please enter an email or username to register.');
    } else if(!userInfo.password){
        return errorResponse(response, 'Please enter a password to register.');
    }else{
        let error, user;

        [error, user] = await to(userService.createUser(userInfo));

        if(error) {
            return errorResponse(response, error, 422);
        }

        const token = createToken(userInfo.userId);
        return successResponse(response, {message:'Successfully created new user.', user: user, token: token}, 201);
    }
}

export const login = async (request, response, next) => {  

    passport.authenticate('local', { session: false }, (error, user) => {

        if (error || !user) {
            return errorResponse(response, error, 422);
        }
            
        const token = createToken(user.userId);
        return successResponse(response, {message:'Successfully logged in user.', user: user, token: token}, 201);        

    })(request, response, next);    
}