import pool from "./connect.js";
import fs from "fs";

async function getAllPlayers() {
    const query = 'SELECT * FROM player';
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogadores:', err);
        throw err;
    }
}

async function getAllTeams() {
    const query = 'SELECT * FROM team'; 
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter times:', err);
        throw err;
    }
}

async function getAllMatches() {
    const query = 'SELECT * FROM match'; 
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos:', err);
        throw err;
    }
}

async function getAllPlayerfromMatch(matchId) {
    const query = 'SELECT * FROM match_player WHERE match_id = $1';
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter times:', err);
        throw err;
    }
}


async function getMatchStats(matchId) {
    const query = `
        SELECT * FROM match_stats WHERE match_id = $1
    `;
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows;
    } catch (err) {
        console.error(`Erro ao obter estatísticas da partida ${matchId}:`, err);
        throw err;
    }
}

async function getPlayerById(playerId) {
    const query = 'SELECT * FROM player WHERE id = $1'; 
    try {
        const res = await pool.query(query, [playerId]);
        return res.rows[0]; 
    } catch (err) {
        console.error(`Erro ao obter jogador com ID ${playerId}:`, err);
        throw err;
    }
}

async function getTeamById(teamId) {
    const query = 'SELECT * FROM team WHERE id = $1'; 
    try {
        const res = await pool.query(query, [teamId]);
        return res.rows[0]; 
    } catch (err) {
        console.error(`Erro ao obter time com ID ${teamId}:`, err);
        throw err;
    }
}

async function getMatchById(matchId) {
    const query = 'SELECT * FROM match WHERE id = $1'; 
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows[0]; 
    } catch (err) {
        console.error(`Erro ao obter jogo com ID ${matchId}:`, err);
        throw err;
    }
}

async function getMatchesByDate(date) {
    const query = 'SELECT * FROM matches WHERE matchday = $1'; 
    try {
        const res = await pool.query(query, [date]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter jogos na data ${date}:`, err);
        throw err;
    }
}

async function getMatchStatsByTeam(matchId, teamId) {
    const query = `
        SELECT * FROM match_stats WHERE match_id = $1 AND team_id = $2
    `;
    try {
        const res = await pool.query(query, [matchId, teamId]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter estatísticas para a partida ${matchId} e time ${teamId}:`, err);
        throw err;
    }
}

async function getSubstitutionsByMatch(matchId) {

    matchId = parseInt(matchId);
    if (typeof matchId !== 'number') {
        console.error(`matchId deve ser um número, recebido: ${matchId}`);
        throw new Error('matchId inválido');
    }

    const query = `SELECT * FROM substitutions WHERE match_id = $1`;
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter substituições para a partida ${matchId}:`, err);
        throw err;
    }
}


async function getCardsByMatch(matchId) {
    const query = `
        SELECT * FROM cards WHERE match_id = $1
    `;
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter cartões para a partida ${matchId}:`, err);
        throw err;
    }
}

async function getGoalsByMatch(matchId) {
    matchId = parseInt(matchId);
    const query = `
        SELECT * FROM goals WHERE match_id = $1
    `;
    try {
        const res = await pool.query(query, [matchId]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter gols para a partida ${matchId}:`, err);
        throw err;
    }
}

async function getTopGoalscorersByYear(year) {
    const query = `
        SELECT * FROM top_goalscorers WHERE season = $1 
    `;
    try {
        const res = await pool.query(query, [year]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter maiores goleadores para o ano ${year}:`, err);
        throw err;
    }
}

