/*
import { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Importamos estilos
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Añadir este import


function RecuperarClave() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const respuesta = await fetch("http://localhost:5173/api/recuperar-clave", {
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
      let mensajeError = "Error desconocido";
  if (error instanceof Error) mensajeError = error.message;
  setMensaje(`❌ ${mensajeError}`);
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

      // BOTON DE REGRESAR INICIO
      
      {mensaje && <p>{mensaje}</p>}

      <div className={estilos.regresarInicio}>
        <Link to="/inicio" >← Regresar al menú principal</Link>
      </div>
    
    </div>
  );
}

export default RecuperarClave;
*/



/*
import { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Importamos estilos
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

// 🚨 CORRECCIÓN CLAVE: Usamos la variable de entorno (VITE_API_URL) que se define en los archivos .env
// Esto asegura que en PROD apunte a Railway y en DEV apunte a localhost.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000"; 

function RecuperarClave() {
 const [email, setEmail] = useState("");
 const [mensaje, setMensaje] = useState("");
 const [cargando, setCargando] = useState(false);
 const navegar = useNavigate();
 const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setMensaje("");
  // Validación de email (mejorado para mostrar el error con la marca '❌')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   setMensaje("❌ Ingresa un correo válido.");
   return;
  }
  if (cargando) return;
  setCargando(true);
  try {
   // 🛑 CORRECCIÓN DE URL
   const respuesta = await fetch(`${API_BASE_URL}/api/recuperar-clave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
   });
   // Intenta leer el JSON, incluso si la respuesta no es OK
   const datos = await respuesta.json();
   if (!respuesta.ok) {
    // Muestra el error específico del backend si existe (ej. "No existe un usuario...")
    throw new Error(datos.error || "Error al procesar la solicitud.");
   }
   setMensaje("✅ Revisa tu correo para recuperar tu clave.");
   setTimeout(() => navegar("/restablecer"), 3000);
  } catch (error) {
   let mensajeError = "Error al intentar conectar con el servidor.";
   if (error instanceof Error) {
    mensajeError = error.message;
   } else if (typeof error === 'string') {
       mensajeError = error;
   }
   setMensaje(`❌ ${mensajeError}`);
  } finally {
   setCargando(false);
  }
 };

  // Función para determinar la clase del mensaje (asume que los estilos ya fueron corregidos)
  const getMensajeClase = () => {
      if (!mensaje) return '';
      // Si el mensaje comienza con ❌, usa la clase de error (asumiendo que la tienes en el CSS)
      return mensaje.startsWith('❌') ? estilos.mensajeError : estilos.mensajeExito;
  };

 return (
  <div className={estilos.conte}>
   <h2>Recuperar Clave</h2>
   <form onSubmit={manejarEnvio}>
    <label htmlFor="email">Email:</label>
    <input
     id="email"
     type="email"
     placeholder="Escribe tu correo"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     required
    />
    <button 
            type="submit" 
            disabled={cargando} // 🔒 Deshabilita el botón mientras carga
        >
            {cargando ? 'Enviando...' : 'Enviar'}  
        </button>
   </form>
   
     {mensaje && <p className={getMensajeClase()}>{mensaje}</p>}
     
   <div className={estilos.regresarInicio}>
    <Link to="/inicio" >← Regresar al menú principal</Link>
   </div>
  
  </div>
 );
}

export default RecuperarClave;
*/

import { useState } from "react";
import estilos from "./RecuperarClave.module.css"; // Importamos estilos
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

// 🚨 CORRECCIÓN CLAVE: Usamos la variable de entorno (VITE_API_URL) que se define en los archivos .env
// Esto asegura que en PROD apunte a Railway y en DEV apunte a localhost.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000"; 

function RecuperarClave() {
const [email, setEmail] = useState("");
const [mensaje, setMensaje] = useState("");
const [cargando, setCargando] = useState(false);
const navegar = useNavigate();
const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 setMensaje("");
 // Validación de email (mejorado para mostrar el error con la marca '❌')
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 setMensaje("❌ Ingresa un correo válido.");
 return;
 }
 if (cargando) return;
 setCargando(true);
 try {
 // 🛑 CORRECCIÓN DE URL
 const respuesta = await fetch(`${API_BASE_URL}/api/recuperar-clave`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  // 🔑 CAMBIO CLAVE AQUÍ: Enviamos { usuario: email } en lugar de { email }
  body: JSON.stringify({ usuario: email }), 
 });
 // Intenta leer el JSON, incluso si la respuesta no es OK
 const datos = await respuesta.json();
 if (!respuesta.ok) {
  // Muestra el error específico del backend si existe (ej. "No existe un usuario...")
  throw new Error(datos.error || "Error al procesar la solicitud.");
 }
 setMensaje("✅ Revisa tu correo para recuperar tu clave.");
 setTimeout(() => navegar("/restablecer"), 3000);
 } catch (error) {
 let mensajeError = "Error al intentar conectar con el servidor.";
 if (error instanceof Error) {
  mensajeError = error.message;
 } else if (typeof error === 'string') {
   mensajeError = error;
 }
 setMensaje(`❌ ${mensajeError}`);
 } finally {
 setCargando(false);
 }
};
 // Función para determinar la clase del mensaje (asume que los estilos ya fueron corregidos)
 const getMensajeClase = () => {
   if (!mensaje) return '';
   // Si el mensaje comienza con ❌, usa la clase de error (asumiendo que la tienes en el CSS)
   return mensaje.startsWith('❌') ? estilos.mensajeError : estilos.mensajeExito;
 };
return (
 <div className={estilos.conte}>
 <h2>Recuperar Clave</h2>
 <form onSubmit={manejarEnvio}>
  <label htmlFor="email">Email:</label>
  <input
  id="email"
  type="email"
  placeholder="Escribe tu correo"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  />
  <button 
      type="submit" 
      disabled={cargando} // 🔒 Deshabilita el botón mientras carga
    >
      {cargando ? 'Enviando...' : 'Enviar'} {/* Muestra texto de carga */}
    </button>
 </form>
 {/* Muestra el mensaje de estado con la clase de estilo adecuada */}
  {mensaje && <p className={getMensajeClase()}>{mensaje}</p>}
  
 <div className={estilos.regresarInicio}>
  <Link to="/inicio" >← Regresar al menú principal</Link>
 </div>
 
 </div>
);
}

export default RecuperarClave;


