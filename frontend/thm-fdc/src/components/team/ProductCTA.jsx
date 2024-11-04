// TeamInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import StadiumIcon from '@mui/icons-material/Stadium';
import api from "../../api"

const TeamInfo = (props) => {
  const [teamData, setTeamData] = useState({});

  React.useEffect(() => {
    api.get(`/teams/${props.teamId}`).then(res => {
      setTeamData(res.data);
    });
  }, []);


  if (!teamData) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Card sx={{ width: "70%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          {/* Imagem do time à esquerda */}
          <Box
            component="img"
            src={`https://tmssl.akamaized.net//images/wappen/normquad/${teamData.id}.png`}
            alt={teamData.name || "Time"}
            sx={{ width: 200, height: 140, marginRight: 4, objectFit: 'contain' }}
          />

          {/* Informações do time à direita */}
          <Box>
            {/* Nome do Time */}
            <Typography variant="h4" component="div" fontWeight="bold" marginBottom={2}>
              {teamData.address || "Nome do Time"}
            </Typography>

            {/* Informações do Time */}
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Squad size:</Typography>
                <Typography variant="body2" color="text.secondary">{teamData.squad_size || "N/A"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Fundação:</Typography>
                <Typography variant="body2" color="text.secondary">{teamData.founded || "N/A"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Foreigners:</Typography>
                <Typography variant="body2" color="text.secondary">{teamData.foreigners || "N/A"}%</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">National players:</Typography>
                <Typography variant="body2" color="text.secondary">{teamData.national_team_players || "N/A"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Stadium:</Typography>
                <Box display="flex" alignItems="center">
                  <StadiumIcon color="primary" fontSize="small" sx={{ marginRight: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {teamData.stadium || "N/A"} ({teamData.stadium_capacity || "N/A"} seats)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Membros:</Typography>
                <Typography variant="body2" color="text.secondary">{teamData.members || "N/A"}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
