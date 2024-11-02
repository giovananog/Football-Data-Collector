import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material'; 
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import WestIcon from '@mui/icons-material/West';

// Função para criar dados
function createData(playerIn, playerOut, team, time) {
  return { playerIn, playerOut, team, time };
}

// Exemplo de dados das substituições
const rows = [
  createData('Carlos', 'João', 'Carlos', '45:00'),
  createData('Carlos', 'Lucas', 'Mário', '60:00'),
  createData('Carlos', 'Pedro', 'Felipe', '75:00'),
];

// Ícones dos times (substitua pelos ícones reais)
const teamIcons = {
  flamengo: '/path/to/flamengo_icon.png',
  vasco: '/path/to/vasco_icon.png',
  fluminense: '/path/to/fluminense_icon.png',
};

// ==============================|| SUBSTITUIÇÃO TABLE - HEADER ||============================== //

const headCells = [
  { id: 'team', align: 'center', disablePadding: false, label: 'Time' },
  { id: 'playerIn', align: 'center', disablePadding: false, label: <WestIcon sx={{color: 'red'}} /> },
  { id: 'playerOut', align: 'center', disablePadding: false, label: <ArrowRightAltIcon sx={{color: 'green'}} /> },
  { id: 'time', align: 'center', disablePadding: false, label: 'Minuto' },
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
export default function SubstitutionsTable() {
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
            {rows.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={`${row.playerIn}-${index}`} 
              >
                <TableCell align='center'>
                  <img src="https://tmssl.akamaized.net//images/wappen/normquad/585.png?lm=1409133922" alt={row.team} style={{ width: '30px', height: '30px' }} />
                </TableCell>
                <TableCell align='center'>
                  <Stack direction="row" alignItems="center">
                    <Avatar alt={row.playerIn} src={`https://img.a.transfermarkt.technology/portrait/header/412594-1661910650.jpg?lm=1`} /> {/* Imagem do jogador */}
                    {row.playerIn}
                  </Stack>
                </TableCell>
                <TableCell align='center' >
                  <Stack direction="row" alignItems="center">
                    <Avatar alt={row.playerOut} src={`https://img.a.transfermarkt.technology/portrait/header/412594-1661910650.jpg?lm=1`} /> {/* Imagem do jogador */}
                    {row.playerOut}
                  </Stack>
                </TableCell>
                <TableCell align='center'>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

SubstitutionTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};
