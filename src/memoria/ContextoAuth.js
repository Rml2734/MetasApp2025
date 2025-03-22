import { createContext } from "react";

{/*LA FUENTE DE LA VERDAD 🎉✨ */}
const estadoInicial = {
  token: '',
  autenticado: false
};

function reductor(estado, accion) {
  switch (accion.tipo) {
    case "colocar": {
      return {
        token: accion.token,
        autenticado: true
      };
    }
    case "cerrarSesion": {
      return {
        token: '',
        autenticado: false
      };
    }
    default:
      throw new Error(`Acción no soportada: ${accion.tipo}`);
  }
}

export const ContextoAuth = createContext();
export { estadoInicial, reductor };



