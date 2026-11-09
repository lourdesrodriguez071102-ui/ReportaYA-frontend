import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Seo from "../components/comunes/Seo";
import Calle from "../components/comunes/Calle";
import TituloSeccion from "../components/comunes/TituloSeccion";
import Hero from "../components/inicio/Hero";
import PasoTarjeta from "../components/inicio/PasoTarjeta";
import CategoriaTarjeta from "../components/inicio/CategoriaTarjeta";
import TarjetaReporte from "../components/reportes/TarjetaReporte";
import EstadoCarga from "../components/comunes/EstadoCarga";
import { CATEGORIAS, PASOS } from "../data/reportes";

// Página de inicio (ruta "/").
// Props:
//   - reportes: lista de reportes (viene desde App)
//   - apoyados, alApoyar: para el botón "Me pasa también" de las tarjetas
//   - cargando, error, alReintentar: estado de la petición a la API

function Inicio({ reportes, apoyados, alApoyar, cargando, error, alReintentar }) {
  const ultimos = reportes.slice(0, 3); // los 3 más recientes

  return (
    <>
      <Seo
        descripcion="Reportá baches, luminarias rotas, basurales y pérdidas de agua de tu barrio, y seguí el estado de cada reclamo en un mapa."
        ruta="/"
      />

      <Hero reportes={reportes} />

      {/* Cómo funciona */}
      <section className="py-5" aria-labelledby="como-funciona">
        <Container className="py-lg-3">
          <TituloSeccion id="como-funciona" titulo="Cómo funciona" bajada="Del aviso a la solución, en tres paradas." />
          <Row xs={1} md={3} className="g-4">
            {PASOS.map((paso) => (
              <Col key={paso.numero}>
                <PasoTarjeta numero={paso.numero} icono={paso.icono} titulo={paso.titulo} texto={paso.texto} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Calle />

      {/* Categorías */}
      <section className="py-5 bg-light" aria-labelledby="categorias">
        <Container className="py-lg-3">
          <TituloSeccion id="categorias" titulo="Qué podés reportar" bajada="Elegí una categoría para ver sus reportes." />
          <Row xs={2} md={3} xl={5} className="g-3">
            {Object.entries(CATEGORIAS).map(([clave, categoria]) => (
              <Col key={clave}>
                <CategoriaTarjeta
                  clave={clave}
                  nombre={categoria.nombre}
                  descripcion={categoria.descripcion}
                  cantidad={reportes.filter((reporte) => reporte.categoria === clave).length}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Últimos reportes */}
      <section className="py-5" aria-labelledby="ultimos">
        <Container className="py-lg-3">
          <TituloSeccion id="ultimos" titulo="Últimos reportes" bajada="Lo más reciente que cargaron los vecinos." />
          <EstadoCarga cargando={cargando} error={error} alReintentar={alReintentar}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {ultimos.map((reporte) => (
                <Col key={reporte.id}>
                  <TarjetaReporte reporte={reporte} apoyados={apoyados} alApoyar={alApoyar} />
                </Col>
              ))}
            </Row>
          </EstadoCarga>
          <div className="text-center mt-4">
            <Button as={Link} to="/reportes" variant="outline-primary" size="lg" className="fw-bold">
              Ver todos los reportes
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Inicio;
