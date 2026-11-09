// Funciones de ayuda que usan varios componentes

// "2026-10-20" -> "20/10/2026"
export function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

// Fecha de hoy en formato "AAAA-MM-DD" (según la hora local)
export function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Quita tildes y pasa a minúsculas: así "lujan" encuentra "Luján"
export function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
