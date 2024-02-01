import React, { useState, useEffect } from "react";
import Quagga from 'quagga'; 
import './Lector.css';

const Lector = () => {
    const [barcode, setBarcode] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [placaValue, setPlacaValue] = useState('');
    const [showPlacaInput, setShowPlacaInput] = useState(false);

    useEffect(() => {
        if (isCameraActive) {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    locate: true,
                    frequency: 10,
                    target: document.querySelector('#camera-preview'),
                    constraints: {
                        width: 420,
                        height: 400,
                        facingMode: "environment" 
                    },
                    area: { 
                        top: "0%",    
                        right: "0%",  
                        left: "0%",   
                        bottom: "0%"  
                    },
                },
                decoder: {
                    readers: ["ean_reader"] 
                }
            }, (err) => {
                if (err) {
                    console.error(err);
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
    };

    const handlePlacaClick = () => {
        setShowPlacaInput(true);
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
                    {isCameraActive ? (
                        <div id="camera-preview" className="cam-preview" style={{ maxHeight: "300px", overflow: "hidden" }} /> 
                    ) : (
                        <div className="image-box">
                            <img src="./images/recurso 64.png" alt="Leer tiquete" className="cam" onClick={handleCameraClick} />
                            <label className="labelcam" htmlFor="Leer Tiquete">Leer tiquete</label>
                        </div>
                    )}
                    <div className="image-box2">
                        <img src="./images/recurso 125.png" alt="Ingr Placa" className="placa" onClick={handlePlacaClick} />
                        <label className="labelcam" htmlFor="Leer Tiquete">Ingresar placa</label>
                        
                    </div>
                    
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
                <button type="submit" className="siguiente1">Finalizar</button>
            </form>
        </div>
    );
};

export default Lector;
