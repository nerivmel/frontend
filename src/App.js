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
        <Route path='/fontanarHome' exact element={<Documentos/>} />
        <Route path='/fontanarDatos' exact element={<Datos/>} />
        <Route path='/fontanarLector' exact element={<Lector/>} />
        <Route path='/arkadiaHome' exact element={<Documentos/>} />
        <Route path="/datos" element={<Datos  />} />
        <Route path="/lector" element={<Lector />} />
      </Routes>
    </Router>
  );
}

export default App;
