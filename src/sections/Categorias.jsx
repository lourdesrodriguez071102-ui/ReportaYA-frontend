import { Container } from "react-bootstrap";
import TituloSeccion from "../components/TituloSeccion";
import Ilustracion from "../components/Ilustracion";
import { CATEGORIAS } from "../data/reportes";

// Sección: tipos de problemas que se pueden reportar.
// Al elegir una categoría, el listado de reportes se filtra por ella.
// Props:
//   - reportes: lista de reportes (para contar cuántos hay de cada una)
//   - alElegir: función que recibe la categoría elegida (viene desde App)

function Categorias({ reportes, alElegir }) {
  return (
    <section id="categorias" className="seccion seccion--tiza" aria-labelledby="titulo-categorias">
      <Container>
        <TituloSeccion
          id="titulo-categorias"
          titulo="Qué podés reportar"
          bajada="Tocá una categoría para ver solo esos reportes."
        />

        <div className="categorias">
          {Object.entries(CATEGORIAS).map(([clave, categoria]) => {
            const cantidad = reportes.filter((reporte) => reporte.categoria === clave).length;

            return (
              <a
                key={clave}
                href="#reportes"
                className={`categoria categoria--${clave}`}
                onClick={() => alElegir(clave)}
              >
                <Ilustracion tipo={clave} className="categoria__dibujo" />
                <span className="categoria__texto">
                  <span className="categoria__nombre">{categoria.nombre}</span>
                  <span className="categoria__descripcion">{categoria.descripcion}</span>
                  <span className="categoria__cantidad">
                    {cantidad === 0 ? "Sin reportes todavía" : `${cantidad} ${cantidad === 1 ? "reporte" : "reportes"}`}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Categorias;
