import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{js,jsx,ts,tsx}", // Incluye archivos .js que contienen JSX
    }),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
        icon: true,
      },
      include: "**/*.svg",
    }),
  ],
  // Agregar la configuración del servidor con proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ajusta este puerto al de tu backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});
