import { Form, Row, Col, InputGroup } from "react-bootstrap";
import SelectOpciones from "./SelectOpciones";
import { CATEGORIAS, BARRIOS, ESTADOS } from "../../data/reportes";

// Panel de filtros del listado. No guarda nada: recibe los valores
// y las funciones para cambiarlos desde la página Reportes.
// Props:
//   - filtros: objeto { busqueda, categoria, barrio, estado }
//   - alCambiar: función que recibe (nombreDelFiltro, valorNuevo)

function FiltrosReportes({ filtros, alCambiar }) {
  // Los 3 selects se arman con map() a partir de esta lista
  const selects = [
    { nombre: "categoria", etiqueta: "Categoría", opciones: CATEGORIAS, vacio: "Todas" },
    { nombre: "barrio", etiqueta: "Barrio", opciones: BARRIOS, vacio: "Todos" },
    { nombre: "estado", etiqueta: "Estado", opciones: ESTADOS, vacio: "Todos" },
  ];

  return (
    <Form
      className="bg-light rounded-4 p-3 p-md-4 mb-3"
      aria-label="Filtrar reportes"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <Row className="g-3">
        <Form.Group as={Col} md={6} lg={3} controlId="filtro-busqueda">
          <Form.Label className="fw-bold small">Buscar</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search" aria-hidden="true"></i>
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Título o calle"
              value={filtros.busqueda}
              onChange={(evento) => alCambiar("busqueda", evento.target.value)}
            />
          </InputGroup>
        </Form.Group>

        {selects.map((select) => (
          <Form.Group key={select.nombre} as={Col} md={6} lg={3} controlId={`filtro-${select.nombre}`}>
            <Form.Label className="fw-bold small">{select.etiqueta}</Form.Label>
            <SelectOpciones
              nombre={select.nombre}
              opciones={select.opciones}
              textoVacio={select.vacio}
              valor={filtros[select.nombre]}
              alCambiar={(valor) => alCambiar(select.nombre, valor)}
            />
          </Form.Group>
        ))}
      </Row>
    </Form>
  );
}

export default FiltrosReportes;
