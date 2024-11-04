const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',        
    database: 'FootballDataTHM',    
    password: process.env.DB_PASS,    
    port: 5432,               
});

function cleanData(value) {
    if (value === null || value === undefined) return null; 
    return value.replace(/\\u00[a-f0-9]{2}/g, (match) => String.fromCharCode(parseInt(match.replace(/\\u00/, ''), 16)))
                .trim()
                .replace(/\s+/g, ' '); 
}


// const jsonDataPlayer = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/players.json', 'utf8'));

// async function populateTablePlayer() {
//     try {
//         for (const [year, players] of Object.entries(jsonDataPlayer)) {
//             for (const [playerID, playerInfo] of Object.entries(players)) {
//                 await pool.query(`
//                     INSERT INTO player (id, name, age, city, country, height, position, image, season)
//                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//                     ON CONFLICT (id) DO NOTHING;`,
//                     [
//                         playerID,
//                         cleanData(playerInfo["Name"]),
//                         cleanData(playerInfo["Age"]),
//                         cleanData(playerInfo["City"]),
//                         cleanData(playerInfo["Country"]),
//                         cleanData(playerInfo["Height"]),
//                         cleanData(playerInfo["Position"]),
//                         cleanData(playerInfo["Image"]),
//                         year
//                     ]
//                 );
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTablePlayer();

// const jsonData = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/player_of_the_year.json', 'utf8'));

// async function populateTablePlayerOfTheYear() {
//     try {
//         for (const [year, playerInfo] of Object.entries(jsonData)) {
//             await pool.query(`
//                 INSERT INTO players_of_the_year (player_id, season, name, position, player_image_1, player_image_2, team_image, national_image)
//                 SELECT $1, $2, $3, $4, $5, $6, $7, $8
//                 WHERE EXISTS (SELECT 1 FROM player WHERE id = $1)`,
//                 [
//                     cleanData(playerInfo["Player ID"]), 
//                     year,
//                     cleanData(playerInfo["Name"]),
//                     cleanData(playerInfo["Position"]),
//                     cleanData(playerInfo["Image 1"]),
//                     cleanData(playerInfo["Image 2"]),
//                     cleanData(playerInfo["Team Image"]),
//                     cleanData(playerInfo["Nat"])
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTablePlayerOfTheYear()

// const jsonDataTopGoalscorers = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/top_goalscorers.json', 'utf8'));

// async function populateTableTopGoalscorers() {
//     try {
//         for (const [year, players] of Object.entries(jsonDataTopGoalscorers)) {
//             for (const playerInfo of players) {
//                 await pool.query(`
//                     INSERT INTO top_goalscorers (player_id, season, table_position, name, position, age, appearances, assists, penalty_kicks, minutes_played, minutes_per_goal, goals_per_match, goals, image)
//                     SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
//                     WHERE EXISTS (SELECT 1 FROM player WHERE id = $1)`,
//                     [
//                         cleanData(playerInfo["ID"]),
//                         year,
//                         cleanData(playerInfo["Table Position"]),
//                         cleanData(playerInfo["Name"]),
//                         cleanData(playerInfo["Position"]),
//                         cleanData(playerInfo["Age"]),
//                         cleanData(playerInfo["Appearances"]),
//                         cleanData(playerInfo["Assists"]),
//                         cleanData(playerInfo["Penalty Kicks"]),
//                         cleanData(playerInfo["Minutes Played"]),
//                         cleanData(playerInfo["Minutes per Goal"]),
//                         cleanData(playerInfo["Goals per Match"]),
//                         cleanData(playerInfo["Goals"]),
//                         cleanData(playerInfo["Image"])
//                     ]
//                 );
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end();
//     }
// }

// populateTableTopGoalscorers()


// const jsonDataStadiums = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/stadiums.json', 'utf8'));

// async function populateTableStadiums() {
//     try {
//         for (const [year, playerInfo] of Object.entries(jsonDataStadiums)) {
//             await pool.query(`
//                 INSERT INTO stadium (id, name)
//                 VALUES ($1, $2)`,
//                 [
//                     year,
//                     playerInfo["name"]
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableStadiums()    


// const jsonDataStadiumsDetails = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/stadiums.json', 'utf8'));

