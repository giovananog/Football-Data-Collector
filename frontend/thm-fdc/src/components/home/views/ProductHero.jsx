import * as React from 'react';
import Button from './components/Button';
import Typography from './components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const images = [
  'https://placar.com.br/wp-content/uploads/2023/06/52951183874_a0bc40c313_o.jpg',
  'https://static.gazetaesportiva.com/uploads/2024/10/54082062524_8d1d3129d4_o-1024x576.webp',
  'https://lncimg.lance.com.br/uploads/2023/11/gazeta-press-foto-1899591-scaled-aspect-ratio-512-320-1.jpg'
];

export default function ProductHero() {
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundColor: '#20195f', 
        backgroundPosition: 'center',
      }}
    >
      {/* Pré-carrega todas as imagens */}
      {images.map((image, index) => (
        <img
          key={index}
          style={{ display: 'none' }}
          src={image}
          alt={`background ${index}`}
        />
      ))}

      <Typography color="inherit" align="center" variant="h2" sx={{fontWeight: '500' }}>
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
      <div>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/campeonatos/2023/partidas"
          sx={{ minWidth: 200, backgroundColor: "#20195f" }}
        >
          Brasileirão 2024
        </Button>
      </div>
    </ProductHeroLayout>
  );
}
