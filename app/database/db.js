
import { createConnection } from 'mysql';

//local mysql db connection
const dbConnection = createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'planted'
});

dbConnection.connect(function(err) {
    if (err) throw err;
});

export default dbConnection;