import { ESTADOS } from "../data/reportes";

// Componente reutilizable: barra de seguimiento con las 3 etapas
// de un reporte. Las etapas ya alcanzadas se pintan del color del estado.
// Props:
//   - estado: estado actual del reporte

function SeguimientoEstado({ estado }) {
  const actual = ESTADOS[estado];
  const etapas = Object.entries(ESTADOS);

  return (
    <ol className={`seguimiento seguimiento--${actual.color}`} aria-label={`Estado: ${actual.nombre}`}>
      {etapas.map(([clave, etapa]) => (
        <li
          key={clave}
          className={`seguimiento__etapa ${etapa.orden <= actual.orden ? "seguimiento__etapa--hecha" : ""}`}
        >
          {etapa.nombre}
        </li>
      ))}
    </ol>
  );
}

export default SeguimientoEstado;
