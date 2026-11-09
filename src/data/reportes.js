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

// Estados en orden: el reporte avanza de 0 (pendiente) a 2 (resuelto).
// "variante" es el color de Bootstrap que usa cada estado.
export const ESTADOS = {
  "pendiente": { nombre: "Pendiente", orden: 0, variante: "danger" },
  "en-proceso": { nombre: "En proceso", orden: 1, variante: "warning" },
  "resuelto": { nombre: "Resuelto", orden: 2, variante: "success" },
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
