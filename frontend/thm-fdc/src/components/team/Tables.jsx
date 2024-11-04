// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../match/components/MainCard';
// import SubstitutionsTable from './components/SubstitutionsTable';
// import GoalsTable from './components/GoalsTable';
// import CardsTable from './components/CardsTable';
import PlayerTable from './components/PlayersTable';
import CompetitionTable from './components/CompetitionTable';
// import Stats from './components/Stats';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard(props) {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>

        <Grid container spacing={2} sx={{ marginTop: 10, justifyContent: 'center' }}>
          {/* Coluna das Tabelas de Jogadores */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Jogadores</Typography>
              </Grid>
              {/* Primeira Tabela de Jogadores */}
              <Grid item xs={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <PlayerTable teamId={props.teamId}/>
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
