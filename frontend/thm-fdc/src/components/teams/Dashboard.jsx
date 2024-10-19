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
      <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
        <Typography variant="h5">Estatísticas Gerais</Typography>
        <Typography variant="p">Campeonato de 2024</Typography>
      </Grid>
  {/* Primeiro Gráfico */}
  <Grid item xs={12} md={4} lg={3}>
    <MainCard sx={{ mt: 2 }} content={false}>
      <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
        <ListItemButton divider>
          <ListItemText primary="Company Finance Growth" />
          <Typography variant="h5">+45.14%</Typography>
        </ListItemButton>
        <ListItemButton divider>
          <ListItemText primary="Company Expenses Ratio" />
          <Typography variant="h5">0.58%</Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Business Risk Cases" />
          <Typography variant="h5">Low</Typography>
        </ListItemButton>
      </List>
      <ReportAreaChart />
    </MainCard>
  </Grid>

  {/* Segundo Gráfico */}
  <Grid item xs={12} md={4} lg={3}>
    <MainCard sx={{ mt: 2 }} content={false}>
      <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
        <ListItemButton divider>
          <ListItemText primary="Company Finance Growth" />
          <Typography variant="h5">+45.14%</Typography>
        </ListItemButton>
        <ListItemButton divider>
          <ListItemText primary="Company Expenses Ratio" />
          <Typography variant="h5">0.58%</Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Business Risk Cases" />
          <Typography variant="h5">Low</Typography>
        </ListItemButton>
      </List>
      <ReportAreaChart />
    </MainCard>
  </Grid>

  {/* Terceiro Gráfico */}
  <Grid item xs={12} md={4} lg={3}>
    <MainCard sx={{ mt: 2 }} content={false}>
      <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
        <ListItemButton divider>
          <ListItemText primary="Company Finance Growth" />
          <Typography variant="h5">+45.14%</Typography>
        </ListItemButton>
        <ListItemButton divider>
          <ListItemText primary="Company Expenses Ratio" />
          <Typography variant="h5">0.58%</Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Business Risk Cases" />
          <Typography variant="h5">Low</Typography>
        </ListItemButton>
      </List>
      <ReportAreaChart />
    </MainCard>
  </Grid>
</Grid>
</Grid>


  );
}