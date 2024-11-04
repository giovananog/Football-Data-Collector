import React, { useEffect, useState } from 'react';
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
import api from "../../../api"
import { Link } from 'react-router-dom';

// Componentes de cabeçalho da tabela
const headCells = [
  { id: 'position', label: 'Posição', align: 'center' },
  { id: 'team', label: 'Time', align: 'left' },
  { id: 'games', label: 'J', align: 'center' },
  { id: 'wins', label: 'V', align: 'center' },
  { id: 'draws', label: 'E', align: 'center' },
  { id: 'losses', label: 'D', align: 'center' },
  { id: 'goals', label: 'Gols', align: 'center' },
  { id: 'goalDifference', label: '+/-', align: 'center' },
  { id: 'points', label: 'Pts', align: 'center' },
];

// Componente para o cabeçalho da tabela
function StandingsTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            <Typography variant="subtitle2">{headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Componente da tabela de classificação
export default function StandingsTable(props) {
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    api.get(`table/${props.id}`).then(res => {
      setRows(res.data);
    });
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table>
          <StandingsTableHead />
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.position} sx={{ height: '40px' }}>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align='center'>
                <Link to={`../time/${row.team_id}`}>
                    <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${row.team_id}.png`} alt={row.team_id} style={{ width: '30px', height: '30px' }} />
                </Link>
                </TableCell>
                <TableCell align="center">{row.matches}</TableCell>
                <TableCell align="center">{row.wins}</TableCell>
                <TableCell align="center">{row.draws}</TableCell>
                <TableCell align="center">{row.losses}</TableCell>
                <TableCell align="center">{row.goals}</TableCell>
                <TableCell align="center">{row.goal_difference}</TableCell>
                <TableCell align="center">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

StandingsTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};
