import dbConnection from '../db.js';


export const query = (sql, args) => {
    
    return new Promise( ( resolve, reject ) => {

        dbConnection.query( sql, args, ( error, response ) => {

            if (error) {
                return reject(error);
            }
            resolve(response);
        } );
    } );
}