import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import * as db from './database.js'; 

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 5000;

app.use(express.json());



app.get('/players', async (req, res) => {
    try {
        const players = await db.getAllPlayers();
        res.json(players);
    } catch (err) {
        res.status(500).send('Erro ao obter jogadores');
        console.error(err)
    }
});

app.get('/teams', async (req, res) => {
    try {
        const teams = await db.getAllTeams();
        res.json(teams);
    } catch (err) {
        res.status(500).send('Erro ao obter times');
    }
});

app.get('/matches', async (req, res) => {
    try {
        const matches = await db.getAllMatches();
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/matches/:id/players', async (req, res) => {
    const matchId = req.params.id;

    try {
        const matches = await db.getAllPlayerfromMatch(matchId);
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/teams/:id/players', async (req, res) => {
    const teamId = req.params.id;

    try {
        const matches = await db.getPlayerTeamStats(teamId);
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/player/:id/stats', async (req, res) => {
    const playerId = req.params.id;

    try {
        const matches = await db.getStatsPlayer(playerId);
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/player/:playerId/:matchday/:score', async (req, res) => {
    const playerId = req.params.playerId;
    const matchday = req.params.matchday;
    const score = req.params.score;

    try {
        const matches = await db.getStatsfromPlayer(playerId, matchday, score);
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/player/:playerId/:score', async (req, res) => {
    const playerId = req.params.playerId;
    const score = req.params.score;

    try {
        const matches = await db.getStatsfromPlayer2(playerId, score);
        res.json(matches);
    } catch (err) {
        res.status(500).send('Erro ao obter jogos');
    }
});

app.get('/matches/:id/stats', async (req, res) => {
    const matchId = req.params.id;
    try {
        const stats = await db.getMatchStats(matchId);
        res.json(stats);
    } catch (err) {
        res.status(500).send(`Erro ao obter estatísticas da partida ${matchId}`);
    }
});

// Rota para obter jogador por ID
app.get('/players/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
      const player = await db.getPlayerById(playerId);
      if (player) {
          res.json(player);
      } else {
          res.status(404).send('Jogador não encontrado');
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter jogador ${playerId}`);
  }
});

// Rota para obter time por ID
app.get('/teams/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
      const team = await db.getTeamById(teamId);
      if (team) {
          res.json(team);
      } else {
          res.status(404).send('Time não encontrado');
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter time ${teamId}`);
  }
});

// Rota para obter jogo por ID
app.get('/matches/:id', async (req, res) => {
  const matchId = req.params.id;
  try {
      const match = await db.getMatchById(matchId);
      if (match) {
          res.json(match);
      } else {
          res.status(404).send('Jogo não encontrado');
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter jogo ${matchId}`);
  }
});

// Rota para obter jogos por data
app.get('/matches/date/:date', async (req, res) => {
  const matchDate = req.params.date;
  try {
      const matches = await db.getMatchesByDate(matchDate);
      res.json(matches);
  } catch (err) {
      res.status(500).send(`Erro ao obter jogos na data ${matchDate}`);
  }
});

// Rota para obter estatísticas de uma partida específica de um time
app.get('/matches/:matchId/stats/:teamId', async (req, res) => {
  const { matchId, teamId } = req.params;
  try {
      const stats = await db.getMatchStatsByTeam(matchId, teamId);
      res.json(stats);
  } catch (err) {
      res.status(500).send(`Erro ao obter estatísticas para a partida ${matchId} e time ${teamId}`);
  }
});

// Rota para obter substituições de uma partida
app.get('/matches/:matchId/substitutions', async (req, res) => {
  const matchId = req.params.matchId;
  try {
      const substitutions = await db.getSubstitutionsByMatch(matchId);
      res.json(substitutions);
  } catch (err) {
      res.status(500).send(`Erro ao obter substituições para a partida ${matchId}`);
  }
});

// Rota para obter cartões de uma partida
app.get('/matches/:matchId/cards', async (req, res) => {
  const matchId = req.params.matchId;
  try {
      const cards = await db.getCardsByMatch(matchId);
      res.json(cards);
  } catch (err) {
      res.status(500).send(`Erro ao obter cartões para a partida ${matchId}`);
  }
});

// Rota para obter gols de uma partida
app.get('/matches/:matchId/goals', async (req, res) => {
  const matchId = req.params.matchId;
  try {
      const goals = await db.getGoalsByMatch(matchId);
      res.json(goals);
  } catch (err) {
      res.status(500).send(`Erro ao obter gols para a partida ${matchId}`);
      console.error(`Erro ao obter gols para a partida ${matchId}:`, err);
  }
});

// Rota para obter os maiores goleadores de um ano específico
app.get('/top-goalscorers/:year', async (req, res) => {
  const year = req.params.year;
  try {
      const topGoalscorers = await db.getTopGoalscorersByYear(year);
      res.json(topGoalscorers);
  } catch (err) {
      res.status(500).send(`Erro ao obter os maiores goleadores para o ano ${year}`);
  }
});

// Rota para obter a classificação da liga de um ano específico
app.get('/table/:year', async (req, res) => {
  const year = req.params.year;
  try {
      const standings = await db.getLeagueStandingsByYear(year);
      res.json(standings);
  } catch (err) {
      console.error(err)
      res.status(500).send(`Erro ao obter classificações para o ano ${year}`);
  }
});

// Rota para obter o Jogador do Ano de um ano específico
app.get('/player-of-the-year/:year', async (req, res) => {
  const year = req.params.year;
  try {
      const player = await db.getPlayerOfTheYear(year);
      if (player) {
          res.json(player);
      } else {
          res.status(404).send(`Jogador do Ano para o ano ${year} não encontrado`);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(`Erro ao obter Jogador do Ano para o ano ${year}`);
  }
});


// Rota para obter um árbitro pelo ID
app.get('/referee/:id', async (req, res) => {
  const refereeId = req.params.id;
  try {
      const referee = await db.getRefereeById(refereeId);
      if (referee) {
          res.json(referee);
      } else {
          res.status(404).send(`Árbitro com ID ${refereeId} não encontrado`);
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter árbitro com ID ${refereeId}`);
  }
});


// Rota para obter um gerente pelo ID
app.get('/manager/:id', async (req, res) => {
  const managerId = req.params.id;
  try {
      const manager = await db.getManagerById(managerId);
      if (manager) {
          res.json(manager);
      } else {
          res.status(404).send(`Gerente com ID ${managerId} não encontrado`);
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter gerente com ID ${managerId}`);
  }
});

// Rota para obter um estádio pelo ID
app.get('/stadium/:id', async (req, res) => {
  const stadiumId = req.params.id;
  try {
      const stadium = await db.getStadiumById(stadiumId);
      if (stadium) {
          res.json(stadium);
      } else {
          res.status(404).send(`Estádio com ID ${stadiumId} não encontrado`);
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter estádio com ID ${stadiumId}`);
  }
});

app.get('/stadium-details/:id', async (req, res) => {
  const stadiumId = req.params.id;
  try {
      const stadium = await db.getStadiumDetailsById(stadiumId);
      if (stadium) {
          res.json(stadium);
      } else {
          res.status(404).send(`Estádio com ID ${stadiumId} não encontrado`);
      }
  } catch (err) {
      res.status(500).send(`Erro ao obter estádio com ID ${stadiumId}`);
  }
});

app.get('/seasons-count', async (req, res) => {
    try {
        const seasonsCount = await db.getSeasonsCount();
        res.json({ seasons: seasonsCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de temporadas' });
    }
});

app.get('/referees-count', async (req, res) => {
    try {
        const refereesCount = await db.getRefereesCount();
        res.json({ referees: refereesCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de árbitros' });
    }
});

app.get('/managers-count', async (req, res) => {
    try {
        const managersCount = await db.getManagersCount();
        res.json({ managers: managersCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de managers' });
    }
});

app.get('/stadiums-count', async (req, res) => {
    try {
        const stadiumsCount = await db.getStadiumsCount();
        res.json({ stadiums: stadiumsCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de stadiums' });
    }
});

app.get('/players-count', async (req, res) => {
    try {
        const playersCount = await db.getDistinctPlayersCount();
        res.json({ players: playersCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de jogadores distintos' });
    }
});

app.get('/matches-count', async (req, res) => {
    try {
        const matchesCount = await db.getMatchesCount();
        res.json({ matches: matchesCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de partidas' });
    }
});

app.get('/teams-count', async (req, res) => {
    try {
        const teamsCount = await db.getTeamsCount();
        res.json({ teams: teamsCount });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter a quantidade de equipes' });
    }
});

// Rota para obter jogos pela temporada
app.get('/matches/season/:season', async (req, res) => {
    const season = req.params.season;
    try {
        const matches = await db.getMatchesBySeason(season);
        if (matches.length > 0) {
            res.json(matches);
        } else {
            res.status(404).send('Nenhum jogo encontrado para esta temporada');
        }
    } catch (err) {
        res.status(500).send(`Erro ao obter jogos da temporada ${season}`);
    }
  });

app.get('/referee/:id/matches', async (req, res) => {
    const id = req.params.id;
    try {
        const matches = await db.getRefereeStatsById(id);
        if (matches.length > 0) {
            res.json(matches);
        } else {
            res.status(404).send('Nenhum jogo encontrado para esta temporada');
        }
    } catch (err) {
        res.status(500).send(`Erro ao obter jogos da temporada `);
    }
  });

app.post('/populate-table', async (req, res) => {
    try {
        await db.populateTableTable();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});

app.post('/populate-matches', async (req, res) => {
    try {
        await db.populateTableMatch();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});
  
app.post('/populate-matches-subs', async (req, res) => {
    try {
        await db.populateTableSubstitutions();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});

app.post('/populate-matches-stats', async (req, res) => {
    try {
        await db.populateTableMatchStats();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});

app.post('/populate-matches-cards', async (req, res) => {
    try {
        await db.populateTableCards();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});

app.post('/populate-matches-goals', async (req, res) => {
    try {
        await db.populateTableGoals();
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir dados: ' + error.message);
    }
});




app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});