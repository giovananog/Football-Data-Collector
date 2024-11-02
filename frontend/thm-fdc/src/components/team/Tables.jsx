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

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>
        {/* Grid para a tabela de Gols */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Gols</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <GoalsTable />
          </MainCard>
        </Grid> */}

        {/* Grid para a tabela de Substituições */}
        {/* <Grid item xs={12} md={6} lg={6}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Substituições</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <SubstitutionsTable />
          </MainCard>
        </Grid> */}
{/* 
        <Grid item xs={12} md={6} lg={10}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Faltas</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <CardsTable />
          </MainCard>
        </Grid> */}

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
                  <PlayerTable />
                </MainCard>
              </Grid>
            </Grid>
          </Grid>

          {/* Coluna da Tabela de Competição */}
          <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Tabela</Typography>
              </Grid>
              <Grid item xs={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                  <CompetitionTable />
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        {/* <Grid item xs={12} md={10} lg={6} sx={{ marginTop: 10 }}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Estatísticas</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Stats />
          </MainCard>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
