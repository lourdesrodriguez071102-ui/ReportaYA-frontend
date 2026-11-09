import Swal from "sweetalert2";

// Mensajes al usuario con SweetAlert2, con los colores de la marca.

const COLOR_PRINCIPAL = "#1E3A5F";
const COLOR_ACENTO = "#F26B1D";

// Error al cargar los reportes. Devuelve true si la persona elige "Reintentar".
export async function alertaErrorDeCarga(mensaje) {
  const resultado = await Swal.fire({
    icon: "error",
    title: "No pudimos cargar los reportes",
    text: mensaje,
    showCancelButton: true,
    confirmButtonText: "Reintentar",
    cancelButtonText: "Cerrar",
    confirmButtonColor: COLOR_ACENTO,
    cancelButtonColor: COLOR_PRINCIPAL,
  });

  return resultado.isConfirmed;
}

// Pregunta antes de descartar el borrador. Devuelve true si confirma.
export async function confirmarDescartarBorrador() {
  const resultado = await Swal.fire({
    icon: "warning",
    title: "¿Descartar el borrador?",
    text: "Se va a borrar todo lo que escribiste en el formulario.",
    showCancelButton: true,
    confirmButtonText: "Descartar",
    cancelButtonText: "Seguir editando",
    confirmButtonColor: COLOR_ACENTO,
    cancelButtonColor: COLOR_PRINCIPAL,
  });

  return resultado.isConfirmed;
}

// Aviso corto en la esquina (toast) que se cierra solo
export function avisoExito(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
}
