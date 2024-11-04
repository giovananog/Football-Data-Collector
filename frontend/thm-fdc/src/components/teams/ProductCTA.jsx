// TeamInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from "../../api"

const TeamInfo = (props) => {
  const [topTeam, setTopTeam] = useState('');
  const [secondTeam, setLastTeam] = useState('');
  const [trdTeam, setTrdTeam] = useState('');

  React.useEffect(() => {
    api.get(`table/${props.id}`).then(res => {
        setTopTeam(res.data[0].team_id); 
        setLastTeam(res.data[1].team_id); 
        setTrdTeam(res.data[2].team_id); 
    });
  }, []);

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
              Campeonato Brasileiro Série A - {props.id}
            </Typography>

            {/* Informações do Time */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Primeiro colocado:</Typography>
                <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${topTeam}.png`} style={{ width: '30px', height: '30px' }} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Segundo colocado:</Typography>
                <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${secondTeam}.png`} style={{ width: '30px', height: '30px' }} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Terceiro colocado:</Typography>
                <img src={`https://tmssl.akamaized.net//images/wappen/normquad/${trdTeam}.png`} style={{ width: '30px', height: '30px' }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
