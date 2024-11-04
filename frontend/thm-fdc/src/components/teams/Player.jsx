import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import api from "../../api"

export default function PlayerOfTheYear(props) {
  const [player, setPlayer] = useState(null);

  React.useEffect(() => {
    api.get(`player-of-the-year/${props.id}`).then(res => {
      setPlayer(res.data); 
    });
  }, []);

  // Verifica se os dados do jogador estão disponíveis
  if (!player) {
    return <Typography variant="h6" align="center">Carregando...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: '80%', backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
      {/* Player Info Box */}
      <Box sx={{ width: '40%', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Footballer of the Year: Brazil
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{player.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>{player.position}</Typography>

        <Box sx={{ position: 'relative', mb: 2 }}>
          <Box component="img" src={player.player_image_1} alt={player.name} sx={{ width: '100%', borderRadius: 1 }} />
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
                <TableCell align="center">{props.id}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={player.player_image_2} sx={{ width: 30, height: 30 }} />
                    <Typography>{player.name}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">{player.position}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${player.team_image}.png`}  alt={player.name} sx={{ width: 30, height: 30 }} />
                </TableCell>
                <TableCell align="center">
                  <Box component="img" src={player.national_image} alt={player.name} sx={{ width: 30, height: 20 }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
