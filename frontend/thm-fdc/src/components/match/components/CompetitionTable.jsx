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
import api from "../../../api";

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

export default function StandingsTable(props) {
  const [rows, setRows] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    api.get(`table/${props.season}`).then(res => {
      setRows(res.data);
    });
  }, [props.season]);

  useEffect(() => {
    api.get(`matches/${props.matchId}`).then(res => {
      setMatch(res.data);
    });
  }, [props.matchId]);

  return (
    <Box>
      <TableContainer>
        <Table>
          <StandingsTableHead />
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.position}
                sx={{
                  height: '40px',
                  backgroundColor: match && (row.team_id === match.first_team_id || row.team_id === match.second_team_id)
                    ? 'rgba(255, 223, 186, 0.5)' // Cor de destaque
                    : 'inherit'
                }}
              >
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align='center'>
                  <img
                    src={`https://tmssl.akamaized.net//images/wappen/normquad/${row.team_id}.png`}
                    alt={row.team_id}
                    style={{ width: '30px', height: '30px' }}
                  />
                </TableCell>
                <TableCell align="center">{row.matches}</TableCell>
                <TableCell align="center">{row.wins}</TableCell>
                <TableCell align="center">{row.draws}</TableCell>
                <TableCell align="center">{row.losses}</TableCell>
                <TableCell align="center">{row.goals}</TableCell>
                <TableCell align="center">{row.goalDifference}</TableCell>
                <TableCell align="center">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
