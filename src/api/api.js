
export async function fetchPersona(docType, docNumber) {
    try {
        const response = await fetch(`http://localhost:8080/persons?doc=${docNumber}&docType=${docType}`
        );
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Credenciales inválidas');
        }
    } catch (error) {
        throw new Error('Error al realizar la solicitud: ' + error.message);
    }
}
