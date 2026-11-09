import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// 1. Estilos de Bootstrap (instalado con npm)
import "bootstrap/dist/css/bootstrap.min.css";
// 2. Variables globales de la marca: van DESPUÉS para personalizar Bootstrap
import "./index.css";

import App from "./App.jsx";

// BrowserRouter habilita la navegación entre páginas con React Router
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
