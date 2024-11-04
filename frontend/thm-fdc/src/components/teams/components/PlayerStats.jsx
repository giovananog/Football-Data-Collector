import PropTypes from 'prop-types'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import api from "../../../api"
import { Link } from 'react-router-dom';

// Componente de cabeçalho da tabela
function PlayerTableHead() {
  return (
    <TableHead>
      <TableRow>
        {playerHeadCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            <Typography variant="subtitle2">{headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const playerHeadCells = [
  { id: 'rank', label: 'Nome', align: 'center' },
  { id: 'player', label: 'Jogador', align: 'left' },
  { id: 'age', label: 'Idade', align: 'center' },
  { id: 'club', label: 'Posição', align: 'left' },
  { id: 'goals', label: 'Gols', align: 'center' },
];

// Componente da tabela de jogadores
export default function PlayerTable(props) {
  const [players, setPlayers] = useState([]);

  React.useEffect(() => {
    api.get(`top-goalscorers/${props.id}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPlayers(res.data); // Se houver dados, atualiza o estado
        } else {
          setPlayers([]); // Mantém a lista vazia se não houver dados
        }
      })
      .catch(error => {
        console.error("Erro ao buscar os dados: ", error);
        setPlayers([]); // Mantém a lista vazia em caso de erro
      });
  }, [props.id]);

  return (
    <Box>
      <TableContainer>
        <Table>
          <PlayerTableHead />
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.rank} sx={{ height: '40px' }}>
                <TableCell align="center">{player.name}</TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">

                <Link to={`../jogadores/${player.player_id}`}>
                    <img
                      alt={player.player}
                      src={player.image} // Usando a imagem da API
                      style={{ width: '40px', height: '40px', marginRight: 1 }}
                    />
                    {player.name}
                </Link>
                  </Box>
                </TableCell>
                <TableCell align="center">{player.age}</TableCell>
                <TableCell align="left">{player.position}</TableCell>
                <TableCell align="center">{player.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

PlayerTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};
