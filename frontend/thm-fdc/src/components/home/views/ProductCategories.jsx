import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from './components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0826%2Fr1216018_1296x729_16%2D9.jpg',
    title: 'Estádios',
    width: '36%',
  },
  {
    url: 'https://portalcruzeirense.com.br/wp-content/uploads/2023/07/juiz-de-futebol-cartao-vermelho-apito-cruzeiro-750x430.jpg',
    title: 'Cartões',
    width: '24%',
  },
  {
    url: 'https://lendasdofutebol.com/wp-content/uploads/2022/05/flamengo-1995-optimized.jpeg',
    title: 'Times',
    width: '34%',
  },
  {
    url: 'https://medias.itatiaia.com.br/dims4/default/75689d2/2147483647/strip/true/crop/1000x563+0+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-radio-itatiaia.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fe0%2Fb7%2F8cd6223c47048e6448fca6f6583f%2Fromeroarana.jpg',
    title: 'Partidas',
    width: '40%',
  },
  {
    url: 'https://capivari.sp.gov.br/portal/wp-content/uploads/2022/06/Vinicius-Furlan_3-1024x986.jpg',
    title: 'Árbitros',
    width: '26%',
  },
  {
    url: 'https://cognatis.com.br/wp-content/uploads/2021/07/Futebol-e-estatistica-Banner.jpg',
    title: 'Estatísticas',
    width: '28%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4, minWidth: "100%", bgcolor: "#dce4f2" }}  >
      <Container component="section" sx={{ mt: 8, mb: 4, minWidth: "90%", padding: 10 }}  >
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>

          <Box sx={{ width: '30%', paddingRight: 4 }}>
            <Typography variant="h3" component="h3" sx={{color: '#171248'}} gutterBottom>
              <b>Memórias Inesquecíveis do Futebol</b>
            </Typography>
            <Typography variant="h6">
              Desfrute de momentos marcantes que definiram a história do futebol.
              Desde grandes jogos a inesquecíveis campeonatos, aqui está o melhor do esporte.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "flex-end", width: '70%' }}>
            {images.map((image) => (
              <ImageIconButton
                key={image.title}
                style={{
                  height: "35vh",
                  width: image.width,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    {image.title}
                    <div className="imageMarked" />
                  </Typography>
                </Box>
              </ImageIconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
