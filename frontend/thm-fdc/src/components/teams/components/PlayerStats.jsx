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

// Função para criar dados dos jogadores
function createPlayerData(rank, player, age, club, goals) {
  return { rank, player, age, club, goals };
}

// Dados dos jogadores - Exemplos fictícios
const players = [
  createPlayerData(1, 'Pedro', 27, 'CR Flamengo', 11),
  createPlayerData(2, 'Estêvão', 17, 'Sociedade Esportiva Palmeiras', 10),
  createPlayerData(3, 'Hulk', 38, 'Clube Atlético Mineiro', 10),
  createPlayerData(4, 'José Manuel López', 23, 'Sociedade Esportiva Palmeiras', 9),
  createPlayerData(5, 'Luciano', 31, 'São Paulo Futebol Clube', 9),
];

// Componentes de cabeçalho da tabela
const playerHeadCells = [
  { id: 'rank', label: 'Rank', align: 'center' },
  { id: 'player', label: 'Jogador', align: 'left' },
  { id: 'age', label: 'Idade', align: 'center' },
  { id: 'club', label: 'Clube', align: 'left' },
  { id: 'goals', label: 'Gols', align: 'center' },
];

// Componente para o cabeçalho da tabela
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

// Componente da tabela de jogadores
export default function PlayerTable() {
  return (
    <Box>
      <TableContainer>
        <Table>
          <PlayerTableHead />
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.rank} sx={{ height: '40px' }}>
                <TableCell align="center">{player.rank}</TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={player.player}
                      src={`/path/to/${player.player.toLowerCase().replace(/\s+/g, '_')}_avatar.png`} // Substitua pelo caminho real dos avatares
                      sx={{ width: 24, height: 24, marginRight: 1 }}
                    />
                    {player.player}
                  </Box>
                </TableCell>
                <TableCell align="center">{player.age}</TableCell>
                <TableCell align="left">{player.club}</TableCell>
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
