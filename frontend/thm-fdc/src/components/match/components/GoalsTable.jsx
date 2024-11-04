import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import api from '../../../api'; // Importe a configuração da API

// ==============================|| GOL TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'player', align: 'center', disablePadding: false, label: 'Jogador' },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
  { id: 'assist', align: 'center', disablePadding: false, label: 'Assistência' },
  { id: 'type', align: 'center', disablePadding: false, label: 'Tipo de Gol' },
];

// Componente para o cabeçalho da tabela
function GoalTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Componente para a tabela de gols
export default function GoalsTable(props) {
  const [goals, setGoals] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    api.get(`/matches/${props.matchId}/goals`)
      .then(response => {
        const goalsData = response.data;
        setGoals(goalsData);

        // Obtenha IDs únicos dos jogadores para evitar requisições duplicadas
        const playerIds = [...new Set(goalsData.map(goal => goal.scorer_id))];

        // Faça chamadas à API para buscar informações de todos os jogadores
        Promise.all(playerIds.map(id => api.get(`/players/${id}`)))
          .then(playerResponses => {
            // Mapeie as respostas para criar um dicionário { id: dadosDoJogador }
            const playersData = playerResponses.reduce((acc, res) => {
              acc[res.data.id] = res.data;
              return acc;
            }, {});
            setPlayers(playersData);
          })
          .catch(error => {
            console.error('Erro ao buscar dados dos jogadores:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos gols:', error);
      });
  }, [props]);

  if (!goals.length) {
    return <Typography variant="h6" align="center">Nenhum gol registrado</Typography>;
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <GoalTableHead />
          <TableBody>
            {goals.map((goal, index) => (
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={`${goal.scorer_id}-${index}`}
              >
                <TableCell align='center'>
                  <Avatar
                    src={`https://tmssl.akamaized.net//images/wappen/normquad/${goal.team_id}.png`} 
                    alt={goal.team_id}
                    sx={{ width: 30, height: 30 }}
                  />
                </TableCell>
                <TableCell align='center'>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>{players[goal.scorer_id]?.name ?? null} </Typography>
                  </Stack>
                </TableCell>
                <TableCell align='center'>
                  <Typography>{goal.minute}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>{goal.assist_player_id || 'N/A'}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>{goal.shot_type || 'Normal'}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// PropTypes para garantir que matchId seja passado
GoalsTable.propTypes = {
  matchId: PropTypes.number.isRequired,
};
