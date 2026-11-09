import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import Ilustracion from "../components/reportes/Ilustracion";

// Página para direcciones que no existen (ruta "*").
// También la usa el detalle cuando no encuentra el reporte.
// Props:
//   - mensaje: texto que explica qué pasó (opcional)

function NoEncontrada({ mensaje = "La página que buscás no existe o cambió de dirección." }) {
  return (
    <>
      <Seo titulo="Página no encontrada" descripcion={mensaje} ruta="/404" />

      <Container className="py-5">
        <Row className="align-items-center g-4 py-lg-5">
          <Col md={6}>
            <p className="display-1 fw-black text-acento mb-0">404</p>
            <h1 className="display-6 fw-black text-primary">Esta calle no existe</h1>
            <p className="fs-5 text-secondary">{mensaje}</p>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/" variant="primary">Ir al inicio</Button>
              <Button as={Link} to="/reportes" variant="outline-primary">Ver los reportes</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow">
              <Ilustracion tipo="otro" className="w-100 h-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NoEncontrada;
