// Un paso de "Cómo funciona". Los pasos son una secuencia: por eso van numerados.
// Props:
//   - numero: número del paso
//   - icono: clase de Bootstrap Icons
//   - titulo: título del paso
//   - texto: descripción del paso

function PasoTarjeta({ numero, icono, titulo, texto }) {
  return (
    <div className="d-flex gap-3">
      <span
        className="flex-shrink-0 d-inline-flex align-items-center justify-content-center rounded-circle bg-acento text-white fw-black fs-4 border border-4 border-white shadow"
        style={{ width: "3.5rem", height: "3.5rem" }}
        aria-hidden="true"
      >
        {numero}
      </span>
      <div>
        <h3 className="h4 fw-bold text-primary">
          <i className={`bi ${icono} text-acento me-2`} aria-hidden="true"></i>
          {titulo}
        </h3>
        <p className="text-secondary mb-0">{texto}</p>
      </div>
    </div>
  );
}

export default PasoTarjeta;
