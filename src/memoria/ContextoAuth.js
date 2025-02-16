import { createContext } from "react";


const estadoInicial = {
  token: localStorage.getItem('token') || '',
  autenticado: !!localStorage.getItem('token')
};

function reductor(estado, accion) {
  switch (accion.tipo) {
    case "colocar": {
      localStorage.setItem('token', accion.token);
      return {
        token: accion.token,
        autenticado: true
      };
    }
    case "limpiar": {
      localStorage.removeItem('token');
      return {
        token: '',
        autenticado: false
      };
    }
    default:
      throw new Error(`Acción desconocida: ${accion.tipo}`);
  }
}

export const ContextoAuth = createContext();
export { estadoInicial, reductor };