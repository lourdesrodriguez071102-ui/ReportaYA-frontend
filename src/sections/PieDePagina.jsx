import { Container } from "react-bootstrap";

// Sección: pie de página.
// Props:
//   - autora: nombre de quien desarrolló el proyecto

function PieDePagina({ autora }) {
  const anio = new Date().getFullYear();

  return (
    <footer className="pie">
      <Container className="pie__contenido">
        <div className="pie__marca">
          <img src="/img/logo.svg" alt="" width="32" height="32" />
          <div>
            <p className="pie__nombre">ReportaYa</p>
            <p className="pie__texto">Reclamos del espacio público, a la vista de todos.</p>
          </div>
        </div>

        <ul className="pie__enlaces">
          <li><a href="#como-funciona">Cómo funciona</a></li>
          <li><a href="#reportes">Reportes</a></li>
          <li><a href="#nuevo-reporte">Nuevo reporte</a></li>
        </ul>

        <p className="pie__credito">
          {anio}. Proyecto de Programación IV, desarrollado por {autora}.
        </p>
      </Container>
    </footer>
  );
}

export default PieDePagina;
