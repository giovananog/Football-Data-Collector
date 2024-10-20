// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../general/components/MainCard';
import ReportAreaChart from '../general/components/ReportAreaChart';
import MultiActionAreaCard from './components/Card'
import DialogCard from './DialogCard'


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>
      <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
        <Typography variant="h5">Estádio e Árbitro</Typography>
        <Typography variant="p"></Typography>
      </Grid>

      
        <Grid item xs={12} md={4} lg={4}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <DialogCard width={630} height={300} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <DialogCard width={630} height={300}  />
          </MainCard>
        </Grid>

  
</Grid>
</Grid>


  );
}