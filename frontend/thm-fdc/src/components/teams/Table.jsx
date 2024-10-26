// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../general/components/MainCard';
import CompetitionTable from './components/CompetitionTable';
import PlayerStats from './components/PlayerStats';
import OrdersTable from './components/OrdersTable'
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid container spacing={2} sx={{ marginBottom: 10, marginTop: 10, justifyContent: "center" }}>
        
        {/* Coluna da Tabela de Competição e Tabela de Jogadores lado a lado */}
        <Grid item xs={12} md={6} lg={5}> {/* Ajuste a largura conforme necessário */}
          <Grid container direction="column">
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">Tabela de Competição</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard sx={{ mt: 2 }} content={false}>
                <CompetitionTable />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={5}> {/* Ajuste a largura conforme necessário */}
          <Grid container direction="column">
            <Grid item xs={12} textAlign={"center"}>
              <Typography variant="h5">Jogadores Destaque</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard sx={{ mt: 2 }} content={false}>
                <PlayerStats />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: 10, marginBottom: 1 }}>
        <Grid container item xs={12} md={7} lg={10}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
              <Typography variant="h5">Partidas</Typography>
              <Typography variant="p">Últimas partidas</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <br/>
          <br/>
          <br/>
          {/* <MainCard sx={{ mt: 2, border: 'none' }} content={false}>
            <OrdersTable />
          </MainCard> */}
          <MainCard sx={{ mt: 2, border: 'none', width: '28%', marginRight: '2%', marginLeft: '2%' }} content={false}>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
          </MainCard>
          <MainCard sx={{ mt: 2, border: 'none', width: '28%', marginRight: '2%', marginLeft: '2%' }} content={false}>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
          </MainCard>
          <MainCard sx={{ mt: 2, border: 'none', width: '28%', marginRight: '2%', marginLeft: '2%' }} content={false}>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
            <OrdersTable />
            <br/>
          </MainCard>
          <Grid item sx={{ justifyContent:"flex-end", alignItems:"center", width: "100%", display: "flex" }}>
            {/* <PaginationLink /> */}
            <Typography variant="p">Todas</Typography>
            <ForwardOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 50 }} />

        </Grid>
        </Grid>
      </Grid>


      </Grid>
    </Grid>
  );
}
