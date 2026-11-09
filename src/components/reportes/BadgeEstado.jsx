import { Badge } from "react-bootstrap";
import { ESTADOS } from "../../data/reportes";

// Etiqueta de color con el estado del reporte.
// Props:
//   - estado: "pendiente", "en-proceso" o "resuelto"

function BadgeEstado({ estado }) {
  const { nombre, variante } = ESTADOS[estado];

  // El amarillo necesita texto oscuro para que se lea bien
  return (
    <Badge pill bg={variante} text={variante === "warning" ? "dark" : "light"}>
      {nombre}
    </Badge>
  );
}

export default BadgeEstado;
