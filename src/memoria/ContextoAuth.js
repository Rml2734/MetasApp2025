import { createContext } from "react";

{/*LA FUENTE DE LA VERDAD 🎉✨ */}
const estadoInicial = {
  token: '',
  autenticado: false,
  usuario: null // 🔥 Nuevo campo para almacenar datos del usuario
};

function reductor(estado, accion) {
  switch (accion.tipo) {
    case "colocar": {
      return {
        token: accion.token,
        usuario: accion.usuario, // 🔥 Recibir datos del usuario
        autenticado: true
      };
    }
    case "cerrarSesion": {
      return estadoInicial; // Limpiar todo
    }
    default:
      throw new Error(`Acción no soportada: ${accion.tipo}`);
  }
}

export const ContextoAuth = createContext();
export { estadoInicial, reductor };



