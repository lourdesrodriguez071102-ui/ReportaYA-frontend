import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./pages/Inicio";
import Reportes from "./pages/Reportes";
import DetalleReporte from "./pages/DetalleReporte";
import NuevoReporte from "./pages/NuevoReporte";
import Estadisticas from "./pages/Estadisticas";
import NoEncontrada from "./pages/NoEncontrada";
import useReportes from "./hooks/useReportes";
import { leerGuardado, guardar } from "./utils/almacenamiento";

// Componente principal.
// - Los reportes llegan de la API (hook useReportes: Axios + useEffect).
// - Lo que hace este vecino (reportes nuevos, apoyos y cambios de estado)
//   se guarda aparte en el navegador y se combina con los datos de la API.

function App() {
  // Datos de la API, estado de carga y error
  const { reportes: reportesApi, cargando, error, reintentar } = useReportes();

  // ESTADO: reportes que publicó este vecino (todavía no están en la API)
  const [nuevos, setNuevos] = useState(() => leerGuardado("reportaya-nuevos", []));

  // ESTADO: cambios sobre los reportes, por id. Ej: { 3: { apoyos: 5, estado: "resuelto" } }
  const [cambios, setCambios] = useState(() => leerGuardado("reportaya-cambios", {}));

  // ESTADO: ids de los reportes que este vecino ya apoyó
  const [apoyados, setApoyados] = useState(() => leerGuardado("reportaya-apoyados", []));

  // EFECTOS: cada vez que cambia uno de estos datos, se guarda en el navegador
  useEffect(() => guardar("reportaya-nuevos", nuevos), [nuevos]);
  useEffect(() => guardar("reportaya-cambios", cambios), [cambios]);
  useEffect(() => guardar("reportaya-apoyados", apoyados), [apoyados]);

  // Lista final: reportes nuevos + los de la API, con los cambios aplicados
  const reportes = [...nuevos, ...reportesApi].map((reporte) => ({
    ...reporte,
    ...cambios[reporte.id],
  }));

  function agregarReporte(nuevoReporte) {
    setNuevos([nuevoReporte, ...nuevos]);
  }

  // Guarda un cambio sobre un reporte (sin perder los cambios anteriores)
  function registrarCambio(id, cambio) {
    setCambios({ ...cambios, [id]: { ...cambios[id], ...cambio } });
  }

  // Suma un apoyo ("Me pasa también"), una sola vez por vecino
  function apoyarReporte(id) {
    if (apoyados.includes(id)) return;
    const reporte = reportes.find((item) => item.id === id);
    registrarCambio(id, { apoyos: (reporte.apoyos ?? 0) + 1 });
    setApoyados([...apoyados, id]);
  }

  // Cambia el estado de un reporte (panel del municipio)
  function cambiarEstado(id, estadoNuevo) {
    registrarCambio(id, { estado: estadoNuevo });
  }

  // Props que comparten varias páginas
  const carga = { cargando, error, alReintentar: reintentar };
  const apoyo = { apoyados, alApoyar: apoyarReporte };

  return (
    <Routes>
      {/* Layout envuelve a todas las páginas: encabezado + página + pie */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio reportes={reportes} {...carga} {...apoyo} />} />
        <Route path="/reportes" element={<Reportes reportes={reportes} {...carga} {...apoyo} />} />
        <Route
          path="/reportes/:id"
          element={<DetalleReporte reportes={reportes} {...carga} {...apoyo} alCambiarEstado={cambiarEstado} />}
        />
        <Route path="/nuevo-reporte" element={<NuevoReporte alCrear={agregarReporte} />} />
        <Route path="/estadisticas" element={<Estadisticas reportes={reportes} {...carga} />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
