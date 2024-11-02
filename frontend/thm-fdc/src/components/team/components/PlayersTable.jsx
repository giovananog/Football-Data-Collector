// PlayerTable.js
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';

// Função para criar dados
function createData(number, id, image, name, position, birth, height, foot, joined) {
  return { number, id, image, name, position, birth, height, foot, joined };
}

// Exemplo de dados dos jogadores
const rows = [
  createData(1, '12345', 'https://path/to/player_image1.jpg', 'Carlos Silva', 'Atacante', '1995-07-12', '1.80m', 'Direito', '2022-01-10'),
  createData(2, '12346', 'https://path/to/player_image2.jpg', 'João Souza', 'Meio-Campo', '1998-09-22', '1.75m', 'Esquerdo', '2021-03-15'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
  createData(3, '12347', 'https://path/to/player_image3.jpg', 'Lucas Pereira', 'Defensor', '2000-04-05', '1.88m', 'Direito', '2023-07-01'),
];

// Configuração das colunas da tabela
const headCells = [
  { id: 'number', label: 'Número', align: 'center' },
  { id: 'id', label: 'ID', align: 'center' },
  { id: 'image', label: 'Imagem', align: 'center' },
  { id: 'name', label: 'Nome', align: 'center' },
  { id: 'position', label: 'Posição', align: 'center' },
  { id: 'birth', label: 'Data de Nascimento', align: 'center' },
  { id: 'height', label: 'Altura', align: 'center' },
  { id: 'foot', label: 'Pé', align: 'center' },
  { id: 'joined', label: 'Data de Entrada', align: 'center' },
];

// Cabeçalho da tabela
function PlayerTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ padding: '4px' }}
          >
            {headCell.label}
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
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          display: 'block',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <PlayerTableHead />
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={`${row.id}-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ padding: '4px' }}>{row.number}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.id}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>
                  <Avatar
                    src={row.image}
                    alt={row.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.name}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.position}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.birth}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.height}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.foot}</TableCell>
                <TableCell align="center" sx={{ padding: '4px' }}>{row.joined}</TableCell>
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
