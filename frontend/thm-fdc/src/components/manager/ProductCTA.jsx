// TeamInfo.js
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const TeamInfo = () => {
  return (
    <Card sx={{ width: "60%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          
          {/* Coluna Principal - Informações do Jogador */}
          <Box display="flex" alignItems="flex-start" width="70%">
            {/* Imagem do Jogador */}
            <Box
              component="img"
              src="https://img.a.transfermarkt.technology/portrait/header/1068-1668416179.jpg?lm=1"
              alt="Player Image"
              sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
            />

            {/* Informações do Jogador */}
            <Box>
              <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
                Luiz Felipe Scolari
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Birth:</Typography>
                  <Typography variant="body2" color="text.secondary">34</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Date of birth:</Typography>
                  <Typography variant="body2" color="text.secondary">27.5</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Citizenship:</Typography>
                  <Typography variant="body2" color="text.secondary">0%</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Coaching License:</Typography>
                  <Typography variant="body2" color="text.secondary">0</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Avt Term:</Typography>
                  <Typography variant="body2" color="text.secondary">Goalkeeper</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Current Team (2023):</Typography>
                  <Typography variant="body2" color="text.secondary">Técnico</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
