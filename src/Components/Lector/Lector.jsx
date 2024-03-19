import React, { useState, useEffect } from "react";
import Quagga from 'quagga'; 
import { useLocation, useNavigate } from 'react-router-dom';
import './Lector.css';

const Lector = () => {
    const [barcode, setBarcode] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [placaValue, setPlacaValue] = useState('');
    const [showPlacaInput, setShowPlacaInput] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const [facilityImage, setFacilityImage] = useState('');
    const [showBackToHomeButton, setShowBackToHomeButton] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pathSegments = location.pathname.split('/lector');
        const facility = pathSegments.pop();

        const fetchFacilityImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getFacility/${facility}`);
                const data = await response.json();
                if (response.ok) {
                    const imageUrl = `data:image/jpeg;base64,${data[0].datosImagen}`;
                    setFacilityImage(imageUrl);
                } else {
                    console.error('Error al obtener la imagen de la instalación:', data.error);
                }
            } catch (error) {
                console.error('Error al obtener la imagen de la instalación:', error);
            }
        };

        fetchFacilityImage();
    }, [location.pathname]);

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
    
    const goBackToHome = () => {
        const pathname = window.location.pathname;
    
        if (pathname.includes("/lectorarkadia")) {
            navigate("/arkadia");
        } else if (pathname.includes("/lectorfontanar")) {
            navigate("/fontanar");
        } else if (pathname.includes("/lectormolinos")) {
            navigate("/molinos");
        } else {
            throw new Error("No se pudo determinar la ruta de inicio.");
        }
    };

    const handleCameraClick = () => {
        setIsCameraActive(true);
        setShowPlacaInput(false);
        setShowBackButton(true);
        setShowBackToHomeButton(false); 
    };
    
    const handlePlacaClick = () => {
        setShowPlacaInput(true);
        setIsCameraActive(false);
        setShowBackButton(true);
        setShowBackToHomeButton(false); 
    };
    
    const handleBackClick = () => {
        setIsCameraActive(false);
        setShowPlacaInput(false);
        setShowBackButton(false);
        setShowBackToHomeButton(true); 
    };
    
    return (
        <div className="wrapper3">
            <form action="">
                
                <div className="image-container">
                    {isCameraActive && (
                        <div id="camera-preview" className="cam-preview" style={{ maxHeight: "300px", overflow: "hidden" }} /> 
                    )}
                    {!showPlacaInput && !isCameraActive && (
                        <div>
                            <img src="./images/leertiket.png" alt="Leer tiquete" className="cam" onClick={handleCameraClick} />
                            <label className="labelcam" htmlFor="Leer Tiquete">Leer tiquete</label>
                        </div>
                    )}
                    {!showPlacaInput && !isCameraActive && (
                        <div>
                            <img src="./images/igresarplaca.png" alt="Ingr Placa" className="placa" onClick={handlePlacaClick} />
                            <label className="labelcam" htmlFor="Leer Tiquete">Ingresar placa</label>
                        </div>
                    )}
                </div>
                {showPlacaInput && (
                    <div className="caplaca">
                        <p className="textPlaca">Por favor ingrese la placa del vehículo:</p>
                        <input 
                            type="text" 
                            className="InputPlaca"
                            value={placaValue} 
                            onChange={(e) => setPlacaValue(e.target.value)} 
                            placeholder="Ingrese la placa" 
                        />
                    </div>
                )}
                {barcode && <p className="barcode-result">{barcode}</p>}
                <div className="botoneslect">
                    {showBackButton && (
                        <button className="atras" onClick={handleBackClick}>
                            <img src="./images/flechitaback.png" alt="" className="flechitaAtraslector"/>
                        </button>
                    )}
                    
                
                    <button type="submit" className="siguiente1">Finalizar</button>
                </div>
            </form>
        </div>
    );
};

export default Lector;
