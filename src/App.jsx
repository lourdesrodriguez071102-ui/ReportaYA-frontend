import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import Reportes from "./pages/Reportes";
import DetalleReporte from "./pages/DetalleReporte";
import NuevoReporte from "./pages/NuevoReporte";
import Estadisticas from "./pages/Estadisticas";
import NoEncontrada from "./pages/NoEncontrada";
import { REPORTES } from "./data/reportes";

const CLAVE_GUARDADO = "reportaya-reportes";

// Lee los reportes guardados en el navegador; si no hay, usa los de ejemplo
function cargarReportes() {
  try {
    const guardados = localStorage.getItem(CLAVE_GUARDADO);
    return guardados ? JSON.parse(guardados) : REPORTES;
  } catch {
    return REPORTES;
  }
}

// Componente principal: guarda la lista de reportes (estado compartido)
// y define las rutas. Cada página recibe por props lo que necesita.

function App() {
  const [reportes, setReportes] = useState(cargarReportes);

  // Cada vez que cambia la lista, se guarda en el navegador
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(reportes));
    } catch {
      // Si el navegador no permite guardar, la app sigue funcionando igual
    }
  }, [reportes]);

  function agregarReporte(nuevoReporte) {
    setReportes([nuevoReporte, ...reportes]);
  }

  return (
    <Routes>
      {/* Layout envuelve a todas las páginas: encabezado + página + pie */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio reportes={reportes} />} />
        <Route path="/reportes" element={<Reportes reportes={reportes} />} />
        <Route path="/reportes/:id" element={<DetalleReporte reportes={reportes} />} />
        <Route path="/nuevo-reporte" element={<NuevoReporte alCrear={agregarReporte} />} />
        <Route path="/estadisticas" element={<Estadisticas reportes={reportes} />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
