import React from "react";

const CheckboxesTerminos = ({ isChecked1, isChecked2,isChecked3 ,handleCheckbox1Change, handleCheckbox2Change, handleCheckbox3Change ,handleTerminosClick }) => {
    return (
        <div className="terminus"> 
            <div className="checkbox-label">
                <input className="checkbox" type="checkbox" id="terminos1" name="terminos" checked={isChecked1} onChange={handleCheckbox1Change} required/>
                <label htmlFor="terminos1">
                    <a href="https://terminosycondicionesdeusoejemplo.com/" onClick={handleTerminosClick}>
                        Deseo registrar mis datos solo para efectos<br /> de facturación electrónica
                    </a>
                </label>
            </div>
            <div className="checkbox-label">
                <input className="checkbox" type="checkbox" id="terminos2" name="terminos2" checked={isChecked2} onChange={handleCheckbox2Change} required/>
                <label htmlFor="terminos2">
                    <a href="https://terminosycondicionesdeusoejemplo.com/" onClick={handleTerminosClick}>
                        Autorizo el tratamiento de mis datos<br />  personales con las siguientes <strong>condiciones</strong>
                    </a>
                </label>
            </div>
            <div className="checkbox-label">
                <input className="checkbox" type="checkbox" id="terminos3" name="terminos3" checked={isChecked3} onChange={handleCheckbox3Change} required/>
                <label htmlFor="terminos3">
                    <a href="https://terminosycondicionesdeusoejemplo.com/" onClick={handleTerminosClick}>
                        Autorizo el tratamiento de mis datos para <br /> el envio de publicidad con las <br /> siguientes <strong>condiciones</strong>
                    </a>
                </label>
            </div>
        </div>
    );
};

export default CheckboxesTerminos;
