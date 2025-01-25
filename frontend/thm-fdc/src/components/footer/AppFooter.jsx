import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#20195f',
        color: 'white',
        py: 2,
        px: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25vh'
      }}
    >
      <Grid container marginTop={10} justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Link href="#" color="inherit" underline="hover">
            Privacy
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="hover">
            Terms and conditions
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="hover">
            Cookie policy
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="hover">
            Cookie Settings
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 2 }}>
        © 2025 FootballDataCollector. All rights reserved.
      </Typography>
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        Football Data Collector Application 
      </Typography>
    </Box>
  );
}
