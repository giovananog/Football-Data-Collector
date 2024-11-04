import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import api from "../../api"
import { Link } from 'react-router-dom';


export default function MatchStrip(props) {

  const [matchData, setMatchData] = useState({});
  const [firstTeamData, setFirstTeamData] = useState({});
  const [secondTeamData, setSecondTeamData] = useState({});
  const [stadiumData, setStadiumData] = useState({});
  const [refereeData, setRefereeData] = useState({});
  const [firstmanagerData, setFirstManagerData] = useState({});
  const [secondmanagerData, setSecondManagerData] = useState({});

  useEffect(() => {
    api.get(`/matches/${props.matchId}`).then(res => {
      setMatchData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, []);

  useEffect(() => {
    api.get(`/teams/${matchData.first_team_id}`).then(res => {
      setFirstTeamData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, [matchData]);

  useEffect(() => {
    api.get(`/manager/${matchData.fst_coach_id}`).then(res => {
      setFirstManagerData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, [matchData.fst_coach_id]);

  useEffect(() => {
    api.get(`/manager/${matchData.scnd_coach_id}`).then(res => {
      setSecondManagerData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, [matchData.scnd_coach_id]);

  useEffect(() => {
    api.get(`/teams/${matchData.second_team_id}`).then(res => {
      setSecondTeamData(res.data);
    }).catch(error => {
      console.error('Erro ao buscar dados do gerente:', error);
    });
  }, [matchData]);

  useEffect(() => {

    if(matchData.stadium_id){
      api.get(`/stadium/${matchData.stadium_id}`).then(res => {
        setStadiumData(res.data);
      }).catch(error => {
        console.error('Erro ao buscar dados do estadio:', error);
      });
    }
  }, [matchData]);

  useEffect(() => {
    if(matchData.referee_id) {
      api.get(`/referee/${matchData.referee_id}`).then(res => {
        setRefereeData(res.data);
      }).catch(error => {
        console.error('Erro ao buscar dados do estadio:', error);
      });
    }
  }, [matchData]);

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
        {/* <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{matchData.season}</Typography> */}
      </Box>

      {/* Container de Times e Placar */}
      <Box sx={{
        display: 'flex',
        position: 'relative',
      }}>
        {/* Time 1 */}
        <Box sx={{
          backgroundColor: "#fff",
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
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{firstTeamData.address}</Typography>
            {/* <Typography variant="body2">{matchData.teams[0].record}</Typography> */}
          </Box>
          <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${matchData.first_team_id}.png`} alt={matchData.score} sx={{ width: 60, height: 60, marginBottom: 2 }} />
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
              {matchData.score} 
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
          <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${matchData.second_team_id}.png`} alt={matchData.score} sx={{ width: 60, height: 60, marginBottom: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{secondTeamData.address}</Typography>
            {/* <Typography variant="body2">{matchData.teams[1].record}</Typography> */}
          </Box>
        </Box>

        {/* Fundo colorido do Time 2 */}
        <Box sx={{
          backgroundColor: "#fff",
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
      {/* <Box sx={{
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
      </Box> */}

      {/* Informações adicionais do jogo */}
      <Box sx={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}>
        <Typography variant="body2"><strong>Estádio:</strong> 
        <Link to={`../../../estadios/${matchData.stadium_id}`}>
          {stadiumData.name}
        </Link>
        </Typography>
        <Typography variant="body2"><strong>Juiz:</strong>
        <Link to={`../../../juizes/${matchData.referee_id}`}>
          {refereeData.name}
        </Link>
         </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2"><strong>Técnicos:</strong> </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${matchData.first_team_id}.png`} alt={matchData.score} sx={{ width: 30, height: 30, marginBottom: 2 }} />
            <Link to={`../../../tecnicos/${matchData.fst_coach_id}`}>
              <Typography variant="body2">{firstmanagerData.name}</Typography>
            </Link>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <Avatar src={`https://tmssl.akamaized.net//images/wappen/normquad/${matchData.second_team_id}.png`} alt={matchData.score} sx={{ width: 30, height: 30, marginBottom: 2 }} />
              <Link to={`../../../tecnicos/${matchData.scnd_coach_id}`}>
                <Typography variant="body2">{secondmanagerData.name}</Typography>
              </Link>
              
            </Box>
        </Box>
      </Box>

    </Box>
  );
}
