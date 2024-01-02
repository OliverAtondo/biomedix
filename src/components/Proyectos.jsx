import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '../App.css';

const Proyectos = () => {


    return (
        <div>             <Breadcrumbs aria-label="breadcrumb"
        sx={{
            margin: '30px'
        }}>
            <Link color="inherit" href="/">
                Home
            </Link>
            <Typography color="textPrimary">Proyectos</Typography>
        </Breadcrumbs>
        <h1>
            Proyectos actuales
        </h1>
        No hay Proyectos
        
        <h1>
            Proyectos finalizados
        </h1>
        No hay Proyectos 
         </div>
    );
};

export default Proyectos;
