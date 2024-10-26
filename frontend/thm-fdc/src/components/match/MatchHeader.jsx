import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const matchData = {
  league: "2024 Brasileiro Serie A",
  teams: [
    {
      name: "Corinthians",
      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png&scale=crop&cquality=40&location=origin&w=96&h=96",
      score: 5,
      record: "7-11-12, 32 PTS",
      backgroundColor: "#000000",
    },
    {
      name: "Athletico-PR",
      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3458.png&scale=crop&cquality=40&location=origin&w=96&h=96",
      score: 2,
      record: "8-7-13, 31 PTS",
      backgroundColor: "#800000",
    },
  ],
  goals: [
    { player: "Jogador 1", team: "Corinthians" },
    { player: "Jogador 2", team: "Corinthians" },
    { player: "Jogador 3", team: "Corinthians" },
    { player: "Jogador 4", team: "Corinthians" },
    { player: "Jogador 5", team: "Corinthians" },
    { player: "Jogador 1", team: "Athletico-PR" },
    { player: "Jogador 2", team: "Athletico-PR" },
  ],
  matchInfo: {
    stadium: "Maracanã",
    referee: "Anderson Daronco",
    coaches: [
      { name: "Treinador Corinthians", img: "https://via.placeholder.com/30" }, // Imagem placeholder
      { name: "Treinador Athletico-PR", img: "https://via.placeholder.com/30" }, // Imagem placeholder
    ],
  },
};

export default function MatchStrip() {
  return (
    <Box sx={{
      width: '80%',
      margin: '20px auto',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: 4,
      border: '1px solid #ddd',
      backgroundColor: '#fff',
    }}>

      {/* Liga */}
      <Box sx={{
        backgroundColor: '#f9f9f9',
        color: '#000',
        padding: '10px',
        textAlign: 'center',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{matchData.league}</Typography>
      </Box>

      {/* Container de Times e Placar */}
      <Box sx={{
        display: 'flex',
        position: 'relative',
      }}>
        {/* Time 1 */}
        <Box sx={{
          backgroundColor: matchData.teams[0].backgroundColor,
          width: '10%',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '20px',
          color: '#fff',
          position: 'relative',
          left: 0,
          top: 0,
        }} />

        {/* Informações do Time 1 */}
        <Box sx={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fff',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{matchData.teams[0].name}</Typography>
            <Typography variant="body2">{matchData.teams[0].record}</Typography>
          </Box>
          <Avatar src={matchData.teams[0].logo} alt={matchData.teams[0].name} sx={{ width: 60, height: 60, marginBottom: 2 }} />
        </Box>

        {/* Placar */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          color: '#333',
          minWidth: '120px',
          zIndex: 1,
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {matchData.teams[0].score} - {matchData.teams[1].score}
            </Typography>
            <Typography variant="body2">Finalizado</Typography>
          </Box>
        </Box>

        {/* Time 2 */}
        <Box sx={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fff',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Avatar src={matchData.teams[1].logo} alt={matchData.teams[1].name} sx={{ width: 60, height: 60, marginBottom: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{matchData.teams[1].name}</Typography>
            <Typography variant="body2">{matchData.teams[1].record}</Typography>
          </Box>
        </Box>

        {/* Fundo colorido do Time 2 */}
        <Box sx={{
          backgroundColor: matchData.teams[1].backgroundColor,
          width: '10%',
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '20px',
          color: '#fff',
          position: 'relative',
          right: 0,
          bottom: 0,
        }} />
      </Box>

      {/* Finalizado e Gols */}
      <Box sx={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Gols</Typography>
        {matchData.goals.map((goal, index) => (
          <Typography key={index} variant="body2">
            {goal.player} - {goal.team}
          </Typography>
        ))}
      </Box>

      {/* Informações adicionais do jogo */}
      <Box sx={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}>
        <Typography variant="body2"><strong>Estádio:</strong> {matchData.matchInfo.stadium}</Typography>
        <Typography variant="body2"><strong>Juiz:</strong> {matchData.matchInfo.referee}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2"><strong>Técnicos:</strong> </Typography>
          {matchData.matchInfo.coaches.map((coach, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <Avatar src={coach.img} alt={coach.name} sx={{ width: 30, height: 30, marginRight: '5px' }} />
              <Typography variant="body2">{coach.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
