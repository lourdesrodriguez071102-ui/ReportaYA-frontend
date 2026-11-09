// Componente reutilizable: título (h2) y bajada de una sección.
// Props:
//   - id: id del h2 (la sección lo usa en aria-labelledby)
//   - titulo: texto del h2
//   - bajada: texto que explica la sección (opcional)
//   - claro: true si va sobre un fondo oscuro

function TituloSeccion({ id, titulo, bajada, claro = false }) {
  return (
    <div className="mb-4">
      <h2 id={id} className={`display-6 fw-black mb-1 ${claro ? "text-white" : "text-primary"}`}>{titulo}</h2>
      {bajada && <p className={`fs-5 mb-0 ${claro ? "text-white-50" : "text-secondary"}`}>{bajada}</p>}
    </div>
  );
}

export default TituloSeccion;