// async function populateTableStadiumsDetails() {
//     try {
//         for (const [year, playerInfo] of Object.entries(jsonDataStadiumsDetails)) {
//             await pool.query(`
//                 INSERT INTO stadium_details (stadium_id, capacity, boxes, box_seats, built, formerly, undersoil_heating, running_track, surface, pitch_size, address, image, team_image, tel )
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
//                 [
//                     year,
//                     cleanData(playerInfo["capacity"]), 
//                     cleanData(playerInfo["boxes"]),
//                     cleanData(playerInfo["box_seats"]),
//                     cleanData(playerInfo["built"]),
//                     cleanData(playerInfo["formerly"]),
//                     cleanData(playerInfo["undersoil_heating"]),
//                     cleanData(playerInfo["running_track"]),
//                     cleanData(playerInfo["surface"]),
//                     cleanData(playerInfo["pitch_size"]),
//                     cleanData(playerInfo["address"]),
//                     cleanData(playerInfo["Image"]),
//                     cleanData(playerInfo["Team Image"]),
//                     cleanData(playerInfo["tel"]),
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableStadiumsDetails()   


// const jsonDataCoach = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/managers.json', 'utf8'));

// async function populateTableCoach() {
//     try {
//         for (const [coach_id, playerInfo] of Object.entries(jsonDataCoach)) {
//             await pool.query(`
//                 INSERT INTO coach (id, age, name, birth_place, country, formation, coaching_license, avg_term, actual_team, img_url)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
//                 [
//                     coach_id,
//                     cleanData(playerInfo["age"]), 
//                     cleanData(playerInfo["name"]), 
//                     cleanData(playerInfo["birth"]),
//                     cleanData(playerInfo["country"]),
//                     cleanData(playerInfo["formation"]),
//                     cleanData(playerInfo["coaching_license"]),
//                     cleanData(playerInfo["avg_term"]),
//                     cleanData(playerInfo["actual_team"]),
//                     cleanData(playerInfo["img"])
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableCoach()   


// const jsonDataCoachReferee = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/referees.json', 'utf8'));

// async function populateTableReferee() {
//     try {
//         for (const [referee_id, playerInfo] of Object.entries(jsonDataCoachReferee)) {
//             await pool.query(`
//                 INSERT INTO referee (id, name, date_of_birth, citizenship, first_competition_debut, image)
//                 VALUES ($1, $2, $3, $4, $5, $6)`,
//                 [
//                     referee_id,
//                     playerInfo["Name"], 
//                     playerInfo["date_of_birth_age"], 
//                     playerInfo["citizenship"],
//                     playerInfo["first_league_debut"],
//                     playerInfo["Image"]
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableReferee()


// const jsonDataMatch = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8'));

// async function populateTableMatch() {
//     try {
//         for (const [year, matches] of Object.entries(jsonDataMatch)) {
//             for (const [matchId, matchInfo] of Object.entries(matches)) {
//                 await pool.query(`
//                     INSERT INTO match (id, season, score, matchday, fst_coach_id, scnd_coach_id, stadium_id, referee_id, stadium_attendance, first_team_id, second_team_id)
//                     SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
//                     WHERE EXISTS (SELECT 1 FROM team WHERE id = $10)
//                     AND EXISTS (SELECT 1 FROM team WHERE id = $11)`,
//                     [
//                         matchId,  
//                         year,
//                         matchInfo["score"],
//                         matchInfo["matchday"],
//                         matchInfo["fst_manager_id"],
//                         matchInfo["scnd_manager_id"],
//                         matchInfo["stadium_id"],
//                         matchInfo["referee_id"],
//                         matchInfo["stadium_attendence"],
//                         matchInfo["first_team_id"],
//                         matchInfo["second_team_id"]
//                     ]
//                 );
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableMatch();  



// const jsonDataTables = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/tables.json', 'utf8'));

// async function populateTableTable() {
//     try {
//         for (const [year, teams] of Object.entries(jsonDataTables)) {
//             for (const teamInfo of teams) {
//                 await pool.query(`
//                     INSERT INTO team_table_stats (position, season, team_id, matches, wins, draws, losses, goals, goal_difference, points)
//                     SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
//                     WHERE EXISTS (
//                         SELECT 1 FROM team WHERE id = $3
//                     )`,
//                     [
//                         cleanData(teamInfo["Position"]), 
//                         year,
//                         cleanData(teamInfo["Team ID"]),
//                         cleanData(teamInfo["Matches"]),
//                         cleanData(teamInfo["Wins"]),
//                         cleanData(teamInfo["Draws"]),
//                         cleanData(teamInfo["Losses"]),
//                         cleanData(teamInfo["Goals"]),
//                         cleanData(teamInfo["Goal Difference"]),
//                         cleanData(teamInfo["Points"])
//                     ]
//                 );
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableTable(); 


