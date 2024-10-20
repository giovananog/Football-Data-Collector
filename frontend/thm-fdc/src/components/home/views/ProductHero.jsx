import * as React from 'react';
import Button from './components/Button';
import Typography from './components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://i.pinimg.com/736x/7b/17/e9/7b17e95d1b3e7a8c412a1a4d2f96230a.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#20195f',
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Viva a Paixão do Futebol
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Acompanhe estatísticas, resultados e histórias dos grandes momentos do futebol.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/geral"
        sx={{ minWidth: 200, backgroundColor: "#20195f", marginBottom: 1 }}
      >
        Explore Agora
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/campeonatos/a/partidas"
        sx={{ minWidth: 200, backgroundColor: "#20195f" }}
      >
        Brasileirão 2024
      </Button>
      {/* <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
}