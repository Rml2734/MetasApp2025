import { ProveedorTema } from "./memoria/ContextoTema"; //TEMA OSCURO/CLARO
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./componentes/compartidos/Layout";
import Lista from "./componentes/privado/lista/Lista";
import Detalles from "./componentes/privado/nueva/Detalles";
import NoEncontrado from "./componentes/compartidos/NoEncontrado";
import Modal from "./componentes/compartidos/Modal";
import { pedirMetas } from "./servicios/Metas";
import Registro from "./componentes/publico/registro/Registro";
import Acceso from "./componentes/publico/acceso/Acceso";
import RecuperarClave from "./componentes/compartidos/RecuperarClave";
import { Autenticar } from "./componentes/compartidos/Autenticar";
import { ContextoMetas } from "./memoria/ContextoMetas";
import Inicio from "./componentes/compartidos/Inicio";
import { ContextoAuth } from "./memoria/ContextoAuth"; // Importa el contexto de autenticación

function App() {
  const [, enviarMetas] = useContext(ContextoMetas);
  const [auth, enviarAuth] = useContext(ContextoAuth); // Obtén el estado de autenticación
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("⚠ No hay token, limpiando metas.");
        enviarMetas({ tipo: "colocar", metas: [] });
        enviarAuth({ tipo: "cerrarSesion" }); // Limpiar el estado de autenticación
        setCargando(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const usuario = payload.usuario;
        console.log("🔑 Usuario autenticado:", usuario);

        // Restaurar el estado de autenticación
        enviarAuth({ 
          tipo: "colocar",
          token,
          usuario: { // 🔥 Enviar datos del usuario al contexto
            id: payload.id,
            email: payload.usuario
          }
        });

        // Cargar las metas del usuario
        console.log("📡 Cargando metas para:", usuario);
        const metas = await pedirMetas();
        enviarMetas({ tipo: "colocar", metas });
      } catch (error) {
        console.error("🚨 Error al obtener metas:", error);
        enviarMetas({ tipo: "colocar", metas: [] });
      } finally {
        setCargando(false);
      }
    }

    fetchData();
  }, [auth.token]); // Depende del token de autenticación

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <ProveedorTema>
    <Routes>
      {/* Ruta principal - redirige a /inicio */}
      <Route path="/" element={<Navigate to="/inicio" />} />

      {/* Rutas públicas */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/acceso" element={<Acceso />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-clave" element={<RecuperarClave />} />
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
    </ProveedorTema>
  );
}

export default App;
