import { Container, Row, Col, Button } from "react-bootstrap";
import MapaBarrio from "../components/MapaBarrio";
import { ESTADOS } from "../data/reportes";

// Sección: portada. Lo principal es el mapa del barrio con los reportes.
// Props:
//   - reportes: lista de reportes (se dibujan como pines)

function Hero({ reportes }) {
  return (
    <section id="inicio" className="hero" aria-labelledby="titulo-principal">
      <Container>
        <Row className="align-items-center g-4 g-lg-5">
          <Col lg={5}>
            {/* SEO: un solo h1 por página */}
            <h1 id="titulo-principal" className="hero__titulo">
              Si está roto en tu cuadra, reportalo.
            </h1>
            <p className="hero__texto">
              ReportaYa junta los reclamos de baches, luminarias, basurales y
              pérdidas de agua en un solo mapa, y te muestra en qué estado
              está cada uno.
            </p>
            <div className="hero__acciones">
              <Button href="#nuevo-reporte" variant="acento" size="lg">
                <i className="bi bi-plus-lg" aria-hidden="true"></i>
                Crear un reporte
              </Button>
              <Button href="#reportes" variant="outline-marca" size="lg">
                Ver los reportes
              </Button>
            </div>
          </Col>

          <Col lg={7}>
            <figure className="hero__mapa">
              <MapaBarrio reportes={reportes} />

              {/* Referencias: qué significa cada color de pin */}
              <figcaption className="leyenda">
                {Object.entries(ESTADOS).map(([clave, estado]) => (
                  <span key={clave} className={`leyenda__item leyenda__item--${estado.color}`}>
                    {estado.nombre}
                    <strong>{reportes.filter((reporte) => reporte.estado === clave).length}</strong>
                  </span>
                ))}
              </figcaption>
            </figure>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
