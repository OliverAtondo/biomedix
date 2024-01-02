import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Publicacion from './Publicacion';
import '../App.css';

const Home = () => {
    return (
      <Box style={{ margin: '20px' }}>
  
        <Grid container spacing={2} alignItems="flex-start"> {/* Alineación al tope */}
          <Grid item xs={12} md={3}>
            {/* Sección de documentos */}
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Mis Documentos</Typography>
              No hay Documentos
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <h1 style={{"color": "white"}}>Noticias</h1>
            <Publicacion 
              titulo="Nueva página"
              descripcion="Dentro de este acceso se planea realizar seguimientos de investigación académica y resultados actualizados de diferentes proyectos relacionados a la Ingeniería Bioméidca."
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* Sección de redes sociales */}
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Mis Redes</Typography>
              No hay redes Sociales enlazadas
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
};

export default Home;
