import { Badge } from "react-bootstrap";
import PinMapa from "./PinMapa";
import { CALLES_MAPA } from "../../data/reportes";

// Posición de las calles verticales en el dibujo
const CALLES_VERTICALES = [110, 250, 390, 530];

// Plano ilustrado del barrio con un pin por cada reporte.
// Props:
//   - reportes: lista de reportes a ubicar en el mapa

function MapaBarrio({ reportes }) {
  return (
    // ratio-4x3: el mapa mantiene su forma en cualquier pantalla
    <div className="ratio ratio-4x3 rounded-4 border border-5 border-white shadow-lg overflow-hidden">
      <div>
        <svg className="w-100 h-100 d-block" viewBox="0 0 640 480" role="img" aria-label="Plano ilustrado del barrio con los reportes">
          <rect width="640" height="480" fill="#E4E8EC" />

          {/* Manzanas: dos map() anidados arman la cuadrícula */}
          <g fill="#F7F8FA">
            {[0, 1, 2, 3, 4].map((columna) =>
              [0, 1, 2, 3].map((fila) => (
                <rect key={`${columna}-${fila}`} x={-20 + columna * 140} y={-10 + fila * 130} width="118" height="102" rx="6" />
              ))
            )}
          </g>

          {/* Plaza */}
          <rect x="260" y="122" width="118" height="102" rx="6" fill="#BFE3CC" />
          <g fill="#2F9E6B">
            <circle cx="285" cy="150" r="10" />
            <circle cx="350" cy="148" r="12" />
            <circle cx="300" cy="198" r="11" />
            <circle cx="352" cy="200" r="9" />
          </g>

          {/* Calles */}
          <g fill="#FFFFFF">
            {CALLES_VERTICALES.map((x) => (
              <rect key={x} x={x - 11} y="0" width="22" height="480" />
            ))}
          </g>
          {CALLES_MAPA.map((calle) => {
            const esAvenida = calle.nombre.startsWith("Av.");
            const ancho = esAvenida ? 34 : 22;
            return (
              <g key={calle.nombre}>
                <rect x="0" y={calle.y - ancho / 2} width="640" height={ancho} fill="#FFFFFF" />
                {esAvenida && (
                  <line x1="0" y1={calle.y} x2="640" y2={calle.y} stroke="#F5C400" strokeWidth="3" strokeDasharray="16 12" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Carteles con el nombre de cada calle */}
        {CALLES_MAPA.map((calle) => (
          <Badge
            key={calle.nombre}
            bg="primary"
            className="position-absolute start-0 ms-2 translate-middle-y border border-2 border-white rounded-1"
            style={{ top: `${(calle.y / 480) * 100}%` }}
          >
            {calle.nombre}
          </Badge>
        ))}

        {/* Un pin por cada reporte */}
        {reportes.map((reporte, indice) => (
          <PinMapa key={reporte.id} reporte={reporte} indice={indice} />
        ))}
      </div>
    </div>
  );
}

export default MapaBarrio;
