import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./Encabezado";
import PieDePagina from "./PieDePagina";

// Estructura común a todas las páginas: encabezado, contenido y pie.
// <Outlet /> es el lugar donde React Router dibuja la página actual.

function Layout() {
  const { pathname } = useLocation();

  // Al cambiar de página, vuelve al principio (como en un sitio tradicional)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Encabezado />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <PieDePagina autora="Lourdes" />
    </div>
  );
}

export default Layout;
