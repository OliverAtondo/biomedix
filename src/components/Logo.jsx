import React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import image from "../assets/logo3.png";
import '../App.css';

const Logo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="30vh"
    >
      <img src={image} alt="Logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '20vh' }} />
      
      <Button 
        className='botonMenu'
        onClick={() => setIsOpen(true)}
        sx={{
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          marginTop: '20px', // Espacio entre la imagen y el botón
          ":hover": {
            color: 'black'
          }
        }}>
        Menú
      </Button>
      <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          {['Documentación', 'Simuladores', 'Proyectos'].map((text, index) => (
            <ListItem button key={text} onClick={toggleDrawer(false)}>
              <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Logo;
