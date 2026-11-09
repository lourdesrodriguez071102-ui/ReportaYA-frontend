// Funciones para guardar y leer datos en el navegador (localStorage).
// localStorage solo guarda texto: por eso usamos JSON.stringify y JSON.parse.
// Están dentro de try/catch porque algunos navegadores bloquean el guardado.

// Lee un dato guardado; si no existe o hay un error, devuelve valorInicial
export function leerGuardado(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch {
    return valorInicial;
  }
}

// Guarda un dato en el navegador
export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Si no se puede guardar, la app sigue funcionando igual
  }
}

// Borra un dato guardado
export function borrarGuardado(clave) {
  try {
    localStorage.removeItem(clave);
  } catch {
    // Nada que hacer
  }
}
