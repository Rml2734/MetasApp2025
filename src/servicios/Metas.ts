/*
import { MetaTipo } from "../tipos/MetaTipo";
const token = localStorage.getItem("token"); // 🔥 Obtiene el token del almacenamiento
console.log("Token recuperado:", token); // 👈 Verifica que no sea null/undefined
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";

export async function pedirMetas(): Promise<MetaTipo[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("⚠ No hay token, no se pedirán metas.");
    return [];
  }

  console.log("📡 Enviando petición con token:", token);

  const response = await fetch(`${apiUrl}/api/metas`, { // 🔥 URL completa
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("🚨 Error en la petición de metas:", response.status);
    throw new Error("Error al obtener metas");
  }

  return await response.json();
}

export async function pedirMeta(id: number): Promise<MetaTipo> {
  // const response = await fetch('/meta.json');
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  if (!token) throw new Error("No autenticado"); // 👈 Validación añadida

  const response = await fetch(`${apiUrl}/api/metas/${id}`, { // 🔥 URL completa
    headers: {
      "Authorization": `Bearer ${token}`, // 👈 Incluir token
      "Accept": "application/json" // 👈 Añadir
    },
  });
  if (!response.ok) throw new Error("Meta no encontrada");
  return await response.json();
}

// Función para formatear fecha a ISO
const formatearFechaParaAPI = (fecha: string) => {
  return new Date(fecha).toISOString();
};

export async function crearMeta(meta: MetaTipo): Promise<MetaTipo> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  // 🔥 Formatear fecha antes de enviar
  const metaFormateada = {
    ...meta,
    plazo: formatearFechaParaAPI(meta.plazo)
  };

  const response = await fetch(`${apiUrl}/api/metas`, {
    method: "POST",
    body: JSON.stringify(metaFormateada), // 👈 Enviar meta formateada
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  
  if (!response.ok) throw new Error("Error creando meta");
  return await response.json();
}

export async function actualizarMeta(meta: MetaTipo): Promise<MetaTipo> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación");

  // 🔥 Formatear fecha antes de enviar
  const metaFormateada = {
    ...meta,
    plazo: formatearFechaParaAPI(meta.plazo)
  };

  const response = await fetch(`${apiUrl}/api/metas/${meta.id}`, {
    method: "PUT",
    body: JSON.stringify(metaFormateada), // 👈 Enviar meta formateada
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error actualizando meta");
  return await response.json();
}

export async function borrarMeta(id: number): Promise<void> {
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  // const response = await fetch('/meta.json');
  await fetch(`${apiUrl}/api/metas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 Agrega esta línea nueva
    },
  });
  console.log("Meta borrada!", id);
}
  */

import { MetaTipo } from "../tipos/MetaTipo";

// La URL de la API se define una sola vez
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";

/**
 * Función auxiliar para manejar errores de autenticación (401/403).
 * Limpia la sesión y fuerza la redirección al login.
 */
function handleAuthError(status: number) {
    if (status === 401 || status === 403) {
        console.error(`🚨 Error de Autenticación ${status}: Sesión expirada o no válida. Forzando cierre de sesión.`);
        
        // 1. Limpiar el token
        localStorage.removeItem('token');
        
        // 2. Redirigir al login (o recargar, para que React maneje la ruta automáticamente)
        window.location.href = '/acceso'; // Asume que '/acceso' es tu ruta de login
        
        // Lanzar un error para detener la ejecución de la promesa
        throw new Error("SESION_EXPIRADA");
    }
}

export async function pedirMetas(): Promise<MetaTipo[]> {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("⚠ No hay token, no se pedirán metas.");
        // Si no hay token, simplemente devolvemos un array vacío
        return []; 
    }

    console.log("📡 Enviando petición con token...");

    const response = await fetch(`${apiUrl}/api/metas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        // 🚨 AQUÍ USAMOS el nuevo manejador de errores
        handleAuthError(response.status);
        
        // Si no fue error de auth, lanzamos el error normal
        console.error("🚨 Error en la petición de metas:", response.status);
        throw new Error("Error al obtener metas");
    }

    return await response.json();
}

export async function pedirMeta(id: number): Promise<MetaTipo> {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("No autenticado"); 

    const response = await fetch(`${apiUrl}/api/metas/${id}`, { 
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Accept": "application/json" 
        },
    });

    if (!response.ok) {
        handleAuthError(response.status); // 🚨 Verificar aquí también
        throw new Error("Meta no encontrada");
    }
    return await response.json();
}

// Función para formatear fecha a ISO
const formatearFechaParaAPI = (fecha: string) => {
    return new Date(fecha).toISOString();
};

export async function crearMeta(meta: MetaTipo): Promise<MetaTipo> {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No autenticado");

    const metaFormateada = {
        ...meta,
        plazo: formatearFechaParaAPI(meta.plazo)
    };

    const response = await fetch(`${apiUrl}/api/metas`, {
        method: "POST",
        body: JSON.stringify(metaFormateada), 
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    
    if (!response.ok) {
        handleAuthError(response.status); // 🚨 Verificar aquí también
        throw new Error("Error creando meta");
    }
    return await response.json();
}

export async function actualizarMeta(meta: MetaTipo): Promise<MetaTipo> {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token de autenticación");

    const metaFormateada = {
        ...meta,
        plazo: formatearFechaParaAPI(meta.plazo)
    };

    const response = await fetch(`${apiUrl}/api/metas/${meta.id}`, {
        method: "PUT",
        body: JSON.stringify(metaFormateada), 
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        handleAuthError(response.status); // 🚨 Verificar aquí también
        throw new Error("Error actualizando meta");
    }
    return await response.json();
}

export async function borrarMeta(id: number): Promise<void> {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("No autenticado"); // Validación de token

    const response = await fetch(`${apiUrl}/api/metas/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    
    // Aquí no es necesario verificar response.ok para una operación DELETE si solo importa la auth
    if (!response.ok && response.status !== 204) { // 204 No Content es común en DELETE exitosos
        handleAuthError(response.status); // 🚨 Verificar aquí también
        throw new Error(`Error al borrar meta: ${response.status}`);
    }

    console.log("Meta borrada!", id);
}

