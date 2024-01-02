import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import CompressionSimulator from './components/CompressionSimulator';
import Home from './components/Inicio';
import Documentacion from './components/Documentacion';
import Proyectos from './components/Proyectos';

function App() {
  return (
    <Router>
      <div className="App">
        <Logo />
        <Routes>
          <Route path="/" element={<div id="Home"><Home /></div>} />
          <Route path="/Inicio" element={<div id="Home"><Home /></div>} />
          <Route path="/simulador" element={<div id="Simulador"><CompressionSimulator /></div>} />
          <Route path="/simuladores" element={<div id="Simulador"><CompressionSimulator /></div>} />
          <Route path="/Documentación" element={<div id="Simulador"><Documentacion /></div>} />
          <Route path="/Proyectos" element={<div id="Simulador" ><Proyectos /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
