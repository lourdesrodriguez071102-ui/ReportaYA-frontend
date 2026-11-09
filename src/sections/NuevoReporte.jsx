import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button, Alert } from "react-bootstrap";
import TituloSeccion from "../components/TituloSeccion";
import SelectOpciones from "../components/SelectOpciones";
import TarjetaReporte from "../components/TarjetaReporte";
import { CATEGORIAS, BARRIOS, CALLES_MAPA } from "../data/reportes";

// Valores iniciales del formulario (vacío)
const FORMULARIO_VACIO = {
  titulo: "",
  categoria: "",
  barrio: "",
  direccion: "",
  descripcion: "",
};

// Fecha de hoy en formato "AAAA-MM-DD" (hora local)
function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Elige un lugar sobre alguna calle del mapa ilustrado para el pin nuevo
function ubicarEnMapa() {
  const calle = CALLES_MAPA[Math.floor(Math.random() * CALLES_MAPA.length)];
  // x entre 60 y 480: deja libre la zona derecha, donde están los carteles de las calles
  return { x: 60 + Math.round(Math.random() * 420), y: calle.y };
}

// Sección: formulario para crear un reporte, con vista previa en vivo.
// Props:
//   - alCrear: función que recibe el reporte nuevo (viene desde App)

function NuevoReporte({ alCrear }) {
  const [datos, setDatos] = useState(FORMULARIO_VACIO);
  const [validado, setValidado] = useState(false);   // muestra los errores de Bootstrap
  const [enviado, setEnviado] = useState(false);     // muestra el mensaje de éxito

  // Una sola función para todos los campos: usa el "name" del campo
  function actualizarCampo(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
    setEnviado(false);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;

    // checkValidity() revisa los "required" y "minLength" del formulario
    if (!formulario.checkValidity()) {
      setValidado(true);
      return;
    }

    alCrear({
      ...datos,
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      direccion: datos.direccion.trim(),
      id: Date.now(),
      estado: "pendiente",
      fecha: fechaDeHoy(),
      ...ubicarEnMapa(),
    });

    setDatos(FORMULARIO_VACIO);
    setValidado(false);
    setEnviado(true);
  }

  // Lo que muestra la vista previa: si un campo está vacío, usa un texto de ejemplo
  const vistaPrevia = {
    titulo: datos.titulo || "Título de tu reporte",
    descripcion: datos.descripcion || "Acá va a aparecer lo que escribas en la descripción.",
    categoria: datos.categoria || "otro",
    barrio: datos.barrio,
    direccion: datos.direccion || "Calle y número",
    estado: "pendiente",
    fecha: fechaDeHoy(),
  };

  return (
    <section id="nuevo-reporte" className="seccion seccion--tiza" aria-labelledby="titulo-nuevo-reporte">
      <Container>
        <TituloSeccion
          id="titulo-nuevo-reporte"
          titulo="Nuevo reporte"
          bajada="Completá los datos. A la derecha ves cómo va a quedar publicado."
        />

        <Row className="g-4 g-lg-5">
          <Col lg={7}>
            {enviado && (
              <Alert variant="success" className="aviso" onClose={() => setEnviado(false)} dismissible>
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                Reporte publicado. Ya aparece en el mapa y en el listado.{" "}
                <Alert.Link href="#inicio">Ver en el mapa</Alert.Link>
              </Alert>
            )}

            {/* noValidate: usamos los mensajes de Bootstrap en lugar de los del navegador */}
            <Form noValidate validated={validado} onSubmit={manejarEnvio} className="formulario">
              <Row className="g-3">
                <Form.Group as={Col} xs={12} controlId="titulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    name="titulo"
                    placeholder="Ej: Bache grande en la esquina"
                    minLength={5}
                    maxLength={80}
                    required
                    value={datos.titulo}
                    onChange={(evento) => actualizarCampo("titulo", evento.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">Escribí un título de al menos 5 letras.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="categoria">
                  <Form.Label>Categoría</Form.Label>
                  <SelectOpciones
                    nombre="categoria"
                    opciones={CATEGORIAS}
                    textoVacio="Elegí una categoría"
                    valor={datos.categoria}
                    alCambiar={(valor) => actualizarCampo("categoria", valor)}
                    requerido
                  />
                  <Form.Control.Feedback type="invalid">Elegí una categoría.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="barrio">
                  <Form.Label>Barrio</Form.Label>
                  <SelectOpciones
                    nombre="barrio"
                    opciones={BARRIOS}
                    textoVacio="Elegí un barrio"
                    valor={datos.barrio}
                    alCambiar={(valor) => actualizarCampo("barrio", valor)}
                    requerido
                  />
                  <Form.Control.Feedback type="invalid">Elegí un barrio.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} controlId="direccion">
                  <Form.Label>Dirección</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <i className="bi bi-signpost-split" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="direccion"
                      placeholder="Calle y número, o una esquina"
                      required
                      value={datos.direccion}
                      onChange={(evento) => actualizarCampo("direccion", evento.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Indicá dónde está el problema.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} xs={12} controlId="descripcion">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Descripción</Form.Label>
                    <span className="contador">{datos.descripcion.length}/300</span>
                  </div>
                  <Form.Control
                    as="textarea"
                    name="descripcion"
                    rows={4}
                    placeholder="Qué pasa y desde cuándo"
                    minLength={10}
                    maxLength={300}
                    required
                    value={datos.descripcion}
                    onChange={(evento) => actualizarCampo("descripcion", evento.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">Contá el problema en al menos 10 letras.</Form.Control.Feedback>
                </Form.Group>

                <Col xs={12}>
                  <Button type="submit" variant="acento" size="lg" className="w-100">
                    <i className="bi bi-send" aria-hidden="true"></i>
                    Publicar reporte
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Vista previa: el mismo componente del listado, con los datos del formulario */}
          <Col lg={5}>
            <div className="vista-previa">
              <p className="vista-previa__titulo">Vista previa</p>
              <TarjetaReporte reporte={vistaPrevia} esVistaPrevia />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default NuevoReporte;
