import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ilustracion from "./Ilustracion";
import BadgeEstado from "./BadgeEstado";
import CartelCalle from "./CartelCalle";
import SeguimientoEstado from "./SeguimientoEstado";
import { CATEGORIAS, BARRIOS } from "../../data/reportes";
import { formatearFecha } from "../../utils/formato";

// Tarjeta de un reporte. Se usa en el listado, en el inicio
// y como vista previa en el formulario.
// Props:
//   - reporte: objeto con los datos del reporte
//   - esVistaPrevia: true cuando se muestra mientras se completa el formulario

function TarjetaReporte({ reporte, esVistaPrevia = false }) {
  const { id, titulo, descripcion, categoria, barrio, direccion, estado, fecha } = reporte;
  const datosCategoria = CATEGORIAS[categoria] || CATEGORIAS.otro;

  return (
    <Card as="article" className={`h-100 shadow-sm elevar ${esVistaPrevia ? "border-2 border-primary" : "border-0"}`}>
      {/* Ilustración de la categoría (ratio: mantiene la proporción) */}
      <div className="ratio ratio-21x9 rounded-top overflow-hidden">
        <div>
          <Ilustracion tipo={categoria} className="w-100 h-100" />
          <Badge bg="warning" text="dark" className="position-absolute bottom-0 start-0 m-2">
            <i className={`bi ${datosCategoria.icono} me-1`} aria-hidden="true"></i>
            {datosCategoria.nombre}
          </Badge>
        </div>
      </div>

      <Card.Body className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center">
          <BadgeEstado estado={estado} />
          <time dateTime={fecha} className="small text-secondary">{formatearFecha(fecha)}</time>
        </div>

        <Card.Title as="h3" className="h5 fw-bold mb-0">
          {esVistaPrevia ? (
            titulo
          ) : (
            // stretched-link: toda la tarjeta funciona como enlace al detalle
            <Link to={`/reportes/${id}`} className="stretched-link text-primary text-decoration-none">
              {titulo}
            </Link>
          )}
        </Card.Title>

        <Card.Text className="text-secondary flex-grow-1 mb-0">{descripcion}</Card.Text>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <CartelCalle direccion={direccion} />
          <span className="small text-secondary">
            <i className="bi bi-geo-alt me-1" aria-hidden="true"></i>
            {BARRIOS[barrio] || "Barrio sin elegir"}
          </span>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 pt-0 pb-3">
        <SeguimientoEstado estado={estado} />
      </Card.Footer>
    </Card>
  );
}

export default TarjetaReporte;
