import axios from "axios";

// Dirección de la API: se lee de la variable de entorno VITE_API_URL
// (archivo .env). Así la URL no queda escrita dentro de los componentes
// y se puede cambiar sin tocar el código.
const API_URL = import.meta.env.VITE_API_URL;

// Pide la lista de reportes a la API y la devuelve.
// Si algo sale mal, lanza un error con un mensaje claro para el usuario.
export async function obtenerReportes() {
  if (!API_URL) {
    throw new Error("Falta configurar la variable VITE_API_URL en el archivo .env.");
  }

  // axios.get hace la petición; la respuesta trae los datos en response.data
  const response = await axios.get(API_URL, { timeout: 8000 });

  if (!Array.isArray(response.data)) {
    throw new Error("La API respondió con un formato inesperado.");
  }

  return response.data;
}
