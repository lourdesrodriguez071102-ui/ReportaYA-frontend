import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite: el plugin de React permite usar JSX
export default defineConfig({
  plugins: [react()],
});
