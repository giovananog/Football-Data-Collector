import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from './AppBar';
import Toolbar from './ToolBar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const rightLink = {
  fontSize: 20,
  color: 'common.white',
  ml: 6,
};

function AppAppBar() {
  const [competitionsAnchorEl, setCompetitionsAnchorEl] = React.useState(null);
  const [matchesAnchorEl, setMatchesAnchorEl] = React.useState(null);

  const handleCompetitionsClick = (event) => {
    setCompetitionsAnchorEl(event.currentTarget);
    setMatchesAnchorEl(null); // Fecha o menu de partidas se estiver aberto
  };

  const handleMatchesClick = (event) => {
    setMatchesAnchorEl(event.currentTarget);
    setCompetitionsAnchorEl(null); // Fecha o menu de competições se estiver aberto
  };

  const handleClose = () => {
    setCompetitionsAnchorEl(null);
    setMatchesAnchorEl(null);
  };

  const handleYearClick = (year) => {
    setCompetitionsAnchorEl(null);
    window.location.href = `/campeonatos/${year}`;
  };

  const handleMatchesYearClick = (year) => {
    setMatchesAnchorEl(null);
    window.location.href = `/campeonatos/${year}/partidas`;
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ display: 'flex', backgroundColor: '#20195f', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Toolbar sx={{ width: '100%' }}>
          <Box sx={{ marginLeft: 10 }} />
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 30 }}>
            {'THM.challenge'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
            <Link color="inherit" variant="h6" underline="none" href="/" sx={rightLink}>
              {'Home'}
            </Link>
            <Link variant="h6" underline="none" onClick={handleCompetitionsClick} sx={{ ...rightLink, cursor: 'pointer' }}>
              {'Competições'}
            </Link>

            <Menu
              anchorEl={competitionsAnchorEl}
              open={Boolean(competitionsAnchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#2E3B55',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <MenuItem onClick={() => handleYearClick(2020)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2021
              </MenuItem>
              <MenuItem onClick={() => handleYearClick(2021)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2022
              </MenuItem>
              <MenuItem onClick={() => handleYearClick(2022)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2023
              </MenuItem>
              <MenuItem onClick={() => handleYearClick(2023)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2024
              </MenuItem>
            </Menu>

            <Link variant="h6" underline="none" onClick={handleMatchesClick} sx={{ ...rightLink, cursor: 'pointer' }}>
              {'Partidas'}
            </Link>

            <Menu
              anchorEl={matchesAnchorEl}
              open={Boolean(matchesAnchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#2E3B55',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <MenuItem onClick={() => handleMatchesYearClick(2020)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2021
              </MenuItem>
              <MenuItem onClick={() => handleMatchesYearClick(2021)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2022
              </MenuItem>
              <MenuItem onClick={() => handleMatchesYearClick(2022)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2023
              </MenuItem>
              <MenuItem onClick={() => handleMatchesYearClick(2023)} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#1A1D29' } }}>
                2024
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