// const jsonDataTeam = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/teams.json', 'utf8'));

// async function populateTableTeam() {
//     try {
//         for (const [teamId, yearsData] of Object.entries(jsonDataTeam)) {
//                 if (yearsData["General"]) {
//                     const generalInfo = yearsData["General"];
//                     const info = generalInfo["Info"];

//                     await pool.query(`
//                         INSERT INTO team (id, squad_size, average_age, foreigners, national_team_players, stadium, address, tel, website, founded, members)
//                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//                         [
//                             teamId,
//                             generalInfo["Squad Size"],
//                             generalInfo["Average age:"],  
//                             generalInfo["Foreigners"],
//                             generalInfo["National team players"],
//                             generalInfo["Stadium"],
//                             info["Address"],
//                             info["Tel"],
//                             info["Website"],
//                             info["Founded"],
//                             info["Members"]
//                         ]
//                     );
//                 }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableTeam()     


// const jsonDataRefereeMatches = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/referees.json', 'utf8'));

// async function populateTableRefereeMatches() {
//     try {
//         for (const [refereeId, refereeData] of Object.entries(jsonDataRefereeMatches)) {
//             if (refereeData.Matches) {
//                 for (const matches of Object.values(refereeData.Matches)) {
//                     for (const match of matches) {
//                         await pool.query(`
//                             INSERT INTO referee_matches (referee_id, matchday, date, home_team, away_team, result, yellow_cards, second_yellow_cards, red_cards, penalty_kicks)
//                             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
//                             [
//                                 refereeId,  
//                                 match.Matchday, 
//                                 match.Date, 
//                                 match["Home Team"], 
//                                 match["Away Team"],
//                                 match["Result"],
//                                 match["Yellow Cards"],
//                                 match["Scnd Yellow Cards"],
//                                 match["Red Cards"],
//                                 match["Penalty Kicks"]
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableRefereeMatches();


// function cleanPlayerStatsData(value) {
//     if (value == "-" || value == "") return null
//     else return value
// }

// function cleanPlayerStatsDataMinute(value) {
//     typeof value === 'string' ? value.split("'")[0] : null;
// }

// const jsonDataPlayerStats = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/players.json', 'utf8'));

// async function populateTablePlayerStats() {
//     try {
//         for (const [year, players] of Object.entries(jsonDataPlayerStats)) {
//             for (const [playerId, playerInfo] of Object.entries(players)) {
//                 if (playerInfo["Match Statistics"]) {
//                     for (const match of playerInfo["Match Statistics"]) {
//                         await pool.query(`
//                             INSERT INTO player_stats (
//                                 player_id, matchday, date, first_team, second_team, result, position_on_matchday, goals, assists, own_goals, 
//                                 yellow_cards, second_yellow_cards, red_yellow_cards, substitutions_on, substitutions_off, minutes_played
//                             ) VALUES (
//                                 $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
//                                 $11, $12, $13, $14, $15, $16
//                             )`,
//                             [
//                                 playerId,
//                                 cleanData(cleanPlayerStatsData(match["Matchday"])),
//                                 cleanData(cleanPlayerStatsData(match["Date"])),
//                                 cleanData(cleanPlayerStatsData(match["First Team"])),
//                                 cleanData(cleanPlayerStatsData(match["Second Team"])),
//                                 cleanData(cleanPlayerStatsData(match["Result"])),
//                                 cleanData(cleanPlayerStatsData(match["Position on Matchday"])), 
//                                 cleanData(cleanPlayerStatsData(match["Goals"])),
//                                 cleanData(cleanPlayerStatsData(match["Assists"])),
//                                 cleanData(cleanPlayerStatsData(match["Own Goals"])),
//                                 cleanData(cleanPlayerStatsData(match["Yellow Cards"])),
//                                 cleanData(cleanPlayerStatsData(match["Second Yellow Cards"])),
//                                 cleanData(cleanPlayerStatsData(match["Red Cards"])),
//                                 cleanData(cleanPlayerStatsData(match["Substitutions on"])),
//                                 cleanData(cleanPlayerStatsData(match["Substitutions off"])),
//                                 cleanData(cleanPlayerStatsData(cleanPlayerStatsDataMinute(match["Minutes Played"])))
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTablePlayerStats();  




