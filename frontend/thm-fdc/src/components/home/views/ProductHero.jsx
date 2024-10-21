import * as React from 'react';
import Button from './components/Button';
import Typography from './components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const images = [
  'https://i.pinimg.com/736x/7b/17/e9/7b17e95d1b3e7a8c412a1a4d2f96230a.jpg',
  'https://placar.com.br/wp-content/uploads/2024/04/53381344075_5bc7c6508e_k-1.jpg',
  'https://static.gazetaesportiva.com/uploads/2024/10/54082062524_8d1d3129d4_o-1024x576.webp',
  'https://skycms.s3.amazonaws.com/images/0/final-do-brasileirao-01.jpg'
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

      <Typography color="inherit" align="center" variant="h2" marked="center" sx={{fontWeight: '500' }}>
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
          href="/geral"
          sx={{ minWidth: 200, backgroundColor: "#20195f", marginRight: 1 }}
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
      </div>
    </ProductHeroLayout>
  );
}
