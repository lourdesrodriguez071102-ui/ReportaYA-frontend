import { Navbar, Nav, Container, Button } from "react-bootstrap";

// Enlaces del menú, cada uno con su ícono
const ENLACES = [
  { href: "#como-funciona", texto: "Cómo funciona", icono: "bi-signpost-2" },
  { href: "#categorias", texto: "Categorías", icono: "bi-grid-3x2-gap" },
  { href: "#reportes", texto: "Reportes", icono: "bi-pin-map" },
  { href: "#estadisticas", texto: "Estadísticas", icono: "bi-bar-chart-line" },
];

// Sección: encabezado con el Navbar de React Bootstrap.
// sticky="top": queda fijo arriba al hacer scroll.
// collapseOnSelect: en celular el menú se cierra al tocar una opción.

function Encabezado() {
  return (
    <Navbar as="header" expand="lg" variant="dark" sticky="top" collapseOnSelect className="barra">
      <Container>
        <Navbar.Brand href="#inicio" className="barra__marca">
          <img src="/img/logo.svg" alt="" width="36" height="36" />
          <span>ReportaYa</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú" />

        <Navbar.Collapse id="menu-principal">
          <Nav as="nav" aria-label="Navegación principal" className="ms-auto align-items-lg-center">
            {ENLACES.map((enlace) => (
              <Nav.Link key={enlace.href} href={enlace.href} className="barra__enlace">
                <i className={`bi ${enlace.icono}`} aria-hidden="true"></i>
                {enlace.texto}
              </Nav.Link>
            ))}
            <Button href="#nuevo-reporte" variant="acento" className="barra__boton">
              <i className="bi bi-plus-lg" aria-hidden="true"></i>
              Nuevo reporte
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
