import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const Publicacion = ({ titulo, descripcion, imagen, enlace }) => {
  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>{titulo}</Typography>
      <Typography variant="body1">{descripcion}</Typography>
      {imagen && <img src={imagen} alt="Imagen de la publicación" style={{ width: '100%', height: 'auto' }} />}
      {enlace && <Button href={enlace} variant="contained" color="primary" style={{ marginTop: '10px' }}>Leer más</Button>}
    </Paper>
  );
};

export default Publicacion;
