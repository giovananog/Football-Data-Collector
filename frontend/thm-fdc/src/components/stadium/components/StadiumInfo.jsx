// StadiumInfo.js
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const stadiumData = {
  name: "Allianz Parque",
  capacity: "43,713",
  capacityInternational: "43,713 at international matches",
  standingRoom: "170",
  coveredSeats: "including 170 covered",
  seats: "43,713",
  boxes: "170",
};

export default function StadiumInfo() {
  return (
    <Card sx={{ width: "30%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#2b3a4b', marginBottom: 2 }}>
          {stadiumData.name.toUpperCase()}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          
          {/* Imagem do Estádio */}
          <Box
            component="img"
            src={'https://tmssl.akamaized.net//images/foto/stadionmedium/palmeiras-allianz-parque-1667569851-95717.jpg?lm=1667569863'}
            alt={stadiumData.name}
            sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'cover', borderRadius: 2 }}
          />
          
          {/* Informações do Estádio */}
          <Box width="70%">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Name of stadium:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Total capacity:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.capacity}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">International capacity:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.capacityInternational}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Standing room:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.standingRoom}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Seats:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.seats} ({stadiumData.coveredSeats})</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Boxes:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumData.boxes}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
