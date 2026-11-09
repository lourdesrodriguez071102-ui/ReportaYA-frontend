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
import { leerGuardado, guardar } from "./utils/almacenamiento";

// Componente principal: guarda los datos que comparten todas las páginas
// y define las rutas. Cada página recibe por props lo que necesita.

function App() {
  // ESTADO 1: la lista de reportes.
  // Cambia cuando se publica un reporte, cuando alguien lo apoya
  // o cuando el municipio le cambia el estado.
  // Arranca con lo guardado en el navegador (o con los de ejemplo).
  const [reportes, setReportes] = useState(() => leerGuardado("reportaya-reportes", REPORTES));

  // ESTADO 2: los ids de los reportes que este vecino ya apoyó.
  // Sirve para que cada persona pueda apoyar un reporte una sola vez.
  const [apoyados, setApoyados] = useState(() => leerGuardado("reportaya-apoyados", []));

  // EFECTO 1: cada vez que cambia la lista de reportes, se guarda en el navegador.
  // Dependencia [reportes]: solo se ejecuta cuando la lista cambia.
  useEffect(() => {
    guardar("reportaya-reportes", reportes);
  }, [reportes]);

  // EFECTO 2: lo mismo con los apoyos de este vecino.
  useEffect(() => {
    guardar("reportaya-apoyados", apoyados);
  }, [apoyados]);

  function agregarReporte(nuevoReporte) {
    setReportes([nuevoReporte, ...reportes]);
  }

  // Suma un apoyo ("Me pasa también") al reporte, si este vecino no lo apoyó antes
  function apoyarReporte(id) {
    if (apoyados.includes(id)) return;

    setReportes(
      reportes.map((reporte) =>
        reporte.id === id ? { ...reporte, apoyos: (reporte.apoyos ?? 0) + 1 } : reporte
      )
    );
    setApoyados([...apoyados, id]);
  }

  // Cambia el estado de un reporte (lo usa el panel del municipio)
  function cambiarEstado(id, estadoNuevo) {
    setReportes(
      reportes.map((reporte) => (reporte.id === id ? { ...reporte, estado: estadoNuevo } : reporte))
    );
  }

  // Props que necesitan las tarjetas para el botón "Me pasa también"
  const apoyo = { apoyados, alApoyar: apoyarReporte };

  return (
    <Routes>
      {/* Layout envuelve a todas las páginas: encabezado + página + pie */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio reportes={reportes} {...apoyo} />} />
        <Route path="/reportes" element={<Reportes reportes={reportes} {...apoyo} />} />
        <Route
          path="/reportes/:id"
          element={<DetalleReporte reportes={reportes} {...apoyo} alCambiarEstado={cambiarEstado} />}
        />
        <Route path="/nuevo-reporte" element={<NuevoReporte alCrear={agregarReporte} />} />
        <Route path="/estadisticas" element={<Estadisticas reportes={reportes} />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
