import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: props.width }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.height}
          image="https://www.verdazzo.com.br/wp-content/uploads/2022/10/oficial_2022_endrick.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Palmeiras
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
