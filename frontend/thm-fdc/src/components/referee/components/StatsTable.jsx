// MatchTable.js
import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Função para criar dados
function createMatchData(matchday, date, firstTeam, secondTeam, result, position, goals, assists, ownGoals, yellowCards, redYellowCards, minutesPlayed) {
  return { matchday, date, firstTeam, secondTeam, result, position, goals, assists, ownGoals, yellowCards, redYellowCards, minutesPlayed };
}

// Exemplo de dados das partidas
const rows = [
  createMatchData("1", "May 19, 2012", "Palmeiras", "Portuguesa", "1:1", "18", "", "", "", "", "", "90'"),
  createMatchData("4", "Jun 10, 2012", "Cruzeiro", "Sport Recife", "1:0", "8", "1", "", "", "1", "", "90'"),
  // Adicione mais dados conforme necessário
];

// Configuração das colunas da tabela
const headCells = [
  { id: 'matchday', label: 'Matchday', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'firstTeam', label: 'Home Team', align: 'center' },
  { id: 'secondTeam', label: 'Away Team', align: 'center' },
  { id: 'result', label: 'Result', align: 'center' },
  { id: 'position', label: 'Position on Matchday', align: 'center' },
  { id: 'goals', label: 'Goals', align: 'center' },
  { id: 'assists', label: 'Assists', align: 'center' },
  { id: 'ownGoals', label: 'Own Goals', align: 'center' },
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
            sx={{ padding: '4px' }}
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
            {rows.map((row, index) => (
              <TableRow
                hover
                key={`match-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ padding: '4px' }}>{row.matchday}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.date}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.firstTeam}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.secondTeam}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.result}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.position}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.goals}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.assists}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.ownGoals}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.yellowCards}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.redYellowCards}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.minutesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
