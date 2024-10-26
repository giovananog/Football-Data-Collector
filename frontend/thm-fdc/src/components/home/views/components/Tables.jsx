// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OrdersTable from './OrdersTable';
import MainCard from '../../../general/components/MainCard';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ paddingTop: 10, bgcolor: "#dce4f2", justifyContent: "center" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 1, marginBottom: 6 }}>
        <Grid item xs={12} lg={11} sx={{ mb: -2.25, height: 120 }} textAlign={"left"}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#171248', paddingLeft: 8 }}> Destaques</Typography>
        </Grid>
        <Grid container item xs={12} md={7} lg={3}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Destaques - 2023/2024</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2, border:'none' }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid container item xs={12} md={7} lg={3}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Destaques - 2022/2023</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2, border:'none' }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid container item xs={12} md={7} lg={3}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Destaques - 2021/2022</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2, border:'none' }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
}