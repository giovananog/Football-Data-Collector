// PlayerStatsTable.js
import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from "../../../api"

// Componente para a tabela de estatísticas do jogador
export default function PlayerStatsTable(props) {
  const [playerStats, setPlayerStats] = useState([]);

  React.useEffect(() => {
    api.get(`/player/${props.id}/stats`).then(res => {
      setPlayerStats(res.data);
    });
  }, []);

  // Configuração das colunas da tabela
  const headCells = [
    { id: 'matchday', label: 'Matchday', align: 'center' },
    { id: 'date', label: 'Date', align: 'center' },
    { id: 'firstTeam', label: 'First Team', align: 'center' },
    { id: 'secondTeam', label: 'Second Team', align: 'center' },
    { id: 'result', label: 'Result', align: 'center' },
    { id: 'position', label: 'Position on Matchday', align: 'center' },
    { id: 'goals', label: 'Goals', align: 'center' },
    { id: 'assists', label: 'Assists', align: 'center' },
    { id: 'ownGoals', label: 'Own Goals', align: 'center' },
    { id: 'yellowCards', label: 'Yellow Cards', align: 'center' },
    { id: 'secondYellowCards', label: 'Second Yellow Cards', align: 'center' },
    { id: 'redYellowCards', label: 'Red Yellow Cards', align: 'center' },
    { id: 'substitutionsOn', label: 'Substitutions On', align: 'center' },
    { id: 'substitutionsOff', label: 'Substitutions Off', align: 'center' },
    { id: 'minutesPlayed', label: 'Minutes Played', align: 'center' },
  ];

  // Cabeçalho da tabela
  const PlayerStatsTableHead = () => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ padding: '4px' }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );


  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          display: 'block',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <PlayerStatsTableHead />
          <TableBody>
            {playerStats.map((row) => (
              <TableRow
                hover
                key={`player-stat-${row.id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ padding: '4px' }}>{row.matchday}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.date}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.first_team}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.second_team}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.result}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.position_on_matchday}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.goals ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.assists ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.own_goals ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.yellow_cards ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.second_yellow_cards ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.red_yellow_cards ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.substitutions_on ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.substitutions_off ?? '-'}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.minutes_played ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
