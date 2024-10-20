// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../general/components/MainCard';
import MultiActionAreaCard from './components/Card'
import DialogCard from "./DialogCard"


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  const items = Array.from({ length: 11 });

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
        <Typography variant="h5">Jogadores</Typography>
        <Typography variant="p">Palmeiras</Typography>
      </Grid>

      {items.map((_, index) => (
        <Grid item xs={12} md={4} lg={1} key={index}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <DialogCard width={200} height={200}/>
          </MainCard>
        </Grid>
      ))}
  
</Grid>
</Grid>


  );
}