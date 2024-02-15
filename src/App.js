import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Documentos from './Components/Documentos/Documentos';
import Datos from './Components/Datos/Datos';
import Lector from './Components/Lector/Lector';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Documentos/>} />
        <Route path='/fontanar' exact element={<Documentos/>} />
        <Route path='/arkadia' exact element={<Documentos/>} />
         <Route path='/molinos' exact element={<Documentos/>} /> 
        <Route path="/datos" element={<Datos  />} />
        <Route path="/lector" element={<Lector />} />
      </Routes>
    </Router>
  );
}

export default App;
