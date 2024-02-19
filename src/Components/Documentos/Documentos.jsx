import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Documentos.css';
import { fetchPersona } from "../../api/api";
import CryptoJS from 'crypto-js'; 

const Documentos = () => {
    
    const [docTypeValue, setDocumentoValue] = useState('');
    const [docNumberValue, setNumeroDocumentoValue] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [facility, setFacility]=useState('');

    useEffect(() => {
        const facilityParam = location.pathname.split('/').pop();
        async function fetchFacilityImage() {
            try {
                const response = await fetch(`http://localhost:8080/getFacility/${facilityParam}`);
                const data = await response.json();
                if (response.ok) {
                    const imageUrl = `data:image/jpeg;base64,${data[0].datosImagen}`;
                    setImageUrl(imageUrl);
                    setFacility(facilityParam);
                } else {
                    console.error('Error al obtener la imagen de la instalación:', data.error);
                }
            } catch (error) {
                console.error('Error al obtener la imagen de la instalación:', error);
            }
        }
        fetchFacilityImage();
    }, [location.pathname]); 

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
    
                // Decide a dónde navegar según la URL actual
                let targetPath = '';
                switch (window.location.pathname) {
                    case '/arkadia':
                        targetPath = '/datosArkadia';
                        break;
                    case '/fontanar':
                        targetPath = '/datosFontanar';
                        break;
                    case '/molinos':
                        targetPath = '/datosMolinos';
                        break;
                    default:
                        targetPath = '/defaultPath'; 
                }
    
                navigate(`${targetPath}?${queryParams.toString()}`);
            } else {
                const queryParams = new URLSearchParams();
                const encryptedDocNumberValue = CryptoJS.AES.encrypt(docNumberValue, 'secret key').toString(); 
                const encryptedDocTypeValue = CryptoJS.AES.encrypt(docTypeValue, 'secret key').toString(); 
                sessionStorage.setItem('docNumberValue', encryptedDocNumberValue);
                sessionStorage.setItem('docTypeValue', encryptedDocTypeValue);
    
                // Decide a dónde navegar según la URL actual
                let targetPath = '';
                switch (window.location.pathname) {
                    case '/arkadia':
                        targetPath = '/datosArkadia';
                        break;
                    case '/fontanar':
                        targetPath = '/datosFontanar';
                        break;
                    case '/molinos':
                        targetPath = '/datosMolinos';
                        break;
                    default:
                        targetPath = '/defaultPath'; 
                }
    
                navigate(`${targetPath}?${queryParams.toString()}`);
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
                    <progress id="file" max="100" value="33">33%</progress>
                </div>

                {imageUrl && <img src={imageUrl} alt="" className="parati"/>} 
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
