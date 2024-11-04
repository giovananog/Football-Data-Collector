import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import React from 'react';
import api from '../../../api'; // Importe a configuração da API
import { Link } from '@mui/material';

// Componente de tabela de estatísticas de jogadores
export default function PlayerStatsTable(props) {
  const [playerStats, setPlayerStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [match, setMatch] = useState([]);

  React.useEffect(() => {
    api.get(`/matches/${props.matchId}`).then(res => {
      setMatch(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get(`/matches/${props.matchId}/players`).then(res => {
      setPlayers(res.data);
    });
  }, [match]);

  React.useEffect(() => {
    if (players.length > 0 && match) {
      Promise.all(
        players
          .filter(player => player.player_id) // Filtra apenas os jogadores que têm player_id
          .map(player => 
            api.get(`/player/${player.player_id}/${match.matchday}/${match.score}`)
          )
      )
      .then(responses => {
        const allStats = responses.map(res => res.data);
        setPlayerStats(allStats);
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos jogadores:', error);
      });
    }
  }, [players, match]);
  

  React.useEffect(() => {
    if (players.length > 0 && match) {
      const data = {}; // Inicialize um objeto vazio para armazenar os dados dos jogadores
  
      Promise.all(
        players
          .filter(player => player.player_id) // Filtra apenas jogadores que têm player_id
          .map(player => 
            api.get(`/players/${player.player_id}`).then(res => {
              data[player.player_id] = res.data; // Armazena os dados no objeto com o ID do jogador como chave
              return res.data; // Retorna os dados para o Promise.all (não essencial aqui, mas bom para garantir a consistência)
            })
          )
      )
      .then(() => {
        setPlayersData(data); // Atualiza o estado com o objeto de dados dos jogadores
        console.log(data); // Verifica o conteúdo do objeto 'data' com as informações dos jogadores
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos jogadores:', error);
      });
    }
  }, [players, match]);
  

  const half = Math.ceil(playerStats.length / 2);
  const firstTeamStats = playerStats.slice(0, half);
  const secondTeamStats = playerStats.slice(half);

  return (
    <Box display="flex" justifyContent="space-between">
      <TableContainer style={{ flex: 1, marginRight: '8px' }}>
        <Typography variant="h6">{props.firstTeam}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: '4px' }}>Jogador</TableCell>
              <TableCell style={{ padding: '4px' }}>Posição</TableCell>
              <TableCell style={{ padding: '4px' }}>Gols</TableCell>
              <TableCell style={{ padding: '4px' }}>Assistências</TableCell>
              <TableCell style={{ padding: '4px' }}>Minutos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firstTeamStats.length > 0 ? (
              firstTeamStats.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ padding: '4px' }}>
                    <Link 
                      href={`../../../jogadores/${row[0].player_id}`} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        textDecoration: 'none',
                        color: '#1976d2', 
                        padding: '4px' 
                      }}
                    >
                      <img 
                        src={playersData[row[0].player_id]?.image} 
                        style={{ height: '40px', width: '40px', marginRight: '8px' }} 
                        alt={playersData[row[0].player_id]?.name} 
                      />
                      <Typography variant="body2">
                        {playersData[row[0].player_id]?.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].position_on_matchday}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].goals || '-'}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].assists || '-'}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].minutes_played || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>Nenhuma estatística encontrada</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer style={{ flex: 1, marginLeft: '8px' }}>
        <Typography variant="h6">{props.secondTeam}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: '4px' }}>Jogador</TableCell>
              <TableCell style={{ padding: '4px' }}>Posição</TableCell>
              <TableCell style={{ padding: '4px' }}>Gols</TableCell>
              <TableCell style={{ padding: '4px' }}>Assistências</TableCell>
              <TableCell style={{ padding: '4px' }}>Minutos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secondTeamStats.length > 0 ? (
              secondTeamStats.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ padding: '4px' }}>
                    <Link 
                      href={`../../../jogadores/${row[0].player_id}`} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        textDecoration: 'none',
                        color: '#1976d2', 
                        padding: '4px' 
                      }}
                    >
                      <img 
                        src={playersData[row[0].player_id]?.image} 
                        style={{ height: '40px', width: '40px', marginRight: '8px' }} 
                        alt={playersData[row[0].player_id]?.name} 
                      />
                      <Typography variant="body2">
                        {playersData[row[0].player_id]?.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].position_on_matchday}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].goals || '-'}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].assists || '-'}</TableCell>
                  <TableCell style={{ padding: '4px' }}>{row[0].minutes_played || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>Nenhuma estatística encontrada</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

PlayerStatsTable.propTypes = {
  matchId: PropTypes.number.isRequired,
  firstTeam: PropTypes.string.isRequired,
  secondTeam: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};
