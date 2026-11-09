import { useState } from "react";
import Encabezado from "./sections/Encabezado";
import Hero from "./sections/Hero";
import ComoFunciona from "./sections/ComoFunciona";
import Categorias from "./sections/Categorias";
import Reportes from "./sections/Reportes";
import Estadisticas from "./sections/Estadisticas";
import NuevoReporte from "./sections/NuevoReporte";
import PieDePagina from "./sections/PieDePagina";
import Recorrido from "./components/Recorrido";
import { PASOS, REPORTES } from "./data/reportes";

// Paradas del recorrido lateral (una por sección)
const SECCIONES = [
  { id: "inicio", texto: "Mapa", icono: "bi-map" },
  { id: "como-funciona", texto: "Cómo funciona", icono: "bi-signpost-2" },
  { id: "categorias", texto: "Categorías", icono: "bi-grid-3x2-gap" },
  { id: "reportes", texto: "Reportes", icono: "bi-pin-map" },
  { id: "estadisticas", texto: "Estadísticas", icono: "bi-bar-chart-line" },
  { id: "nuevo-reporte", texto: "Nuevo reporte", icono: "bi-plus-lg" },
];

// Componente principal.
// Guarda los datos que comparten varias secciones (estado) y se los
// pasa por props. Cuando cambian, todas las secciones se actualizan.

function App() {
  // Lista de reportes: la usan el mapa, el listado, las categorías y las estadísticas
  const [reportes, setReportes] = useState(REPORTES);

  // Categoría elegida: la cambian tanto Categorías como el filtro del listado
  const [categoria, setCategoria] = useState("");

  // Se ejecuta cuando el formulario crea un reporte nuevo
  function agregarReporte(nuevoReporte) {
    setReportes([nuevoReporte, ...reportes]);
    setCategoria("");
  }

  return (
    <>
      <Encabezado />
      <Recorrido secciones={SECCIONES} />

      <main>
        <Hero reportes={reportes} />
        <ComoFunciona pasos={PASOS} />
        <Categorias reportes={reportes} alElegir={setCategoria} />
        <Reportes reportes={reportes} categoria={categoria} alCambiarCategoria={setCategoria} />
        <Estadisticas reportes={reportes} />
        <NuevoReporte alCrear={agregarReporte} />
      </main>

      <PieDePagina autora="Lourdes" />
    </>
  );
}

export default App;
