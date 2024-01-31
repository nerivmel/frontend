import React, { useState, useEffect } from "react";
import Quagga from 'quagga'; // Importa la biblioteca Quagga
import './Lector.css';

const Lector = () => {
    const [barcode, setBarcode] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

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
                        facingMode: "environment" 
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

    return (
        <div className="wrapper">
            <form action="">
                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top" />
                    <img src="./images/recurso 52.png" alt="" className="topslide" />
                </div>
                <img src="./images/recurso 3.png" alt="" className="parati" />
                {isCameraActive ? (
                    <div id="camera-preview" className="cam-preview" style={{ maxHeight: "300px", overflow: "hidden" }} /> 
                ) : (
                    <img src="./images/recurso 64.png" alt="Leer tiquete" className="cam" onClick={handleCameraClick} />
                )}
                <label className="labelcam" htmlFor="Leer Tiquete">Leer tiquete</label>
                {barcode && <p className="barcode-result">{barcode}</p>}
                <button type="submit" className="siguiente">Finalizar</button>
                
            </form>
        </div>
    );
    
};

export default Lector;
