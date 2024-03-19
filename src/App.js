import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
        <Route path="/datosarkadia" element={<Datos  />} />
        <Route path="/datosmolinos" element={<Datos  />} />
        <Route path="/datosfontanar" element={<Datos  />} />
        <Route path="/lectorarkadia" element={<Lector />} />
        <Route path="/lectorfontanar" element={<Lector />} />
        <Route path="/lectormolinos" element={<Lector />} />
      </Routes>
    </Router>
  );
}

export default App;
