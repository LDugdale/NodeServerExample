import mysql from 'mysql';


export const insertUser = (user) => {
    const sql =  `
        INSERT INTO Users (username, email, password)
        SELECT ` + mysql.escape(user.username) + `, ` + mysql.escape(user.email) + `, ` + mysql.escape(user.password) + `
        WHERE NOT EXISTS(
            SELECT 
                email,
                username,
                password
            FROM Users
            WHERE username = ` + mysql.escape(user.username) + ` OR email = ` + mysql.escape(user.email) + `
            LIMIT 1
        );
    `

    return sql;
};

export const selectUserById = `
    SELECT 
        userId,
        username,
        email,
        password
    FROM Users
    WHERE userId = ?
`;

export const selectUserByEmail = `
    SELECT 
        userId,
        username,
        email,
        password
    FROM Users
    WHERE email = ?
`;
