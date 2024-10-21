// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from './AnalyticEcommerce';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, marginBottom: 4, bgcolor: "#fff", justifyContent: "center" }}>
      {/* row 1 */}
      <Grid item xs={12} lg={11} sx={{ mb: -2.25, height: 120 }} textAlign={"left"}>
        <Typography variant="h3" sx={{fontWeight: 'bold', color: '#171248', paddingLeft: 8 }}> Nossos dados</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Temporadas" count="6" percentage={9} extra="35,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Partidas" count="78,250" percentage={70.5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Times" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Jogadores" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Estádios" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
        </Grid>
    </Grid>
  </Grid>
  );
}