import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Documentos.css';

const Documentos = ({ setDocumento }) => {
    const [documentoValue, setDocumentoValue] = useState('');
    const navigate = useNavigate();

    const handleDocumentoChange = (event) => {
        setDocumentoValue(event.target.value);
    };

    const handleNextClick = () => {
        if (documentoValue.trim() !== '') {
            setDocumento(documentoValue);
            navigate('/datos');
        } else {
            alert('Por favor, completa todos los campos');
        }
    };

    return (
        <div className="wrapper">
            <form>
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top"/>
                    <img src="./images/recurso 2.png" alt="" className="topslide"/>
                </div>

                <img src="./images/recurso 3.png" alt="" className="parati"/>
                <label className="labeltype" htmlFor="Tipo de documento">Tipo de Documento</label>
                <div className="input-box">
                    <input type="text" value={documentoValue} onChange={handleDocumentoChange} placeholder="tipo de documento" required />
                </div>
                <label className="labeldoc" htmlFor="Numero de documento">Número de Documento</label>
                <div className="input-box">
                    <input type="text" placeholder="número de documento" required />
                </div>

                <button onClick={handleNextClick} className="siguiente">
                    Siguiente 
                    <img src="./images/recurso 4.png" alt="" className="flechita"/>
                </button>
            </form>
        </div>
    );
};

export default Documentos;
