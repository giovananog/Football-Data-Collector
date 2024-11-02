import pool from "./connect.js";


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
    const query = `
        SELECT * FROM substitutions WHERE match_id = $1
    `;
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



export {
    getAllPlayers,
    getAllTeams,
    getAllMatches,
    getMatchStats,
    closeConnection,
    getGoalsByMatch,
    getCardsByMatch,
    getSubstitutionsByMatch,
    getMatchStatsByTeam,
    getMatchesByDate,
    getMatchById,
    getTeamById,
    getPlayerById,
    getTopGoalscorersByYear,
    getLeagueStandingsByYear,
    getPlayerOfTheYear,
    getRefereeById,
    getManagerById,
    getStadiumById,
    getStadiumDetailsById
};
    
async function closeConnection() {
        await pool.end();
    }