// const jsonDataPlayerTeamSeason = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/teams.json', 'utf8'));

// async function populateTablePlayerTeamSeason() {
//     try {
//         for (const [teamId, seasons] of Object.entries(jsonDataPlayerTeamSeason)) {
//             for (const [year, seasonData] of Object.entries(seasons)) {
//                 if (seasonData["Players List"] && seasonData["Players List"].length > 0) {
//                     for (const playerInfo of seasonData["Players List"]) {
//                         await pool.query(`
//                             INSERT INTO player_team_season (season, team_id, number, player_id, image, name, position, birth, height, foot, joined)
//                             SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
//                             WHERE EXISTS (SELECT 1 FROM player WHERE id = $4)`,
//                             [
//                                 year,
//                                 teamId,
//                                 playerInfo["Number"] || null, 
//                                 playerInfo["ID"] || null,
//                                 playerInfo["Image"] || null,
//                                 playerInfo["Name"] || null,
//                                 playerInfo["Position"] || null,
//                                 playerInfo["Birth"] || null,
//                                 playerInfo["Height"] || null,
//                                 playerInfo["Foot"] || null,
//                                 playerInfo["Joined"] || null,
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTablePlayerTeamSeason();    



// const jsonDataMatchStats = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8'));

// async function populateTableMatchStats() {
//     try {
//             for (const [matchYear, matchData] of Object.entries(jsonDataMatchStats)) {
//                 for (const [matchId, matchDetails] of Object.entries(matchData)) {
//                     const matchStats = matchDetails['match_stats'];
                    
//                     if(matchStats) {
//                         for (const [teamId, stats] of Object.entries(matchStats)) {
                            
//                             await pool.query(`
//                             INSERT INTO match_stats (match_id, team_id, total_shots, shots_off, shots_saved, corners, free_kicks, fouls, offsides)
//                             SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
//                             WHERE EXISTS (SELECT 1 FROM match WHERE id = $1)`,
//                         [
//                             matchId,
//                             teamId, 
//                             stats['total_shots'],
//                             stats['shots_off'],
//                             stats['shots_saved'],
//                             stats['corners'],
//                             stats['free_kicks'],
//                             stats['fouls'],
//                             stats['offsides']
//                         ]
//                     );
//                 }
        
//                 }
//             }
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableMatchStats()



// const jsonDataCards = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8'));

// async function populateTableCards() {
//     try {
//         for (const [matchYear, matchData] of Object.entries(jsonDataCards)) {
//             for (const [matchId, matchDetails] of Object.entries(matchData)) {
                
//                 const cardsList = matchDetails['cards_list'];
//                 if (cardsList && cardsList.length > 0) {
//                     for (const card of cardsList) {
//                         await pool.query(`
//                             INSERT INTO cards (match_id, team_id, player_id, card_type, reason, minute)
//                             SELECT $1, $2, $3, $4, $5, $6
//                             WHERE EXISTS (SELECT 1 FROM team WHERE id = $2)
//                             AND EXISTS (SELECT 1 FROM player WHERE id = $3)
//                             AND EXISTS (SELECT 1 FROM match WHERE id = $1)`,
//                             [
//                                 matchId,
//                                 card["Team ID"],
//                                 card["Player ID"],
//                                 card["Card Type"], 
//                                 card["Reason"],
//                                 card["Minute"]
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados de cartões inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados de cartões:', err);
//     } finally {
//         await pool.end();
//     }
// }

// populateTableCards();  


// const jsonDataSubstitutions = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8'));

