// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from './AnalyticEcommerce';
import api from "../../../../api";
import React from 'react';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {

  const [playersCount, setPlayersCount] = React.useState([]);
  const [seasonsCount, setSeasonsCount] = React.useState([]);
  const [matchesCount, setMatchesCount] = React.useState([]);
  const [stadiumsCount, setStadiumsCount] = React.useState([]);
  const [refereesCount, setRefereesCount] = React.useState([]);
  const [teamsCount, setTeamsCount] = React.useState([]);
  const [managersCount, setManagersCount] = React.useState([]);
  
  React.useEffect(() => {
    api.get('players-count').then(res => {
      setPlayersCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('seasons-count').then(res => {
      setSeasonsCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('matches-count').then(res => {
      setMatchesCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('stadiums-count').then(res => {
      setStadiumsCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('referees-count').then(res => {
      setRefereesCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('teams-count').then(res => {
      setTeamsCount(res.data);
    });
  }, []);

  React.useEffect(() => {
    api.get('managers-count').then(res => {
      setManagersCount(res.data);
    });
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, marginBottom: 4, bgcolor: "#fff", justifyContent: "center" }}>
      {/* row 1 */}
      <Grid item xs={12} lg={11} sx={{ mb: -2.25, height: 120 }} textAlign={"left"}>
        <Typography variant="h3" sx={{fontWeight: 'bold', color: '#171248', paddingLeft: 8 }}> Nossos dados</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Temporadas" count={seasonsCount.seasons} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Jogadores" count={playersCount.players} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Partidas" count={matchesCount.matches} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Estádios" count={stadiumsCount.stadiums} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Árbitros" count={refereesCount.referees} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Times" count={teamsCount.teams} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <AnalyticEcommerce title="Técnicos" count={managersCount.managers} />
        </Grid>
    </Grid>
  </Grid>
  );
}