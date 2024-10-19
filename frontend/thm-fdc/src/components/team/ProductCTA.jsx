import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../home/views/components/Typography';
import TextField from '../home/views/components/TextField';
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
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#177D49',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                Palmeiras
              </Typography>
              <Typography variant="h5">
               Campeonato 2023
              </Typography>
              <br/>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '45%', backgroundColor: 'black', marginRight: "5px" }}
              >
                Estatísticas
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '45%', backgroundColor: 'black' }}
              >
                Jogadores
              </Button>
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
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://media.torcedores.com/wp-content/uploads/2024/01/abel-ferreira-e-o-elenco-do-palmeiras-campeao-do-brasileirao-serie-a-em-2023.jpg"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              height: 360,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default ProductCTA;