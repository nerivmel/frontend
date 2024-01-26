import React from "react";
import './Lector.css';


const Lector = () => {
    return(
        <div className="wrapper">
            <form action="">

                <div className="header">
                    <img src="./images/recurso 9.png" alt="" className="top"/>
                    <img src="./images/recurso 52.png" alt="" className="topslide"/>
                </div>

                <img src="./images/recurso 3.png" alt="" className="parati"/>

                <img src="./images/recurso 64.png" alt="Leer tiquete" className="cam"/>
                <label className="labelcam"
                     htmlFor="Leer Tiquete">Leer tiquete
                </label>
                

                <button type="submit" className="siguiente">
                    Finalizar
                </button>
            </form>

        </div>
    )
};

export default Lector;