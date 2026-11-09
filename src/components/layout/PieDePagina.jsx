import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calle from "../comunes/Calle";

const ENLACES = [
  { ruta: "/reportes", texto: "Reportes" },
  { ruta: "/nuevo-reporte", texto: "Nuevo reporte" },
  { ruta: "/estadisticas", texto: "Estadísticas" },
];

// Pie de página de todas las páginas.
// Props:
//   - autora: nombre de quien desarrolló el proyecto

function PieDePagina({ autora }) {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white-50 mt-auto">
      <Calle />
      <Container className="py-5">
        <Row className="g-4 align-items-center">
          <Col md={6} className="d-flex gap-3 align-items-center">
            <img src="/img/logo.svg" alt="" width="36" height="36" />
            <div>
              <p className="text-white fw-black fs-5 mb-0">ReportaYa</p>
              <p className="mb-0">Reclamos del espacio público, a la vista de todos.</p>
            </div>
          </Col>
          <Col md={6}>
            <ul className="list-unstyled d-flex flex-wrap gap-4 justify-content-md-end mb-0">
              {ENLACES.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link to={enlace.ruta} className="link-light fw-semibold text-decoration-none">
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <p className="small border-top border-secondary pt-4 mt-4 mb-0">
          {anio}. Proyecto de Programación IV, desarrollado por {autora}.
        </p>
      </Container>
    </footer>
  );
}

export default PieDePagina;
