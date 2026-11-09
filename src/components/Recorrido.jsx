import { useEffect, useState } from "react";

// Componente: "calle" que acompaña el scroll.
// - En computadora: una franja de asfalto a la izquierda con línea amarilla,
//   una parada por sección y un pin que baja a medida que se recorre la página.
// - En celular y tablet: una barra fina de progreso arriba de todo.
// Props:
//   - secciones: lista de { id, texto, icono }

function Recorrido({ secciones }) {
  const [progreso, setProgreso] = useState(0);        // de 0 a 100
  const [seccionActual, setSeccionActual] = useState(secciones[0].id);

  useEffect(() => {
    function alHacerScroll() {
      const recorrible = document.documentElement.scrollHeight - window.innerHeight;
      setProgreso(recorrible > 0 ? (window.scrollY / recorrible) * 100 : 0);

      // La sección actual es la última cuyo comienzo ya pasó por arriba
      let actual = secciones[0].id;
      secciones.forEach(({ id }) => {
        const elemento = document.getElementById(id);
        if (elemento && elemento.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          actual = id;
        }
      });
      setSeccionActual(actual);
    }

    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    window.addEventListener("resize", alHacerScroll);
    return () => {
      window.removeEventListener("scroll", alHacerScroll);
      window.removeEventListener("resize", alHacerScroll);
    };
  }, [secciones]);

  return (
    <>
      {/* Barra de progreso (celular y tablet) */}
      <div className="progreso" style={{ transform: `scaleX(${progreso / 100})` }} aria-hidden="true"></div>

      {/* Calle con paradas (computadora) */}
      <nav className="recorrido" aria-label="Recorrido por la página">
        <div className="recorrido__calle">
          <div className="recorrido__avance" style={{ height: `${progreso}%` }}></div>
          <span className="recorrido__marcador" style={{ top: `${progreso}%` }} aria-hidden="true">
            <i className="bi bi-geo-alt-fill"></i>
          </span>
        </div>

        <ol className="recorrido__paradas">
          {secciones.map((seccion, indice) => (
            <li key={seccion.id} style={{ top: `${(indice / (secciones.length - 1)) * 100}%` }}>
              <a
                href={`#${seccion.id}`}
                className={`recorrido__parada ${seccionActual === seccion.id ? "recorrido__parada--actual" : ""}`}
                aria-current={seccionActual === seccion.id ? "location" : undefined}
              >
                <span className="recorrido__punto" aria-hidden="true"></span>
                <span className="recorrido__nombre">
                  <i className={`bi ${seccion.icono}`} aria-hidden="true"></i>
                  {seccion.texto}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Recorrido;
