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

// project import
import Dot from '../../general/components/Dot';

function createData(data, time1, score, stadium, status, team2) {
  return { data, time1, score, stadium, status, team2};
}

const rows = [
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 0, "Flamengo"),
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 0, "Flamengo"),
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 1, "Flamengo"),
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 1, "Flamengo"),
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 1, "Flamengo"),
  createData("20/10/2024 - 18:00-19:30", 'Palmeiras', "3x2", "Morumbi", 2, "Flamengo"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'data',
    align: 'center',
    disablePadding: false,
    label: 'Data - Horário'
  },
  {
    id: 'time1',
    align: 'center',
    disablePadding: false,
    label: 'Time casa'
  },
  {
    id: 'score',
    align: 'center',
    disablePadding: false,
    label: 'Score'
  },
  {
    id: 'team2',
    align: 'center',
    disablePadding: false,

    label: 'Time visitante'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'stadium',
    align: 'center',
    disablePadding: false,
    label: 'Estádio'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead bgcolor="#eee">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx= {{ fontWeight:"bold" }}
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
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'data';

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
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.data}
                >
                  <TableCell align="center" id={labelId} scope="row">
                    {row.data}
                  </TableCell>
                  <TableCell align="center">{row.time1}</TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                  <TableCell align="center"> {row.team2} </TableCell>
                  <TableCell align="center">
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="center">{row.stadium} </TableCell>
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

OrderStatus.propTypes = { status: PropTypes.number };