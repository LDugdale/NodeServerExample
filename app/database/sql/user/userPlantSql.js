export const insertUserPlant = 'INSERT INTO usersplants SET ?';

export const getUserPlants = `
    WITH FirstName AS (
        SELECT 
            plantId,
            name
        FROM plantnames
        GROUP BY plantId
    )
    SELECT
        up.usersPlantsId,
        up.nickname,
        p.latinName,
        fn.name    
    FROM usersplants up 
        INNER JOIN FirstName fn ON fn.plantId = up.plantId
        INNER JOIN plants p ON p.plantId = up.plantId
    WHERE up.userId = ?
`;

export const getUserPlant = `
    WITH names AS (
        SELECT 
            plantId,
            nameType,
            name
        FROM plantnames
    )
    SELECT
        up.usersPlantsId,
        up.nickname,
        p.latinName,
        n.nameType,
        n.name    
    FROM usersplants up 
        INNER JOIN names n ON n.plantId = up.plantId
        INNER JOIN plants p ON p.plantId = up.plantId
    WHERE up.usersPlantsId = ?
`;