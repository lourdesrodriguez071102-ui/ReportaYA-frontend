import { Container } from "react-bootstrap";
import TituloSeccion from "../components/TituloSeccion";

// Sección: los 3 pasos, dibujados como paradas sobre una calle.
// Props:
//   - pasos: lista de pasos (viene desde App)

function ComoFunciona({ pasos }) {
  return (
    <section id="como-funciona" className="seccion" aria-labelledby="titulo-como-funciona">
      <Container>
        <TituloSeccion
          id="titulo-como-funciona"
          titulo="Cómo funciona"
          bajada="Del aviso a la solución, en tres paradas."
        />

        <ol className="pasos">
          {pasos.map((paso) => (
            <li key={paso.numero} className="paso">
              <span className="paso__parada" aria-hidden="true">{paso.numero}</span>
              <div className="paso__contenido">
                <h3 className="paso__titulo">
                  <i className={`bi ${paso.icono}`} aria-hidden="true"></i>
                  {paso.titulo}
                </h3>
                <p className="paso__texto">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default ComoFunciona;
