import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import EncabezadoPagina from "../components/comunes/EncabezadoPagina";
import Ilustracion from "../components/reportes/Ilustracion";
import BadgeEstado from "../components/reportes/BadgeEstado";
import CartelCalle from "../components/reportes/CartelCalle";
import SeguimientoEstado from "../components/reportes/SeguimientoEstado";
import BotonApoyo from "../components/reportes/BotonApoyo";
import PanelMunicipio from "../components/reportes/PanelMunicipio";
import MapaBarrio from "../components/mapa/MapaBarrio";
import NoEncontrada from "./NoEncontrada";
import { CATEGORIAS, BARRIOS } from "../data/reportes";
import { formatearFecha } from "../utils/formato";

// Página de detalle de un reporte (ruta "/reportes/:id").
// useParams lee el ":id" de la dirección; con él buscamos el reporte.
// Props:
//   - reportes: lista completa de reportes (viene desde App)
//   - apoyados, alApoyar: para el botón "Me pasa también"
//   - alCambiarEstado: función del panel del municipio (recibe id y estado nuevo)

function DetalleReporte({ reportes, apoyados, alApoyar, alCambiarEstado }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ESTADO: si se muestra el aviso de "publicado".
  // Arranca en true solo si venimos del formulario; cambia a false al cerrarlo.
  const [mostrarAviso, setMostrarAviso] = useState(location.state?.nuevo === true);

  // EFECTO: borra la marca "nuevo" del historial, así el aviso no vuelve
  // a salir al recargar. Se ejecuta al cargar la página y cuando cambia la ubicación.
  useEffect(() => {
    if (location.state?.nuevo) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const reporte = reportes.find((item) => String(item.id) === id);

  if (!reporte) {
    return <NoEncontrada mensaje="No encontramos ese reporte. Puede que la dirección esté mal escrita." />;
  }

  const categoria = CATEGORIAS[reporte.categoria];

  // Datos que se muestran en la ficha: se dibujan con map()
  const datos = [
    { etiqueta: "Categoría", valor: categoria.nombre, icono: categoria.icono },
    { etiqueta: "Barrio", valor: BARRIOS[reporte.barrio], icono: "bi-geo-alt" },
    { etiqueta: "Fecha", valor: formatearFecha(reporte.fecha), icono: "bi-calendar3" },
    { etiqueta: "Vecinos afectados", valor: reporte.apoyos ?? 0, icono: "bi-people" },
  ];

  return (
    <>
      <Seo
        titulo={reporte.titulo}
        descripcion={`${categoria.nombre} en ${reporte.direccion}: ${reporte.descripcion}`}
        ruta={`/reportes/${reporte.id}`}
      />

      <EncabezadoPagina titulo={reporte.titulo} bajada={reporte.direccion}>
        <Button variant="outline-light" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
          Volver
        </Button>
      </EncabezadoPagina>

      <Container as="article" className="py-5">
        {mostrarAviso && (
          <Alert variant="success" dismissible onClose={() => setMostrarAviso(false)} className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
            Reporte publicado. Ya aparece en el mapa y en el listado.
          </Alert>
        )}

        <Row className="g-4 g-lg-5">
          <Col lg={7}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="ratio ratio-16x9">
                <div>
                  <Ilustracion tipo={reporte.categoria} className="w-100 h-100" />
                  <Badge bg="warning" text="dark" className="position-absolute bottom-0 start-0 m-3 fs-6">
                    <i className={`bi ${categoria.icono} me-1`} aria-hidden="true"></i>
                    {categoria.nombre}
                  </Badge>
                </div>
              </div>
              <Card.Body className="p-4">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <BadgeEstado estado={reporte.estado} />
                  <CartelCalle direccion={reporte.direccion} />
                </div>
                <h2 className="h5 fw-bold text-primary">Qué pasa</h2>
                <p className="fs-5">{reporte.descripcion}</p>

                <BotonApoyo
                  cantidad={reporte.apoyos}
                  yaApoyado={apoyados.includes(reporte.id)}
                  alApoyar={() => alApoyar(reporte.id)}
                />

                <h2 className="h5 fw-bold text-primary mt-4">Seguimiento</h2>
                <SeguimientoEstado estado={reporte.estado} />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <h2 className="h5 fw-bold text-primary">Dónde está</h2>
            <MapaBarrio reportes={[reporte]} />

            <dl className="row bg-light rounded-4 p-3 mt-4 mb-4">
              {datos.map((dato) => (
                <div key={dato.etiqueta} className="col-12 d-flex justify-content-between py-2 border-bottom">
                  <dt className="fw-semibold text-secondary">
                    <i className={`bi ${dato.icono} me-2`} aria-hidden="true"></i>
                    {dato.etiqueta}
                  </dt>
                  <dd className="mb-0 fw-bold">{dato.valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mb-4">
              <PanelMunicipio
                estado={reporte.estado}
                alCambiar={(estadoNuevo) => alCambiarEstado(reporte.id, estadoNuevo)}
              />
            </div>

            <div className="d-grid gap-2">
              <Button as={Link} to="/reportes" variant="outline-primary">Ver todos los reportes</Button>
              <Button as={Link} to="/nuevo-reporte" variant="acento">Crear otro reporte</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetalleReporte;
