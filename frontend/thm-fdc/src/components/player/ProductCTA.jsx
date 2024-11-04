// TeamInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import api from '../../api'; // Supondo que a api seja configurada em um arquivo separado

const TeamInfo = (props) => {
  const [playerInfo, setPlayerInfo] = useState(null);

  React.useEffect(() => {
    api.get(`/players/${props.id}`).then(res => {
      setPlayerInfo(res.data);
    });
  }, []);


  if (!playerInfo) {
    return <Typography variant="h6" align="center">Jogador não encontrado.</Typography>;
  }

  return (
    <Card sx={{ width: "80%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          
          {/* Coluna Principal - Informações do Jogador */}
          <Box display="flex" alignItems="flex-start" width="70%">
            {/* Imagem do Jogador */}
            <Box
              component="img"
              src={playerInfo.image}
              alt="Player Image"
              sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
            />

            {/* Informações do Jogador */}
            <Box>
              <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
                {playerInfo.name}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Idade:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.age}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Cidade:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.city}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Cidadania:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.country}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Altura:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.height}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Posição:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.position}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Temporada:</Typography>
                  <Typography variant="body2" color="text.secondary">{playerInfo.season}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
          {/* Coluna Secundária - Imagem do Time */}
          <Box sx={{ width: '20%', textAlign: 'center' }}>
            <Box
              component="img"
              src="https://tmssl.akamaized.net//images/wappen/normquad/1023.png?lm=1411204983" // Você pode substituir por uma imagem dinâmica do time
              alt="Current Team Logo"
              sx={{ width: 140, height: 100, objectFit: 'contain', borderRadius: 1 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

TeamInfo.propTypes = {
  playerId: PropTypes.number.isRequired,
};

export default TeamInfo;
