import React from "react";
import { useNavigate } from "react-router-dom";
import estilos from "./Inicio.module.css"; // Importa el archivo CSS module

function Inicio() {
  const navigate = useNavigate();

  const irARegistro = () => {
    navigate("/registro");
  };

  const irAAcceso = () => {
    navigate("/acceso");
  };

  return (
    <div className={estilos.inicio}>
      <h1>Bienvenido a Metas App</h1>
      <p>Administra tus metas y alcanza tus objetivos.</p>
      <div className={estilos.botones}>
        <div className={estilos["boton-container"]}>
          <button className={estilos.boton} onClick={irARegistro}>
            Registro
          </button>
        </div>
        <div className={estilos["boton-container"]}>
          <button className={estilos.boton} onClick={irAAcceso}>
            Acceso
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
