// =========================================================
// Datos del sistema
// Los componentes solo se encargan de MOSTRAR; los datos viven acá.
// =========================================================

// Categorías: nombre, ícono de Bootstrap Icons y descripción.
// La ilustración de cada una está en components/Ilustracion.jsx
export const CATEGORIAS = {
  bache: {
    nombre: "Bache",
    icono: "bi-cone-striped",
    descripcion: "Pozos y asfalto roto que ponen en riesgo a autos, motos y bicis.",
  },
  luminaria: {
    nombre: "Luminaria rota",
    icono: "bi-lightbulb",
    descripcion: "Faroles apagados que dejan la cuadra a oscuras.",
  },
  basural: {
    nombre: "Basural",
    icono: "bi-trash3",
    descripcion: "Residuos acumulados en terrenos, veredas y esquinas.",
  },
  agua: {
    nombre: "Pérdida de agua",
    icono: "bi-droplet",
    descripcion: "Caños rotos que desperdician agua potable.",
  },
  otro: {
    nombre: "Otro",
    icono: "bi-three-dots",
    descripcion: "Plazas, veredas, señales y otros espacios públicos.",
  },
};

export const BARRIOS = {
  "centro": "Centro",
  "barrio-norte": "Barrio Norte",
  "barrio-sur": "Barrio Sur",
  "villa-lujan": "Villa Luján",
};

// Estados en orden: el reporte avanza de 0 (pendiente) a 2 (resuelto)
export const ESTADOS = {
  "pendiente": { nombre: "Pendiente", orden: 0, color: "rojo" },
  "en-proceso": { nombre: "En proceso", orden: 1, color: "ambar" },
  "resuelto": { nombre: "Resuelto", orden: 2, color: "verde" },
};

// Pasos de "¿Cómo funciona?" (es una secuencia, por eso van numerados)
export const PASOS = [
  {
    numero: 1,
    icono: "bi-pencil-square",
    titulo: "Reportás",
    texto: "Elegís la categoría, escribís la dirección y contás qué pasa.",
  },
  {
    numero: 2,
    icono: "bi-building",
    titulo: "El municipio lo toma",
    texto: "El área que corresponde lo revisa y lo pasa a En proceso.",
  },
  {
    numero: 3,
    icono: "bi-check2-circle",
    titulo: "Seguís el avance",
    texto: "Ves en el mapa y en el listado cuándo queda resuelto.",
  },
];

// Calles del mapa ilustrado de la portada.
// "y" es la posición de la calle dentro del dibujo (de 0 a 480).
export const CALLES_MAPA = [
  { nombre: "San Martín", y: 110 },
  { nombre: "Av. Mate de Luna", y: 240 },
  { nombre: "Lavalle", y: 370 },
];

// Reportes de ejemplo.
// x / y: ubicación del pin en el mapa ilustrado (dibujo de 640 x 480).
export const REPORTES = [
  {
    id: 1,
    titulo: "Bache grande en la esquina",
    descripcion: "Bache profundo que ocupa medio carril, peligroso para motos y bicicletas.",
    categoria: "bache",
    barrio: "centro",
    direccion: "San Martín 450",
    estado: "pendiente",
    fecha: "2026-10-20",
    x: 180,
    y: 110,
  },
  {
    id: 2,
    titulo: "Luminaria apagada hace una semana",
    descripcion: "La cuadra queda completamente a oscuras durante la noche.",
    categoria: "luminaria",
    barrio: "barrio-norte",
    direccion: "Av. Mate de Luna 1800",
    estado: "en-proceso",
    fecha: "2026-10-15",
    x: 470,
    y: 240,
  },
  {
    id: 3,
    titulo: "Basural en el terreno baldío",
    descripcion: "Acumulación de residuos en el terreno de la esquina, con presencia de roedores.",
    categoria: "basural",
    barrio: "barrio-sur",
    direccion: "Lavalle 2300",
    estado: "resuelto",
    fecha: "2026-10-02",
    x: 320,
    y: 370,
  },
];
