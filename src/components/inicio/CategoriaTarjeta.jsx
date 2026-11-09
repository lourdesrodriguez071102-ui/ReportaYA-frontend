import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ilustracion from "../reportes/Ilustracion";

// Tarjeta de una categoría. Lleva al listado ya filtrado por esa categoría
// (por ejemplo: /reportes?categoria=bache).
// Props:
//   - clave: identificador de la categoría (ej: "bache")
//   - nombre, descripcion: textos de la categoría
//   - cantidad: cuántos reportes hay de esta categoría

function CategoriaTarjeta({ clave, nombre, descripcion, cantidad }) {
  return (
    <Card className="h-100 border-0 shadow-sm elevar overflow-hidden">
      <div className="ratio ratio-16x9">
        <Ilustracion tipo={clave} className="w-100 h-100" />
      </div>
      <Card.Body>
        <Card.Title as="h3" className="h5 fw-bold">
          <Link to={`/reportes?categoria=${clave}`} className="stretched-link text-primary text-decoration-none">
            {nombre}
          </Link>
        </Card.Title>
        <Card.Text className="small text-secondary">{descripcion}</Card.Text>
        <span className="small fw-bold text-acento">
          {cantidad === 0 ? "Sin reportes todavía" : `${cantidad} ${cantidad === 1 ? "reporte" : "reportes"}`}
        </span>
      </Card.Body>
    </Card>
  );
}

export default CategoriaTarjeta;
