import { CredencialesTipo } from "../tipos/CredencialesTipo";

interface Token {
  token: string;
}

export async function registrarse(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) throw new Error("Error en registro");

  const { token } = await response.json();

  // 🔥 Guardar token en localStorage
  localStorage.setItem("token", token);
  
  return { token };
}

export async function acceder(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
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


// 🔥 Función para cerrar sesión correctamente
export function cerrarSesion(): void {
  console.log("🚪 Cerrando sesión...");
  localStorage.removeItem("token");  // Eliminar el token de autenticación
  localStorage.removeItem("metas");  // Limpiar las metas del usuario
  window.location.href = "/inicio";   // Redirigir a la página de acceso
}