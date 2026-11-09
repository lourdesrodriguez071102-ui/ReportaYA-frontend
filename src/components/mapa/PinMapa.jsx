import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ESTADOS } from "../../data/reportes";

// Medidas del dibujo del mapa (para pasar x / y a porcentajes)
const ANCHO_MAPA = 640;
const ALTO_MAPA = 480;

// Pin del mapa: un enlace al detalle del reporte.
// Al pasar el mouse muestra un Tooltip de React Bootstrap.
// Props:
//   - reporte: el reporte que representa
//   - indice: posición en la lista (los pines caen uno después del otro)

function PinMapa({ reporte, indice }) {
  const estado = ESTADOS[reporte.estado];

  const ficha = (
    <Tooltip id={`pin-${reporte.id}`}>
      <strong>{reporte.titulo}</strong>
      <br />
      {reporte.direccion} ({estado.nombre})
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={ficha}>
      <Link
        to={`/reportes/${reporte.id}`}
        className="position-absolute lh-1"
        style={{
          left: `${(reporte.x / ANCHO_MAPA) * 100}%`,
          top: `${(reporte.y / ALTO_MAPA) * 100}%`,
          transform: "translate(-50%, -90%)",
        }}
        aria-label={`${reporte.titulo}, ${estado.nombre}. Ver detalle`}
      >
        <i
          className={`bi bi-geo-alt-fill d-block fs-1 text-${estado.variante} caer`}
          style={{ animationDelay: `${300 + indice * 180}ms` }}
          aria-hidden="true"
        ></i>
      </Link>
    </OverlayTrigger>
  );
}

export default PinMapa;
