import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from './AppBar';
import Toolbar from './ToolBar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div sx={{ color: '#ccc'}}>
      <AppBar position="fixed" sx={{ color: '#ccc'}}>
        <Toolbar sx={{ justifyContent: 'space-between'}}>
          <Box sx={{ flex: 1 }} />
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 24 }}
          >
            {'THM-FDC'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-in/"
              sx={rightLink}
            >
              {'Home'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink }}
            >
              {'Geral'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink }}
            >
              {'Partidas'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink }}
            >
              {'Times'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink }}
            >
              {'Jogadores'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;