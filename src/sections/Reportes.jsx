import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import TituloSeccion from "../components/TituloSeccion";
import SelectOpciones from "../components/SelectOpciones";
import TarjetaReporte from "../components/TarjetaReporte";
import { CATEGORIAS, BARRIOS, ESTADOS } from "../data/reportes";

// Quita tildes y pasa a minúsculas: así "lujan" encuentra "Luján"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Sección: listado de reportes con filtros.
// Props:
//   - reportes: lista completa de reportes (viene desde App)
//   - categoria: categoría elegida (la comparte con la sección Categorías)
//   - alCambiarCategoria: función para cambiar esa categoría

function Reportes({ reportes, categoria, alCambiarCategoria }) {
  // Estado de los otros filtros: solo los usa esta sección
  const [busqueda, setBusqueda] = useState("");
  const [barrio, setBarrio] = useState("");
  const [estado, setEstado] = useState("");

  const texto = normalizar(busqueda.trim());

  // Se queda con los reportes que cumplen TODOS los filtros
  const filtrados = reportes.filter((reporte) => {
    const coincideTexto = texto === "" ||
      normalizar(reporte.titulo).includes(texto) ||
      normalizar(reporte.direccion).includes(texto);

    return coincideTexto &&
      (categoria === "" || reporte.categoria === categoria) &&
      (barrio === "" || reporte.barrio === barrio) &&
      (estado === "" || reporte.estado === estado);
  });

  function limpiarFiltros() {
    setBusqueda("");
    setBarrio("");
    setEstado("");
    alCambiarCategoria("");
  }

  const hayFiltros = busqueda !== "" || categoria !== "" || barrio !== "" || estado !== "";

  return (
    <section id="reportes" className="seccion" aria-labelledby="titulo-reportes">
      <Container>
        <TituloSeccion
          id="titulo-reportes"
          titulo="Reportes de la comunidad"
          bajada="Buscá por calle o filtrá por categoría, barrio y estado."
        />

        <Form className="filtros" aria-label="Filtrar reportes" onSubmit={(evento) => evento.preventDefault()}>
          <Row className="g-3">
            <Form.Group as={Col} md={6} lg={3} controlId="filtro-busqueda">
              <Form.Label>Buscar</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Título o calle"
                  value={busqueda}
                  onChange={(evento) => setBusqueda(evento.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={3} controlId="filtro-categoria">
              <Form.Label>Categoría</Form.Label>
              <SelectOpciones nombre="filtro-categoria" opciones={CATEGORIAS} textoVacio="Todas" valor={categoria} alCambiar={alCambiarCategoria} />
            </Form.Group>

            <Form.Group as={Col} md={6} lg={3} controlId="filtro-barrio">
              <Form.Label>Barrio</Form.Label>
              <SelectOpciones nombre="filtro-barrio" opciones={BARRIOS} textoVacio="Todos" valor={barrio} alCambiar={setBarrio} />
            </Form.Group>

            <Form.Group as={Col} md={6} lg={3} controlId="filtro-estado">
              <Form.Label>Estado</Form.Label>
              <SelectOpciones nombre="filtro-estado" opciones={ESTADOS} textoVacio="Todos" valor={estado} alCambiar={setEstado} />
            </Form.Group>
          </Row>
        </Form>

        <div className="resultados" aria-live="polite">
          <p className="resultados__cantidad">
            {filtrados.length} de {reportes.length} reportes
          </p>
          {hayFiltros && (
            <Button variant="link" className="resultados__limpiar" onClick={limpiarFiltros}>
              <i className="bi bi-x-lg" aria-hidden="true"></i>
              Limpiar filtros
            </Button>
          )}
        </div>

        {filtrados.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filtrados.map((reporte) => (
              <Col key={reporte.id}>
                <TarjetaReporte reporte={reporte} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="vacio">
            <i className="bi bi-pin-map" aria-hidden="true"></i>
            <p>Ningún reporte coincide con estos filtros.</p>
            <Button variant="outline-marca" onClick={limpiarFiltros}>Limpiar filtros</Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Reportes;
