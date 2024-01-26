import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Documentos from './Components/Documentos/Documentos';
import Datos from './Components/Datos/Datos';
import Lector from './Components/Lector/Lector';

function App() {
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = (e) => {
    e.preventDefault();
    if (documento && nombre && email) {
      setRedirect(true);
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Documentos setDocumento={setDocumento} handleRedirect={handleRedirect} />} />
        <Route path="/datos" element={<Datos setNombre={setNombre} setEmail={setEmail} />} />
        <Route path="/lector" element={<Lector setDocumento={setDocumento} />} />
        {redirect && <Navigate to="/datos" />}
      </Routes>
    </Router>
  );
}

export default App;
