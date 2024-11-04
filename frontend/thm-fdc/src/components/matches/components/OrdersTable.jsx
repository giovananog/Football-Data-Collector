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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

// ==============================|| ORDER TABLE - HEADER ||============================== //

const headCells = [
  {
    id: 'time1',
    align: 'center',
    disablePadding: false,
    label: 'Time 1'
  },
  {
    id: 'score',
    align: 'center',
    disablePadding: false,
    label: 'Placar'
  },
  {
    id: 'time2',
    align: 'center',
    disablePadding: false,
    label: 'Time 2'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead bgcolor="#fff" border='none'>
      <TableRow border='none'>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: "bold" }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrdersTable({ matchData }) {
  const order = 'asc';
  const orderBy = 'time1';

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
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {matchData.map((match, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '& td, & th': { border: 0, padding: '0.5rem' }, border: 'none' }} // Ajuste o padding aqui
                  tabIndex={-1}
                  key={match.id}
                >
                  <TableCell align="center" width="14%">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${match.first_team_id}.png`} sx={{ color: 'success.main', bgcolor: '#fff', fontSize: '1em' }}></Avatar>
                    </div>
                  </TableCell>
                  <TableCell align="center" width="6%">
                    <Link href={`/campeonatos/${match.season}/partidas/${match.id}`} underline="hover" color="inherit">
                      {match.score}
                    </Link>
                  </TableCell>
                  <TableCell align="center" width="14%">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${match.second_team_id}.png`} sx={{ color: 'success.main', bgcolor: '#fff', fontSize: '1em' }}></Avatar>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
