import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Datos.css';

const Datos = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [nombreValue, setNombreValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

    useEffect(() => {
        const obtenerDatosUrl = () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const nombre = searchParams.get('name');
                const email = searchParams.get('email');
                if (nombre && email) {
                    const nombreTransformado = transformarNombre(nombre);
                    const emailTransformado = transformarEmail(email);
                    setNombreValue(nombreTransformado);
                    setEmailValue(emailTransformado);
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
        const partes = texto.split('@'); 
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

    const handleNextClick = () => {
        navigate('/lector');
    };

    return (
        <div className="wrapper">
            <form>
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top"/>
                    <img src="./images/recurso 18.png" alt="" className="topslide"/>
                </div>

                <img src="./images/recurso 14.png" alt="" className="paraDatos"/>
                <label className="labelname" htmlFor="Nombre">Nombre o Razón Social</label>
                <div className="input-box">
                    <input type="text" value={nombreValue} onChange={handleNombreChange} placeholder="Nombre completo" required />
                </div>
                <label className="labelemail" htmlFor="Correo">E-mail</label>
                <div className="input-box">
                    <input type="text" value={emailValue} onChange={handleEmailChange} placeholder="Correo Electronico" required />
                </div>

                <button onClick={handleNextClick} className="siguiente">
                    Siguiente 
                    <img src="./images/recurso 4.png" alt="" className="flechita"/>
                </button>
            </form>
        </div>
    );
};

export default Datos;
