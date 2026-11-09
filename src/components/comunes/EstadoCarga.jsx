import { Spinner, Button } from "react-bootstrap";

// Muestra el estado de la petición a la API:
// - mientras carga: un spinner
// - si hubo un error: el mensaje y un botón para reintentar
// - si salió bien: el contenido (children)
// Props:
//   - cargando: true mientras se esperan los datos
//   - error: mensaje de error ("" si no hubo)
//   - alReintentar: función que vuelve a pedir los datos
//   - children: lo que se muestra cuando los datos ya llegaron

function EstadoCarga({ cargando, error, alReintentar, children }) {
  if (cargando) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 text-secondary" role="status">
        <Spinner animation="border" variant="primary" />
        <span className="fw-semibold">Cargando reportes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center border border-2 border-danger-subtle rounded-4 py-5 px-3" role="alert">
        <i className="bi bi-wifi-off display-5 text-danger" aria-hidden="true"></i>
        <p className="fw-bold mt-3 mb-1">No pudimos cargar los reportes.</p>
        <p className="text-secondary">{error}</p>
        <Button variant="acento" onClick={alReintentar}>
          <i className="bi bi-arrow-clockwise me-1" aria-hidden="true"></i>
          Reintentar
        </Button>
      </div>
    );
  }

  return children;
}

export default EstadoCarga;
