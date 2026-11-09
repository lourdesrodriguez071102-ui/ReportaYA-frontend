import PinMapa from "./PinMapa";
import { CALLES_MAPA } from "../data/reportes";

// Posición de las calles verticales en el dibujo
const CALLES_VERTICALES = [110, 250, 390, 530];

// Componente: plano ilustrado del barrio con un pin por cada reporte.
// Props:
//   - reportes: lista de reportes a ubicar en el mapa

function MapaBarrio({ reportes }) {
  return (
    <div className="mapa">
      {/* Dibujo del plano: manzanas, calles, plaza */}
      <svg className="mapa__plano" viewBox="0 0 640 480" role="img" aria-label="Plano ilustrado del barrio con los reportes">
        <rect width="640" height="480" fill="#E4E8EC" />

        {/* Manzanas */}
        <g fill="#F7F8FA">
          {[0, 1, 2, 3, 4].map((columna) =>
            [0, 1, 2, 3].map((fila) => (
              <rect
                key={`${columna}-${fila}`}
                x={-20 + columna * 140}
                y={-10 + fila * 130}
                width="118"
                height="102"
                rx="6"
              />
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
        <path d="M262 173 H376 M319 124 V222" stroke="#F7F8FA" strokeWidth="5" />

        {/* Calles verticales */}
        <g fill="#FFFFFF">
          {CALLES_VERTICALES.map((x) => (
            <rect key={x} x={x - 11} y="0" width="22" height="480" />
          ))}
        </g>

        {/* Calles horizontales; la avenida es más ancha y tiene línea amarilla */}
        {CALLES_MAPA.map((calle) => {
          const esAvenida = calle.nombre.startsWith("Av.");
          const ancho = esAvenida ? 34 : 22;
          return (
            <g key={calle.nombre}>
              <rect x="0" y={calle.y - ancho / 2} width="640" height={ancho} fill="#FFFFFF" />
              {esAvenida && (
                <line
                  className="mapa__demarcacion"
                  x1="0" y1={calle.y} x2="640" y2={calle.y}
                  stroke="#F5C400" strokeWidth="3" strokeDasharray="16 12"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Carteles con el nombre de cada calle */}
      {CALLES_MAPA.map((calle) => (
        <span
          key={calle.nombre}
          className="mapa__calle"
          style={{ top: `${(calle.y / 480) * 100}%` }}
        >
          {calle.nombre}
        </span>
      ))}

      {/* Un pin por cada reporte */}
      {reportes.map((reporte, indice) => (
        <PinMapa key={reporte.id} reporte={reporte} indice={indice} />
      ))}
    </div>
  );
}

export default MapaBarrio;
