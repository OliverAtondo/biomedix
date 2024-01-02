import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '../App.css';

const Proyectos = () => {


    return (
        <div> 
                        <Breadcrumbs aria-label="breadcrumb"
            sx={{
                margin: '30px'
            }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Link color="inherit" href="/simuladores">
                    Simuladores
                </Link>
                <Typography color="textPrimary">Simulador de Compresiones Torácicas</Typography>
            </Breadcrumbs>
            <h1>
                Simulador de señal de compresiones torácicas
            </h1>
            Simuladores </div>
    );
};

export default Proyectos;
