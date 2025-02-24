import { createContext } from "react";

{/*LA FUENTE DE LA VERDAD */}
const estadoInicial = {
  token: '',
  autenticado: false
};

function reductor(estado, accion) {
  switch (accion.tipo) {
    case "colocar": {
      const nuevoEstado = {
        token: accion.token,
        autenticado: true
      };
      return nuevoEstado;
    }

    default:
      throw new Error();
  }
}

export const ContextoAuth = createContext();
export { estadoInicial, reductor };
