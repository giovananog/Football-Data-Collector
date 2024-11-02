import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Componente que exibe as estatísticas da partida
export default function Stats() {
  // Dados das estatísticas
  const statsData = {
    labels: ['Total shots', 'Shots off target', 'Shots saved', 'Corners', 'Free kicks', 'Fouls', 'Offsides'],
    datasets: [
      {
        label: 'São Paulo',
        data: [14, 6, 3, 3, 6, 8, 1], // Valores de São Paulo
        backgroundColor: 'rgba(255, 0, 0, 0.6)', // Cor vermelha com opacidade
      },
      {
        label: 'Botafogo',
        data: [9, 4, 4, 5, 8, 6, 1], // Valores do Botafogo
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Cor preta com opacidade
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: 20,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
      <Bar data={statsData} options={options} />
    </div>
  );
}
