// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../match/components/MainCard';
import StatsTable from './components/StatsTable';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard(props) {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>
        <Grid container spacing={2} sx={{ marginTop: 10, justifyContent: 'center' }}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Estatísticas no Campeonato</Typography>
              </Grid>
              <Grid item xs={12} >
                <MainCard content={false}>
                  <StatsTable id={props.id}/>
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
