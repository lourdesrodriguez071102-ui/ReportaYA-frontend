import { Container, Row, Col } from "react-bootstrap";
import TituloSeccion from "../components/TituloSeccion";
import ContadorAnimado from "../components/ContadorAnimado";
import useEnPantalla from "../hooks/useEnPantalla";
import { CATEGORIAS, ESTADOS } from "../data/reportes";

// Sección: estadísticas calculadas a partir de los reportes.
// Las barras crecen cuando la sección aparece en pantalla.
// Props:
//   - reportes: lista de reportes (viene desde App)

function Estadisticas({ reportes }) {
  const { ref, visible } = useEnPantalla();
  const total = reportes.length;

  function contarPor(propiedad, valor) {
    return reportes.filter((reporte) => reporte[propiedad] === valor).length;
  }

  // Porcentaje sobre el total (sin dividir por cero)
  function porcentaje(cantidad) {
    return total === 0 ? 0 : Math.round((cantidad / total) * 100);
  }

  const porCategoria = Object.entries(CATEGORIAS).map(([clave, categoria]) => ({
    clave,
    ...categoria,
    cantidad: contarPor("categoria", clave),
  }));
  const maximo = Math.max(1, ...porCategoria.map((categoria) => categoria.cantidad));

  return (
    <section
      id="estadisticas"
      ref={ref}
      className={`seccion seccion--asfalto ${visible ? "estadisticas--visible" : ""}`}
      aria-labelledby="titulo-estadisticas"
    >
      <Container>
        <TituloSeccion
          id="titulo-estadisticas"
          titulo="Estadísticas"
          bajada="Cuántos reclamos hay y cuántos ya se resolvieron."
          claro
        />

        <Row className="g-4 g-lg-5">
          {/* Total y distribución por estado */}
          <Col lg={6}>
            <p className="total">
              <span className="total__numero"><ContadorAnimado valor={total} /></span>
              <span className="total__texto">reportes en total</span>
            </p>

            <div className="barra-estados" role="img" aria-label="Distribución de los reportes por estado">
              {Object.entries(ESTADOS).map(([clave, estado]) => (
                <span
                  key={clave}
                  className={`barra-estados__tramo barra-estados__tramo--${estado.color}`}
                  style={{ "--ancho": `${porcentaje(contarPor("estado", clave))}%` }}
                ></span>
              ))}
            </div>

            <ul className="estados-lista">
              {Object.entries(ESTADOS).map(([clave, estado]) => {
                const cantidad = contarPor("estado", clave);
                return (
                  <li key={clave} className={`estados-lista__item estados-lista__item--${estado.color}`}>
                    <span>{estado.nombre}</span>
                    <strong>{cantidad}</strong>
                    <span className="estados-lista__porcentaje">{porcentaje(cantidad)}%</span>
                  </li>
                );
              })}
            </ul>
          </Col>

          {/* Cantidad por categoría, con barras proporcionales */}
          <Col lg={6}>
            <h3 className="estadisticas__subtitulo">Por categoría</h3>
            <ul className="categorias-lista">
              {porCategoria.map((categoria) => (
                <li key={categoria.clave} className="categorias-lista__item">
                  <span className="categorias-lista__nombre">
                    <i className={`bi ${categoria.icono}`} aria-hidden="true"></i>
                    {categoria.nombre}
                  </span>
                  <span className="categorias-lista__barra" aria-hidden="true">
                    <span style={{ "--ancho": `${(categoria.cantidad / maximo) * 100}%` }}></span>
                  </span>
                  <strong className="categorias-lista__cantidad">{categoria.cantidad}</strong>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Estadisticas;
