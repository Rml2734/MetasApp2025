import { CredencialesTipo } from "../tipos/CredencialesTipo";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";

interface Token {
  token: string;
}

export async function registrarse(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch(`${apiUrl}/api/signup`, { // 🔥 URL completa
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    credentials: 'include' // 👈 Añadir esta línea
  });
  if (!response.ok) throw new Error("Error en registro");

  const { token } = await response.json();

  // 🔥 Guardar token en localStorage
  localStorage.setItem("token", token);
  
  return { token };
}

export async function acceder(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch(`${apiUrl}/api/login`, { // 🔥 URL completa
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    credentials: 'include' // 👈 Añadir esta línea
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error en login");
  }

  const { token } = await response.json();

  console.log("🔑 Token recibido:", token); // Verifica si el backend está enviando el token correcto

  if (!token) {
    console.error("❌ No se recibió un token válido del backend.");
    throw new Error("Error al recibir el token.");
  }

  // 🔥 Guardar token en localStorage
  localStorage.setItem("token", token);

  console.log("✅ Token guardado en localStorage:", localStorage.getItem("token"));

  return { token };
}



export async function eliminarUsuario(token: string, usuarioId: number): Promise<void> {
  try {
    const response = await fetch(`/api/usuarios/${usuarioId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      // 🔥 Manejar casos donde la respuesta no es JSON:
      const errorText = await response.text();
      throw new Error(errorText || "Error al eliminar usuario");
    }

    localStorage.clear();
  } catch (error) {
    let errorMessage = "Error de conexión";
    if (error instanceof Error) { // 👈 Validar si es un Error
      errorMessage += `: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}







// 🔥 Función para cerrar sesión correctamente
export function cerrarSesion(): void {
  console.log("🚪 Cerrando sesión...");
  localStorage.removeItem("token");  // Eliminar el token de autenticación
  localStorage.removeItem("metas");  // Limpiar las metas del usuario
  window.location.href = "/inicio";   // Redirigir a la página de acceso
}