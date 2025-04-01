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
    outDir: 'dist',
    assetsDir: '',
    assetsInclude: ['**/*.css'], // 🔥 Solución para el problema de CSS
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
      },
      input: {
        main: path.resolve(__dirname, "src/main.tsx"),
        styles: path.resolve(__dirname, "src/styles.css")
      },
    },
  },
  base: "/", // 🔥 Asegura rutas correctas en producción
  server: process.env.NODE_ENV === "development" ? {
    proxy: {
      "/api": {
        target: "http://localhost:10000",
        changeOrigin: true,
        secure: false
      }
    }
  } : undefined
});
