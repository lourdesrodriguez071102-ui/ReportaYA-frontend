import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import EncabezadoPagina from "../components/comunes/EncabezadoPagina";
import FiltrosReportes from "../components/reportes/FiltrosReportes";
import TarjetaReporte from "../components/reportes/TarjetaReporte";
import { normalizar } from "../utils/formato";

// Página del listado (ruta "/reportes").
// La categoría se guarda en la dirección (?categoria=bache): así se puede
// llegar al listado ya filtrado desde el inicio, o compartir el enlace.
// Props:
//   - reportes: lista completa de reportes (viene desde App)
//   - apoyados, alApoyar: para el botón "Me pasa también" de las tarjetas

// Formas de ordenar el listado: se usan en el select y en la función de orden
const ORDENES = {
  recientes: { texto: "Más recientes", comparar: (a, b) => b.fecha.localeCompare(a.fecha) },
  antiguos: { texto: "Más antiguos", comparar: (a, b) => a.fecha.localeCompare(b.fecha) },
  apoyos: { texto: "Más apoyados", comparar: (a, b) => (b.apoyos ?? 0) - (a.apoyos ?? 0) },
};

function Reportes({ reportes, apoyados, alApoyar }) {
  const [parametros, setParametros] = useSearchParams();

  // ESTADOS de los filtros: cambian cada vez que la persona escribe o elige una opción
  const [busqueda, setBusqueda] = useState("");
  const [barrio, setBarrio] = useState("");
  const [estado, setEstado] = useState("");

  // ESTADO del orden del listado: cambia al elegir otra opción en "Ordenar por"
  const [orden, setOrden] = useState("recientes");

  const categoria = parametros.get("categoria") || "";
  const filtros = { busqueda, categoria, barrio, estado };

  // Recibe el nombre del filtro y su valor nuevo
  function cambiarFiltro(nombre, valor) {
    if (nombre === "busqueda") setBusqueda(valor);
    if (nombre === "barrio") setBarrio(valor);
    if (nombre === "estado") setEstado(valor);
    if (nombre === "categoria") setParametros(valor ? { categoria: valor } : {});
  }

  function limpiarFiltros() {
    setBusqueda("");
    setBarrio("");
    setEstado("");
    setParametros({});
  }

  const texto = normalizar(busqueda.trim());

  // filter() se queda con los reportes que cumplen TODOS los filtros
  const filtrados = reportes.filter((reporte) => {
    const coincideTexto = texto === "" ||
      normalizar(reporte.titulo).includes(texto) ||
      normalizar(reporte.direccion).includes(texto);

    return coincideTexto &&
      (categoria === "" || reporte.categoria === categoria) &&
      (barrio === "" || reporte.barrio === barrio) &&
      (estado === "" || reporte.estado === estado);
  });

  // sort() modifica la lista original: por eso ordenamos una copia ([...])
  const ordenados = [...filtrados].sort(ORDENES[orden].comparar);

  const hayFiltros = busqueda !== "" || categoria !== "" || barrio !== "" || estado !== "";

  return (
    <>
      <Seo
        titulo="Reportes"
        descripcion="Listado de reclamos de baches, luminarias, basurales y pérdidas de agua, con filtros por categoría, barrio y estado."
        ruta="/reportes"
      />

      <EncabezadoPagina
        titulo="Reportes de la comunidad"
        bajada="Buscá por calle o filtrá por categoría, barrio y estado."
      />

      <Container as="section" className="py-5" aria-label="Listado de reportes">
        <FiltrosReportes filtros={filtros} alCambiar={cambiarFiltro} />

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div className="d-flex align-items-center gap-2" aria-live="polite">
            <p className="fw-bold text-secondary mb-0">
              {filtrados.length} de {reportes.length} reportes
            </p>
            {hayFiltros && (
              <Button variant="link" className="fw-bold text-acento text-decoration-none" onClick={limpiarFiltros}>
                <i className="bi bi-x-lg me-1" aria-hidden="true"></i>
                Limpiar filtros
              </Button>
            )}
          </div>

          <Form.Group controlId="orden" className="d-flex align-items-center gap-2">
            <Form.Label className="small fw-bold text-nowrap mb-0">Ordenar por</Form.Label>
            <Form.Select size="sm" value={orden} onChange={(evento) => setOrden(evento.target.value)}>
              {Object.entries(ORDENES).map(([clave, opcion]) => (
                <option key={clave} value={clave}>{opcion.texto}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        {filtrados.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {ordenados.map((reporte) => (
              <Col key={reporte.id}>
                <TarjetaReporte reporte={reporte} apoyados={apoyados} alApoyar={alApoyar} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center border border-2 rounded-4 py-5 px-3">
            <i className="bi bi-pin-map display-5 text-secondary" aria-hidden="true"></i>
            <p className="fw-semibold mt-3">Ningún reporte coincide con estos filtros.</p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <Button variant="outline-primary" onClick={limpiarFiltros}>Limpiar filtros</Button>
              <Button as={Link} to="/nuevo-reporte" variant="acento">Crear un reporte</Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default Reportes;
