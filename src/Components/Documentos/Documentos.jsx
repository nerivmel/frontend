import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Documentos.css';
import { fetchPersona } from "../../api/api";
import CryptoJS from 'crypto-js'; // Importar CryptoJS

const Documentos = () => {
    
    const [docTypeValue, setDocumentoValue] = useState('');
    const [docNumberValue, setNumeroDocumentoValue] = useState('');
    const navigate = useNavigate();

    const handleDocumentoChange = (event) => {
        setDocumentoValue(event.target.value);
    };

    const handleNumeroDocumentoChange = (event) => {
        setNumeroDocumentoValue(event.target.value);
    };

    const handleNextClick = async (e) => {
        e.preventDefault();
    
        
            if (docNumberValue.trim() === '' || docTypeValue.trim() === '') {
                alert('Por favor, ingrese un tipo y número de documento');
                return;
            }

        try {
            const data = await fetchPersona(docTypeValue, docNumberValue);

            if (data) {
                const encryptedName = CryptoJS.AES.encrypt(data.name, 'secret key').toString(); // Encriptar el nombre
                const encryptedEmail = CryptoJS.AES.encrypt(data.email, 'secret key').toString(); // Encriptar el email
                const queryParams = new URLSearchParams();
                queryParams.append('name', encryptedName);
                queryParams.append('email', encryptedEmail);
                navigate(`/datos?${queryParams.toString()}`);
                
            } else {
                const queryParams = new URLSearchParams();
                const encryptedDocNumberValue = CryptoJS.AES.encrypt(docNumberValue, 'secret key').toString(); // Encriptar el número de documento
                const encryptedDocTypeValue = CryptoJS.AES.encrypt(docTypeValue, 'secret key').toString(); // Encriptar el tipo de documento
                sessionStorage.setItem('docNumberValue', encryptedDocNumberValue);
                sessionStorage.setItem('docTypeValue', encryptedDocTypeValue);
                navigate(`/datos?${queryParams.toString()}`);
            }
        } catch (error) { 
            console.error('Error al obtener los datos:', error);
            alert('Error al obtener los datos: ' + error.message);
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
                <select name="select" value={docTypeValue} onChange={handleDocumentoChange}>
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
                    <input type="text" value={docNumberValue} onChange={handleNumeroDocumentoChange} placeholder="número de documento" required />
                </div>

                <button type="submit" className="siguiente0">
                    Siguiente 
                    <img src="./images/recurso 4.png" alt="" className="flechita"/>
                </button>
            </form>
        </div>
    );
};

export default Documentos;
