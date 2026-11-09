import { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import EncabezadoPagina from "../components/comunes/EncabezadoPagina";
import SelectOpciones from "../components/reportes/SelectOpciones";
import TarjetaReporte from "../components/reportes/TarjetaReporte";
import { CATEGORIAS, BARRIOS, CALLES_MAPA } from "../data/reportes";
import { fechaDeHoy } from "../utils/formato";
import { leerGuardado, guardar, borrarGuardado } from "../utils/almacenamiento";

const FORMULARIO_VACIO = { titulo: "", categoria: "", barrio: "", direccion: "", descripcion: "" };
const CLAVE_BORRADOR = "reportaya-borrador";

// Campos de texto del formulario: se dibujan con map()
const CAMPOS_TEXTO = [
  { nombre: "titulo", etiqueta: "Título", ayuda: "Ej: Bache grande en la esquina", error: "Escribí un título de al menos 5 letras.", minimo: 5, maximo: 80 },
  { nombre: "direccion", etiqueta: "Dirección", ayuda: "Calle y número, o una esquina", error: "Indicá dónde está el problema.", minimo: 3, maximo: 80, icono: "bi-signpost-split" },
];

// Elige un lugar sobre alguna calle del mapa para el pin nuevo
// (x entre 200 y 600: deja libre la izquierda, donde están los carteles de calle)
function ubicarEnMapa() {
  const calle = CALLES_MAPA[Math.floor(Math.random() * CALLES_MAPA.length)];
  return { x: 200 + Math.round(Math.random() * 400), y: calle.y };
}

// Página para crear un reporte (ruta "/nuevo-reporte").
// Props:
//   - alCrear: función que recibe el reporte nuevo (viene desde App)

function NuevoReporte({ alCrear }) {
  const navigate = useNavigate();

  // ESTADO 1: lo que la persona escribe en el formulario.
  // Cambia con cada letra o cada opción elegida. Arranca con el borrador
  // guardado (si quedó uno de antes) o vacío.
  const [datos, setDatos] = useState(() => leerGuardado(CLAVE_BORRADOR, FORMULARIO_VACIO));

  // ESTADO 2: si hay que mostrar los errores de validación.
  // Pasa a true cuando se intenta publicar con campos incompletos.
  const [validado, setValidado] = useState(false);

  // ¿Escribió algo? (alcanza con que un campo tenga contenido)
  const hayBorrador = Object.values(datos).some((valor) => valor !== "");

  // EFECTO: guarda el borrador cada vez que cambian los datos.
  // Dependencia [datos, hayBorrador]: se ejecuta solo cuando el formulario cambia,
  // no en cada dibujado. Si la persona sale de la página, no pierde lo escrito.
  useEffect(() => {
    if (hayBorrador) {
      guardar(CLAVE_BORRADOR, datos);
    } else {
      borrarGuardado(CLAVE_BORRADOR);
    }
  }, [datos, hayBorrador]);

  function actualizarCampo(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    // checkValidity() revisa required, minLength y maxLength
    if (!evento.currentTarget.checkValidity()) {
      setValidado(true);
      return;
    }

    const nuevo = {
      ...datos,
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      direccion: datos.direccion.trim(),
      id: Date.now(),
      estado: "pendiente",
      apoyos: 0,
      fecha: fechaDeHoy(),
      ...ubicarEnMapa(),
    };

    alCrear(nuevo);
    borrarGuardado(CLAVE_BORRADOR); // ya se publicó: el borrador no hace falta

    // Lleva a la página del reporte nuevo y le avisa que recién se creó
    navigate(`/reportes/${nuevo.id}`, { state: { nuevo: true } });
  }

  // Vista previa: si un campo está vacío, muestra un texto de ejemplo
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
    <>
      <Seo
        titulo="Nuevo reporte"
        descripcion="Reportá un bache, una luminaria rota, un basural o una pérdida de agua en tu barrio en menos de dos minutos."
        ruta="/nuevo-reporte"
      />

      <EncabezadoPagina
        titulo="Nuevo reporte"
        bajada="Completá los datos. A la derecha ves cómo va a quedar publicado."
      />

      <Container className="py-5">
        <Row className="g-4 g-lg-5">
          <Col lg={7}>
            {/* noValidate: usamos los mensajes de Bootstrap en lugar de los del navegador */}
            <Form noValidate validated={validado} onSubmit={manejarEnvio} className="bg-light rounded-4 p-3 p-md-4">
              <Row className="g-3">
                {CAMPOS_TEXTO.map((campo) => (
                  <Form.Group key={campo.nombre} as={Col} xs={12} controlId={campo.nombre}>
                    <Form.Label className="fw-bold small">{campo.etiqueta}</Form.Label>
                    <InputGroup hasValidation>
                      {campo.icono && (
                        <InputGroup.Text>
                          <i className={`bi ${campo.icono}`} aria-hidden="true"></i>
                        </InputGroup.Text>
                      )}
                      <Form.Control
                        name={campo.nombre}
                        placeholder={campo.ayuda}
                        minLength={campo.minimo}
                        maxLength={campo.maximo}
                        required
                        value={datos[campo.nombre]}
                        onChange={(evento) => actualizarCampo(campo.nombre, evento.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">{campo.error}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                ))}

                <Form.Group as={Col} md={6} controlId="categoria">
                  <Form.Label className="fw-bold small">Categoría</Form.Label>
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
                  <Form.Label className="fw-bold small">Barrio</Form.Label>
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

                <Form.Group as={Col} xs={12} controlId="descripcion">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="fw-bold small">Descripción</Form.Label>
                    <span className="small text-secondary">{datos.descripcion.length}/300</span>
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

                {/* Aviso del borrador: aparece solo si hay algo escrito */}
                {hayBorrador && (
                  <Col xs={12} className="d-flex flex-wrap justify-content-between align-items-center gap-2 small">
                    <span className="text-success fw-semibold">
                      <i className="bi bi-cloud-check me-1" aria-hidden="true"></i>
                      Borrador guardado en este navegador
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-secondary p-0"
                      onClick={() => {
                        setDatos(FORMULARIO_VACIO);
                        setValidado(false);
                      }}
                    >
                      Descartar borrador
                    </Button>
                  </Col>
                )}

                <Col xs={12}>
                  <Button type="submit" variant="acento" size="lg" className="w-100 fw-bold">
                    <i className="bi bi-send me-2" aria-hidden="true"></i>
                    Publicar reporte
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Vista previa: el mismo componente del listado, con los datos del formulario */}
          <Col lg={5}>
            <div className="sticky-lg-top" style={{ top: "6rem" }}>
              <p className="fw-bold text-secondary mb-2">Vista previa</p>
              <TarjetaReporte reporte={vistaPrevia} esVistaPrevia />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NuevoReporte;
