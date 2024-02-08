import React, { useState, useEffect } from "react";
import Quagga from 'quagga'; 
import { useNavigate } from 'react-router-dom';
import './Lector.css';

const Lector = () => {
    const [barcode, setBarcode] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [placaValue, setPlacaValue] = useState('');
    const [showPlacaInput, setShowPlacaInput] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isCameraActive) {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector('#camera-preview'),
                    constraints: {
                        width: 420,
                        height: 400,
                        facingMode: "environment",
                        aspectRatio: {min: 1, max: 2}
                    }
                },
                numOfWorkers: 4,
                frequency: 5,
                decoder: {
                    readers: ["ean_reader"],
                },
                locate: true,
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
            }, (err) => {
                if (err) {
                    console.error("Error al iniciar Quagga:", err);
                    alert("Ocurrió un error al iniciar la cámara. Por favor, inténtalo de nuevo.");
                    return;
                }
                Quagga.start();
            });
    
            Quagga.onDetected((data) => {
                setBarcode(data.codeResult.code);
                Quagga.stop();
            });
    
            return () => {
                Quagga.stop();
            };
        }
    }, [isCameraActive]);

    const handleCameraClick = () => {
        setIsCameraActive(true);
        setShowPlacaInput(false);
        setShowBackButton(true); 
    };

    const handlePlacaClick = () => {
        setShowPlacaInput(true);
        setIsCameraActive(false);
        setShowBackButton(true); 
    };

    const handleBackClick = () => {
        setIsCameraActive(false);
        setShowPlacaInput(false);
        setShowBackButton(false); 
    };

    return (
        <div className="wrapper">
            <form action="">
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top" />
                    <img src="./images/recurso 52.png" alt="" className="topslide" />
                </div>
                <img src="./images/recurso 3.png" alt="" className="parati" />
                <div className="image-container">
                    {isCameraActive && (
                        <div id="camera-preview" className="cam-preview" style={{ maxHeight: "300px", overflow: "hidden" }} /> 
                    )}
                    {!showPlacaInput && !isCameraActive && (
                        <div className="image-box">
                            <img src="./images/recurso 64.png" alt="Leer tiquete" className="cam" onClick={handleCameraClick} />
                            <label className="labelcam" htmlFor="Leer Tiquete">Leer tiquete</label>
                        </div>
                    )}
                    {!showPlacaInput && !isCameraActive && (
                        <div className="image-box2">
                            <img src="./images/recurso 125.png" alt="Ingr Placa" className="placa" onClick={handlePlacaClick} />
                            <label className="labelcam" htmlFor="Leer Tiquete">Ingresar placa</label>
                        </div>
                    )}
                </div>
                {showPlacaInput && (
                    <input 
                        type="text" 
                        className="InputPlaca"
                        value={placaValue} 
                        onChange={(e) => setPlacaValue(e.target.value)} 
                        placeholder="Ingrese la placa" 
                    />
                )}
                {barcode && <p className="barcode-result">{barcode}</p>}
                <div className="botones">
                    {showBackButton && (
                        <button className="atras" onClick={handleBackClick}>
                            <img src="./images/recurso 123.png" alt="" className="flechitaAtras"/>
                        </button>
                    )}
                    <button type="submit" className="siguiente1">Finalizar</button>
                </div>
            </form>
        </div>
    );
};

export default Lector;
