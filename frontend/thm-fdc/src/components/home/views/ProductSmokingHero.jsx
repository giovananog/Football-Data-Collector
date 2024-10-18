import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from './components/Typography';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 19 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
          color: "black"
        }}
      >
        <Typography variant="h4" component="span">
          Alguma dúvida? Precisa de ajuda?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        Estamos aqui para ajudar, entre em contato!
      </Typography>
      <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: "5em" }} />
    </Container>
  );
}

export default ProductSmokingHero;