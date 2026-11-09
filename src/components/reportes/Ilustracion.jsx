// Componente reutilizable: ilustración SVG de cada categoría de problema.
// Están dibujadas a mano con código (SVG), así no dependen de fotos externas
// y comparten los colores de la marca.
// Props:
//   - tipo: "bache", "luminaria", "basural", "agua" u "otro"
//   - className: clases extra

// Colores de la marca usados en los dibujos
const C = {
  asfalto: "#2B2F36",
  asfaltoClaro: "#3A3F48",
  azul: "#1E3A5F",
  naranja: "#F26B1D",
  amarillo: "#F5C400",
  tiza: "#F3F5F7",
  vereda: "#D9DEE4",
  verde: "#2F9E6B",
  agua: "#7CC4F2",
};

function DibujoBache() {
  return (
    <>
      <rect width="200" height="140" fill={C.asfaltoClaro} />
      <rect y="0" width="200" height="26" fill={C.vereda} />
      <rect y="26" width="200" height="4" fill="#B9C0C9" />
      {/* Línea de demarcación amarilla */}
      <g fill={C.amarillo}>
        <rect x="6" y="112" width="34" height="6" rx="1" />
        <rect x="62" y="112" width="34" height="6" rx="1" />
        <rect x="164" y="112" width="34" height="6" rx="1" />
      </g>
      {/* Pozo */}
      <ellipse cx="96" cy="78" rx="52" ry="20" fill={C.asfalto} />
      <ellipse cx="96" cy="82" rx="38" ry="12" fill="#1C1F24" />
      <ellipse cx="88" cy="84" rx="16" ry="4" fill={C.agua} opacity="0.55" />
      <path d="M44 74 L30 66 M148 80 L166 72 M120 94 L132 108 M70 94 L58 104" stroke={C.asfalto} strokeWidth="3" strokeLinecap="round" />
      {/* Cono */}
      <path d="M158 100 L170 44 L182 100 Z" fill={C.naranja} />
      <path d="M163 76 L177 76 L179 86 L161 86 Z" fill={C.tiza} />
      <rect x="150" y="98" width="40" height="8" rx="2" fill="#C9541A" />
    </>
  );
}

