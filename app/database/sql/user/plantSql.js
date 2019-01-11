import mysql from 'mysql';

export const searchPlants = (searchText) => {
    const sql = `
        WITH  PlantIds AS
        (
            SELECT
                p.plantId
            FROM plants p 
                INNER JOIN plantNames pn ON pn.plantId = p.plantId
            WHERE (p.latinName LIKE ` + mysql.escape('%' + searchText + '%') + `
                OR pn.name LIKE ` + mysql.escape('%' + searchText + '%') + `)
            LIMIT 10
        )
        SELECT
            p.plantId,
            p.latinName,
            p.genus,
            pn.name,
            pn.nameType
        FROM plants p 
            INNER JOIN PlantIds pi ON p.plantId = pi.plantId
            INNER JOIN plantNames pn ON p.PlantId = pn.plantId
        ORDER BY p.plantId ASC;    
    `;
    return sql;
}

export const insertPlant = 'INSERT INTO plants SET ?';

export const insertPlantName = (plant, plantId) => {
    const sql = `
        INSERT INTO plantNames (plantId, name, nameType)
        VALUES (` + mysql.escape(plantId) + `, ` + mysql.escape(plant.name) + `, ` + mysql.escape(plant.nameType) + `)
    `;
    return sql;
}

export const insertPlantExtraInfo = (plant, plantId) => {
    const sql = `
        INSERT INTO plantInformation (plantId, information, value)
        VALUES (` + mysql.escape(plantId) + `, ` + mysql.escape(plant.information) + `, ` + mysql.escape(plant.value) + `)
    `;
    return sql;
}