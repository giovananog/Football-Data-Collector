import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from './components/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, bgcolor: '#fff', minWidth: '100%' }}
    >
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        Estamos aqui para ajudar, entre em contato!
      </Typography>
      <MailOutlineIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: "5em" }} />
    </Container>
  );
}

export default ProductSmokingHero;