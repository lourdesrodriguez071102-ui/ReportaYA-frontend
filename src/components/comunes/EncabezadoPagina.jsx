import { Container } from "react-bootstrap";
import Calle from "./Calle";

// Componente reutilizable: encabezado de cada página interna, con su h1.
// SEO: cada página tiene un solo h1 que describe su contenido.
// Props:
//   - titulo: texto del h1
//   - bajada: texto que explica la página
//   - children: contenido extra opcional (por ejemplo, botones)

function EncabezadoPagina({ titulo, bajada, children }) {
  return (
    <>
      <header className="bg-primary text-white py-5">
        <Container>
          <h1 className="display-5 fw-black text-white mb-2">{titulo}</h1>
          {bajada && <p className="lead text-white-50 mb-0">{bajada}</p>}
          {children && <div className="d-flex flex-wrap gap-2 mt-4">{children}</div>}
        </Container>
      </header>
      <Calle />
    </>
  );
}

export default EncabezadoPagina;
