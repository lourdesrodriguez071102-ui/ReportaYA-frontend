import { useEffect, useState } from "react";
import { Card, Button, ButtonGroup, Alert } from "react-bootstrap";
import { ESTADOS } from "../../data/reportes";

// Panel para que el municipio actualice el estado de un reporte.
// (Por ahora es una simulación: en una versión con usuarios lo vería
// solo el personal del municipio.)
// Props:
//   - estado: estado actual del reporte
//   - alCambiar: función que recibe el estado nuevo

function PanelMunicipio({ estado, alCambiar }) {
  // ESTADO: el mensaje de confirmación que se muestra después de un cambio
  const [mensaje, setMensaje] = useState("");

  // EFECTO: cuando aparece un mensaje, se borra solo a los 3 segundos.
  // Dependencia [mensaje]: se vuelve a programar cada vez que el mensaje cambia.
  // La función de limpieza cancela el temporizador anterior si el mensaje
  // cambia antes de tiempo o si se sale de la página.
  useEffect(() => {
    if (mensaje === "") return;

    const temporizador = setTimeout(() => setMensaje(""), 3000);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  function elegir(clave) {
    if (clave === estado) return;
    alCambiar(clave);
    setMensaje(`Estado actualizado a "${ESTADOS[clave].nombre}".`);
  }

  return (
    <Card className="border-2 border-primary-subtle bg-primary-subtle">
      <Card.Body>
        <Card.Title as="h2" className="h6 fw-bold text-primary d-flex align-items-center gap-2">
          <i className="bi bi-building" aria-hidden="true"></i>
          Panel del municipio
        </Card.Title>
        <Card.Text className="small text-secondary">
          Simulación del área que atiende los reclamos: cambiá el estado del reporte.
        </Card.Text>

        <ButtonGroup className="w-100" aria-label="Cambiar estado del reporte">
          {Object.entries(ESTADOS).map(([clave, datos]) => (
            <Button
              key={clave}
              variant={clave === estado ? datos.variante : "light"}
              className="fw-semibold"
              onClick={() => elegir(clave)}
              aria-pressed={clave === estado}
            >
              {datos.nombre}
            </Button>
          ))}
        </ButtonGroup>

        {mensaje && (
          <Alert variant="success" className="small py-2 mt-3 mb-0" role="status">
            <i className="bi bi-check-circle-fill me-1" aria-hidden="true"></i>
            {mensaje}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default PanelMunicipio;
