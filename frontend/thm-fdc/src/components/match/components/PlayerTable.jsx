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
function createData(player, team, time, position, goals, assists, shots) {
  return { player, team, time, position, goals, assists, shots };
}

// Exemplo de dados dos jogadores
const rows = [
  createData('Carlos', 'Flamengo', '10:00', 'Atacante', 1, 0, 4),
  createData('João', 'Vasco', '25:00', 'Meio-Campo', 0, 1, 2),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
  createData('Lucas', 'Fluminense', '45:00', 'Defensor', 0, 0, 1),
];

// Ícones dos times (substitua pelos ícones reais)
const teamIcons = {
  Flamengo: '/path/to/flamengo_icon.png',
  Vasco: '/path/to/vasco_icon.png',
  Fluminense: '/path/to/fluminense_icon.png',
};

// ==============================|| GOAL TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'player', align: 'center', disablePadding: false, label: 'Jogador' },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
  { id: 'position', align: 'center', disablePadding: false, label: 'Posição' },
  { id: 'goals', align: 'center', disablePadding: false, label: 'Gols' },
  { id: 'assists', align: 'center', disablePadding: false, label: 'Assistências' },
  { id: 'shots', align: 'center', disablePadding: false, label: 'Finalizações' },
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
            sx={{ padding: '4px' }} // Reduz a altura da linha no cabeçalho
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Componente para a tabela de estatísticas de jogadores
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
                <TableCell align='center' sx={{ padding: '4px' }}>
                  <img src={teamIcons[row.team]} alt={row.team} style={{ width: '30px', height: '30px' }} />
                </TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      alt={row.player}
                      src={`https://img.a.transfermarkt.technology/portrait/header/412594-1661910650.jpg?lm=1`} // Caminho da imagem do jogador
                      sx={{ width: '40px', height: '40px' }}
                    />
                    {row.player}
                  </Stack>
                </TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>{row.time}</TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>{row.position}</TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>{row.goals}</TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>{row.assists}</TableCell>
                <TableCell align='center' sx={{ padding: '4px' }}>{row.shots}</TableCell>
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