async function getLeagueStandingsByYear(year) {
    const query = `
        SELECT * FROM team_table_stats WHERE season = $1
    `;
    try {
        const res = await pool.query(query, [year]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter classificações para o ano ${year}:`, err);
        throw err;
    }
}

async function getPlayerOfTheYear(year) {
    const query = `
        SELECT * FROM players_of_the_year WHERE season = $1
    `;
    try {
        const res = await pool.query(query, [year]);
        return res.rows.length > 0 ? res.rows[0] : null; 
    } catch (err) {
        console.error(`Erro ao obter Jogador do Ano para o ano ${year}:`, err);
        throw err;
    }
}

async function getRefereeById(refereeId) {
    const query = `
        SELECT * FROM referee WHERE id = $1
    `;
    try {
        const res = await pool.query(query, [refereeId]);
        return res.rows.length > 0 ? res.rows[0] : null; 
    } catch (err) {
        console.error(`Erro ao obter árbitro com ID ${refereeId}:`, err);
        throw err;
    }
}

async function getRefereeStatsById(refereeId) {
    const query = `
        SELECT * FROM referee_matches WHERE referee_id = $1
    `;
    try {
        const res = await pool.query(query, [refereeId]);
        return res.rows; 
    } catch (err) {
        console.error(`Erro ao obter árbitro com ID ${refereeId}:`, err);
        throw err;
    }
}

async function getManagerById(managerId) {
    const query = `
        SELECT * FROM coach WHERE id = $1
    `;
    try {
        const res = await pool.query(query, [managerId]);
        return res.rows.length > 0 ? res.rows[0] : null; 
    } catch (err) {
        console.error(`Erro ao obter gerente com ID ${managerId}:`, err);
        throw err;
    }
}

async function getStadiumById(stadiumId) {
    const query = `
        SELECT * FROM stadium WHERE id = $1
    `;
    try {
        const res = await pool.query(query, [stadiumId]);
        return res.rows.length > 0 ? res.rows[0] : null; 
    } catch (err) {
        console.error(`Erro ao obter estádio com ID ${stadiumId}:`, err);
        throw err;
    }
}

async function getStadiumDetailsById(stadiumId) {
    const query = `
        SELECT * FROM stadium_details WHERE stadium_id = $1
    `;
    try {
        const res = await pool.query(query, [stadiumId]);
        return res.rows.length > 0 ? res.rows[0] : null; 
    } catch (err) {
        console.error(`Erro ao obter estádio com ID ${stadiumId}:`, err);
        throw err;
    }
}

async function getSeasonsCount() {
    const query = 'SELECT DISTINCT(season) AS seasons FROM match';
    try {
        const res = await pool.query(query);
        return res.rowCount; // Retorna o número de anos distintos (temporadas)
    } catch (err) {
        console.error('Erro ao contar as temporadas:', err);
        throw err;
    }
}

async function getRefereesCount() {
    const query = 'SELECT COUNT(*) AS total_referees FROM referee';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_referees, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar os árbitros:', err);
        throw err;
    }
}

async function getManagersCount() {
    const query = 'SELECT COUNT(*) AS total_managers FROM coach';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_managers, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar os managers:', err);
        throw err;
    }
}

async function getStadiumsCount() {
    const query = 'SELECT COUNT(*) AS total_stadiums FROM stadium';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_stadiums, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar os stadiums:', err);
        throw err;
    }
}

async function getDistinctPlayersCount() {
    const query = 'SELECT COUNT(DISTINCT id) AS total_players FROM player';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_players, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar os jogadores distintos:', err);
        throw err;
    }
}

async function getMatchesCount() {
    const query = 'SELECT COUNT(*) AS total_matches FROM match';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_matches, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar as partidas:', err);
        throw err;
    }
}

async function getTeamsCount() {
    const query = 'SELECT COUNT(*) AS total_teams FROM team';
    try {
        const res = await pool.query(query);
        return parseInt(res.rows[0].total_teams, 10); // Converte o resultado para um número inteiro
    } catch (err) {
        console.error('Erro ao contar as equipes:', err);
        throw err;
    }
}

async function getMatchesBySeason(season) {
    const query = 'SELECT * FROM match WHERE season = $1';
    try {
        const res = await pool.query(query, [season]);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos pela temporada:', err);
        throw err;
    }
}

async function getStatsfromPlayer(player_id, matchday, result) {
    const query = `SELECT *
    FROM player_stats
    WHERE player_id = $1
      AND matchday = $2
      AND result LIKE $3`;
    try {
        const res = await pool.query(query, [player_id, matchday, result] );
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos pela temporada:', err);
        throw err;
    }
}

async function getStatsPlayer(player_id) {
    const query = `SELECT *
    FROM player_stats
    WHERE player_id = $1`;
    try {
        const res = await pool.query(query, [player_id] );
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos pela temporada:', err);
        throw err;
    }
}

async function getPlayerTeamStats(teamId) {
    const query = 'SELECT * FROM player_team_season WHERE team_id = $1';
    try {
        const res = await pool.query(query, [teamId]);
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos pela temporada:', err);
        throw err;
    }
}

async function getStatsfromPlayer2(player_id, result) {
    const query = `SELECT *
    FROM player_stats
    WHERE player_id = $1
      AND result LIKE $2`;
    try {
        const res = await pool.query(query, [player_id, result] );
        return res.rows;
    } catch (err) {
        console.error('Erro ao obter jogos pela temporada:', err);
        throw err;
    }
}


const jsonDataTables = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/tables.json', 'utf8'));

async function populateTableTable() {
    try {
        for (const [year, teams] of Object.entries(jsonDataTables)) {
            for (const teamInfo of teams) {
                await pool.query(`
                    INSERT INTO team_table_stats (position, season, team_id, matches, wins, draws, losses, goals, goal_difference, points)
                    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    WHERE EXISTS (
                        SELECT 1 FROM team WHERE id = $3
                    )`,
                    [
                        cleanData(teamInfo["Position"]), 
                        year,
                        cleanData(teamInfo["Team ID"]),
                        cleanData(teamInfo["Matches"]),
                        cleanData(teamInfo["Wins"]),
                        cleanData(teamInfo["Draws"]),
                        cleanData(teamInfo["Losses"]),
                        cleanData(teamInfo["Goals"]),
                        cleanData(teamInfo["Goal Difference"]),
                        cleanData(teamInfo["Points"])
                    ]
                );
            }
        }
        console.log('Dados inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
    } finally {
        await pool.end(); 
    }
}

const jsonDataMatch = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/matches.json', 'utf8'));

async function populateTableMatch() {
    try {
        for (const [year, matches] of Object.entries(jsonDataMatch)) {
            for (const [matchId, matchInfo] of Object.entries(matches)) {
                await pool.query(`
                    INSERT INTO match (id, season, score, matchday, fst_coach_id, scnd_coach_id, stadium_id, referee_id, stadium_attendance, first_team_id, second_team_id)
                    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
                    WHERE EXISTS (SELECT 1 FROM team WHERE id = $10)
                    AND EXISTS (SELECT 1 FROM team WHERE id = $11)`,
                    [
                        matchId,  
                        year,
                        matchInfo["score"],
                        matchInfo["matchday"],
                        matchInfo["fst_manager_id"],
                        matchInfo["scnd_manager_id"],
                        matchInfo["stadium_id"],
                        matchInfo["referee_id"],
                        matchInfo["stadium_attendence"],
                        matchInfo["first_team_id"],
                        matchInfo["second_team_id"]
                    ]
                );
            }
        }
        console.log('Dados inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
    } finally {
        await pool.end(); 
    }
}

const jsonDataMatchStats = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/matches.json', 'utf8'));

async function populateTableMatchStats() {
    try {
            for (const [matchYear, matchData] of Object.entries(jsonDataMatchStats)) {
                for (const [matchId, matchDetails] of Object.entries(matchData)) {
                    const matchStats = matchDetails['match_stats'];
                    
                    if(matchStats) {
                        for (const [teamId, stats] of Object.entries(matchStats)) {
                            
                            await pool.query(`
                            INSERT INTO match_stats (match_id, team_id, total_shots, shots_off, shots_saved, corners, free_kicks, fouls, offsides)
                            SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
                            WHERE EXISTS (SELECT 1 FROM match WHERE id = $1)`,
                        [
                            matchId,
                            teamId, 
                            stats['total_shots'],
                            stats['shots_off'],
                            stats['shots_saved'],
                            stats['corners'],
                            stats['free_kicks'],
                            stats['fouls'],
                            stats['offsides']
                        ]
                    );
                }
        
                }
            }
        }
        console.log('Dados inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
    } finally {
        await pool.end(); 
    }
}

const jsonDataCards = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/matches.json', 'utf8'));

async function populateTableCards() {
    try {
        for (const [matchYear, matchData] of Object.entries(jsonDataCards)) {
            for (const [matchId, matchDetails] of Object.entries(matchData)) {
                
                const cardsList = matchDetails['cards_list'];
                if (cardsList && cardsList.length > 0) {
                    for (const card of cardsList) {
                        await pool.query(`
                            INSERT INTO cards (match_id, team_id, player_id, card_type, reason, minute)
                            SELECT $1, $2, $3, $4, $5, $6
                            WHERE EXISTS (SELECT 1 FROM team WHERE id = $2)
                            AND EXISTS (SELECT 1 FROM player WHERE id = $3)
                            AND EXISTS (SELECT 1 FROM match WHERE id = $1)`,
                            [
                                matchId,
                                card["Team ID"],
                                card["Player ID"],
                                card["Card Type"], 
                                card["Reason"],
                                card["Minute"]
                            ]
                        );
                    }
                }
            }
        }
        console.log('Dados de cartões inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados de cartões:', err);
    } finally {
        await pool.end();
    }
}

const jsonDataSubstitutions = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/matches.json', 'utf8'));

async function populateTableSubstitutions() {
    try {
        for (const [matchYear, matchData] of Object.entries(jsonDataSubstitutions)) {
            for (const [matchId, matchDetails] of Object.entries(matchData)) {
                if (matchDetails["substitutions_list"]) {
                    for (const substitution of matchDetails["substitutions_list"]) {
                        await pool.query(`
                            INSERT INTO substitutions (match_id, minute, type, substituted_player_id, substitution_player_id, team_id)
                            SELECT $1, $2, $3, $4, $5, $6
                            WHERE EXISTS (SELECT 1 FROM team WHERE id = $6)
                            AND EXISTS (SELECT 1 FROM player WHERE id = $4)
                            AND EXISTS (SELECT 1 FROM player WHERE id = $5)
                            AND EXISTS (SELECT 1 FROM match WHERE id = $1)`,
                            [
                                matchId,
                                substitution["Minute"],
                                substitution["Type"],
                                substitution["Substituted ID"],
                                substitution["Substitution ID"],
                                substitution["Team ID"]
                            ]
                        );
                    }
                }
            }
        }
        console.log('Substituições inseridas com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados de substituições:', err);
    } finally {
        await pool.end();
    }
}

const jsonDataGoals = JSON.parse(fs.readFileSync('../../scraping/transfermarket/data/matches.json', 'utf8'));

async function populateTableGoals() {
    try {
        for (const [matchYear, matchData] of Object.entries(jsonDataGoals)) {
            for (const [matchId, matchDetails] of Object.entries(matchData)) {
                if (matchDetails["goals_list"]) {
                    for (const goal of matchDetails["goals_list"]) {
                        await pool.query(`
                            INSERT INTO goals (match_id, team_id, scorer_id, shot_type, minute, assist_player_id, assisr_type)
                            SELECT 
                                $1, $2, $3, $4, $5, 
                                (SELECT id FROM player WHERE id = $6 LIMIT 1),
                                $7
                            WHERE EXISTS (SELECT 1 FROM team WHERE id = $2)
                            AND EXISTS (SELECT 1 FROM player WHERE id = $3)
                            AND EXISTS (SELECT 1 FROM match WHERE id = $1);`,
                            [
                                matchId,
                                goal["Team ID"],
                                goal["Scorer Player ID"],
                                goal["Shot Type"],
                                goal["Minute"],
                                goal["Assist Player ID"] || null,
                                goal["Assist Type"]
                            ]
                        );
                    }
                }
            }
        }
        console.log('Dados de gols inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados de gols:', err);
    } finally {
        await pool.end();
    }
}




export {
    getAllPlayers, getAllTeams, getAllMatches, getMatchStats, closeConnection, getGoalsByMatch,
    getCardsByMatch, getSubstitutionsByMatch, getMatchStatsByTeam, getMatchesByDate, getMatchById,
    getTeamById, getPlayerById, getTopGoalscorersByYear, getLeagueStandingsByYear, getPlayerOfTheYear,
    getRefereeById, getManagerById, getStadiumById, getStadiumDetailsById, getSeasonsCount,
    getRefereesCount, getManagersCount, getStadiumsCount, getDistinctPlayersCount, getMatchesCount,
    getTeamsCount, getMatchesBySeason, getRefereeStatsById, getAllPlayerfromMatch, getStatsfromPlayer, getPlayerTeamStats,
    getStatsPlayer, getStatsfromPlayer2, populateTableTable, populateTableMatch, populateTableMatchStats,
    populateTableCards, populateTableSubstitutions, populateTableGoals
};
    
    // Exemplo de fechamento da conexão com o banco
    async function closeConnection() {
        await pool.end();
    }