function DibujoLuminaria() {
  return (
    <>
      <rect width="200" height="140" fill={C.azul} />
      {/* Estrellas y luna */}
      <g fill={C.tiza}>
        <circle cx="30" cy="22" r="1.6" />
        <circle cx="70" cy="40" r="1.2" />
        <circle cx="120" cy="18" r="1.4" />
        <circle cx="180" cy="50" r="1.2" />
      </g>
      <circle cx="160" cy="28" r="14" fill={C.amarillo} />
      <circle cx="166" cy="24" r="12" fill={C.azul} />
      {/* Casas sin luz */}
      <path d="M0 96 L30 76 L60 96 Z M120 92 L150 72 L180 92 Z" fill="#16304F" />
      <rect x="0" y="96" width="60" height="30" fill="#16304F" />
      <rect x="120" y="92" width="80" height="34" fill="#16304F" />
      <rect y="122" width="200" height="18" fill={C.asfalto} />
      {/* Farol apagado */}
      <rect x="86" y="44" width="6" height="80" fill="#8A94A3" />
      <path d="M89 46 Q89 32 104 32 L112 32" stroke="#8A94A3" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M104 32 L124 32 L120 42 L108 42 Z" fill="#5B6573" />
      <path d="M110 46 l4 6 l-5 0 l4 7" stroke={C.naranja} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function DibujoBasural() {
  return (
    <>
      <rect width="200" height="140" fill="#E7EBEF" />
      {/* Paredón */}
      <rect y="20" width="200" height="74" fill="#C7CED6" />
      <g stroke="#B3BBC5" strokeWidth="2">
        <path d="M0 44 H200 M0 68 H200" />
        <path d="M40 20 V44 M100 20 V44 M160 20 V44 M70 44 V68 M130 44 V68 M40 68 V94 M100 68 V94 M160 68 V94" />
      </g>
      <rect y="94" width="200" height="46" fill={C.vereda} />
      {/* Bolsas */}
      <path d="M40 120 Q34 92 58 86 Q70 82 78 92 Q88 108 80 122 Z" fill={C.asfalto} />
      <path d="M72 124 Q66 96 94 92 Q112 92 116 110 Q118 124 108 128 Z" fill="#3D5A3E" />
      <path d="M108 126 Q106 104 126 100 Q144 100 146 116 Q146 128 136 130 Z" fill={C.asfalto} />
      <path d="M56 86 l4 -8 l4 8 M92 92 l3 -7 l4 7" stroke={C.naranja} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Botella y cartón */}
      <rect x="150" y="116" width="26" height="14" rx="2" fill="#C49A6C" transform="rotate(-8 163 123)" />
      <rect x="22" y="120" width="8" height="16" rx="3" fill={C.verde} transform="rotate(30 26 128)" />
      {/* Moscas */}
      <g fill={C.asfalto}>
        <circle cx="70" cy="66" r="2" />
        <circle cx="96" cy="58" r="2" />
        <circle cx="122" cy="72" r="2" />
      </g>
    </>
  );
}

function DibujoAgua() {
  return (
    <>
      <rect width="200" height="140" fill={C.tiza} />
      {/* Baldosas de vereda */}
      <rect y="70" width="200" height="70" fill={C.vereda} />
      <g stroke="#C3CAD3" strokeWidth="2">
        <path d="M0 94 H200 M0 118 H200 M40 70 V140 M80 70 V140 M120 70 V140 M160 70 V140" />
      </g>
      {/* Caño roto */}
      <rect x="14" y="40" width="88" height="20" rx="4" fill="#8A94A3" />
      <rect x="96" y="36" width="14" height="28" rx="3" fill="#6E7886" />
      <path d="M110 44 l8 -4 l-2 8 l8 2 l-8 6" fill="#6E7886" />
      {/* Chorro de agua */}
      <path d="M118 46 Q150 30 168 80" stroke={C.agua} strokeWidth="7" fill="none" strokeLinecap="round" />
      <g fill={C.agua}>
        <path d="M140 64 q4 6 0 9 q-4 -3 0 -9 Z" />
        <path d="M178 66 q4 6 0 9 q-4 -3 0 -9 Z" />
        <path d="M156 50 q3 5 0 7 q-3 -2 0 -7 Z" />
      </g>
      {/* Charco */}
      <ellipse cx="160" cy="112" rx="42" ry="12" fill={C.agua} opacity="0.75" />
      <ellipse cx="150" cy="110" rx="12" ry="3" fill="#FFFFFF" opacity="0.6" />
    </>
  );
}

function DibujoOtro() {
  return (
    <>
      <rect width="200" height="140" fill="#DDEFE6" />
      <rect y="104" width="200" height="36" fill="#9FD3B5" />
      {/* Árbol */}
      <rect x="40" y="62" width="8" height="46" fill="#7A5A3C" />
      <circle cx="44" cy="52" r="26" fill={C.verde} />
      <circle cx="30" cy="62" r="14" fill="#278A5D" />
      {/* Banco con tabla rota */}
      <rect x="96" y="86" width="74" height="7" rx="2" fill="#B57A45" />
      <rect x="96" y="70" width="34" height="7" rx="2" fill="#B57A45" />
      <rect x="138" y="66" width="32" height="7" rx="2" fill="#B57A45" transform="rotate(14 154 70)" />
      <rect x="102" y="93" width="5" height="16" fill={C.asfalto} />
      <rect x="160" y="93" width="5" height="16" fill={C.asfalto} />
      {/* Señal de atención */}
      <path d="M186 40 L200 66 L172 66 Z" fill={C.amarillo} stroke={C.asfalto} strokeWidth="2" strokeLinejoin="round" />
      <rect x="185" y="48" width="2.5" height="9" fill={C.asfalto} />
      <circle cx="186.3" cy="61" r="1.6" fill={C.asfalto} />
    </>
  );
}

const DIBUJOS = {
  bache: DibujoBache,
  luminaria: DibujoLuminaria,
  basural: DibujoBasural,
  agua: DibujoAgua,
  otro: DibujoOtro,
};

function Ilustracion({ tipo, className = "" }) {
  // Elegimos el dibujo según la prop "tipo"; si no existe usamos "otro"
  const Dibujo = DIBUJOS[tipo] || DibujoOtro;

  return (
    <svg
      className={`ilustracion ${className}`}
      viewBox="0 0 200 140"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <Dibujo />
    </svg>
  );
}

export default Ilustracion;
