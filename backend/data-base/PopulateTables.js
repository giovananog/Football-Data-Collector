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

const jsonDataTopGoalscorers = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/top_goalscorers_dict.json', 'utf8'));

async function populateTableTopGoalscorers() {
    try {
        for (const [year, playerInfo] of Object.entries(jsonDataTopGoalscorers)) {
            await pool.query(`
                INSERT INTO top_goalscorers (player_id, season, table_position, name, position, age, appearances, assists, penalty_kicks, minutes_played, minutes_per_goal, goals_per_match, goals, image)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                [
                    cleanData(playerInfo["ID"]), 
                    year,
                    cleanData(playerInfo["Table Position"]),
                    cleanData(playerInfo["Name"]),
                    cleanData(playerInfo["Position"]),
                    cleanData(playerInfo["Age"]),
                    cleanData(playerInfo["Appearances"]),
                    cleanData(playerInfo["Assists"]),
                    cleanData(playerInfo["Penalty Kicks"]),
                    cleanData(playerInfo["Minutes Played"]),
                    cleanData(playerInfo["Minutes per Goal"]),
                    cleanData(playerInfo["Minutes per Match"]),
                    cleanData(playerInfo["Goals"]),
                    cleanData(playerInfo["Image"]
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

