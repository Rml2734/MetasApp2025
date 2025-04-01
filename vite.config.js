import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path"; // 👈 Añadir esta línea

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
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.tsx"),
        styles: path.resolve(__dirname, "src/styles/main.css") // 👈 Ruta corregida
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
      }
    }
  },
  base: "/",
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