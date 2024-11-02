import PropTypes from 'prop-types';
// material-ui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';

// Função para criar dados
function createData(player, team, time, card) {
  return { player, team, time, card }; // Adicionando campo de cartão
}

// Exemplo de dados dos jogadores
const rows = [
  createData('Carlos', 'flamengo', '10:00', 'yellow'), // Cartão amarelo
  createData('João', 'vasco', '25:00', 'red'), // Cartão vermelho
  createData('Lucas', 'fluminense', '45:00', ''), // Sem cartão
];

// Ícones dos times (substitua pelos ícones reais)
const teamIcons = {
  flamengo: '/path/to/flamengo_icon.png',
  vasco: '/path/to/vasco_icon.png',
  fluminense: '/path/to/fluminense_icon.png',
};

// ==============================|| GOL TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'player', align: 'center', disablePadding: false, label: 'Jogador' },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
  { id: 'card', align: 'center', disablePadding: false, label: 'Cartão' }, // Novo campo de Cartão
];

// Componente para o cabeçalho da tabela
function GoalTableHead() {
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

// Componente para a tabela de gols
export default function GoalsTable() {
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
          <GoalTableHead />
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={`${row.player}-${index}`}
              >
                <TableCell align='center'>
                  <img src={`https://tmssl.akamaized.net//images/wappen/normquad/585.png?lm=1409133922`} alt={row.team} style={{ width: '30px', height: '30px' }} />
                </TableCell>
                <TableCell align='center'>
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      alt={row.player}
                      src={`https://img.a.transfermarkt.technology/portrait/header/412594-1661910650.jpg?lm=1`} // Caminho da imagem do jogador
                      sx={{ width: '40px', height: '40px' }} // Tornando o avatar quadrado
                    />
                    {row.player}
                  </Stack>
                </TableCell>
                <TableCell align='center'>{row.time}</TableCell>
                <TableCell align='center'>
                  {row.card === 'yellow' ? (
                    <span style={{ color: 'orange' }}>🟡 Amarelo</span> // Cartão amarelo
                  ) : row.card === 'red' ? (
                    <span style={{ color: 'red' }}>🔴 Vermelho</span> // Cartão vermelho
                  ) : (
                    'N/A' // Sem cartão
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

GoalTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};
