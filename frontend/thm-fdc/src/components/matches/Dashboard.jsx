import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from '../match/components/MainCard';
import OrdersTable from './components/OrdersTable';
import api from '../../api';
import Button from '@mui/material/Button';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Dashboard(props) {
  const [matchData, setMatchData] = useState([]);

  // Estado para controlar quantas partidas estão visíveis para cada matchDay
  const [visibleMatches, setVisibleMatches] = useState({});

  useEffect(() => {
    api.get(`/matches/season/${props.season}`).then(res => {
      setMatchData(res.data);
      const groupedMatches = res.data.reduce((acc, match) => {
        const matchDay = match.matchday || 'Unknown';
        if (!acc[matchDay]) {
          acc[matchDay] = [];
        }
        acc[matchDay].push(match);
        return acc;
      }, {});

      const initialVisibility = Object.keys(groupedMatches).reduce((acc, day) => {
        acc[day] = 4; // Mostrar inicialmente 4 partidas
        return acc;
      }, {});

      setVisibleMatches(initialVisibility);
    });
  }, []);

  // Agrupando partidas por dias
  const groupedMatches = matchData.reduce((acc, match) => {
    const matchDay = match.matchday || 'Unknown'; // Assumindo que a propriedade matchDay existe
    if (!acc[matchDay]) {
      acc[matchDay] = [];
    }
    acc[matchDay].push(match);
    return acc;
  }, {});

  // Convertendo o objeto em um array para facilitar a iteração
  const matchDays = Object.entries(groupedMatches);

  // Função para carregar mais partidas
  const loadMoreMatches = (matchDay) => {
    setVisibleMatches((prev) => ({
      ...prev,
      [matchDay]: prev[matchDay] + 4, // Adiciona mais 4 partidas visíveis
    }));
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ marginTop: 4, bgcolor: "#fafafa", justifyContent: "center" }}>
      <Grid item xs={12} textAlign={"center"}>
        <Typography variant="h5">Partidas da Temporada {props.season}</Typography>
      </Grid>
      {matchDays.reduce((acc, [matchDay, matches]) => {
        // Agrupa os matchDays em pares
        if (acc.length === 0 || acc[acc.length - 1].length === 2) {
          acc.push([[matchDay, matches]]);
        } else {
          acc[acc.length - 1].push([matchDay, matches]);
        }
        return acc;
      }, []).map((pair, index) => (
        <Grid container key={index} sx={{ marginBottom: 10, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
          {pair.map(([matchDay, matches]) => (
            <Grid item xs={12} md={6} lg={4} key={matchDay}>
              <Typography variant="h6">Dia de Partida: {matchDay}</Typography>
              {/* Criação de duas colunas para os jogos */}
              <Grid container item xs={12} justifyContent={'center'} spacing={2}>
                {matches.slice(0, visibleMatches[matchDay]).map((match) => (
                  <Grid item xs={12} md={6} key={match.id}> {/* Mantido 6 colunas para 2 por linha */}
                    <MainCard sx={{ mt: 2, border: 'none', width: '100%' }}>
                      <OrdersTable matchData={[match]} /> {/* Assume que OrdersTable aceita um array */}
                    </MainCard>
                  </Grid>
                ))}
              </Grid>
              {/* Botão para carregar mais partidas */}
              {visibleMatches[matchDay] < matches.length && (
                <Grid item xs={12} textAlign={"center"}>
                  <Button variant="contained" onClick={() => loadMoreMatches(matchDay)} sx={{ marginTop: 2 }}>
                    Carregar mais partidas
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
