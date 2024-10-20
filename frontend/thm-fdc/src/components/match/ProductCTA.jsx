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
      <Grid container xs={12} md={6} lg={12}>

      <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
          lg={4}
        >
         
          <Box
            component="img"
            src="https://s2-cbn.glbimg.com/vosaOyGQg2Pw2n3rDMwNSWgwALY=/0x0:1024x683/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d975fad146a14bbfad9e763717b09688/internal_photos/bs/2023/u/b/eNJ415TTqgxoAy7yAZtQ/000-34779f8.jpg"
            alt="call to action"
            sx={{
              position: 'relative',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ zIndex: 1 }} lg={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#177D49',
              py: 8,
              px: 3,
              height: 200
            }}
          >
            <Box x={{ maxWidth: 300 }}>
              <Typography variant="h3" component="h2" gutterBottom>
                Flamengo X Palmeiras
              </Typography>
              <Typography variant="h5">
                3 x 2
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
          lg={4}
        >
         
          <Box
            component="img"
            src="https://s2-cbn.glbimg.com/vosaOyGQg2Pw2n3rDMwNSWgwALY=/0x0:1024x683/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d975fad146a14bbfad9e763717b09688/internal_photos/bs/2023/u/b/eNJ415TTqgxoAy7yAZtQ/000-34779f8.jpg"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: 28,
              right: 0,
              bottom: 0,
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