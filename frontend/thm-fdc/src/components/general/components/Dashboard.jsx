// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// project import
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import ReportAreaChart from './ReportAreaChart';
import OrdersTable from './OrdersTable';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      {/* row 1 */}
      <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
        <Typography variant="h5">Nossos dados</Typography>
        <Typography variant="p">Nosso banco de dados</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Temporadas" count="4,42,236" percentage={59.3} extra="35,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Partidas Regitradas" count="78,250" percentage={70.5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Jogadores" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <AnalyticEcommerce title="Estádios" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
        </Grid>
    </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 3 */}
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 8 }}>
      <Grid container item xs={12} md={7} lg={4}>
        <Grid container>
          <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
            <Typography variant="h5">Tabela</Typography>
            <Typography variant="p">Tabela parcial de 2024</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      </Grid> 

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