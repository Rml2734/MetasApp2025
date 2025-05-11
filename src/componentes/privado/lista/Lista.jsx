// Lista.jsx - Versión actualizada
import React, { useContext } from "react";
import Meta from "./Meta";
import { Outlet } from "react-router-dom";
import { ContextoMetas } from "../../../memoria/ContextoMetas";
import styles from "./Lista.module.css"; // Nuevo archivo CSS
import { ReactComponent as DatosSVG } from "./Datos.svg";

function Lista() {
  const [metas] = useContext(ContextoMetas);

  return (
    <div className={styles.contenedor}>
      {metas.orden.length === 0 ? (
        <div className={styles.estadoVacio}>
          <div className={styles.contenido}>
            < 
              DatosSVG
              alt="Ilustración metas vacías"
              className={styles.ilustracion}
            />
            <h2 className={styles.titulo}>¡Comienza tu viaje!</h2>
            <p className={styles.texto}>
              Crea tu primera meta para empezar a organizar tus objetivos
            </p>
            <a href="/nueva" className={styles.boton}>
              Crear primera meta
            </a>
          </div>
        </div>
      ) : (
        <>
          {metas.orden.map((id) => (
            <Meta key={id} {...metas.objetos[id]} />
          ))}
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Lista;