import React from 'react';
import { Paper, Typography, Button, Grid } from '@mui/material';

const Document = ({ titulo, descripcion, imagen, urlDescarga }) => {
  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {imagen && <img src={imagen} alt="Imagen del Documento" style={{ width: '100%', height: 'auto' }} />}
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{titulo}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{descripcion}</Typography>
          {urlDescarga && <Button href={urlDescarga} download variant="contained" color="primary">Descargar PDF</Button>}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Document;
