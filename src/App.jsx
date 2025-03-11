import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./componentes/compartidos/Layout";
import Lista from "./componentes/privado/lista/Lista";
import Detalles from "./componentes/privado/nueva/Detalles";
import NoEncontrado from "./componentes/compartidos/NoEncontrado";
import Modal from "./componentes/compartidos/Modal";
import { useContext, useEffect } from "react";
import { pedirMetas } from "./servicios/Metas";
import Registro from "./componentes/publico/registro/Registro";
import Acceso from "./componentes/publico/acceso/Acceso";

import RecuperarClave from "./componentes/compartidos/RecuperarClave"; // Importamos el nuevo componente

import { Autenticar } from "./componentes/compartidos/Autenticar";
import { ContextoMetas } from "./memoria/ContextoMetas";

import Inicio from "./componentes/compartidos/Inicio"; // Importa la nueva página de inicio

function App() {
  const [, enviar] = useContext(ContextoMetas);

  useEffect(() => {
    async function fetchData() {
      const metas = await pedirMetas();
      enviar({ tipo: "colocar", metas });
    }
    fetchData();
  }, [enviar]);

  return (
    <Routes>
      {/* Ruta principal - redirige a /inicio */}
      <Route path="/" element={<Navigate to="/inicio" />} />

      {/* Rutas públicas */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />{" "}
        {/* Página principal con botones */}
        <Route path="/acceso" element={<Acceso />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-clave" element={<RecuperarClave />} />{" "}
        {/* Nueva ruta */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      {/* Rutas privadas - requieren autenticación */}
      <Route element={<Layout privado />}>
        <Route element={<Autenticar />}>
          <Route path="/lista" element={<Lista />}>
            <Route
              path="/lista/:id"
              element={
                <Modal>
                  <Detalles />
                </Modal>
              }
            />
          </Route>
          <Route path="/nueva" element={<Detalles />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
