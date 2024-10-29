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

// Função para criar dados das equipes
function createTeamData(position, team, games, wins, draws, losses, goals, goalDifference, points) {
  return { position, team, games, wins, draws, losses, goals, goalDifference, points };
}

// Dados dos 20 times - Exemplos fictícios
const rows = [
  createTeamData(1, 'Botafogo', 30, 17, 5, 8, '48:26', 22, 61),
  createTeamData(2, 'Palmeiras', 30, 18, 6, 6, '51:23', 28, 60),
  createTeamData(3, 'Fortaleza', 30, 16, 8, 6, '39:30', 9, 56),
  createTeamData(4, 'Grêmio', 30, 15, 8, 7, '40:29', 11, 53),
  createTeamData(5, 'Flamengo', 30, 14, 10, 6, '47:33', 14, 52),
  createTeamData(6, 'Atlético-MG', 30, 14, 8, 8, '36:27', 9, 50),
  createTeamData(7, 'São Paulo', 30, 13, 9, 8, '35:29', 6, 48),
  createTeamData(8, 'Fluminense', 30, 13, 8, 9, '34:30', 4, 47),
  createTeamData(9, 'Internacional', 30, 12, 9, 9, '29:28', 1, 45),
  createTeamData(10, 'Cruzeiro', 30, 12, 8, 10, '28:27', 1, 44),
  createTeamData(11, 'Corinthians', 30, 11, 10, 9, '27:26', 1, 43),
  createTeamData(12, 'Athletico-PR', 30, 11, 9, 10, '30:29', 1, 42),
  createTeamData(13, 'Santos', 30, 10, 8, 12, '24:32', -8, 38),
  createTeamData(14, 'Vasco', 30, 10, 7, 13, '23:31', -8, 37),
  createTeamData(15, 'Bahia', 30, 9, 9, 12, '25:34', -9, 36),
  createTeamData(16, 'Goiás', 30, 9, 8, 13, '20:32', -12, 35),
  createTeamData(17, 'Cuiabá', 30, 8, 10, 12, '22:33', -11, 34),
  createTeamData(18, 'Coritiba', 30, 7, 8, 15, '18:36', -18, 29),
  createTeamData(19, 'América-MG', 30, 6, 9, 15, '19:40', -21, 27),
  createTeamData(20, 'Red Bull Bragantino', 30, 5, 9, 16, '16:42', -26, 24),
];

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
export default function StandingsTable() {
  return (
    <Box>
      <TableContainer>
        <Table>
          <StandingsTableHead />
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.position} sx={{ height: '40px' }}>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={row.team}
                      src={`/path/to/${row.team.toLowerCase()}_logo.png`} // Substitua pelo caminho real dos logos
                      sx={{ width: 24, height: 24, marginRight: 1 }}
                    />
                    {row.team}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.games}</TableCell>
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

StandingsTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};
