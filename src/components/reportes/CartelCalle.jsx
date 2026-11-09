import { Badge } from "react-bootstrap";

// Muestra una dirección con el estilo de los carteles de calle:
// fondo azul y borde blanco.
// Props:
//   - direccion: texto de la dirección (ej: "San Martín 450")

function CartelCalle({ direccion }) {
  return (
    <Badge bg="primary" className="border border-2 border-white shadow-sm rounded-1 fs-6 fw-bold">
      <i className="bi bi-signpost-split me-1" aria-hidden="true"></i>
      {direccion}
    </Badge>
  );
}

export default CartelCalle;
