import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Grid, Breadcrumbs, Link } from '@mui/material';

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

const Proyectos = () => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      const urlBase = 'https://api.github.com/repos/OliverAtondo/CLAMPS_BLS_Simulador/contents/Documentacion/Proyectos';
      const response = await fetch(urlBase);
      const carpetas = await response.json();

      const proyectosPromesas = carpetas.map(async carpeta => {
        if (carpeta.type === 'dir') {
          const res = await fetch(carpeta.url);
          const archivos = await res.json();
      
          const imagenArchivo = archivos.find(archivo => archivo.name.endsWith('.png') || archivo.name.endsWith('.jpg'));
          const pdfArchivo = archivos.find(archivo => archivo.name.endsWith('.pdf'));

          if (!imagenArchivo || !pdfArchivo) {
            console.log("Archivo de imagen o PDF no encontrado en la carpeta:", carpeta.name)
            return null;
          }
      
          // Construir URLs raw para Title.txt y Description.txt
          const tituloRawUrl = `https://raw.githubusercontent.com/OliverAtondo/CLAMPS_BLS_Simulador/main/Documentacion/Proyectos/${carpeta.name}/Title.txt`;
          const descripcionRawUrl = `https://raw.githubusercontent.com/OliverAtondo/CLAMPS_BLS_Simulador/main/Documentacion/Proyectos/${carpeta.name}/Description.txt`;

          const tituloRes = await fetch(tituloRawUrl);
          const descripcionRes = await fetch(descripcionRawUrl);
          const titulo = await tituloRes.text();
          const descripcion = await descripcionRes.text();

          return {
            titulo,
            descripcion,
            imagen: imagenArchivo.download_url,
            urlDescarga: pdfArchivo.download_url
          };
        }
        return null;
      });

      const proyectos = await Promise.all(proyectosPromesas);
      setDocumentos(proyectos.filter(proj => proj !== null));
    };

    fetchDocumentos();
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '30px' }}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Proyectos</Typography>
      </Breadcrumbs>
      <h1>Proyectos actuales</h1>
      {documentos.map((doc, index) => (
        <Document
          key={index}
          titulo={doc.titulo}
          descripcion={doc.descripcion}
          imagen={doc.imagen}
          urlDescarga={doc.urlDescarga}
        />
      ))}
      <h1>Proyectos finalizados</h1>
      {documentos.length === 0 && <p>No hay Proyectos</p>}
    </div>
  );
};

export default Proyectos;
