import * as awaitAsync from 'await-to-js';
import parseError from 'parse-error';

export const to = async (promise) => {
    let error, response;

    [error, response] = await awaitAsync.to(promise);

    if(error) {
        return [parseError(error)];
    }

    return [null, response];
};

export const errorResponse = (response, error, code) => {
    if(typeof error == 'object' && typeof error.message != 'undefined'){
        error = error.message;
    }

    if(typeof code !== 'undefined') {
        response.statusCode = code;
    }

    return response.json({success:false, error: error});
};

export const successResponse = function(response, data, code){ 
    let sendData = {success:true};

    if(typeof data == 'object'){
        sendData = Object.assign(data, sendData);
    }

    if(typeof code !== 'undefined') {
        response.statusCode = code;
    }

    return response.json(sendData)
};

export const throwError = (errorMessage, log) => {

    if(!errorMessage) {
        return;
    } else if (errorMessage && errorMessage.message) {
        errorMessage = errorMessage.message;
    }

    if(log === true){
        console.error(errorMessage);
    }

    throw new Error(errorMessage);
};