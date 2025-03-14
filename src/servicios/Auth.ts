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
  if (!response.ok) throw new Error("Error en registro"); // Mejor manejo de errores
  
  const { token } = await response.json(); // Destructuración directa
  
  // 🔥 Guardar token en localStorage
  localStorage.setItem('token', token);
  
  return { token };
};


export async function acceder(credenciales: CredencialesTipo): Promise<Token> {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credenciales),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    const errorData = await response.json(); // Lee el mensaje de error del backend
    if (errorData.error === "jwt expired") {
      // Lógica para redirigir al usuario a login o refrescar el token
      throw new Error("El token ha expirado, por favor inicie sesión nuevamente.");
    }
    throw new Error(errorData.error || "Error en login");
  }

  const { token } = await response.json();
  
  // 🔥 Guardar token en localStorage
  localStorage.setItem('token', token);
  
  return { token };
}

// En Auth.ts
export function cerrarSesion(): void {
  localStorage.removeItem('token');
  // Opcional: Redirigir a la página de login
  window.location.href = '/login';
}