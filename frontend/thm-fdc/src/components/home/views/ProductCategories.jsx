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
    width: '40%',
  },
  {
    url: 'https://portalcruzeirense.com.br/wp-content/uploads/2023/07/juiz-de-futebol-cartao-vermelho-apito-cruzeiro-750x430.jpg',
    title: 'Cartões',
    width: '20%',
  },
  {
    url: 'https://lendasdofutebol.com/wp-content/uploads/2022/05/flamengo-1995-optimized.jpeg',
    title: 'Times',
    width: '40%',
  },
  {
    url: 'https://conteudo.imguol.com.br/c/esporte/55/2023/12/06/endrick-celebra-gol-do-palmeiras-sobre-o-cruzeiro-em-partida-do-campeonato-brasileiro-1701913759150_v2_450x450.jpg',
    title: 'Jogadores',
    width: '38%',
  },
  {
    url: 'https://medias.itatiaia.com.br/dims4/default/75689d2/2147483647/strip/true/crop/1000x563+0+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-radio-itatiaia.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fe0%2Fb7%2F8cd6223c47048e6448fca6f6583f%2Fromeroarana.jpg',
    title: 'Clássicos',
    width: '38%',
  },
  {
    url: 'https://capivari.sp.gov.br/portal/wp-content/uploads/2022/06/Vinicius-Furlan_3-1024x986.jpg',
    title: 'Árbitros',
    width: '24%',
  },
  {
    url: 'https://footure.com.br/wp-content/uploads/2021/08/ronaldo-sofre-segunda-lesao-em-2000-minutos-depois-de-face.jpeg',
    title: 'Lesões',
    width: '40%',
  },
  {
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_yaW9X2UlepIDPK3zY3rlz30zXddIiiJPc4Qi-OEJFHr6wyHONvDGE-z-gKYDNpX29GCZygo5CFhzm_pleiFpG1HcyTYlkTVM6BjzRriFuJREbGXabNpdPXmL33DAnVFYgjXtA5gSfZ3PoPyO7vRq3mIwNCOWiFWuoDA_xFAaEdN5cYCc9EotgXtQtmA/s1350/441212043_1046468253505705_5443095956135217106_n.jpg',
    title: 'Placares',
    width: '20%',
  },
  {
    url: 'https://cognatis.com.br/wp-content/uploads/2021/07/Futebol-e-estatistica-Banner.jpg',
    title: 'Estatísticas',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Relembre momentos 
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
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
    </Container>
  );
}