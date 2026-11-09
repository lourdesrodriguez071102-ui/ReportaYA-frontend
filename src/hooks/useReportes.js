import { useEffect, useState } from "react";
import { obtenerReportes } from "../services/api";
import { alertaErrorDeCarga } from "../utils/alertas";

// Hook personalizado: trae los reportes de la API.
// Devuelve:
//   - reportes: la lista que llegó de la API
//   - cargando: true mientras se espera la respuesta
//   - error: el mensaje de error (o "" si salió todo bien)
//   - reintentar: función para volver a pedir los datos

function useReportes() {
  // ESTADO 1: los datos que devuelve la API
  const [reportes, setReportes] = useState([]);

  // ESTADO 2: si la petición está en curso (para mostrar el spinner)
  const [cargando, setCargando] = useState(true);

  // ESTADO 3: el mensaje de error, si la petición falla
  const [error, setError] = useState("");

  // ESTADO 4: cuántas veces se intentó. Al sumarle 1, el efecto se repite.
  const [intento, setIntento] = useState(0);

  // EFECTO: hace la petición a la API.
  // Se ejecuta al cargar la aplicación y cada vez que cambia "intento"
  // (es decir, cuando la persona toca "Reintentar").
  useEffect(() => {
    // Si el componente desaparece antes de que llegue la respuesta,
    // no actualizamos el estado (lo indica la limpieza de abajo)
    let activo = true;

    async function cargar() {
      setCargando(true);
      setError("");

      try {
        const datos = await obtenerReportes();
        if (!activo) return;
        setReportes(datos);
        setCargando(false);
      } catch (err) {
        if (!activo) return;

        // Mensaje según el tipo de error
        const mensaje = err.response
          ? `El servidor respondió con el error ${err.response.status}.`
          : err.code === "ECONNABORTED"
            ? "La API tardó demasiado en responder."
            : err.message || "Revisá tu conexión a internet.";

        // Primero se actualiza la página (deja de cargar y muestra el error)...
        setError(mensaje);
        setCargando(false);

        // ...y después SweetAlert2 avisa del error y ofrece reintentar
        const quiereReintentar = await alertaErrorDeCarga(mensaje);
        if (quiereReintentar && activo) setIntento((anterior) => anterior + 1);
      }
    }

    cargar();

    // Limpieza: se ejecuta si el componente desaparece o antes de repetir el efecto
    return () => {
      activo = false;
    };
  }, [intento]);

  function reintentar() {
    setIntento((anterior) => anterior + 1);
  }

  return { reportes, cargando, error, reintentar };
}

export default useReportes;
