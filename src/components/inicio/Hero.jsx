import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MapaBarrio from "../mapa/MapaBarrio";
import { ESTADOS } from "../../data/reportes";

// Portada del inicio: título principal y mapa del barrio con los reportes.
// Props:
//   - reportes: lista de reportes (se dibujan como pines)

function Hero({ reportes }) {
  return (
    <section className="fondo-plano py-5 border-bottom" aria-labelledby="titulo-principal">
      <Container className="py-lg-4">
        <Row className="align-items-center g-4 g-lg-5">
          <Col lg={5}>
            {/* SEO: el único h1 de la página de inicio */}
            <h1 id="titulo-principal" className="display-3 fw-black text-primary lh-1 mb-4">
              Si está roto en tu cuadra, reportalo.
            </h1>
            <p className="fs-5 text-secondary mb-4">
              ReportaYa junta los reclamos de baches, luminarias, basurales y
              pérdidas de agua en un solo mapa, y te muestra en qué estado está cada uno.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/nuevo-reporte" variant="acento" size="lg" className="fw-bold">
                <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                Crear un reporte
              </Button>
              <Button as={Link} to="/reportes" variant="outline-primary" size="lg" className="fw-bold">
                Ver los reportes
              </Button>
            </div>
          </Col>

          <Col lg={7}>
            <figure className="mb-0">
              <MapaBarrio reportes={reportes} />

              {/* Referencias: qué significa cada color de pin */}
              <figcaption className="d-flex flex-wrap gap-3 mt-3 small fw-semibold text-secondary">
                {Object.entries(ESTADOS).map(([clave, estado]) => (
                  <span key={clave} className="d-inline-flex align-items-center gap-1">
                    <i className={`bi bi-geo-alt-fill text-${estado.variante}`} aria-hidden="true"></i>
                    {estado.nombre}
                    <strong className="text-body">
                      {reportes.filter((reporte) => reporte.estado === clave).length}
                    </strong>
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
