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
import api from "../../../api"
import { Avatar, Typography } from '@mui/material';

// ==============================|| CARTÕES TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'player', align: 'center', disablePadding: false, label: 'Jogador' },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
  { id: 'card', align: 'center', disablePadding: false, label: 'Cartão' }, // Nova coluna de Cartão
  { id: 'reason', align: 'center', disablePadding: false, label: 'Motivo' }, // Nova coluna de Motivo
];

// Componente para o cabeçalho da tabela
function CardTableHead() {
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

// Componente para a tabela de cartões
export default function CardsTable(props) {
  const [cards, setCards] = useState([]);
  const [players, setPlayers] = useState({}); // Armazena informações dos jogadores em um dicionário

  useEffect(() => {
    // Fetch cartões
    api.get(`/matches/${props.matchId}/cards`)
      .then(response => {
        const cardsData = response.data;
        setCards(cardsData);

        // Obtenha IDs únicos dos jogadores
        const playerIds = [...new Set(cardsData.map(card => card.player_id))];

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
        console.error('Erro ao buscar dados dos cartões:', error);
      });
  }, [props]);

  if (!cards.length) {
    return <Typography variant="h6" align="center">Nenhum cartão registrado</Typography>;
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
          <CardTableHead />
          <TableBody>
            {cards.map((card, index) => {
              const player = players[card.player_id];
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={`${card.id}-${index}`}
                >
                  <TableCell align='center'>
                    <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${card.team_id}.png`} alt={card.team_id} style={{ width: '30px', height: '30px' }} />
                  </TableCell>
                  <TableCell align='center'>
                    <Stack direction="row" alignItems="center">
                      <img style={{ width: '40px', height: '40px' }} alt={player ? player.name : 'Carregando...'} src={player ? (player.image ? player.image : "a") : "a"} />
                      {player ? player.name : 'Carregando...'}
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>{card.minute}</TableCell>
                  <TableCell align='center'>
                    {card.card_type === 'Yellow card' ? (
                      <span style={{ color: 'orange' }}>🟡 Amarelo</span> // Cartão amarelo
                    ) : card.card_type === 'Red card' ? (
                      <span style={{ color: 'red' }}>🔴 Vermelho</span> // Cartão vermelho
                    ) : (
                      'N/A' // Sem cartão
                    )}
                  </TableCell>
                  <TableCell align='center'>{card.reason ? card.reason : 'N/A'}</TableCell> {/* Exibe o motivo se existir */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

CardsTable.propTypes = {
  matchId: PropTypes.number.isRequired,
};
