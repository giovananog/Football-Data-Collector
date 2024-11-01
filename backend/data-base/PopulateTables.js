const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',        
    database: 'FootballData',    
    password: process.env.DB_PASS,    
    port: 5432,               
});

function cleanData(value) {
    if (value === null || value === undefined) return null; 
    return value.replace(/\\u00[a-f0-9]{2}/g, (match) => String.fromCharCode(parseInt(match.replace(/\\u00/, ''), 16)))
                .trim()
                .replace(/\s+/g, ' '); 
}

const jsonData = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/player_of_the_year.json', 'utf8'));

async function populateTablePlayerOfTheYear() {
    try {
        for (const [year, playerInfo] of Object.entries(jsonData)) {
            await pool.query(`
                INSERT INTO players_of_the_year (player_id, season, name, position, player_image_1, player_image_2, team_image, national_image)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    cleanData(playerInfo["Player ID"]), 
                    year,
                    cleanData(playerInfo["Name"]),
                    cleanData(playerInfo["Position"]),
                    cleanData(playerInfo["Image 1"]),
                    cleanData(playerInfo["Image 2"]),
                    cleanData(playerInfo["Team Image"]),
                    cleanData(playerInfo["Nat"])
                ]
            );
        }
        console.log('Dados inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
    } finally {
        await pool.end(); 
    }
}


populateTablePlayerOfTheYear()