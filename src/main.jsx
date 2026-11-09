import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 1. Estilos de Bootstrap (instalado con npm)
import "bootstrap/dist/css/bootstrap.min.css";
// 2. Nuestros estilos: van DESPUÉS para poder personalizar Bootstrap
import "./index.css";

import App from "./App.jsx";

// React dibuja toda la aplicación dentro del <div id="root"> de index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
