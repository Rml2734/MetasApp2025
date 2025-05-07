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
        const metas = accion.metas.map(meta => ({
          ...meta,
          // 🔥 Formatear fecha para el input type="date"
          plazo: meta.plazo ? new Date(meta.plazo).toISOString().split('T')[0] : ''
        }));
        
        const nuevoEstado = {
          orden: metas.map((meta) => meta.id),
          objetos: metas.reduce(
            (objeto, meta) => ({ ...objeto, [meta.id]: meta }),
            {}
          ),
        };
        return nuevoEstado;
      }
      case "crear": {
        const id = accion.meta.id;
        const nuevaMeta = {
          ...accion.meta,
          // 🔥 Asegurar formato de fecha
          plazo: accion.meta.plazo ? new Date(accion.meta.plazo).toISOString().split('T')[0] : ''
        };
        
        const nuevoEstado = {
          orden: [...estado.orden, id],
          objetos: {
            ...estado.objetos,
            [id]: nuevaMeta
          },
        };
        return nuevoEstado;
      }
      case "actualizar": {
        const id = accion.meta.id;
        const metaActualizada = {
          ...accion.meta,
          // 🔥 Corregir formato de fecha
          plazo: accion.meta.plazo ? new Date(accion.meta.plazo).toISOString().split('T')[0] : '',
          cuenta_id: accion.meta.cuenta_id === "null" ? null : accion.meta.cuenta_id
        };
        
        return {
          ...estado,
          objetos: {
            ...estado.objetos,
            [id]: metaActualizada
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