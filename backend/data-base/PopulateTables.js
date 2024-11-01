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
                    cleanData(playerInfo["Image"])
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

const jsonDataTables = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/table_data.json', 'utf8'));

async function populateTableTables() {
    try {
        for (const [year, playerInfo] of Object.entries(jsonDataTables)) {
            await pool.query(`
                INSERT INTO top_goalscorers (position, team_id, season, name, matches, wins, draws, losses, goals, goal_difference, points)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [
                    cleanData(playerInfo["Position"]), 
                    cleanData(playerInfo["Team ID"]),
                    year,
                    cleanData(playerInfo["Name"]),
                    cleanData(playerInfo["Matches"]),
                    cleanData(playerInfo["Wins"]),
                    cleanData(playerInfo["Draws"]),
                    cleanData(playerInfo["Losses"]),
                    cleanData(playerInfo["Goals"]),
                    cleanData(playerInfo["Goal Difference"]),
                    cleanData(playerInfo["Points"])
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


const jsonDataStadiums = JSON.parse(fs.readFileSync('../scraping/stadiums_dict.json', 'utf8'));

async function populateTableStadiums() {
    try {
        for (const [stadium_id, playerInfo] of Object.entries(jsonDataStadiums)) {
            await pool.query(`
                INSERT INTO top_goalscorers (id, name, team_id)
                VALUES ($1, $2, $3)`,
                [
                    stadium_id,
                    cleanData(playerInfo["name"]), 
                    cleanData(playerInfo["Team ID"])
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

const jsonDataStadiumsDetails = JSON.parse(fs.readFileSync('../scraping/stadiums_dict.json', 'utf8'));

async function populateTableStadiumsDetails() {
    try {
        for (const [year, playerInfo] of Object.entries(jsonDataStadiumsDetails)) {
            await pool.query(`
                INSERT INTO top_goalscorers (stadium_id, name, capacity, boxes, box_seats, built, formely, undersoil_heating, running_track, surface, pitch_size, address, Image, Team Image, tel )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
                [
                    year,
                    cleanData(playerInfo["name"]), 
                    cleanData(playerInfo["capacity"]), 
                    cleanData(playerInfo["boxes"]),
                    cleanData(playerInfo["box_seats"]),
                    cleanData(playerInfo["built"]),
                    cleanData(playerInfo["formely"]),
                    cleanData(playerInfo["undersoil_heating"]),
                    cleanData(playerInfo["running_track"]),
                    cleanData(playerInfo["surface"]),
                    cleanData(playerInfo["pitch_size"]),
                    cleanData(playerInfo["address"]),
                    cleanData(playerInfo["Image"]),
                    cleanData(playerInfo["Team Image"]),
                    cleanData(playerInfo["tel"]),
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

const jsonDataCoach = JSON.parse(fs.readFileSync('../scraping/managers.json', 'utf8'));

async function populateTableCoach() {
    try {
        for (const [year, playerInfo] of Object.entries(jsonDataStadiumsDetails)) {
            await pool.query(`
                INSERT INTO top_goalscorers (id, age, name, birth, country, formation, coaching_license, avg_term, actual_team, img)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [
                    year,
                    cleanData(playerInfo["age"]), 
                    cleanData(playerInfo["name"]), 
                    cleanData(playerInfo["birth"]),
                    cleanData(playerInfo["country"]),
                    cleanData(playerInfo["formation"]),
                    cleanData(playerInfo["coaching_license"]),
                    cleanData(playerInfo["avg_term"]),
                    cleanData(playerInfo["actual_team"]),
                    cleanData(playerInfo["img"])
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
