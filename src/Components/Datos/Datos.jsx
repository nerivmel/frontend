import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRegistro } from "../../api/api";
import './Datos.css';
import CryptoJS from 'crypto-js'; 

const Datos = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [nombreValue, setNombreValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [docType, setDocType] = useState(''); 
    const [docNumber, setDocNumber] = useState(''); 
    const [emailError, setEmailError] = useState('');
    const [isChecked, setIsChecked] = useState(false); 
    const [showImage, setShowImage] = useState(false); 

    const desencriptarTexto = (textoEncriptado) => {
        const textoDesencriptado = CryptoJS.AES.decrypt(textoEncriptado, 'secret key').toString(CryptoJS.enc.Utf8);
        return textoDesencriptado;
    };

    useEffect(() => {
        const obtenerDatosUrl = () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const nombre = searchParams.get('name');
                const email = searchParams.get('email');
    
                if (nombre && email) {
                    const nombreDesencriptado = desencriptarTexto(nombre);
                    const emailDesencriptado = desencriptarTexto(email);

                    const nombreTransformado = transformarNombre(nombreDesencriptado);
                    const emailTransformado = transformarEmail(emailDesencriptado);
                    setNombreValue(nombreTransformado);
                    setEmailValue(emailTransformado);
                    setShowImage(true); 
                } else {
                    setShowImage(false); 
                }
            } catch (error) {
                console.error('Error al obtener los datos de la URL:', error);
            }
        };
    
        obtenerDatosUrl();
    }, [location.search]);

    const transformarNombre = (texto) => {
        if (texto.length <= 4) {
            return texto; 
        }
        const longitudVisible = 2; 
        const longitudOculta = texto.length - longitudVisible * 2; 
        const textoVisible = texto.substring(0, longitudVisible);
        const textoOculto = "*".repeat(longitudOculta);
        const textoFinal = textoVisible + textoOculto + texto.substring(texto.length - longitudVisible);
        return textoFinal;
    };
    
    const transformarEmail = (texto) => {
        const partes = texto?.split('@'); 
        if (partes.length !== 2) {
            return texto; 
        }
        const nombreUsuario = partes[0]; 
        const dominio = partes[1]; 
        if (nombreUsuario.length <= 2) {
            return texto;
        }
        const longitudVisible = 4; 
        const longitudOculta = nombreUsuario.length - longitudVisible; 
        const textoVisible = nombreUsuario.substring(0, longitudOculta) + "*".repeat(longitudVisible);
        const textoFinal = textoVisible + "@" + dominio;
        return textoFinal;
    };

    const handleNombreChange = (event) => {
        setNombreValue(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    };

    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    };

    const handleTerminosClick = (e) => {
        e.preventDefault();
        window.open("https://terminosycondicionesdeusoejemplo.com/", "_blank");
    };

    const handleNextClick = async (e) => {
        e.preventDefault();
        try {
            if (!validarEmail(emailValue)) {
                setEmailError('Por favor ingrese un email válido.');
                return;
            }
    
            const queryParams = new URLSearchParams(window.location.search);
            const name = queryParams.get('name');
            const email = queryParams.get('email');
    
            if (name && email) {
                navigate('/lector');
            } else {
                console.log("REGISTRO EXITOSO");
                const docTypeDesencriptado = desencriptarTexto(sessionStorage.getItem("docTypeValue"));
                const docNumberDesencriptado = desencriptarTexto(sessionStorage.getItem("docNumberValue"));
    
                await fetchRegistro(docTypeDesencriptado, docNumberDesencriptado, emailValue, nombreValue);
                navigate('/lector');
            }
        } catch (error) {
            console.error('Error al registrar los datos:', error);
        }
    };

    const handleBackClick = async (e) => {
        e.preventDefault();
        navigate(-1)
    };

    return (
        
        <div className="wrapper">
            
             <form onSubmit={handleNextClick}>
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top"/>
                    <progress id="file" max="100" value="66">66%</progress>
                </div>

                
                    <img src="./images/recurso 14.png" alt="" className="paraDatos"/>
               

                <label className="labelname" htmlFor="Nombre">Nombre o Razón Social</label>
                <div className="input-box">
                    <input type="text" value={nombreValue} onChange={handleNombreChange} placeholder="Nombre completo" required />
                </div>
                
                <label className="labelemail" htmlFor="Correo">E-mail</label>
                <div className="input-box">
                    <input type="text" value={emailValue} onChange={handleEmailChange} placeholder="Correo Electronico" required />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>

                <div className="terminus"> 
                    <div className="checkbox-label">
                        <input type="checkbox" id="terminos" name="terminos" checked={isChecked} onChange={handleCheckboxChange} required/>
                       <label htmlFor="terminos">
                            <a href="https://terminosycondicionesdeusoejemplo.com/" onClick={handleTerminosClick}>
                                Aceptar política de tratamiento de datos
                            </a>
                        </label>
                    </div>
                </div>

                <div className="botones">
                    <button className="atras" onClick={handleBackClick}>
                        <img src="./images/recurso 123.png" alt="" className="flechitaAtras"/>
                    </button>

                    <button className="siguiente" disabled={!isChecked}>
                        Siguiente 
                        <img src="./images/recurso 4.png" alt="" className="flechita"/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Datos;
