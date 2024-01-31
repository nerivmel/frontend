
export async function fetchPersona(doctype, docNumber) {
    try {
        const response = await fetch(`http://localhost:8080/persons?doc=${docNumber}&doctype=${doctype}`
        );
        console.log(response)
        if (response.status === 200 ) {
            return await response.json();
        } else {
            throw new Error('Credenciales inválidas');
        }
    } catch (error) {
       
        //throw new Error('Error al realizar la solicitud: ' + error.message);
        
    }
}

export async function fetchRegistro(doctype, docNumber, email, name) {
    try {
        const response = await fetch('http://localhost:8080/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctype: doctype,
                doc: docNumber,
                email: email,
                name: name
            })
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al registrar los datos');
        }
    } catch (error) {
        throw new Error('Error al realizar la solicitud: ' + error.message);
    }
}

