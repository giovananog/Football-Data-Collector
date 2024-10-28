import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const players = [
  {
    year: 2023,
    name: 'Luis Suárez',
    country: 'Uruguay',
    position: 'Centre-Forward',
    club: 'Inter Miami',
    img: 'https://example.com/player-image.jpg', 
    clubImg: 'https://example.com/club-image.png', 
    stats: {
      goals: 25,
      assists: 10,
      yellowCards: 3,
    },
  },
];

export default function PlayerOfTheYear() {
  const [currentIndex] = useState(0);
  
  const { year, name, country, position, club, img, clubImg, stats } = players[currentIndex];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: '80%', backgroundColor: '#fff', p: 2, borderRadius: 2,  justifyContent: 'center', alignItems: 'center' }}>
      {/* Player Info Box */}
      <Box sx={{ width: '40%', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Footballer of the Year: Brazil
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>{country}</Typography>

        <Box sx={{ position: 'relative', mb: 2 }}>
          <Box component="img" src={'https://tmssl.akamaized.net//images/foto/galerie/luis-suarez-inter-miami-cf-1712341266-133568.jpg?lm=1712341374'} alt={name} sx={{ width: '100%', borderRadius: 1 }} />
        </Box>

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

      {/* Statistics Box */}
      <Box sx={{ width: '40%', backgroundColor: '#fff', p: 2, borderRadius: 2, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Player Statistics
        </Typography>
      <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><Typography variant="subtitle2">Goals:</Typography></TableCell>
                <TableCell><Typography>{stats.goals}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="subtitle2">Assists:</Typography></TableCell>
                <TableCell><Typography>{stats.assists}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="subtitle2">Yellow Cards:</Typography></TableCell>
                <TableCell><Typography>{stats.yellowCards}</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
