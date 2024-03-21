import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './Documentos.css';
import { fetchPersona } from "../../api/api";
import CryptoJS from 'crypto-js';
import { fetchFacilityImage } from "../../api/api"; 

const Documentos = () => {
    
    const [docTypeValue, setDocTypeValue] = useState('');
    const [docNumberValue, setDocNumberValue] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [facility, setFacility]=useState('');
    const [inputError, setInputError] = useState(false); // Estado para controlar el error en el input
    const [placeholder, setPlaceholder] = useState('Número de documento');
    const [label, setLabel] = useState('Número de Documento');
    const [inputType, setInputType] = useState('number');
    const [error, setError] = useState('');
    

    useEffect(() => {
        async function fetchData() {
          try {
            const { imageUrl, facility } = await fetchFacilityImage(location);
            setImageUrl(imageUrl);
            setFacility(facility);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, [location]);

    const handleDocumentoChange = (event) => {
        const selectedDocType = event.target.value;
        setDocTypeValue(selectedDocType);
        if (selectedDocType === 'NIT') {
            setPlaceholder('Nro Identificación tributaria');
            setLabel('NIT Sin digito verificación');

        } else {
            setPlaceholder('Número de documento');
            setLabel('Número de Documento');
        }
        if (selectedDocType === 'PASAPORTE'){
            setInputType('text');
        }
        else{
            setInputType('number');
        }
    };

    const handleNumeroDocumentoChange = (event) => {
        setDocNumberValue(event.target.value);
        setError('');
    };

    const handleNextClick = async (e) => {
        e.preventDefault();
    
        if (docNumberValue.trim() === '' || docTypeValue.trim() === '') {
            setError('Campo obligatorio');
            setInputError(true);
            return;
        }
        setInputError(false); 

        try {
            const data = await fetchPersona(docTypeValue, docNumberValue);
            if (data) {
                const encryptedName = CryptoJS.AES.encrypt(data.name, 'secret key').toString(); // Encriptar el nombre
                const encryptedEmail = CryptoJS.AES.encrypt(data.email, 'secret key').toString(); // Encriptar el email
                const queryParams = new URLSearchParams();
                queryParams.append('name', encryptedName);
                queryParams.append('email', encryptedEmail);
                let targetPath = '';
                switch (window.location.pathname) {
                    case '/arkadia':
                        targetPath = '/datosarkadia';
                        break;
                    case '/fontanar':
                        targetPath = '/datosfontanar';
                        break;
                    case '/molinos':
                        targetPath = '/datosmolinos';
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
                let targetPath = '';
                switch (window.location.pathname) {
                    case '/arkadia':
                        targetPath = '/datosarkadia';
                        break;
                    case '/fontanar':
                        targetPath = '/datosfontanar';
                        break;
                    case '/molinos':
                        targetPath = '/datosmolinos';
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
                <div className="wrapper-inputs">
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
                            <option value="NIT">NIT</option>
                        </select>
                    </div>
                    <label className="labeldoc" htmlFor="Numero de documento">{label}</label>
                    <div className="input-box">
                        <input type={inputType} value={docNumberValue} onChange={handleNumeroDocumentoChange} placeholder={placeholder} required />
                        {error && <span className="error-message-doc">{error}</span>}
                    </div>
                </div>
                <button type="submit" className="siguiente0" onClick={handleNextClick}>
                    <img src="./images/flechitanext.png" alt="img-siguiente" className="flechita" />
                </button>
            </form>
            <img className="logo-Itegra" src="./images/logodoc.png" alt="logo-itegra" />
        </div>
    );
    
};
export default Documentos;
