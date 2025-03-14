import React, { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Importamos estilos
import { useNavigate } from "react-router-dom";

function RecuperarClave() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navegar = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    try {
      const respuesta = await fetch("http://localhost:3000/api/recuperar-clave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const datos = await respuesta.json();
      if (respuesta.ok) {
        setMensaje("Revisa tu correo para recuperar tu clave.");
        setTimeout(() => navegar("/acceso"), 3000); // Redirigir después de 3 segundos
      } else {
        setMensaje(datos.error || "Error al recuperar la clave.");
      }
    } catch (error) {
      setMensaje("Hubo un problema con el servidor.");
    }
  };

  return (
    <div className={estilos.conte}>
      <h2>Recuperar Clave</h2>
      <form onSubmit={manejarEnvio}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Escribe tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default RecuperarClave;