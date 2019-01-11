import { createJWT, readJWT } from '../middleware/passport-jwt';
import CONFIG from '../config/config';

export const createToken = (userId) => {
    let expirationTime = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + createJWT(userId, CONFIG.jwt_encryption, expirationTime);
}

export const readToken = (bearerToken) => {
    let token = bearerToken.split(' ');
    return readJWT(token[1]);
}