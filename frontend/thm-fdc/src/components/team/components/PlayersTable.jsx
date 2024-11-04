// PlayerTable.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Typography, Button } from '@mui/material';
import api from "../../../api";

// Componente para exibir as tabelas de jogadores divididas por temporada
const PlayerTable = (props) => {
  const [groupedPlayers, setGroupedPlayers] = useState({});
  const [visiblePlayers, setVisiblePlayers] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get(`/teams/${props.teamId}/players`);
        const data = response.data;

        // Verifique se o campo 'season' está presente nos dados dos jogadores
        if (Array.isArray(data) && data.length > 0) {
          const grouped = data.reduce((acc, player) => {
            if (player.season) {
              if (!acc[player.season]) {
                acc[player.season] = [];
              }
              acc[player.season].push(player);
            } else {
              console.warn('Jogador sem temporada definida:', player);
            }
            return acc;
          }, {});

          setGroupedPlayers(grouped);
          // Inicializa o estado de jogadores visíveis para cada temporada
          const initialVisible = Object.keys(grouped).reduce((acc, season) => {
            acc[season] = 3; // Inicialmente mostra 3 jogadores
            return acc;
          }, {});
          setVisiblePlayers(initialVisible);
        } else {
          console.warn('Nenhum jogador encontrado ou estrutura de dados incorreta.');
        }
      } catch (err) {
        console.error('Erro ao buscar jogadores:', err);
      }
    };

    fetchPlayers();
  }, [props]);

  // Função para mostrar mais jogadores
  const handleShowMore = (season) => {
    setVisiblePlayers((prev) => ({
      ...prev,
      [season]: prev[season] + 3 // Incrementa 3 jogadores a cada clique
    }));
  };

  return (
    <Box>
      {Object.keys(groupedPlayers).map((season) => (
        <Box key={season} mb={4}>
          <Typography variant="h5" gutterBottom>
            Temporada: {season}
          </Typography>
          <TableContainer component={Box}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número</TableCell>
                  <TableCell>Imagem</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Posição</TableCell>
                  <TableCell>Data de Nascimento</TableCell>
                  <TableCell>Altura</TableCell>
                  <TableCell>Pé Preferido</TableCell>
                  <TableCell>Data de Entrada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedPlayers[season].slice(0, visiblePlayers[season]).map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>
                      <Avatar src={player.image} alt={player.name} />
                    </TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.birth}</TableCell>
                    <TableCell>{player.height}</TableCell>
                    <TableCell>{player.foot}</TableCell>
                    <TableCell>{player.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {visiblePlayers[season] < groupedPlayers[season].length && (
            <Button variant="contained" onClick={() => handleShowMore(season)}>
              Ver Mais
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

PlayerTable.propTypes = {
  teamId: PropTypes.number.isRequired,
};

export default PlayerTable;
