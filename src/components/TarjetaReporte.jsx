import Ilustracion from "./Ilustracion";
import BadgeEstado from "./BadgeEstado";
import CartelCalle from "./CartelCalle";
import SeguimientoEstado from "./SeguimientoEstado";
import { CATEGORIAS, BARRIOS } from "../data/reportes";

// "2026-10-20" -> "20/10/2026"
function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

// Componente reutilizable: tarjeta de un reporte.
// Se usa en el listado y también como vista previa en el formulario.
// Props:
//   - reporte: objeto con titulo, descripcion, categoria, barrio,
//              direccion, estado y fecha
//   - esVistaPrevia: true cuando se muestra mientras se completa el formulario

function TarjetaReporte({ reporte, esVistaPrevia = false }) {
  const { id, titulo, descripcion, categoria, barrio, direccion, estado, fecha } = reporte;
  const datosCategoria = CATEGORIAS[categoria] || CATEGORIAS.otro;

  return (
    <article
      id={esVistaPrevia ? undefined : `reporte-${id}`}
      className={`tarjeta-reporte ${esVistaPrevia ? "tarjeta-reporte--previa" : ""}`}
    >
      <div className="tarjeta-reporte__media">
        <Ilustracion tipo={categoria} />
        <span className="tarjeta-reporte__categoria">
          <i className={`bi ${datosCategoria.icono}`} aria-hidden="true"></i>
          {datosCategoria.nombre}
        </span>
      </div>

      <div className="tarjeta-reporte__cuerpo">
        <div className="tarjeta-reporte__fila">
          <BadgeEstado estado={estado} />
          <time dateTime={fecha} className="tarjeta-reporte__fecha">
            {formatearFecha(fecha)}
          </time>
        </div>

        <h3 className="tarjeta-reporte__titulo">{titulo}</h3>
        <p className="tarjeta-reporte__descripcion">{descripcion}</p>

        <div className="tarjeta-reporte__lugar">
          <CartelCalle direccion={direccion} />
          <span className="tarjeta-reporte__barrio">
            <i className="bi bi-geo-alt" aria-hidden="true"></i>
            {BARRIOS[barrio] || "Barrio sin elegir"}
          </span>
        </div>

        <SeguimientoEstado estado={estado} />
      </div>
    </article>
  );
}

export default TarjetaReporte;
