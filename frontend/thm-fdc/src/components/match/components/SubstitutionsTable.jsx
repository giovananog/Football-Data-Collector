import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material-ui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import WestIcon from '@mui/icons-material/West';
import api from '../../../api'; // Importe a configuração da API

// ==============================|| SUBSTITUIÇÃO TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'playerIn', align: 'center', disablePadding: false, label: <WestIcon sx={{ color: 'red' }} /> },
  { id: 'playerOut', align: 'center', disablePadding: false, label: <ArrowRightAltIcon sx={{ color: 'green' }} /> },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
  { id: 'type', align: 'center', disablePadding: false, label: 'Tipo' }, // Nova coluna
];

// Componente para o cabeçalho da tabela
function SubstitutionTableHead() {
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

// Componente para a tabela de substituições
export default function SubstitutionsTable(props) {
  const [substitutions, setSubstitutions] = useState([]);
  const [players, setPlayers] = useState({}); // Armazena informações dos jogadores em um dicionário

  useEffect(() => {
    // Fetch substituições
    api.get(`/matches/${props.matchId}/substitutions`)
      .then(response => {
        const substitutionsData = response.data;
        setSubstitutions(substitutionsData);

        // Obtenha IDs únicos dos jogadores substituídos e que entraram
        const playerIds = [
          ...new Set([
            ...substitutionsData.map(sub => sub.substituted_player_id),
            ...substitutionsData.map(sub => sub.substitution_player_id),
          ]),
        ];

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
        console.error('Erro ao buscar dados das substituições:', error);
      });
  }, [props]);

  if (!substitutions.length) {
    return <Typography variant="h6" align="center">Nenhuma substituição registrada</Typography>;
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
          <SubstitutionTableHead />
          <TableBody>
            {substitutions.map((sub, index) => {
              const playerIn = players[sub.substitution_player_id];
              const playerOut = players[sub.substituted_player_id];
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={`${sub.id}-${index}`}
                >
                  <TableCell align='center'>
                    <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${sub.team_id}.png`} alt={sub.team_id} style={{ width: '30px', height: '30px' }} />
                  </TableCell>
                  <TableCell align='center'>
                    <Stack direction="row" alignItems="center">
                      <img style={{ width: '40px', height: '40px' }}  alt={playerIn ? (playerIn.name ? playerIn.name : 'na') : 'Carregando...'} src={playerOut ? (playerOut.image ? playerOut.image : "a") : "a" }  />
                      {playerIn ? (playerIn.name ? playerIn.name : 'na') : 'Carregando...'}
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Stack direction="row" alignItems="center">
                      <img style={{ width: '40px', height: '40px' }}  salt={playerOut ? (playerOut.name ? playerOut.name : 'na') : 'Carregando...'} src={playerIn ? (playerIn.image ? playerIn.image : "a") : "a"} />
                      {playerOut ? (playerOut.name ? playerOut.name : 'na') : 'Carregando...'}
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>{sub.minute}</TableCell>
                  <TableCell align='center'>{sub.type}</TableCell> {/* Coluna do tipo de substituição */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

SubstitutionsTable.propTypes = {
  matchId: PropTypes.number.isRequired,
};
