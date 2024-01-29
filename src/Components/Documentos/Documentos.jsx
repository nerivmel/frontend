import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Documentos.css';

const Documentos = () => {
    const [documentoValue, setDocumentoValue] = useState('');
    const [numeroDocumentoValue, setNumeroDocumentoValue] = useState('');
    const navigate = useNavigate();

    const handleDocumentoChange = (event) => {
        setDocumentoValue(event.target.value);
    };

    const handleNumeroDocumentoChange = (event) => {
        setNumeroDocumentoValue(event.target.value);
    };

    const handleNextClick = async (e) => {
        e.preventDefault()
        if (documentoValue.trim() === '') {
            alert('Por favor, seleccione un tipo de documento');
            return;
        }
        if (numeroDocumentoValue.trim() === '') {
            alert('Por favor, ingrese el número de documento');
            return;
        }
     
        try {
            const response = await fetch(`http://localhost:8080/persons?doc=${numeroDocumentoValue}&docType=${documentoValue}`);
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                navigate('/datos') 
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Error al realizar la solicitud: ' + error.message);
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleNextClick}>
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top"/>
                    <img src="./images/recurso 2.png" alt="" className="topslide"/>
                </div>

                <img src="./images/recurso 3.png" alt="" className="parati"/>
                <label className="labeltype" htmlFor="Tipo de documento">Tipo de Documento</label>
                <div className="input-box">
                <select name="select" value={documentoValue} onChange={handleDocumentoChange}>
                        <option value="">Seleccione un tipo de documento</option>
                        <option value="CÉDULA DE CIUDADANÍA">CÉDULA DE CIUDADANÍA</option>
                        <option value="CÉDULA EXTRANJERÍA COLOMBIANA">CÉDULA EXTRANJERÍA COLOMBIANA</option>
                        <option value="CÉDULA EXTRANJERA">CÉDULA EXTRANJERA</option>
                        <option value="DOCUMENTO EXTRANJERO">DOCUMENTO EXTRANJERO</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                        <option value="TARJETA DE IDENTIDAD">TARJETA DE IDENTIDAD</option>
                    </select> 
                </div>
                <label className="labeldoc" htmlFor="Numero de documento">Número de Documento</label>
                <div className="input-box">
                    <input type="text" value={numeroDocumentoValue} onChange={handleNumeroDocumentoChange} placeholder="número de documento" required />
                </div>

                <button type="submit" className="siguiente">
                    Siguiente 
                    <img src="./images/recurso 4.png" alt="" className="flechita"/>
                </button>
            </form>
        </div>
    );
};

export default Documentos;
