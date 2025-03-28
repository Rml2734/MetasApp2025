import React from "react";
import { createContext } from "react";


// const memoria = localStorage.getItem('metas');
const estadoInicial = {
    orden: [],
    objetos: {},
  };
  // memoria ? JSON.parse(memoria) : {
  //     orden: [],
  //     objetos: {}
  // };
  
  function reductor(estado, accion) {
    switch (accion.tipo) {
      case "colocar": {
        const metas = accion.metas;
        const nuevoEstado = {
          orden: metas.map((meta) => meta.id),
          objetos: metas.reduce(
            (objeto, meta) => ({ ...objeto, [meta.id]: meta }),
            {}
          ),
        };
        // localStorage.setItem('metas', JSON.stringify(nuevoEstado))
        return nuevoEstado;
      }
      case "crear": {
        const id = accion.meta.id; // String(Math.random());
        const nuevoEstado = {
          orden: [...estado.orden, id],
          objetos: {
            ...estado.objetos,
            [id]: accion.meta,
          },
        };
        // localStorage.setItem('metas', JSON.stringify(nuevoEstado))
        return nuevoEstado;
      }
      case "actualizar": {
        const id = accion.meta.id;
        return {
          ...estado,
          objetos: {
            ...estado.objetos,
            [id]: {
              ...estado.objetos[id],
              ...accion.meta,
              cuenta_id: accion.meta.cuenta_id === "null" ? null : accion.meta.cuenta_id // Corrige "null"
            }
          }
        };
      }
      case "borrar": {
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
        throw new Error();
    }
  }

export const ContextoMetas = createContext(null);

export { estadoInicial, reductor };