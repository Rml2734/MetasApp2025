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
  document.cookie = `token=${token}; Secure; SameSite=None; Path=/`;
  localStorage.setItem("token", token);
  
  return { token };
}

// 🔑 Función de Login Definitiva
export async function acceder(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://metasapp2025.onrender.com" // 👈 Nuevo
    },
    credentials: "include",
    mode: "cors"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Credenciales inválidas");
  }

  const { token } = await response.json();
  
  // 🍪 Configurar Cookie Segura
  document.cookie = `token=${token}; Secure; SameSite=None; Path=/; Max-Age=3600`;
  localStorage.setItem("token", token);
  
  console.log("✅ Sesión iniciada correctamente");
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