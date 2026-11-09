import { Container, Row, Col, ProgressBar, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import EncabezadoPagina from "../components/comunes/EncabezadoPagina";
import ContadorAnimado from "../components/comunes/ContadorAnimado";
import EstadoCarga from "../components/comunes/EstadoCarga";
import useEnPantalla from "../hooks/useEnPantalla";
import { CATEGORIAS, ESTADOS } from "../data/reportes";

// Página de estadísticas (ruta "/estadisticas").
// Todos los números se calculan a partir de la lista de reportes.
// Props:
//   - reportes: lista de reportes (viene desde App)
//   - cargando, error, alReintentar: estado de la petición a la API

function Estadisticas({ reportes, cargando, error, alReintentar }) {
  // Las barras arrancan en 0 y crecen cuando aparecen en pantalla
  const { ref, visible } = useEnPantalla();
  const total = reportes.length;

  function contarPor(propiedad, valor) {
    return reportes.filter((reporte) => reporte[propiedad] === valor).length;
  }

  function porcentaje(cantidad) {
    return total === 0 ? 0 : Math.round((cantidad / total) * 100);
  }

  const porEstado = Object.entries(ESTADOS).map(([clave, estado]) => ({
    clave,
    ...estado,
    cantidad: contarPor("estado", clave),
  }));

  const porCategoria = Object.entries(CATEGORIAS).map(([clave, categoria]) => ({
    clave,
    ...categoria,
    cantidad: contarPor("categoria", clave),
  }));
  const maximo = Math.max(1, ...porCategoria.map((categoria) => categoria.cantidad));

  // Los 3 reportes con más apoyos (se ordena una copia para no cambiar la lista original)
  const masApoyados = [...reportes].sort((a, b) => (b.apoyos ?? 0) - (a.apoyos ?? 0)).slice(0, 3);

  return (
    <>
      <Seo
        titulo="Estadísticas"
        descripcion="Cuántos reclamos urbanos hay en cada barrio, cuántos están pendientes y cuántos ya se resolvieron."
        ruta="/estadisticas"
      />

      <EncabezadoPagina
        titulo="Estadísticas"
        bajada="Cuántos reclamos hay y cuántos ya se resolvieron."
      />

      <Container ref={ref} className="py-5">
        <EstadoCarga cargando={cargando} error={error} alReintentar={alReintentar}>
          <Row className="g-4 g-lg-5">
            {/* Total y distribución por estado */}
            <Col lg={6}>
              <section className="bg-dark text-white rounded-4 p-4 p-md-5 h-100" aria-labelledby="por-estado">
                <p className="d-flex align-items-baseline gap-3 mb-4">
                  <span className="display-1 fw-black text-warning lh-1">
                    <ContadorAnimado valor={total} />
                  </span>
                  <span className="fs-5 text-white-50">reportes en total</span>
                </p>

                <h2 id="por-estado" className="h5 fw-bold text-white">Por estado</h2>

                {/* Barra apilada: un tramo por estado */}
                <ProgressBar className="mb-4" style={{ height: "1.5rem" }}>
                  {porEstado.map((estado) => (
                    <ProgressBar
                      key={estado.clave}
                      variant={estado.variante}
                      now={visible ? porcentaje(estado.cantidad) : 0}
                      label={`${porcentaje(estado.cantidad)}%`}
                      aria-label={estado.nombre}
                    />
                  ))}
                </ProgressBar>

                <ListGroup variant="flush">
                  {porEstado.map((estado) => (
                    <ListGroup.Item key={estado.clave} className="bg-transparent text-white border-secondary d-flex align-items-center gap-2 px-0">
                      <i className={`bi bi-circle-fill text-${estado.variante} small`} aria-hidden="true"></i>
                      <span className="flex-grow-1">{estado.nombre}</span>
                      <strong className="fs-5">{estado.cantidad}</strong>
                      <span className="text-white-50 text-end" style={{ width: "3.5rem" }}>{porcentaje(estado.cantidad)}%</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </section>
            </Col>

            {/* Cantidad por categoría */}
            <Col lg={6}>
              <section className="bg-light rounded-4 p-4 p-md-5 h-100" aria-labelledby="por-categoria">
                <h2 id="por-categoria" className="h5 fw-bold text-primary mb-4">Por categoría</h2>
                {porCategoria.map((categoria) => (
                  <div key={categoria.clave} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>
                        <i className={`bi ${categoria.icono} text-acento me-2`} aria-hidden="true"></i>
                        {categoria.nombre}
                      </span>
                      <strong>{categoria.cantidad}</strong>
                    </div>
                    <ProgressBar
                      variant="acento"
                      now={visible ? (categoria.cantidad / maximo) * 100 : 0}
                      style={{ height: "0.6rem" }}
                      aria-label={categoria.nombre}
                    />
                  </div>
                ))}
              </section>
            </Col>

            {/* Ranking de apoyos: ayuda al municipio a decidir qué atender primero */}
            <Col xs={12}>
              <section aria-labelledby="mas-apoyados">
                <h2 id="mas-apoyados" className="h5 fw-bold text-primary mb-3">
                  Los más apoyados por los vecinos
                </h2>
                <ListGroup as="ol" numbered className="shadow-sm">
                  {masApoyados.map((reporte) => (
                    <ListGroup.Item as="li" key={reporte.id} className="d-flex justify-content-between align-items-center gap-3">
                      <Link to={`/reportes/${reporte.id}`} className="me-auto fw-semibold text-primary text-decoration-none">
                        {reporte.titulo}
                      </Link>
                      <Badge bg="primary" pill>
                        <i className="bi bi-hand-thumbs-up-fill me-1" aria-hidden="true"></i>
                        {reporte.apoyos ?? 0}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </section>
            </Col>
          </Row>
        </EstadoCarga>
      </Container>
    </>
  );
}

export default Estadisticas;
