import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// Enlaces del menú: se dibujan con map()
const ENLACES = [
  { ruta: "/", texto: "Inicio", icono: "bi-house-door" },
  { ruta: "/reportes", texto: "Reportes", icono: "bi-pin-map" },
  { ruta: "/estadisticas", texto: "Estadísticas", icono: "bi-bar-chart-line" },
];

// Barra de navegación de todas las páginas.
// NavLink (de React Router) marca como activo el enlace de la página actual.
// collapseOnSelect: en celular el menú se cierra al tocar una opción.

function Encabezado() {
  return (
    <Navbar
      as="header"
      expand="lg"
      bg="primary"
      data-bs-theme="dark"
      sticky="top"
      collapseOnSelect
      className="border-bottom border-4 border-warning py-2"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-black fs-4">
          <img src="/img/logo.svg" alt="" width="36" height="36" />
          ReportaYa
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú" />

        <Navbar.Collapse id="menu-principal">
          <Nav as="nav" aria-label="Navegación principal" className="ms-auto align-items-lg-center gap-lg-2">
            {ENLACES.map((enlace) => (
              <Nav.Link
                key={enlace.ruta}
                as={NavLink}
                to={enlace.ruta}
                end={enlace.ruta === "/"}
                eventKey={enlace.ruta}
                className="d-flex align-items-center gap-2 fw-semibold"
              >
                <i className={`bi ${enlace.icono} text-warning`} aria-hidden="true"></i>
                {enlace.texto}
              </Nav.Link>
            ))}
            <Button as={Link} to="/nuevo-reporte" variant="acento" className="fw-bold mt-2 mt-lg-0 ms-lg-2">
              <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
              Nuevo reporte
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
