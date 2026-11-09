import { CATEGORIAS, ESTADOS } from "../data/reportes";

// Medidas del dibujo del mapa (para convertir x / y en porcentajes)
const ANCHO_MAPA = 640;
const ALTO_MAPA = 480;

// Componente reutilizable: un pin del mapa que representa un reporte.
// Es un enlace: al tocarlo baja hasta la tarjeta del reporte.
// Props:
//   - reporte: el reporte que representa
//   - indice: posición en la lista (para que los pines caigan uno después del otro)

function PinMapa({ reporte, indice }) {
  const estado = ESTADOS[reporte.estado];
  const categoria = CATEGORIAS[reporte.categoria];

  // La posición se calcula en % para que el pin acompañe al mapa en cualquier tamaño
  const posicion = {
    left: `${(reporte.x / ANCHO_MAPA) * 100}%`,
    top: `${(reporte.y / ALTO_MAPA) * 100}%`,
    animationDelay: `${300 + indice * 180}ms`,
  };

  // La ficha se abre hacia el lado con más espacio, para que no se corte
  const vertical = reporte.y <= ALTO_MAPA / 2 ? "abajo" : "arriba";
  const horizontal = reporte.x < ANCHO_MAPA / 3 ? "izq" : reporte.x > (ANCHO_MAPA * 2) / 3 ? "der" : "centro";

  return (
    <a
      href={`#reporte-${reporte.id}`}
      className={`pin pin--${estado.color} pin--${vertical} pin--${horizontal}`}
      style={posicion}
      aria-label={`${reporte.titulo}, ${estado.nombre}. Ver reporte`}
    >
      <span className="pin__cabeza">
        <i className={`bi ${categoria.icono}`} aria-hidden="true"></i>
      </span>

      {/* Ficha que aparece al pasar el mouse o con el teclado */}
      <span className="pin__ficha" aria-hidden="true">
        <strong>{reporte.titulo}</strong>
        <span>{reporte.direccion}</span>
        <span className="pin__estado">{estado.nombre}</span>
      </span>
    </a>
  );
}

export default PinMapa;
