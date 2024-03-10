import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';

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

const Home = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            const urlBase = 'https://api.github.com/repos/OliverAtondo/CLAMPS_BLS_Simulador/contents/Documentacion/Publicaciones';
            const response = await fetch(urlBase);
            const carpetas = await response.json();

            const publicacionesPromesas = carpetas.map(async carpeta => {
                if (carpeta.type === 'dir') {
                    const res = await fetch(carpeta.url);
                    const archivos = await res.json();

                    const tituloArchivo = archivos.find(archivo => archivo.name === 'Title.txt');
                    const descripcionArchivo = archivos.find(archivo => archivo.name === 'Description.txt');
                    const imagenArchivo = archivos.find(archivo => archivo.name.endsWith('.png') || archivo.name.endsWith('.jpg'));
                    const enlaceArchivo = archivos.find(archivo => archivo.name === 'Link.txt');

                    if (!tituloArchivo || !descripcionArchivo) {
                        console.log("Archivo de título o descripción no encontrado en la carpeta:", carpeta.name)
                        return null;
                    }

                    const tituloRes = await fetch(tituloArchivo.download_url);
                    const descripcionRes = await fetch(descripcionArchivo.download_url);
                    const titulo = await tituloRes.text();
                    const descripcion = await descripcionRes.text();
                    const imagen = imagenArchivo ? await imagenArchivo.download_url : null;
                    const enlace = enlaceArchivo ? await enlaceArchivo.download_url : null;

                    return {
                        titulo,
                        descripcion,
                        imagen,
                        enlace
                    };
                }
                return null;
            });

            const publicaciones = await Promise.all(publicacionesPromesas);
            setPublicaciones(publicaciones.filter(pub => pub !== null));
        };

        fetchPublicaciones();
    }, []);

    return (
        <Box style={{ margin: '20px' }}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h6">Mis Documentos</Typography>
                        No hay Documentos
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h1 style={{ "color": "white" }}>Noticias</h1>
                    {publicaciones.map((pub, index) => (
                        <Publicacion 
                            key={index}
                            titulo={pub.titulo}
                            descripcion={pub.descripcion}
                            imagen={pub.imagen}
                            enlace={pub.enlace}
                        />
                    ))}
                </Grid>
                <Grid item xs={12} md={3}>
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
