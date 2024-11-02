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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYearClick = (year) => {
    setAnchorEl(null);
    // Aqui você pode redirecionar para a página do ano selecionado ou armazenar o ano escolhido
    window.location.href = `/campeonatos/${year}`;
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ display: 'flex', backgroundColor: '#20195f', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <Toolbar sx={{ width: '100%' }} >
          <Box sx={{ marginLeft: 10 }} />
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 30 }}
          >
            {'THM.challenge'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'Home'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              onClick={handleClick}
              sx={{ ...rightLink, cursor: 'pointer' }}
            >
              {'Competições'}
            </Link>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleYearClick(2022)}>2022</MenuItem>
              <MenuItem onClick={() => handleYearClick(2023)}>2023</MenuItem>
              <MenuItem onClick={() => handleYearClick(2024)}>2024</MenuItem>
            </Menu>
            <Link
              variant="h6"
              underline="none"
              href="/campeonatos/a/partidas"
              sx={{ ...rightLink }}
            >
              {'Partidas'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/campeonatos"
              sx={{ ...rightLink }}
            >
              {'Notícias'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
