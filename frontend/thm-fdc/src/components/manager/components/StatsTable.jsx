// MatchTable.js
import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Função para criar dados
function createSeasonData(season, club, matches, wins, draws, losses, goals, points, ppm, placement, playersUsed) {
  return { season, club, matches, wins, draws, losses, goals, points, ppm, placement, playersUsed };
}

// Exemplo de dados da temporada
const rows = [
  createSeasonData(""),
  // Adicione mais dados conforme necessário
];

// Configuração das colunas da tabela
const headCells = [
  { id: 'season', label: 'Season', align: 'center' },
  { id: 'club', label: 'Club', align: 'center' },
  { id: 'matches', label: 'Matches', align: 'center' },
  { id: 'wins', label: 'W', align: 'center' },
  { id: 'draws', label: 'D', align: 'center' },
  { id: 'losses', label: 'L', align: 'center' },
  { id: 'goals', label: 'Goals', align: 'center' },
  { id: 'points', label: 'Points', align: 'center' },
  { id: 'ppm', label: 'PPM', align: 'center' },
  { id: 'placement', label: 'Placement', align: 'center' },
  { id: 'playersUsed', label: 'Players Used', align: 'center' },
];

// Cabeçalho da tabela
function MatchTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={headCells.length} align="center" sx={{ fontWeight: 'bold', fontSize: '1.2em', padding: '8px' }}>
          Campeonato Brasileiro Série A
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
export default function MatchTable(props) {
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
                key={`season-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ padding: '4px' }}>{row.season}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.club}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.matches}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.wins}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.draws}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.losses}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.goals}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.points}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.ppm}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.placement}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.playersUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
