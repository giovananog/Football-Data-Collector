// TeamInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from '../../api'; // Certifique-se de que a configuração da API está correta

const TeamInfo = (props) => {
  const [managerData, setManagerData] = useState(null);

  useEffect(() => {
    api.get(`/manager/${props.id}`).then(res => {
      setManagerData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, [props]);

  if (!managerData) {
    return <Typography variant="h6" align="center">No data available</Typography>;
  }

  return (
    <Card sx={{ width: "60%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {/* Coluna Principal - Informações do Gerente */}
          <Box display="flex" alignItems="flex-start" width="70%">
            {/* Imagem do Gerente */}
            <Box
              component="img"
              src={managerData.img_url}
              alt="Manager Image"
              sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
            />

            {/* Informações do Gerente */}
            <Box>
              <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
                {managerData.name}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Birth:</Typography>
                  <Typography variant="body2" color="text.secondary">{managerData.age}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Citizenship:</Typography>
                  <Typography variant="body2" color="text.secondary">{managerData.birth_place}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Country:</Typography>
                  <Typography variant="body2" color="text.secondary">{managerData.country}</Typography>
                </Grid>
                {managerData.coaching_license && (
                  <Grid item xs={6} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">Coaching License:</Typography>
                    <Typography variant="body2" color="text.secondary">{managerData.coaching_license}</Typography>
                  </Grid>
                )}
                {managerData.active_term && (
                  <Grid item xs={6} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">Active Term:</Typography>
                    <Typography variant="body2" color="text.secondary">{managerData.avg_term}</Typography>
                  </Grid>
                )}
                {managerData.formation && (
                  <Grid item xs={6} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">Prefered Formation:</Typography>
                    <Typography variant="body2" color="text.secondary">{managerData.formation}</Typography>
                  </Grid>
                )}
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Current Team (2023):</Typography>
                  <Typography variant="body2" color="text.secondary">{managerData.actual_team}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Exemplo de uso
// <TeamInfo managerId={1068} />

export default TeamInfo;
