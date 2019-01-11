import bcrypt from 'bcrypt';

const HASH_COST = 10;

export const createHash = async (password) => {
    return bcrypt.hash(password, HASH_COST);
}

export const compareHash = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}