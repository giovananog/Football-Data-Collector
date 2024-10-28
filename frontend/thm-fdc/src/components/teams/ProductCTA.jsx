// TeamInfo.js
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StadiumIcon from '@mui/icons-material/Stadium';

const TeamInfo = () => {
  return (
    <Card sx={{ width: "70%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          {/* Imagem do time à esquerda */}
          <Box
            component="img"
            src="https://tmssl.akamaized.net//images/logo/header/bra1.png?lm=1713364599"
            alt="Guarani Futebol Clube"
            sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
          />

          {/* Informações do time à direita */}
          <Box>
            {/* Nome do Time */}
            <Typography variant="h4" component="div" fontWeight="bold" marginBottom={10}>
              Guarani Futebol Clube (SP)
            </Typography>

            {/* Informações do Time */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Squad size:</Typography>
                <Typography variant="body2" color="text.secondary">34</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Average age:</Typography>
                <Typography variant="body2" color="text.secondary">27.5</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Foreigners:</Typography>
                <Typography variant="body2" color="text.secondary">0%</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">National players:</Typography>
                <Typography variant="body2" color="text.secondary">0</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Stadium:</Typography>
                <Box display="flex" alignItems="center">
                  <StadiumIcon color="primary" fontSize="small" sx={{ marginRight: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Estádio Brinco de Ouro da Princesa (32,453 seats)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Current Trainer:</Typography>
                <Typography variant="body2" color="text.secondary">Técnico</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
