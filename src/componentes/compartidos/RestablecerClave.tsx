/*
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
*/


import { useState, useEffect } from "react";
import estilos from "./RecuperarClave.module.css"; // Usa los estilos existentes
import { useNavigate, Link, useLocation } from "react-router-dom"; 

// Usa la variable de entorno para asegurar la URL correcta de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000"; 
// Ruta de la API para confirmar el restablecimiento (la nueva ruta del backend)
const API_CONFIRM_ROUTE = "/api/reset-password-confirm"; 

function RestablecerClave() {
    // Hooks para obtener la ubicación actual (incluyendo la query string)
    const location = useLocation();
    const navegar = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [nuevaClave, setNuevaClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    
    // --- LÓGICA CLAVE: EXTRAER EL TOKEN DE LA URL ---
    useEffect(() => {
        // Obtenemos los parámetros de la URL (ej: ?token=ABC123XYZ)
        const params = new URLSearchParams(location.search);
        const urlToken = params.get('token');

        if (urlToken) {
            setToken(urlToken);
            setMensaje("Ingresa tu nueva clave.");
        } else {
            // Si no hay token, redirigimos o mostramos un error de seguridad.
            setMensaje("❌ Enlace inválido. Por favor, solicita un nuevo correo de recuperación.");
            // Opcional: Redirigir si no hay token después de un breve periodo
            // setTimeout(() => navegar("/recuperar"), 5000); 
        }
    }, [location.search]);


    // --- LÓGICA CLAVE: ENVÍO DEL TOKEN Y LA NUEVA CLAVE ---
    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje("");

        if (!token) {
            setMensaje("❌ No se encontró el token de seguridad.");
            return;
        }

        if (nuevaClave.length < 5) {
            setMensaje("❌ La clave debe tener al menos 5 caracteres.");
            return;
        }

        if (cargando) return;
        setCargando(true);

        try {
            // Llamamos a la nueva ruta del backend
            const respuesta = await fetch(`${API_BASE_URL}${API_CONFIRM_ROUTE}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Enviamos el token que extrajimos de la URL y la nueva clave
                body: JSON.stringify({ token, nuevaClave }),
            });
            
            const datos = await respuesta.json();

            if (!respuesta.ok) {
                // Maneja errores específicos del backend (token inválido, expirado, etc.)
                throw new Error(datos.error || "Error al restablecer la clave.");
            }

            setMensaje("✅ Contraseña restablecida con éxito. Redirigiendo a Acceso...");
            setTimeout(() => navegar("/acceso"), 3000); // Redirigir al login

        } catch (error) {
            let mensajeError = "Error desconocido al intentar restablecer.";
            if (error instanceof Error) mensajeError = error.message;
            setMensaje(`❌ ${mensajeError}`);
        } finally {
            setCargando(false);
        }
    };

    // Función para determinar la clase del mensaje 
    const getMensajeClase = () => {
        if (!mensaje) return '';
        return mensaje.startsWith('❌') ? estilos.mensajeError : estilos.mensajeExito;
    };

    // Si no hay token o estamos cargando, podemos mostrar un mensaje diferente
    if (!token && !cargando) {
        return (
             <div className={estilos.conte}>
                <h2>Enlace de Recuperación</h2>
                <p className={getMensajeClase()}>{mensaje}</p>
                <div className={estilos.regresarInicio}>
                    <Link to="/acceso">← Regresar a Iniciar Sesión</Link>
                </div>
            </div>
        );
    }


    return (
        <div className={estilos.conte}>
            <h2>Restablecer Clave</h2>
            
            {/* Si ya cargó el token, mostramos el formulario */}
            {token && (
                <form onSubmit={manejarEnvio}>
                    {/* Quitamos los campos email y código porque el token ya autentica al usuario */}
                    <label htmlFor="nuevaClave">Nueva Contraseña:</label>
                    <input
                        id="nuevaClave"
                        type="password"
                        placeholder="Escribe tu nueva clave (min 5 chars)"
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
            )}

            {mensaje && <p className={getMensajeClase()}>{mensaje}</p>}
            
            <div className={estilos.regresarInicio}>
                <Link to="/acceso">← Regresar a Iniciar Sesión</Link>
            </div>
        
        </div>
    );
}

export default RestablecerClave;