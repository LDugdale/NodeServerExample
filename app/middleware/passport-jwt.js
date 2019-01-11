import jwt from 'jsonwebtoken';

export const createJWT = (userId, encrption, expirationTime) => {
    return jwt.sign({userId:userId}, encrption, {expiresIn: expirationTime});
}

export const readJWT = (token) => {
    return jwt.decode(token);
}