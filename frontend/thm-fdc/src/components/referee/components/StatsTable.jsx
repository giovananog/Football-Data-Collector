// MatchTable.js
import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import api from '../../../api'; // Certifique-se de ter a configuração correta da API

// Configuração das colunas da tabela
const headCells = [
  { id: 'matchday', label: 'Matchday', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'firstTeam', label: 'Home Team', align: 'center' },
  { id: 'secondTeam', label: 'Away Team', align: 'center' },
  { id: 'result', label: 'Result', align: 'center' },
  { id: 'yellowCards', label: 'Yellow Cards', align: 'center' },
  { id: 'redYellowCards', label: 'Red Yellow Cards', align: 'center' },
  { id: 'minutesPlayed', label: 'Minutes Played', align: 'center' },
];

// Cabeçalho da tabela
function MatchTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={headCells.length} align="left" sx={{ fontSize: '1.2em', padding: '8px' }}>
          2023
        </TableCell>
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ padding: '4px', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Componente da tabela de partidas
export default function MatchTable() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Chamada à API para obter dados das partidas
    api.get(`/referee/${1099}/matches`).then(response => {
      setMatches(response.data);
    }).catch(error => {
      console.error('Erro ao buscar os dados das partidas:', error);
    });
  }, []);

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
          <MatchTableHead />
          <TableBody>
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{match.matchday}</TableCell>
                  <TableCell align="center">{match.date}</TableCell>
                  <TableCell align="center">{match.home_team}</TableCell>
                  <TableCell align="center">{match.away_team}</TableCell>
                  <TableCell align="center">{match.result}</TableCell>
                  <TableCell align="center">{match.yellow_cards}</TableCell>
                  <TableCell align="center">{match.red_cards}</TableCell>
                  <TableCell align="center">{match.penalty_kicks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  <Typography variant="body2" color="text.secondary">No matches available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
