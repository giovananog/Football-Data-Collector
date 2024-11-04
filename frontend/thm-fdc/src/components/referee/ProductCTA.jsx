// TeamInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from "../../api";

const TeamInfo = (props) => {
  const [refereeData, setRefereeData] = useState(null);
  
  React.useEffect(() => {
    api.get(`referee/${props.id}`).then(res => {
      setRefereeData(res.data);
    });
  }, []);

  if (!refereeData) {
    return <Typography variant="h6" align="center">No data available</Typography>;
  }

  return (
    <Card sx={{ width: "60%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {/* Coluna Principal - Informações do Árbitro */}
          <Box display="flex" alignItems="flex-start" width="70%">
            {/* Imagem do Árbitro */}
            <Box
              component="img"
              src={refereeData.image}
              alt="Referee Image"
              sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
            />

            {/* Informações do Árbitro */}
            <Box>
              <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
                {refereeData.name}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Birth:</Typography>
                  <Typography variant="body2" color="text.secondary">{refereeData.date_of_birth}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Citizenship:</Typography>
                  <Typography variant="body2" color="text.secondary">{refereeData.citizenship}</Typography>
                </Grid>
                {refereeData.first_competition_debut && (
                  <Grid item xs={6} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">Debut:</Typography>
                    <Typography variant="body2" color="text.secondary">{refereeData.first_competition_debut}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Exemplo de uso
// <TeamInfo refereeId={1098} />

export default TeamInfo;
