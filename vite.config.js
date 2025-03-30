import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{js,jsx,ts,tsx}",
    }),
    svgr({
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
  build: {
    assetsInclude: ['**/*.css'] // 🔥 Soluciona el error de MIME type
  },
  // Solo para desarrollo:
  server: process.env.NODE_ENV === 'development' ? { // 🔥 Condicional
    proxy: {
      '/api': {
        target: 'http://localhost:10000', // Puerto del backend local
        changeOrigin: true,
        secure: false
      }
    }
  } : undefined
});