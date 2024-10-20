// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// project import
import MainCard from '../general/components/MainCard';
import AnalyticEcommerce from '../general/components/AnalyticEcommerce';
import ReportAreaChart from '../general/components/ReportAreaChart';
import OrdersTable from '../general/components/OrdersTable';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>

      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 1, marginBottom: 1 }}>
        <Grid container item xs={12} md={7} lg={8}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Partidas</Typography>
              <Typography variant="p">Principais Partidas</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <Grid item sx={{ justifyContent:"flex-end", alignItems:"center", width: "100%", display: "flex" }}>
            <Typography variant="p">2024</Typography>
            <CalendarMonthOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 35 }} />
        </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
          <Grid item sx={{ justifyContent:"flex-end", alignItems:"center", width: "100%", display: "flex" }}>
            <Typography variant="p">Mais sobre o campeonato</Typography>
            <ForwardOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 50 }} />
        </Grid>
        </Grid>
      </Grid>

    </Grid>
    </Grid>


  );
}