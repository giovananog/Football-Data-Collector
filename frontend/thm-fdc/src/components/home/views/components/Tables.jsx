// Dashboard.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OrdersTable from './OrdersTable';
import MainCard from './MainCard';
import api from "../../../../api";
import { Link } from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard() {
  const [tablesCount, setTablesCount] = React.useState({});

  React.useEffect(() => {
    const seasons = [2020, 2021, 2022, 2023]; // Adicione os anos necessários aqui
    Promise.all(seasons.map(year => api.get(`table/${year}`)))
      .then(responses => {
        const newTablesCount = {};
        responses.forEach((response, index) => {
          const year = seasons[index];
          newTablesCount[year] = response.data.slice(0, 5); // Pegando os primeiros 5 times
        });
        setTablesCount(newTablesCount);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ paddingTop: 10, paddingBottom: 10, bgcolor: "#dce4f2", justifyContent: "center" }}>
      {Object.keys(tablesCount).map(year => (
        <Grid container item xs={12} md={7} lg={4.2} key={year}>
          <Grid container>
            <Grid item xs={12} lg={12} sx={{ mb: -2.25 }} textAlign={"center"}>
            <Link href={`campeonatos/${parseInt(year) + 1}`}>
              <Typography variant="h5">{`Temporada - ${parseInt(year) + 1}`}</Typography>
            </Link>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable rows={tablesCount[year]} />
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
