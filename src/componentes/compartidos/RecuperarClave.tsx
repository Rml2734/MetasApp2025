import React, { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Importamos estilos
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Añadir este import


function RecuperarClave() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Validación de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje("Ingresa un correo válido.");
      return;
    }

    if (cargando) return;
    setCargando(true);

    try {
      const respuesta = await fetch("http://localhost:3000/api/recuperar-clave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "Error al procesar la solicitud.");
      }

      setMensaje("✅ Revisa tu correo para recuperar tu clave.");
      setTimeout(() => navegar("/acceso"), 3000);

    } catch (error) {
      setMensaje(`❌ ${error.message || "Error de conexión con el servidor."}`);
    } finally {
      setCargando(false);
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

      {/* BOTON DE REGRESAR INICIO */}
      {mensaje && <p>{mensaje}</p>}

      <div className={estilos.regresarInicio}>
        <Link to="/inicio">← Regresar al menú principal</Link>
      </div>
    
    </div>
  );
}

export default RecuperarClave;