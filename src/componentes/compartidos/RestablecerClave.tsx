
import { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Usa los estilos existentes
import { useNavigate, Link } from "react-router-dom"; 

// URL de la nueva ruta en tu API
const API_BASE_URL = "http://localhost:10000/api"; 

function RestablecerClave() {
 const [email, setEmail] = useState("");
 const [codigo, setCodigo] = useState("");
 const [nuevaClave, setNuevaClave] = useState("");
 const [mensaje, setMensaje] = useState("");
 const [cargando, setCargando] = useState(false);
 const navegar = useNavigate();
 const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setMensaje("");
  // Validación de campos requeridos
  if (!email || !codigo || !nuevaClave) {
   setMensaje("❌ Todos los campos son obligatorios.");
   return;
  }
  if (cargando) return;
  setCargando(true);
  try {
   const respuesta = await fetch(`${API_BASE_URL}/restablecer-clave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, codigo, nuevaClave }),
   });
   const datos = await respuesta.json();
   if (!respuesta.ok) {
    // Maneja errores específicos del backend (código inválido, expirado, etc.)
    throw new Error(datos.error || "Error al restablecer la clave.");
   }
   setMensaje("✅ Contraseña restablecida con éxito. Redirigiendo a Acceso...");
   setTimeout(() => navegar("/acceso"), 3000); // Redirigir al login
  } catch (error) {
   let mensajeError = "Error desconocido";
   if (error instanceof Error) mensajeError = error.message;
   setMensaje(`❌ ${mensajeError}`);
  } finally {
   setCargando(false);
  }
 };
 // Función para determinar la clase del mensaje (la misma que usamos en RecuperarClave)
 const getMensajeClase = () => {
   if (!mensaje) return '';
   return mensaje.startsWith('❌') ? estilos.mensajeError : estilos.mensajeExito;
 };
 return (
  <div className={estilos.conte}>
   <h2>Restablecer Clave</h2>
   <form onSubmit={manejarEnvio}>
    
    <label htmlFor="email">Email:</label>
    <input
     id="email"
     type="email"
     placeholder="Tu correo electrónico"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     required
    />
    <label htmlFor="codigo">Código de Recuperación:</label>
    <input
     id="codigo"
     type="text"
     placeholder="Código recibido por email"
     value={codigo}
     onChange={(e) => setCodigo(e.target.value)}
     required
    />
    <label htmlFor="nuevaClave">Nueva Contraseña:</label>
    <input
     id="nuevaClave"
     type="password"
     placeholder="Escribe tu nueva clave"
     value={nuevaClave}
     onChange={(e) => setNuevaClave(e.target.value)}
     required
    />
    <button 
            type="submit" 
            disabled={cargando}
        >
            {cargando ? 'Restableciendo...' : 'Restablecer Clave'}
        </button>
   </form>
   {mensaje && <p className={getMensajeClase()}>{mensaje}</p>}
   <div className={estilos.regresarInicio}>
    <Link to="/acceso">← Regresar a Iniciar Sesión</Link>
   </div>
  
  </div>
 );
}

export default RestablecerClave;

