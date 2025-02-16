import { createContext } from "react";

const estadoInicial = {
    orden: [],
    objetos: {}
};

function reductor(estado, accion) {
    switch (accion.tipo) {
        case "colocar": {
            const metas = accion.metas;
            return {
              orden: metas.map((meta) => meta.id),
              objetos: metas.reduce(
                (objeto, meta) => ({ ...objeto, [meta.id]: meta }),
                {}
              ),
            };
        }
        case 'crear': {
            const id = accion.meta.id;
            return {
                orden: [...estado.orden, id],
                objetos: {
                    ...estado.objetos,
                    [id]: {id, ...accion.meta}
                }
            };
        }
        case 'actualizar': {
            const id = accion.meta.id;
            estado.objetos[id] = {
              ...estado.objetos[id],
              ...accion.meta,
            };
            return { ...estado };
        }
        case 'borrar': {
            const id = accion.id;
            const nuevoOrden = estado.orden.filter((item) => item !== id);
            delete estado.objetos[id];
            const nuevoEstado = {
              orden: nuevoOrden,
              objetos: estado.objetos,
            };
            // localStorage.setItem('metas', JSON.stringify(nuevoEstado))
            return nuevoEstado;
        }
        default:
            throw new Error(`Acción desconocida: ${accion.tipo}`);
    }
}

export const ContextoMetas = createContext();
export { estadoInicial, reductor };