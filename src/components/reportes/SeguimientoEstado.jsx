import { ESTADOS } from "../../data/reportes";

// Barra de seguimiento con las 3 etapas de un reporte.
// Las etapas alcanzadas se pintan con el color del estado actual.
// Props:
//   - estado: estado actual del reporte

function SeguimientoEstado({ estado }) {
  const actual = ESTADOS[estado];

  return (
    <ol className="row g-1 list-unstyled mb-0 small" aria-label={`Estado: ${actual.nombre}`}>
      {Object.entries(ESTADOS).map(([clave, etapa]) => {
        const alcanzada = etapa.orden <= actual.orden;
        return (
          <li
            key={clave}
            className={`col border-top border-4 pt-1 ${
              alcanzada ? `border-${actual.variante} fw-bold` : "border-secondary-subtle text-secondary"
            }`}
          >
            {etapa.nombre}
          </li>
        );
      })}
    </ol>
  );
}

export default SeguimientoEstado;
