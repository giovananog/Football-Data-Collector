// StadiumInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from "../../../api";


export default function StadiumInfo(props) {
  const [stadiumData, setStadiumData] = useState([]);
  const [stadiumDetails, setStadiumDetails] = useState([]);

  useEffect(() => {
    // Fetch stadium basic information
    api.get(`stadium/${props.id}`).then(res => {
      setStadiumData(res.data);
    });

    // Fetch stadium detailed information
    api.get(`stadium-details/${props.id}`).then(res => {
      setStadiumDetails(res.data);
    });
  }, [props]);

  return (
    <Card sx={{ width: "30%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        {/* <Typography variant="h5" fontWeight="bold" sx={{ color: '#2b3a4b', marginBottom: 2 }}>
          {stadiumData.name.toUpperCase()}
        </Typography> */}
        <Box display="flex" justifyContent="space-between">
          
          {/* Imagem do Estádio */}
          <Box
            component="img"
            src={stadiumDetails.image}
            // alt={stadiumData.name}
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
                <Typography variant="body2" color="text.secondary">{stadiumDetails.capacity}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">International capacity:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumDetails.capacityInternational}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Standing room:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumDetails.standingRoom}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Seats:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumDetails.seats} ({stadiumDetails.coveredSeats})</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Boxes:</Typography>
                <Typography variant="body2" color="text.secondary">{stadiumDetails.boxes}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
