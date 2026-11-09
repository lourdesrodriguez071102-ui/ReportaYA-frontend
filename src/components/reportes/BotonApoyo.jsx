import { Button } from "react-bootstrap";

// Botón "Me pasa también": un vecino indica que el problema también lo afecta.
// Así se suman apoyos en lugar de cargar reportes repetidos.
// Props:
//   - cantidad: cuántos apoyos tiene el reporte
//   - yaApoyado: true si este vecino ya lo apoyó
//   - alApoyar: función que se ejecuta al tocar el botón
//   - tamano: "sm" para la versión chica (opcional)

function BotonApoyo({ cantidad = 0, yaApoyado, alApoyar, tamano }) {
  return (
    <Button
      variant={yaApoyado ? "primary" : "outline-primary"}
      size={tamano}
      // position-relative z-2: queda por encima del enlace que cubre la tarjeta
      className="position-relative z-2 align-self-start fw-bold d-inline-flex align-items-center gap-2"
      onClick={alApoyar}
      disabled={yaApoyado}
      aria-pressed={yaApoyado}
    >
      <i className={`bi ${yaApoyado ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`} aria-hidden="true"></i>
      {yaApoyado ? "Lo apoyaste" : "Me pasa también"}
      <span className="badge text-bg-light">{cantidad}</span>
    </Button>
  );
}

export default BotonApoyo;
