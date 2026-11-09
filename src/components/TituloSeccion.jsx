// Componente reutilizable: título y bajada de cada sección.
// Props:
//   - id: id del título (lo usa la sección con aria-labelledby)
//   - titulo: texto principal (h2)
//   - bajada: texto que explica la sección (opcional)
//   - claro: true si va sobre fondo oscuro

function TituloSeccion({ id, titulo, bajada, claro = false }) {
  return (
    <header className={`titulo-seccion ${claro ? "titulo-seccion--claro" : ""}`}>
      <h2 id={id} className="titulo-seccion__titulo">{titulo}</h2>
      {bajada && <p className="titulo-seccion__bajada">{bajada}</p>}
    </header>
  );
}

export default TituloSeccion;
