import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '../App.css';

const Documentacion = () => {


    return (
        <div> 
            <Breadcrumbs aria-label="breadcrumb"
            sx={{
                margin: '30px'
            }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Documentación</Typography>
            </Breadcrumbs>
            <h1>
                Documentación de progresos y artículos
            </h1>
            No hay Documentación </div>
    );
};

export default Documentacion;
