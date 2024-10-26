// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../match/components/MainCard';
import OrdersTable from './components/OrdersTable';
import PaginationLink from './Pagination';

// Mock data for demonstration
const matchData = [
  { id: 1, team1: 'Palmeiras', score: '3x2', team2: 'Flamengo' },
  { id: 2, team1: 'São Paulo', score: '1x1', team2: 'Santos' },
  { id: 3, team1: 'Corinthians', score: '2x0', team2: 'Grêmio' },
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 2, justifyContent: "center" }}>
        {Array.from({ length: 3 }).map((_, index) => ( // Alterado para 3 instâncias
          <Grid container item xs={12} md={7} lg={3} key={index}> {/* Alterado lg para 4 */}
            <Grid container>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h5">Partidas</Typography>
              </Grid>
            </Grid>
            <br />
            <MainCard sx={{ mt: 2, border: 'none', width: '100%' }} content={false}>
              {matchData.map(match => (
                <OrdersTable key={match.id} match={match} /> // Assuming OrdersTable takes match data as a prop
              ))}
            </MainCard>
            <Grid item sx={{ justifyContent: "flex-end", alignItems: "center", width: "100%", display: "flex" }}>
              <PaginationLink />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
