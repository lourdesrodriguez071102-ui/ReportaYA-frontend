import { ESTADOS } from "../data/reportes";

// Componente reutilizable: etiqueta con el estado del reporte.
// Props:
//   - estado: "pendiente", "en-proceso" o "resuelto"

function BadgeEstado({ estado }) {
  const { nombre, color } = ESTADOS[estado];

  return <span className={`badge-estado badge-estado--${color}`}>{nombre}</span>;
}

export default BadgeEstado;
