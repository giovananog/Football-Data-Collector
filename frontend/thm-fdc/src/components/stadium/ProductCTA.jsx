// StadiumInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from "../../api";

const StadiumInfo = (props) => {
  const [stadiumData, setStadiumData] = useState(null);
  const [stadiumDetails, setStadiumDetails] = useState(null);

  useEffect(() => {
    // Fetch stadium basic information
    api.get(`stadium/${props.id}`).then(res => {
      setStadiumData(res.data);
    });

    // Fetch stadium detailed information
    api.get(`stadium-details/${props.id}`).then(res => {
      setStadiumDetails(res.data);
    });
  }, [props.id]);

  if (!stadiumData || !stadiumDetails) return null; // Show nothing while loading

  return (
    <Card sx={{ width: "60%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {/* Coluna Principal - Informações do Estádio */}
          <Box display="flex" alignItems="flex-start" width="70%">
            {/* Imagem do Estádio */}
            <Box
              component="img"
              src={stadiumDetails.team_image}
              alt="Stadium Image"
              sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
            />

            {/* Informações do Estádio */}
            <Box>
              <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
                {stadiumData.name}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Capacity:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.capacity}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Built:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.built}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.address}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Surface:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.surface}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Pitch Size:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.pitch_size}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Formerly:</Typography>
                  <Typography variant="body2" color="text.secondary">{stadiumDetails.formerly}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StadiumInfo;
