import PropTypes from 'prop-types';
// material-ui
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import api from '../../../api';
import { useState } from 'react';

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable(props) {
  const [rows, setRows] = useState([]); // Estado para armazenar as partidas

  React.useEffect(() => {
    api.get(`matches/season/${props.id}`).then(res => {
      setRows(res.data); 
    });
  }, []);

  // Obter apenas as últimas 6 partidas
  const lastSixMatches = rows.slice(-6);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <TableBody>
            {/* Iterar sobre as partidas em grupos de 3 */}
            {lastSixMatches.reduce((acc, row, index) => {
              // Adicionar a linha se o índice for 0, 3 (novas linhas a cada 3 itens)
              if (index % 3 === 0) {
                acc.push([]); // Cria uma nova linha
              }
              // Adiciona a partida atual à linha atual
              acc[acc.length - 1].push(row);
              return acc;
            }, []).map((matchRow, rowIndex) => (
              <TableRow key={rowIndex} hover role="checkbox" sx={{ border: 'none' }}>
                {matchRow.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableCell align="center" width="14%">
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${row.first_team_id}.png`} sx={{ color: 'success.main', bgcolor: '#fff', fontSize: '1em' }}></Avatar>
                      </div>{row.fst_team} {/* Aqui, use a propriedade que representa o time 1 */}
                    </TableCell>
                    <TableCell align="center" width="6%">
                    <Link to={`/campeonatos/${props.id}/partidas/${row.id}`}> 
                      {row.score}
                    </Link>
                    </TableCell>
                    <TableCell align="center" width="14%">
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${row.second_team_id}.png`} sx={{ color: 'success.main', bgcolor: '#fff', fontSize: '1em' }}></Avatar>
                      </div>{row.scnd_team} {/* Aqui, use a propriedade que representa o time 2 */}
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
