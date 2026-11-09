import { useEffect } from "react";

const SITIO = "https://reporta-ya-frontend.vercel.app";

// Componente de SEO: cambia el título y los metadatos de la pestaña
// según la página en la que se está. No dibuja nada en pantalla.
// Props:
//   - titulo: título de la página (ej: "Reportes")
//   - descripcion: resumen de la página para los buscadores
//   - ruta: dirección de la página (ej: "/reportes"), para la URL canónica

function Seo({ titulo, descripcion, ruta = "/" }) {
  useEffect(() => {
    const tituloCompleto = titulo
      ? `${titulo} | ReportaYa`
      : "ReportaYa | Reportá los problemas de tu barrio";

    document.title = tituloCompleto;

    // Actualiza una etiqueta del <head> si existe
    function actualizar(selector, atributo, valor) {
      document.querySelector(selector)?.setAttribute(atributo, valor);
    }

    actualizar('meta[name="description"]', "content", descripcion);
    actualizar('link[rel="canonical"]', "href", SITIO + ruta);
    actualizar('meta[property="og:title"]', "content", tituloCompleto);
    actualizar('meta[property="og:description"]', "content", descripcion);
    actualizar('meta[property="og:url"]', "content", SITIO + ruta);
  }, [titulo, descripcion, ruta]);

  return null;
}

export default Seo;