// async function populateTableSubstitutions() {
//     try {
//         for (const [matchYear, matchData] of Object.entries(jsonDataSubstitutions)) {
//             for (const [matchId, matchDetails] of Object.entries(matchData)) {
//                 if (matchDetails["substitutions_list"]) {
//                     for (const substitution of matchDetails["substitutions_list"]) {
//                         await pool.query(`
//                             INSERT INTO substitutions (match_id, minute, type, substituted_player_id, substitution_player_id, team_id)
//                             SELECT $1, $2, $3, $4, $5, $6
//                             WHERE EXISTS (SELECT 1 FROM team WHERE id = $6)
//                             AND EXISTS (SELECT 1 FROM player WHERE id = $4)
//                             AND EXISTS (SELECT 1 FROM player WHERE id = $5)
//                             AND EXISTS (SELECT 1 FROM match WHERE id = $1)`,
//                             [
//                                 matchId,
//                                 substitution["Minute"],
//                                 substitution["Type"],
//                                 substitution["Substituted ID"],
//                                 substitution["Substitution ID"],
//                                 substitution["Team ID"]
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Substituições inseridas com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados de substituições:', err);
//     } finally {
//         await pool.end();
//     }
// }

// populateTableSubstitutions()  


// const jsonDataGoals = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8'));

// async function populateTableGoals() {
//     try {
//         for (const [matchYear, matchData] of Object.entries(jsonDataGoals)) {
//             for (const [matchId, matchDetails] of Object.entries(matchData)) {
//                 if (matchDetails["goals_list"]) {
//                     for (const goal of matchDetails["goals_list"]) {
//                         await pool.query(`
//                             INSERT INTO goals (match_id, team_id, scorer_id, shot_type, minute, assist_player_id, assisr_type)
//                             SELECT 
//                                 $1, $2, $3, $4, $5, 
//                                 (SELECT id FROM player WHERE id = $6 LIMIT 1),
//                                 $7
//                             WHERE EXISTS (SELECT 1 FROM team WHERE id = $2)
//                             AND EXISTS (SELECT 1 FROM player WHERE id = $3)
//                             AND EXISTS (SELECT 1 FROM match WHERE id = $1);`,
//                             [
//                                 matchId,
//                                 goal["Team ID"],
//                                 goal["Scorer Player ID"],
//                                 goal["Shot Type"],
//                                 goal["Minute"],
//                                 goal["Assist Player ID"] || null,
//                                 goal["Assist Type"]
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados de gols inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados de gols:', err);
//     } finally {
//         await pool.end();
//     }
// }

// populateTableGoals()  


// const jsonDataCoachSeason = JSON.parse(fs.readFileSync('../scraping/managers.json', 'utf8'));

// async function populateTableCoachSeason() {
//     try {
//         for (const [year, playerInfo] of Object.entries(jsonDataStadiumsDetails)) {
//             await pool.query(`
//                 INSERT INTO top_goalscorers (coach_id, season, team_id, matches, wins, draws, losses, points, ppm, placement)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
//                 [
//                     year,
//                     playerInfo["name"], 
//                     playerInfo["capacity"], 
//                     playerInfo["team_id"],
//                     playerInfo["matches"],
//                     playerInfo["wins"],
//                     playerInfo["draws"],
//                     playerInfo["losts"],
//                     playerInfo["points"],
//                     playerInfo["ppm"],
//                     playerInfo["placement"]
//                 ]
//             );
//         }
//         console.log('Dados inseridos com sucesso!');
//     } catch (err) {
//         console.error('Erro ao inserir dados:', err);
//     } finally {
//         await pool.end(); 
//     }
// } 

// populateTableCoachSeason()  



// const jsonDataMatches = JSON.parse(fs.readFileSync('../scraping/transfermarket/data/matches.json', 'utf8')); 

// async function populateTableMatchPlayer() {
//     try {
//         for (const [year, matches] of Object.entries(jsonDataMatches)) {
//             for (const matchId in matches) {
//                 const match = matches[matchId];

//                 if (match.players_id_list && match.players_id_list.length > 0) {
//                     for (const playerId of match.players_id_list) {
//                         await pool.query(`
//                             INSERT INTO match_player (player_id, match_id) 
//                             SELECT $1, $2
//                             WHERE EXISTS (SELECT 1 FROM match WHERE id = $2)`,
//                             [
//                                 playerId, 
//                                 matchId   
//                             ]
//                         );
//                     }
//                 }
//             }
//         }
//         console.log('Dados inseridos com sucesso na tabela match_player!');
//     } catch (err) {
//         console.error('Erro ao inserir dados na tabela match_player:', err);
//     } finally {
//         await pool.end(); 
//     }
// }

// populateTableMatchPlayer();
