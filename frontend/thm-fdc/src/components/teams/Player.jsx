import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const players = [
  {
    year: 2023,
    name: 'Luis Suárez',
    country: 'Uruguay',
    position: 'Centre-Forward',
    club: 'Inter Miami',
    img: 'https://example.com/player-image.jpg', // URL da imagem do jogador
    clubImg: 'https://example.com/club-image.png', // URL da imagem do clube
  },
  // Adicione mais objetos de jogadores conforme necessário
];

export default function PlayerOfTheYear() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
  };

  const { year, name, country, position, club, img, clubImg } = players[currentIndex];

  return (
    <Box sx={{ height: '5%', width: '60%', margin: 'auto', textAlign: 'center', backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Footballer of the Year: Brazil
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{name}</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>{country}</Typography>

      {/* Carousel controls */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box component="img" src={'https://tmssl.akamaized.net//images/foto/galerie/luis-suarez-inter-miami-cf-1712341266-133568.jpg?lm=1712341374'} alt={name} sx={{ width: '100%', borderRadius: 1 }} />
      </Box>


      {/* Player details table */}
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Players</TableCell>
              <TableCell align="center">Club</TableCell>
              <TableCell align="center">Nat.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{year}</TableCell>
              <TableCell align="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar src={img} sx={{ width: 30, height: 30 }} />
                  <Typography>{name}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">{position}</Typography>
              </TableCell>
              <TableCell align="center">
                <Avatar src={clubImg} alt={club} sx={{ width: 30, height: 30 }} />
              </TableCell>
              <TableCell align="center">
                <Box component="img" src={`https://example.com/flags/${country.toLowerCase()}.png`} alt={country} sx={{ width: 30, height: 20 }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
