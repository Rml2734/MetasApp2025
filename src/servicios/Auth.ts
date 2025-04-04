import { CredencialesTipo } from "../tipos/CredencialesTipo";
const apiUrl = import.meta.env.VITE_API_URL;

interface Token {
  token: string;
}

// 🔄 Función de Registro Mejorada
export async function registrarse(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch(`${apiUrl}/api/signup`, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: "include",
    mode: "cors"
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registro fallido");
  }

  const { token } = await response.json();
  
  // 🍪 Guardar en Cookies y LocalStorage
  //document.cookie = `token=${token}; Secure; SameSite=None; Path=/`;
  localStorage.setItem("token", token);
  
  return { token };
}

// 🔑 Función de Login Definitiva
export async function acceder(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors"
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(errorData.error || `Error: ${response.status}`);
  }
  
  const data = await response.json();
  const token = data.token;
  
  // Almacena solo en localStorage para simplicidad
  localStorage.setItem("token", token);
  
  return { token };
}

// 🗑️ Función de Eliminación de Usuario
export async function eliminarUsuario(token: string, usuarioId: number): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/api/usuarios/${usuarioId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!response.ok) throw new Error("Error al eliminar");
    
    localStorage.clear();
    document.cookie = "token=; Max-Age=0; Path=/";
  } catch (error) {
    throw new Error(`Error crítico: ${error instanceof Error ? error.message : "Desconocido"}`);
  }
}

// 🚪 Cierre de Sesión Robustecido
export function cerrarSesion(): void {
  localStorage.removeItem("token");
  document.cookie = "token=; Max-Age=0; Path=/";
  window.location.href = "/inicio";
}