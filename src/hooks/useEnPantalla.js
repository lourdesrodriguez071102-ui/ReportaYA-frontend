import { useEffect, useRef, useState } from "react";

// Hook personalizado: avisa cuándo un elemento aparece en la pantalla.
// Se usa para las animaciones al hacer scroll y para los contadores.
//
// Devuelve:
//   - ref: se coloca en el elemento que queremos observar
//   - visible: true cuando el elemento ya entró en la pantalla
//
// IntersectionObserver es una herramienta del navegador que "mira"
// un elemento y avisa cuando entra en la parte visible de la página.

function useEnPantalla() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    // Si el navegador no lo soporta, mostramos todo directamente
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect(); // la animación ocurre una sola vez
        }
      },
      { threshold: 0.15 } // se activa cuando se ve el 15% del elemento
    );

    observador.observe(elemento);

    // Limpieza: deja de observar si el componente desaparece
    return () => observador.disconnect();
  }, []);

  return { ref, visible };
}

export default useEnPantalla;
