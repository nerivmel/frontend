import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Datos.css';

const Datos = () => {

    const navigate = useNavigate();

    const [nombreValue, setNombreValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

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
