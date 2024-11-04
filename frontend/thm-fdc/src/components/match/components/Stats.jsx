import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../../api'; // Import the API configuration

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Stats({ matchId }) {
  const [statsData, setStatsData] = useState(null);
  const [firstTeam, setFirstTeam] = useState(null);
  const [secondTeam, setSecondTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const matchResponse = await api.get(`/matches/${matchId}`);
        const matchData = matchResponse.data;

        const [firstTeamResponse, secondTeamResponse] = await Promise.all([
          api.get(`/teams/${matchData.first_team_id}`),
          api.get(`/teams/${matchData.second_team_id}`),
        ]);

        setFirstTeam(firstTeamResponse.data);
        setSecondTeam(secondTeamResponse.data);

        const statsResponse = await api.get(`/matches/${matchId}/stats`);
        const stats = statsResponse.data;

        const labels = ['Total shots', 'Shots off target', 'Shots saved', 'Corners', 'Free kicks', 'Fouls', 'Offsides'];
        const team1Data = [
          stats[0].total_shots,
          stats[0].shots_off,
          stats[0].shots_saved,
          stats[0].corners,
          stats[0].free_kicks,
          stats[0].fouls,
          stats[0].offsides,
        ];
        const team2Data = [
          stats[1].total_shots,
          stats[1].shots_off,
          stats[1].shots_saved,
          stats[1].corners,
          stats[1].free_kicks,
          stats[1].fouls,
          stats[1].offsides,
        ];

        setStatsData({
          labels,
          datasets: [
            {
              label: firstTeamResponse.data.name,
              data: team1Data,
              backgroundColor: 'rgba(255, 0, 0, 0.6)', // Red color with opacity
            },
            {
              label: secondTeamResponse.data.name,
              data: team2Data,
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black color with opacity
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching match and team data:', error);
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading || !statsData) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
      <Bar data={statsData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
}
