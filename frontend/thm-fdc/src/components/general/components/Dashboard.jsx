// material-ui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// project import
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import ReportAreaChart from './ReportAreaChart';
import OrdersTable from './OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      {/* row 1 */}
      <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} alignItems="center" justifyContent='space-between' direction="column">
        <Typography variant="h5" sx={{ marginLeft: 10 }}>Dashboard</Typography>
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
      <Grid container item xs={12} md={7} lg={8}>
        <Grid container>
          <Grid item >
            <Typography variant="h5">Tabela</Typography>
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
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid> */}
        {/* <MainCard sx={{ mt: 2 }} content={false}>
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
      </Grid> */}
      </Grid>
    </Grid>      
  );
}