import { useEffect, useState } from "react";
import useEnPantalla from "../../hooks/useEnPantalla";

// Componente reutilizable: un número que "cuenta" desde 0 hasta su valor
// cuando aparece en la pantalla.
// Props:
//   - valor: número final
//   - duracion: milisegundos que dura la animación

function ContadorAnimado({ valor, duracion = 1200 }) {
  const { ref, visible } = useEnPantalla();
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let inicio = null;
    let idAnimacion;

    // requestAnimationFrame ejecuta la función en cada cuadro de la pantalla
    function paso(tiempo) {
      if (!inicio) inicio = tiempo;
      const progreso = Math.min((tiempo - inicio) / duracion, 1);
      setActual(Math.round(progreso * valor));
      if (progreso < 1) idAnimacion = requestAnimationFrame(paso);
    }

    idAnimacion = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(idAnimacion);
  }, [visible, valor, duracion]);

  return <span ref={ref}>{actual}</span>;
}

export default ContadorAnimado;
