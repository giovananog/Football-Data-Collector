// OrdersTable.js
import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar'; // Importando o Avatar
import api from "../../../../api";

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ rows }) {
  const [teamNames, setTeamNames] = React.useState({});

  React.useEffect(() => {
    const fetchTeamNames = async () => {
      const names = {};
      await Promise.all(
        rows.map(async (row) => {
          const res = await api.get(`teams/${row.team_id}`);
          names[row.team_id] = res.data; // Supondo que você queira armazenar o nome e a imagem do time aqui
        })
      );
      setTeamNames(names);
    };

    fetchTeamNames();
  }, [rows]);

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
          <TableHead>
            <TableRow>
              <TableCell align="center">Posição</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Wins</TableCell>
              <TableCell align="center">Draws</TableCell>
              <TableCell align="center">Losses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{row.position}</TableCell>
                <TableCell align='center'>
                  <Stack direction="row" alignItems="center">
                    <Avatar  src={`https://tmssl.akamaized.net//images/wappen/normquad/${row.team_id}.png`} sx={{ marginRight: 1 }} /> {/* Avatar com a imagem do time */}
                    {/* <Link href={`time/${row.team_id}`} style={{}}>{teamNames[row.team_id]?.address || row.team_id}</Link> Exibe o nome do time se disponível */}
                    <Link
  href={`time/${row.team_id}`}
  style={{
    textDecoration: 'none', // Remove o sublinhado padrão
    color: '#3f51b5', // Cor primária do Material-UI
    fontWeight: 'bold', // Deixa o texto em negrito
    padding: '8px 16px', // Adiciona um pouco de espaçamento
    borderRadius: '4px', // Adiciona bordas arredondadas
    transition: 'background-color 0.3s, color 0.3s', // Animação suave para transições
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#e3f2fd'; // Cor de fundo ao passar o mouse
    e.currentTarget.style.color = '#1976d2'; // Muda a cor do texto ao passar o mouse
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent'; // Restaura a cor de fundo
    e.currentTarget.style.color = '#3f51b5'; // Restaura a cor do texto
  }}
>
  {teamNames[row.team_id]?.address || row.team_id} {/* Exibe o nome do time se disponível */}
</Link>
                  </Stack>
                </TableCell>
                <TableCell align='center'>{row.wins}</TableCell> {/* Supondo que 'wins' esteja no objeto row */}
                <TableCell align='center'>{row.draws}</TableCell> {/* Supondo que 'draws' esteja no objeto row */}
                <TableCell align='center'>{row.losses}</TableCell> {/* Supondo que 'losses' esteja no objeto row */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTable.propTypes = {
  rows: PropTypes.array.isRequired
};

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      
    </Stack>
  );
}

OrderStatus.propTypes = { status: PropTypes.number };
