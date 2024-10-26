import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../home/views/components/Typography';
import Snackbar from './components/Snackbar';
import Button from '../home/views/components/Button';

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, minWidth: '80%', width: '90%' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#177D49',
              py: 8,
              px: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: '100%',  // Alterado para 100% para ocupar toda a largura do grid
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
              <Typography variant="h2" component="h2" color="white" gutterBottom>
                Campeonato 2023
              </Typography>
              <Typography variant="h5" color="white">
                Sinta a emoção do campeonato perto de casa.
              </Typography>
              <br />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ backgroundColor: 'black' }}
                >
                  Times
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ backgroundColor: 'black' }}
                >
                  Partidas
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ backgroundColor: 'black' }}
                >
                  Estatísticas
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            component="img"
            src="https://s2-cbn.glbimg.com/vosaOyGQg2Pw2n3rDMwNSWgwALY=/0x0:1024x683/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d975fad146a14bbfad9e763717b09688/internal_photos/bs/2023/u/b/eNJ415TTqgxoAy7yAZtQ/000-34779f8.jpg"
            alt="call to action"
            sx={{
              width: '100%',  // Mantendo a imagem para ocupar 100% do container
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
      </Grid>

      {/* Bloco de Informações Adicionais */}
      <Box
        sx={{
          mt: 5,
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" component="h3" gutterBottom>
          Informações do Campeonato
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Número de times:</strong> 20
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Jogadores:</strong> 641
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Estrangeiros:</strong> 137 Jogadores (21.4%)
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Valor de mercado médio:</strong> €2.58m
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Idade média:</strong> 27.4 anos
        </Typography>
      </Box>

      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default ProductCTA;
